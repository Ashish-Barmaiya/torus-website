import { describe, expect, it } from "vitest";

import {
    ExecutionEventStore,
    createExecutionStreamClient,
    parseExecutionEvent,
    resolveExecutionSocketUrl,
    type ExecutionConnectionState,
    type ExecutionEvent,
} from "./index";

const validEvent = (overrides: Partial<ExecutionEvent> = {}): ExecutionEvent => ({
    sequence: 1,
    execution_id: "exec_123",
    type: "execution.created",
    timestamp: "2026-09-16T10:00:00.000Z",
    ...overrides,
});

describe("parseExecutionEvent", () => {
    it("accepts a valid event", () => {
        expect(parseExecutionEvent(JSON.stringify(validEvent()))).toEqual(validEvent());
    });

    it("rejects malformed JSON", () => {
        expect(parseExecutionEvent('{"sequence":')).toBeNull();
    });

    it("rejects unknown event type", () => {
        expect(
            parseExecutionEvent(JSON.stringify(validEvent({ type: "execution.unknown" as never }))),
        ).toBeNull();
    });

    it("rejects invalid sequence", () => {
        const zeroSequence = parseExecutionEvent(JSON.stringify(validEvent({ sequence: 0 })));
        const negativeSequence = parseExecutionEvent(JSON.stringify(validEvent({ sequence: -1 })));

        expect(zeroSequence).toBeNull();
        expect(negativeSequence).toBeNull();
    });

    it("rejects empty execution IDs", () => {
        const emptyId = parseExecutionEvent(JSON.stringify(validEvent({ execution_id: "" })));
        expect(emptyId).toBeNull();
    });

    it("rejects invalid timestamps", () => {
        const invalidTimestamp = parseExecutionEvent(
            JSON.stringify(validEvent({ timestamp: "not-a-date" })),
        );
        expect(invalidTimestamp).toBeNull();
    });
});

describe("ExecutionEventStore", () => {
    it("rejects events for another execution ID", () => {
        const store = new ExecutionEventStore("exec_123");
        expect(store.accept(validEvent({ execution_id: "exec_999" }))).toBe(false);
        expect(store.error).toContain("execution ID");
    });

    it("derives lifecycle from event type", () => {
        expect(new ExecutionEventStore("exec_123").deriveLifecycle("execution.created")).toBe(
            "created",
        );
        expect(new ExecutionEventStore("exec_123").deriveLifecycle("execution.started")).toBe(
            "running",
        );
        expect(new ExecutionEventStore("exec_123").deriveLifecycle("execution.completed")).toBe(
            "completed",
        );
        expect(new ExecutionEventStore("exec_123").deriveLifecycle("execution.failed")).toBe("failed");
        expect(new ExecutionEventStore("exec_123").deriveLifecycle("execution.cancelled")).toBe(
            "cancelled",
        );
    });

    it("preserves canonical ordering and suppresses exact duplicates", () => {
        const store = new ExecutionEventStore("exec_123");
        expect(store.accept(validEvent({ sequence: 3, type: "execution.completed" }))).toBe(true);
        expect(store.accept(validEvent({ sequence: 1, type: "execution.created" }))).toBe(true);
        expect(
            store.accept(
                validEvent({
                    sequence: 1,
                    type: "execution.created",
                    timestamp: "2026-09-16T10:00:00.000Z",
                }),
            ),
        ).toBe(false);
        expect(store.events.map((event) => event.sequence)).toEqual([1, 3]);
        expect(store.lifecycle).toBe("completed");
    });

    it("detects conflicting duplicate sequences", () => {
        const store = new ExecutionEventStore("exec_123");
        expect(store.accept(validEvent({ sequence: 1, type: "execution.created" }))).toBe(true);
        expect(store.accept(validEvent({ sequence: 1, type: "execution.started" }))).toBe(false);
        expect(store.error).toContain("Conflicting");
    });

    it("detects sequence gaps", () => {
        const store = new ExecutionEventStore("exec_123");
        expect(store.accept(validEvent({ sequence: 1, type: "execution.created" }))).toBe(true);
        expect(store.accept(validEvent({ sequence: 3, type: "execution.completed" }))).toBe(true);
        expect(store.error).toContain("gap");
    });

    it("accepts out-of-order events in canonical order", () => {
        const store = new ExecutionEventStore("exec_123");
        expect(store.accept(validEvent({ sequence: 2, type: "execution.started" }))).toBe(true);
        expect(store.accept(validEvent({ sequence: 1, type: "execution.created" }))).toBe(true);
        expect(store.events.map((event) => event.sequence)).toEqual([1, 2]);
    });

    it("rejects events after a terminal event", () => {
        const store = new ExecutionEventStore("exec_123");
        expect(store.accept(validEvent({ sequence: 1, type: "execution.created" }))).toBe(true);
        expect(store.accept(validEvent({ sequence: 2, type: "execution.completed" }))).toBe(true);
        expect(store.accept(validEvent({ sequence: 3, type: "execution.failed" }))).toBe(false);
        expect(store.error).toContain("terminal");
    });
});

