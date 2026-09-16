import { motion, useReducedMotion } from "motion/react";

import type { ExecutionEvent } from "@/lib/execution";

import { eventLabel } from "./presentation";

export function ExecutionEventRow({
  event,
  terminal = false,
}: {
  event: ExecutionEvent;
  terminal?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.li
      initial={reduceMotion ? false : { opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduceMotion ? undefined : { duration: 0.2, ease: "easeOut" }}
      className={`grid gap-3 border-b border-[var(--line)] py-4 sm:grid-cols-[56px_minmax(0,1fr)_auto] sm:items-center sm:gap-5 ${terminal ? "border-l-2 border-l-[var(--signal)] bg-[var(--paper)] pl-3 dark:bg-[var(--ink)]" : ""}`}
    >
      <span className="font-[family-name:var(--font-ibm-plex-mono)] text-xs text-[var(--ink-faint)]">
        {String(event.sequence).padStart(2, "0")}
      </span>
      <span>
        <span className="block text-sm font-medium text-[var(--ink)]">
          {eventLabel(event.type)}
        </span>
        <code className="mt-1 block font-[family-name:var(--font-ibm-plex-mono)] text-[11px] text-[var(--ink-faint)]">
          {event.type}
        </code>
      </span>
      <time
        dateTime={event.timestamp}
        className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] text-[var(--ink-soft)] sm:text-right"
      >
        {event.timestamp}
      </time>
    </motion.li>
  );
}
