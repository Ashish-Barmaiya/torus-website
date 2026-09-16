import { motion, useReducedMotion } from "motion/react";

import type { ExecutionEvent } from "@/lib/execution";

import { ExecutionEventRow } from "./ExecutionEventRow";
import { terminalEvent } from "./presentation";

export function ExecutionTimeline({ events }: { events: readonly ExecutionEvent[] }) {
  const reduceMotion = useReducedMotion();
  const terminal = terminalEvent(events);

  return (
    <section
      aria-labelledby="execution-timeline-heading"
      className="border border-[var(--line-strong)] bg-[var(--surface)] p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3
          id="execution-timeline-heading"
          className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] tracking-[0.12em] text-[var(--ink-faint)] uppercase"
        >
          Lifecycle timeline
        </h3>
        <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] text-[var(--ink-faint)]">
          {events.length} {events.length === 1 ? "event" : "events"}
        </span>
      </div>

      {events.length === 0 ? (
        <p className="mt-6 border-t border-[var(--line)] pt-5 text-sm text-[var(--ink-soft)]">
          No lifecycle events received yet.
        </p>
      ) : (
        <motion.ol layout={!reduceMotion} className="mt-3 border-t border-[var(--line)]">
          {events.map((event) => (
            <ExecutionEventRow
              key={event.sequence}
              event={event}
              terminal={terminal?.sequence === event.sequence}
            />
          ))}
        </motion.ol>
      )}

      <p className="mt-5 border-l-2 border-[var(--line-strong)] pl-3 text-sm text-[var(--ink-soft)]">
        Terminal state: {terminal ? terminal.type.replace("execution.", "") : "not recorded"}
      </p>
    </section>
  );
}
