"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { SectionEyebrow } from "@/components/landing/SectionEyebrow";

const backends = ["Backend A", "Backend B", "Backend C"];

export function LoadBalancerDemo() {
  const [disabled, setDisabled] = useState<string[]>([]);
  const [lastBackend, setLastBackend] = useState("");
  const [nextIndex, setNextIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const healthyBackends = backends.filter((backend) => !disabled.includes(backend));

  const sendRequest = () => {
    if (!healthyBackends.length) return;
    const selected = healthyBackends[nextIndex % healthyBackends.length];
    setLastBackend(selected);
    setNextIndex((value) => value + 1);
  };

  const toggleBackend = (backend: string) =>
    setDisabled((current) =>
      current.includes(backend)
        ? current.filter((item) => item !== backend)
        : [...current, backend],
    );

  return (
    <section className="border-y border-[var(--line)] bg-[var(--paper-deep)]">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <SectionEyebrow>Load balancer</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
              Healthy backends receive the work.
            </h2>
            <p className="mt-5 max-w-md leading-7 text-[var(--ink-soft)]">
              Round robin selection rotates across the backends currently available to the service.
              Disable a backend to see it leave the sequence.
            </p>
            <button
              type="button"
              disabled={!healthyBackends.length}
              onClick={sendRequest}
              className="mt-8 inline-flex items-center gap-2 rounded-[2px] bg-[var(--ink)] px-5 py-3 text-sm font-medium text-[var(--paper)] transition-colors hover:bg-[#293432] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--signal)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send Request <span aria-hidden="true">→</span>
            </button>
          </div>
          <div className="border border-[var(--line-strong)] bg-[var(--surface)] p-6 sm:p-8">
            <div className="space-y-3">
              {backends.map((backend, index) => {
                const isDisabled = disabled.includes(backend);
                const isSelected = lastBackend === backend;
                return (
                  <motion.div
                    key={backend}
                    animate={isSelected && !reduceMotion ? { x: [0, 5, 0] } : { x: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className={`grid grid-cols-[32px_1fr_auto] items-center gap-4 border px-4 py-4 transition-colors ${isDisabled ? "border-[var(--line)] text-[var(--ink-faint)]" : isSelected ? "border-[var(--signal)] bg-[var(--surface)] text-[var(--signal-dark)]" : "border-[var(--line-strong)] text-[var(--ink)]"}`}
                  >
                    <span className="font-[family-name:var(--font-ibm-plex-mono)] text-xs">
                      0{index + 1}
                    </span>
                    <span
                      className={`text-sm ${isSelected ? "font-semibold text-[var(--signal-dark)]" : "font-medium"}`}
                    >
                      {backend}
                      {isSelected && (
                        <span className="ml-2 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] text-[var(--signal)]">
                          selected
                        </span>
                      )}
                    </span>
                    <span className="flex items-center gap-2 font-[family-name:var(--font-ibm-plex-mono)] text-[11px]">
                      <span
                        className={`size-1.5 rounded-full ${isDisabled ? "bg-[var(--line-strong)]" : "bg-[var(--signal)]"}`}
                      />
                      {isDisabled ? "disabled" : "healthy"}
                    </span>
                  </motion.div>
                );
              })}
            </div>
            <fieldset className="mt-7 flex flex-wrap gap-3">
              <legend className="sr-only">Backend availability</legend>
              {backends.slice(1).map((backend) => (
                <label
                  key={backend}
                  className="inline-flex items-center gap-2 font-[family-name:var(--font-ibm-plex-mono)] text-xs text-[var(--ink-soft)]"
                >
                  <input
                    type="checkbox"
                    checked={disabled.includes(backend)}
                    onChange={() => toggleBackend(backend)}
                    className="size-3 accent-[var(--signal)]"
                  />
                  Disable {backend}
                </label>
              ))}
            </fieldset>
          </div>
        </div>
      </div>
    </section>
  );
}