describe("WebSocket client", () => {
    type FakeSocket = {
        readyState: number;
        close: () => void;
        onopen: (() => void) | null;
        onmessage: ((event: { data: unknown }) => void) | null;
        onerror: ((event: unknown) => void) | null;
        onclose: (() => void) | null;
    };

    const createFakeSocket = (): FakeSocket => {
        const socket: FakeSocket = {
            readyState: 1,
            close: () => {
                socket.readyState = 3;
                socket.onclose?.();
            },
            onopen: null,
            onmessage: null,
            onerror: null,
            onclose: null,
        };

        return socket;
    };

    it("delivers a WebSocket message to the event store", () => {
        const socket = createFakeSocket();
        const client = createExecutionStreamClient({
            executionId: "exec_123",
            socketFactory: () => socket,
        });

        client.connect();
        socket.onopen?.();
        socket.onmessage?.({
            data: JSON.stringify(
                validEvent({
                    sequence: 1,
                    type: "execution.created",
                }),
            ),
        });

        expect(client.connection.kind).toBe("connected");
        expect(client.events).toHaveLength(1);
        expect(client.events[0]?.type).toBe("execution.created");
    });

    it("replays valid messages without duplicating earlier events", () => {
        const events = [
            validEvent({ sequence: 1, type: "execution.created" }),
            validEvent({ sequence: 2, type: "execution.started" }),
        ];

        const transportFactory = (() => {
            const instances: FakeSocket[] = [];
            return {
                create: () => {
                    const socket = createFakeSocket();
                    instances.push(socket);
                    return socket;
                },
                emit: (index: number, message: string) => {
                    instances[index]?.onmessage?.({ data: message });
                },
            };
        })();

        const client = createExecutionStreamClient({
            executionId: "exec_123",
            controllerUrl: "ws://localhost:8080",
            socketFactory: transportFactory.create,
        });

        client.connect();
        transportFactory.emit(0, JSON.stringify(events[0]));
        transportFactory.emit(0, JSON.stringify(events[1]));
        client.disconnect();
        client.connect();
        transportFactory.emit(1, JSON.stringify(events[0]));
        transportFactory.emit(1, JSON.stringify(events[1]));
        transportFactory.emit(
            1,
            JSON.stringify(validEvent({ sequence: 3, type: "execution.completed" })),
        );

        expect(client.events.map((event) => event.sequence)).toEqual([1, 2, 3]);
    });

    it("transitions connection state and handles transport errors", () => {
        const states: ExecutionConnectionState[] = [];
        const socket = createFakeSocket();

        const client = createExecutionStreamClient({
            executionId: "exec_123",
            controllerUrl: "ws://localhost:8080",
            socketFactory: () => socket,
            onConnectionStateChange: (state) => states.push(state),
        });

        client.connect();
        socket.onopen?.();
        expect(states[0]?.kind).toBe("connecting");
        expect(client.connection.kind).toBe("connected");

        socket.onerror?.({ type: "error" });
        expect(client.connection.kind).toBe("error");

        client.disconnect();
        expect(client.connection.kind).toBe("disconnected");
    });
});

describe("lifecycle and config", () => {
    it("returns the idle lifecycle before the first event", () => {
        const store = new ExecutionEventStore("exec_123");
        expect(store.lifecycle).toBe("idle");
    });

    it("derives the WebSocket URL from the configured controller base", () => {
        expect(resolveExecutionSocketUrl("http://localhost:8080", "exec_123")).toBe(
            "ws://localhost:8080/ws?execution_id=exec_123",
        );

        expect(resolveExecutionSocketUrl("https://demo.example.com", "exec_123")).toBe(
            "wss://demo.example.com/ws?execution_id=exec_123",
        );
    });
});
