import { describe, expect, it } from "vitest";

import type { ExecutionEvent } from "@/lib/execution";

import { connectionLabel, eventLabel, lifecycleLabel, terminalEvent } from "./presentation";

const event = (sequence: number, type: ExecutionEvent["type"]): ExecutionEvent => ({
  sequence,
  execution_id: "exec_123",
  type,
  timestamp: `2026-09-16T10:00:0${sequence}.000Z`,
});

describe("execution visualization presentation", () => {
  it("labels the idle lifecycle", () => {
    expect(lifecycleLabel("idle")).toBe("Idle");
  });

  it("labels a connected running execution", () => {
    expect(connectionLabel({ kind: "connected" })).toBe("Connected");
    expect(lifecycleLabel("running")).toBe("Running");
  });

  it("labels completed, failed, and cancelled lifecycles", () => {
    expect(lifecycleLabel("completed")).toBe("Completed");
    expect(lifecycleLabel("failed")).toBe("Failed");
    expect(lifecycleLabel("cancelled")).toBe("Cancelled");
  });

  it("preserves readable labels for every event type", () => {
    expect(eventLabel("execution.created")).toBe("Execution created");
    expect(eventLabel("execution.started")).toBe("Execution started");
    expect(eventLabel("execution.completed")).toBe("Execution completed");
    expect(eventLabel("execution.failed")).toBe("Execution failed");
    expect(eventLabel("execution.cancelled")).toBe("Execution cancelled");
  });

  it("keeps the supplied event order for timeline rendering", () => {
    const events = [event(1, "execution.created"), event(2, "execution.started")];
    expect(events.map((item) => item.sequence)).toEqual([1, 2]);
  });

  it("finds only an actual terminal event", () => {
    expect(
      terminalEvent([event(1, "execution.created"), event(2, "execution.started")]),
    ).toBeNull();
    expect(terminalEvent([event(1, "execution.created"), event(2, "execution.completed")])).toEqual(
      event(2, "execution.completed"),
    );
  });

  it("reports a connection error label without inventing lifecycle state", () => {
    expect(connectionLabel({ kind: "error", message: "transport failed" })).toBe("Error");
    expect(lifecycleLabel("idle")).toBe("Idle");
  });
});
