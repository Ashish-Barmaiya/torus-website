"use client";

import { useExecutionStream } from "@/hooks/useExecutionStream";

import { ExecutionHeader } from "./execution/ExecutionHeader";
import { ExecutionStatus } from "./execution/ExecutionStatus";
import { ExecutionTimeline } from "./execution/ExecutionTimeline";

export function ExecutionDemo({ executionId }: { executionId?: string }) {
  const stream = useExecutionStream({ executionId: executionId ?? "" });

  return (
    <section id="live-execution" className="border-y border-[var(--line)] bg-[var(--paper-deep)]">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
        <ExecutionHeader executionId={executionId} />
        <div className="mt-12 grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-8">
          <ExecutionStatus
            lifecycle={stream.lifecycle}
            connection={stream.connection}
            error={stream.error}
          />
          <ExecutionTimeline events={stream.events} />
        </div>
      </div>
    </section>
  );
}
