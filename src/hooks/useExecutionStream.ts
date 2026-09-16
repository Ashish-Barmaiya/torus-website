"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  createExecutionStreamClient,
  getExecutionControllerUrl,
  type ExecutionConnectionState,
  type ExecutionLifecycle,
  type ExecutionStreamSnapshot,
} from "@/lib/execution";

export type UseExecutionStreamOptions = {
  executionId: string;
  controllerUrl?: string;
};

export function useExecutionStream({ executionId, controllerUrl }: UseExecutionStreamOptions) {
  const clientRef = useRef<ReturnType<typeof createExecutionStreamClient> | null>(null);
  const [snapshot, setSnapshot] = useState<ExecutionStreamSnapshot>({
    events: [],
    lifecycle: "idle",
    connection: { kind: "idle" },
    error: null,
  });

  const invalidSnapshot: ExecutionStreamSnapshot = {
    events: [],
    lifecycle: "idle",
    connection: { kind: "idle" },
    error: "Execution ID is required.",
  };

  useEffect(() => {
    if (!executionId) {
      return;
    }

    const client = createExecutionStreamClient({
      executionId,
      controllerUrl: controllerUrl ?? getExecutionControllerUrl(),
    });

    clientRef.current = client;

    const sync = () => {
      setSnapshot(client.snapshot);
    };

    const unsubscribe = client.subscribe(sync);
    client.connect();
    sync();

    return () => {
      unsubscribe();
      client.disconnect();
    };
  }, [executionId, controllerUrl]);

  const resolvedSnapshot = !executionId ? invalidSnapshot : snapshot;

  return useMemo(
    () => ({
      events: resolvedSnapshot.events,
      lifecycle: resolvedSnapshot.lifecycle as ExecutionLifecycle,
      connection: resolvedSnapshot.connection as ExecutionConnectionState,
      error: resolvedSnapshot.error,
      reconnect: () => clientRef.current?.reconnect(),
      disconnect: () => clientRef.current?.disconnect(),
    }),
    [resolvedSnapshot],
  );
}
