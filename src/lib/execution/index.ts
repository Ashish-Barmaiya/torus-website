export const EXECUTION_EVENT_TYPES = [
  "execution.created",
  "execution.started",
  "execution.completed",
  "execution.failed",
  "execution.cancelled",
] as const;

export type ExecutionEventType = (typeof EXECUTION_EVENT_TYPES)[number];

export type ExecutionEvent = {
  sequence: number;
  execution_id: string;
  type: ExecutionEventType;
  timestamp: string;
};

export type ExecutionLifecycle =
  "idle" | "created" | "running" | "completed" | "failed" | "cancelled";

export type ExecutionConnectionState =
  | { kind: "idle" }
  | { kind: "connecting" }
  | { kind: "connected" }
  | { kind: "disconnected" }
  | { kind: "error"; message?: string };

export type ExecutionStreamSnapshot = {
  events: readonly ExecutionEvent[];
  lifecycle: ExecutionLifecycle;
  connection: ExecutionConnectionState;
  error: string | null;
};

export type ExecutionStreamClient = {
  connect: () => void;
  disconnect: () => void;
  reconnect: () => void;
  readonly events: readonly ExecutionEvent[];
  readonly lifecycle: ExecutionLifecycle;
  readonly connection: ExecutionConnectionState;
  readonly error: string | null;
  readonly snapshot: ExecutionStreamSnapshot;
  subscribe: (listener: () => void) => () => void;
};

export type ExecutionSocketLike = {
  readyState: number;
  close: () => void;
  send?: (data: string) => void;
  addEventListener: (type: string, handler: (event: unknown) => void) => void;
  removeEventListener?: (type: string, handler: (event: unknown) => void) => void;
};

export type ExecutionStreamClientConfig = {
  executionId: string;
  controllerUrl?: string;
  socketFactory?: () => ExecutionSocketLike;
  onConnectionStateChange?: (state: ExecutionConnectionState) => void;
};

export function isExecutionEventType(value: unknown): value is ExecutionEventType {
  return typeof value === "string" && EXECUTION_EVENT_TYPES.includes(value as ExecutionEventType);
}

export function isValidTimestamp(value: unknown): value is string {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

export function parseExecutionEvent(raw: unknown): ExecutionEvent | null {
  let parsed: unknown;

  if (typeof raw === "string") {
    try {
      parsed = JSON.parse(raw);
    } catch {
      return null;
    }
  } else {
    parsed = raw;
  }

  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    return null;
  }

  const candidate = parsed as Record<string, unknown>;

  if (!Number.isInteger(candidate.sequence) || Number(candidate.sequence) <= 0) {
    return null;
  }

  if (typeof candidate.execution_id !== "string" || candidate.execution_id.trim().length === 0) {
    return null;
  }

  if (!isExecutionEventType(candidate.type)) {
    return null;
  }

  if (typeof candidate.timestamp !== "string" || !isValidTimestamp(candidate.timestamp)) {
    return null;
  }

  return {
    sequence: Number(candidate.sequence),
    execution_id: candidate.execution_id.trim(),
    type: candidate.type,
    timestamp: candidate.timestamp,
  };
}

export function deriveLifecycleFromEventType(type: ExecutionEventType): ExecutionLifecycle {
  switch (type) {
    case "execution.created":
      return "created";
    case "execution.started":
      return "running";
    case "execution.completed":
      return "completed";
    case "execution.failed":
      return "failed";
    case "execution.cancelled":
      return "cancelled";
    default:
      return "idle";
  }
}

export function getExecutionControllerUrl(controllerUrl?: string): string {
  const fromEnv = process.env.NEXT_PUBLIC_TORUS_CONTROLLER_URL;
  const base = controllerUrl ?? fromEnv ?? "ws://localhost:8080";
  const normalized = base.replace(/\/+$/, "");

  if (normalized.startsWith("http://") || normalized.startsWith("https://")) {
    const wsBase = normalized.replace(/^http/, "ws");
    return `${wsBase}/ws`;
  }

  if (normalized.startsWith("ws://") || normalized.startsWith("wss://")) {
    return `${normalized.replace(/\/+$/, "")}/ws`;
  }

  return `${normalized}/ws`;
}

