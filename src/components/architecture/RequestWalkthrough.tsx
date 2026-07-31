"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { SectionEyebrow } from "@/components/landing/SectionEyebrow";

const stages = [
  "HTTP Server",
  "Runtime",
  "Router",
  "Service",
  "Load Balancer",
  "Reverse Proxy",
  "Backend",
];
const timeline = [
  ["00.00 ms", "Request received"],
  ["00.18 ms", "Runtime loaded"],
  ["00.41 ms", "Route matched"],
  ["00.63 ms", "Backend selected"],
  ["01.12 ms", "Response returned"],
];

export function RequestWalkthrough() {
  const [replay, setReplay] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div>
          <SectionEyebrow>Request walkthrough</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
            A Request in Motion
          </h2>
          <p className="mt-5 max-w-md leading-7 text-[var(--ink-soft)]">
            The execution path remains small enough to inspect: accept the request, read the current
            runtime, match a route, choose a backend and proxy the response.
          </p>
          <button
            type="button"
            onClick={() => setReplay((value) => value + 1)}
            className="mt-8 inline-flex items-center gap-2 border border-[var(--line-strong)] px-4 py-2.5 font-[family-name:var(--font-ibm-plex-mono)] text-xs font-medium text-[var(--ink)] transition-colors hover:border-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--signal)]"
          >
            Replay <span aria-hidden="true">↻</span>
          </button>
        </div>
        <div className="border border-[var(--line-strong)] bg-[var(--surface)] p-5 sm:p-8">
          <div className="relative grid gap-2 sm:grid-cols-7 sm:gap-0">
            {stages.map((stage, index) => (
              <motion.div
                key={`${replay}-${stage}`}
                initial={false}
                animate={reduceMotion ? { opacity: 1 } : { opacity: [0.45, 1, 0.45] }}
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 4.9, delay: index * 0.7, repeat: Infinity, ease: "linear" }
                }
                className="relative border border-[var(--line)] bg-[var(--surface)] px-3 py-4 sm:border-r-0 sm:last:border-r"
              >
                <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] text-[var(--ink-faint)]">
                  0{index + 1}
                </span>
                <span className="mt-5 block text-sm font-medium text-[var(--ink)]">{stage}</span>
              </motion.div>
            ))}
          </div>
          <motion.div
            key={replay}
            initial={reduceMotion ? false : { opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mt-7 inline-flex border border-[var(--line-strong)] bg-[var(--paper)] px-3 py-2 font-[family-name:var(--font-ibm-plex-mono)] text-xs text-[var(--ink)]"
          >
            GET /api/users/42
          </motion.div>
          <ol className="mt-8 border-t border-[var(--line)]">
            {timeline.map(([time, event], index) => (
              <motion.li
                key={`${replay}-${time}`}
                initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: reduceMotion ? 0 : index * 0.12 }}
                className="grid grid-cols-[86px_1fr] gap-4 border-b border-[var(--line)] py-3 text-sm"
              >
                <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] text-[var(--ink-faint)]">
                  {time}
                </span>
                <span className="text-[var(--ink-soft)]">{event}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
