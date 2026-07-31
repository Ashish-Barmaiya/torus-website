"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { SectionEyebrow } from "@/components/landing/SectionEyebrow";

export function HotReloadDemo() {
  const [reloaded, setReloaded] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-y border-[var(--line)] bg-[var(--paper-deep)]">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <SectionEyebrow>Runtime hot reload</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
              Swap configuration without stopping traffic.
            </h2>
            <p className="mt-5 max-w-md leading-7 text-[var(--ink-soft)]">
              A runtime snapshot lets existing requests complete against the version they began
              with, while new requests immediately use the latest configuration.
            </p>
            <button
              type="button"
              onClick={() => setReloaded((value) => !value)}
              className="mt-8 inline-flex border border-[var(--line-strong)] px-4 py-2.5 font-[family-name:var(--font-ibm-plex-mono)] text-xs font-medium text-[var(--ink)] transition-colors hover:border-[var(--signal)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--signal)]"
            >
              {reloaded ? "Show Runtime v1" : "Apply Runtime v2"}
            </button>
          </div>
          <div className="border border-[var(--line-strong)] bg-[var(--surface)] p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <RuntimeCard
                title="Existing request"
                runtime="Runtime v1"
                state="continues unchanged"
              />
              <RuntimeCard
                title="New request"
                runtime={reloaded ? "Runtime v2" : "Runtime v1"}
                state={reloaded ? "uses latest configuration" : "awaits reload"}
                active={reloaded}
                reduceMotion={reduceMotion}
              />
            </div>
            <AnimatePresence initial={false}>
              {reloaded && (
                <motion.p
                  initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                  className="mt-6 border-l border-[var(--signal-dark)] pl-4 text-sm leading-6 text-[var(--ink-soft)]"
                >
                  The pointer changes for new work only. No active request is forced to stop or
                  restart.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function RuntimeCard({
  title,
  runtime,
  state,
  active = false,
  reduceMotion = false,
}: {
  title: string;
  runtime: string;
  state: string;
  active?: boolean;
  reduceMotion?: boolean | null;
}) {
  return (
    <motion.div
      layout
      transition={{ duration: reduceMotion ? 0 : 0.2 }}
      className={`border p-5 transition-colors ${active ? "border-[var(--signal)] bg-[var(--paper)]" : "border-[var(--line)]"}`}
    >
      <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] text-[var(--ink-faint)]">
        {title}
      </p>
      <p
        className={`mt-6 text-lg ${active ? "font-semibold text-[var(--signal-dark)]" : "font-medium text-[var(--ink)]"}`}
      >
        {runtime}
      </p>
      <p className={`mt-2 text-sm ${active ? "text-[var(--signal)]" : "text-[var(--ink-soft)]"}`}>
        {state}
      </p>
    </motion.div>
  );
}
