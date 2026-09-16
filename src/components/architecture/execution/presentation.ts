import type {
  ExecutionConnectionState,
  ExecutionEvent,
  ExecutionEventType,
  ExecutionLifecycle,
} from "@/lib/execution";

const eventLabels: Record<ExecutionEventType, string> = {
  "execution.created": "Execution created",
  "execution.started": "Execution started",
  "execution.completed": "Execution completed",
  "execution.failed": "Execution failed",
  "execution.cancelled": "Execution cancelled",
};

const lifecycleLabels: Record<ExecutionLifecycle, string> = {
  idle: "Idle",
  created: "Created",
  running: "Running",
  completed: "Completed",
  failed: "Failed",
  cancelled: "Cancelled",
};

export function eventLabel(type: ExecutionEventType): string {
  return eventLabels[type];
}

export function lifecycleLabel(lifecycle: ExecutionLifecycle): string {
  return lifecycleLabels[lifecycle];
}

export function connectionLabel(connection: ExecutionConnectionState): string {
  if (connection.kind === "error") {
    return "Error";
  }

  return connection.kind.charAt(0).toUpperCase() + connection.kind.slice(1);
}

export function terminalEvent(events: readonly ExecutionEvent[]): ExecutionEvent | null {
  return (
    events.find(
      (event) =>
        event.type === "execution.completed" ||
        event.type === "execution.failed" ||
        event.type === "execution.cancelled",
    ) ?? null
  );
}
