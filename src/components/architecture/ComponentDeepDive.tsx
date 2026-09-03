"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { SectionEyebrow } from "@/components/landing/SectionEyebrow";

const components = [
  {
    name: "Runtime",
    purpose: "Makes a stable configuration snapshot available to each request.",
    responsibilities:
      "Configuration lookup, atomic runtime access and zero-downtime reload support.",
    notes:
      "Active requests continue using the runtime they started with while newer requests use the latest snapshot.",
    packages: "internal/runtime",
    files: "runtime.go",
  },
  {
    name: "Router",
    purpose: "Resolves a request to its most specific configured route.",
    responsibilities: "Path matching, longest-prefix selection and route state handoff.",
    notes: "The selected route becomes the boundary for the remaining request policy.",
    packages: "internal/router",
    files: "router.go",
  },
  {
    name: "Load Balancer",
    purpose: "Chooses an available backend for the selected service.",
    responsibilities: "Health-aware selection, backend rotation and unhealthy backend avoidance.",
    notes: "Only healthy backends remain eligible for new work.",
    packages: "internal/loadbalancer",
    files: "loadbalancer.go",
  },
  {
    name: "Reverse Proxy",
    purpose: "Owns the exchange between the selected backend and the original client.",
    responsibilities: "Outbound request handling, header forwarding and response streaming.",
    notes: "The proxy retains the request context while managing the upstream round trip.",
    packages: "internal/proxy",
    files: "proxy.go",
  },
];

export function ComponentDeepDive() {
  const [openComponent, setOpenComponent] = useState(components[0].name);
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-y border-[var(--line)] bg-[var(--paper-deep)]">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
        <div className="max-w-2xl">
          <SectionEyebrow>Component deep dive</SectionEyebrow>
          <h2 className="mt-4 text-[var(--text-h2)] font-semibold tracking-[-0.045em]">
            Small components. Explicit boundaries.
          </h2>
        </div>
        <div className="mt-14 border-t border-[var(--line)]">
          {components.map((component, index) => {
            const isOpen = openComponent === component.name;
            return (
              <motion.article layout key={component.name} className="border-b border-[var(--line)]">
                <button
                  type="button"
                  onClick={() => setOpenComponent(isOpen ? "" : component.name)}
                  aria-expanded={isOpen}
                  className="grid w-full grid-cols-[48px_1fr_auto] items-center gap-4 py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--signal)]"
                >
                  <span className="font-[family-name:var(--font-ibm-plex-mono)] text-xs text-[var(--ink-faint)]">
                    0{index + 1}
                  </span>
                  <span className="text-xl font-medium tracking-[-0.025em] text-[var(--ink)]">
                    {component.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-[family-name:var(--font-ibm-plex-mono)] text-[var(--ink-faint)]"
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-6 pb-8 sm:grid-cols-2 sm:pl-16">
                        <div>
                          <h3 className="text-sm font-medium text-[var(--ink)]">Purpose</h3>
                          <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
                            {component.purpose}
                          </p>
                          <h3 className="mt-5 text-sm font-medium text-[var(--ink)]">
                            Responsibilities
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
                            {component.responsibilities}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-[var(--ink)]">
                            Implementation notes
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
                            {component.notes}
                          </p>
                          <p className="mt-5 font-[family-name:var(--font-ibm-plex-mono)] text-xs text-[var(--ink-faint)]">
                            Related package: {component.packages}
                          </p>
                          <p className="mt-2 font-[family-name:var(--font-ibm-plex-mono)] text-xs text-[var(--ink-faint)]">
                            Example source: {component.files}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