export function resolveExecutionSocketUrl(
  controllerUrl: string | undefined,
  executionId: string,
): string {
  const normalizedBase = getExecutionControllerUrl(controllerUrl);
  const unsafe = encodeURIComponent(executionId);
  return `${normalizedBase}?execution_id=${unsafe}`;
}

export class ExecutionEventStore {
  private readonly expectedExecutionId: string;
  private readonly orderedEvents: ExecutionEvent[] = [];
  private _connection: ExecutionConnectionState = { kind: "idle" };
  private _error: string | null = null;
  private terminalEventType: ExecutionEventType | null = null;

  constructor(expectedExecutionId: string) {
    this.expectedExecutionId = expectedExecutionId;
  }

  get events(): readonly ExecutionEvent[] {
    return [...this.orderedEvents];
  }

  get connection(): ExecutionConnectionState {
    return this._connection;
  }

  get error(): string | null {
    return this._error;
  }

  get lifecycle(): ExecutionLifecycle {
    if (this.orderedEvents.length === 0) {
      return "idle";
    }

    return deriveLifecycleFromEventType(this.orderedEvents[this.orderedEvents.length - 1].type);
  }

  setConnectionState(next: ExecutionConnectionState): void {
    this._connection = next;
  }

  setError(message: string): void {
    this._error = message;
  }

  clearError(): void {
    this._error = null;
  }

  deriveLifecycle(type: ExecutionEventType): ExecutionLifecycle {
    return deriveLifecycleFromEventType(type);
  }

  accept(event: ExecutionEvent): boolean {
    if (event.execution_id !== this.expectedExecutionId) {
      this._error = `Execution event rejected: expected execution ID ${this.expectedExecutionId}, received ${event.execution_id}.`;
      return false;
    }

    if (this.terminalEventType !== null && event.sequence > this.lastSequence()) {
      this._error = `Stream integrity error: terminal event ${this.terminalEventType} already accepted; later events are rejected.`;
      return false;
    }

    const exactDuplicate = this.orderedEvents.some(
      (existing) =>
        existing.sequence === event.sequence &&
        existing.execution_id === event.execution_id &&
        existing.type === event.type &&
        existing.timestamp === event.timestamp,
    );

    if (exactDuplicate) {
      return false;
    }

    const conflictingSequence = this.orderedEvents.find(
      (existing) =>
        existing.sequence === event.sequence && existing.execution_id === event.execution_id,
    );

    if (
      conflictingSequence &&
      (conflictingSequence.type !== event.type || conflictingSequence.timestamp !== event.timestamp)
    ) {
      this._error = `Conflicting duplicate sequence ${event.sequence} detected for execution ${event.execution_id}.`;
      return false;
    }

    this.orderedEvents.push(event);
    this.orderedEvents.sort((left, right) => left.sequence - right.sequence);

    this.validateSequenceIntegrity();

    const latestEvent = this.orderedEvents[this.orderedEvents.length - 1];
    if (latestEvent && isTerminalEventType(latestEvent.type)) {
      this.terminalEventType = latestEvent.type;
    }

    return true;
  }

  private lastSequence(): number {
    if (this.orderedEvents.length === 0) {
      return 0;
    }

    return this.orderedEvents[this.orderedEvents.length - 1].sequence;
  }

  private validateSequenceIntegrity(): void {
    if (this.orderedEvents.length === 0) {
      this._error = null;
      return;
    }

    const sequences = [...new Set(this.orderedEvents.map((event) => event.sequence))].sort(
      (left, right) => left - right,
    );
    const minSequence = sequences[0];
    const maxSequence = sequences[sequences.length - 1];

    for (let sequence = minSequence; sequence <= maxSequence; sequence += 1) {
      if (!sequences.includes(sequence)) {
        this._error = `Stream integrity error: sequence gap detected between ${sequence - 1} and ${sequence}.`;
        return;
      }
    }

    this._error = null;
  }
}

export function isTerminalEventType(type: ExecutionEventType): boolean {
  return (
    type === "execution.completed" || type === "execution.failed" || type === "execution.cancelled"
  );
}

export function createExecutionStreamClient(
  config: ExecutionStreamClientConfig,
): ExecutionStreamClient {
  const executionId = config.executionId;
  const store = new ExecutionEventStore(executionId);
  const listeners = new Set<() => void>();
  let socket: ExecutionSocketLike | null = null;

  const notify = () => {
    for (const listener of listeners) {
      listener();
    }
  };

  const updateConnection = (state: ExecutionConnectionState) => {
    store.setConnectionState(state);
    config.onConnectionStateChange?.(state);
    notify();
  };

  const handleMessage = (event: { data?: unknown }) => {
    try {
      const parsed = parseExecutionEvent(event?.data);
      if (!parsed) {
        store.setError("Execution stream received malformed or invalid event payload.");
        notify();
        return;
      }

      const accepted = store.accept(parsed);
      if (!accepted && store.error !== null) {
        notify();
      } else {
        notify();
      }
    } catch {
      store.setError("Execution stream encountered an unexpected message processing error.");
      notify();
    }
  };

  const handleOpen = () => {
    updateConnection({ kind: "connected" });
  };

  const handleClose = () => {
    if (store.connection.kind === "error") {
      updateConnection({ kind: "error" });
      return;
    }

    updateConnection({ kind: "disconnected" });
  };

  const handleError = () => {
    store.setError("Execution stream transport error.");
    updateConnection({ kind: "error", message: "Execution stream transport error." });
  };

  const connect = () => {
    if (socket && socket.readyState === 1) {
      return;
    }

    updateConnection({ kind: "connecting" });

    try {
      const socketFactory =
        config.socketFactory ??
        (() => {
          if (typeof WebSocket === "undefined") {
            throw new Error("WebSocket is not available in this environment.");
          }

          return new WebSocket(resolveExecutionSocketUrl(config.controllerUrl, executionId));
        });

      socket = socketFactory();
      socket.addEventListener("open", () => handleOpen());
      socket.addEventListener("message", (message) => handleMessage(message as { data?: unknown }));
      socket.addEventListener("error", () => handleError());
      socket.addEventListener("close", () => handleClose());
    } catch (error) {
      store.setError(
        error instanceof Error ? error.message : "Unable to open execution stream connection.",
      );
      updateConnection({
        kind: "error",
        message:
          error instanceof Error ? error.message : "Unable to open execution stream connection.",
      });
    }
  };

  const disconnect = () => {
    if (socket) {
      socket.close();
      socket = null;
    }
    updateConnection({ kind: "disconnected" });
  };

  const reconnect = () => {
    disconnect();
    connect();
  };

  return {
    connect,
    disconnect,
    reconnect,
    get events() {
      return store.events;
    },
    get lifecycle() {
      return store.lifecycle;
    },
    get connection() {
      return store.connection;
    },
    get error() {
      return store.error;
    },
    get snapshot() {
      return {
        events: store.events,
        lifecycle: store.lifecycle,
        connection: store.connection,
        error: store.error,
      } satisfies ExecutionStreamSnapshot;
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

export function getExecutionLifecycleState(events: readonly ExecutionEvent[]): ExecutionLifecycle {
  if (events.length === 0) {
    return "idle";
  }

  const last = [...events].sort((left, right) => left.sequence - right.sequence).at(-1);
  return last ? deriveLifecycleFromEventType(last.type) : "idle";
}
