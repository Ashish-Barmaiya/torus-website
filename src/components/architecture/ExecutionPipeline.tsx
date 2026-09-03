"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { SectionEyebrow } from "@/components/landing/SectionEyebrow";

type Stage = {
  id: string;
  name: string;
  packageName: string;
  purpose: string;
  responsibilities: string[];
  implementation: string;
  requestState: string;
};

const stages: Stage[] = [
  {
    id: "client",
    name: "Client",
    packageName: "HTTP request",
    purpose: "Begins a request to an exposed Torus listener.",
    responsibilities: ["opens the connection", "sends request headers", "waits for a response"],
    implementation:
      "Torus receives standard HTTP requests and preserves the request context through execution.",
    requestState: "GET /api/users/42",
  },
  {
    id: "server",
    name: "HTTP Server",
    packageName: "net/http",
    purpose: "Accepts the incoming connection and establishes the request boundary.",
    responsibilities: ["accept connection", "parse HTTP", "create request context"],
    implementation:
      "The listener uses Go’s HTTP server primitives to turn a connection into a request Torus can process.",
    requestState: "request accepted",
  },
  {
    id: "runtime",
    name: "Runtime",
    packageName: "atomic.Pointer",
    purpose: "Provides an immutable runtime snapshot to every incoming request.",
    responsibilities: [
      "configuration lookup",
      "atomic runtime access",
      "zero-downtime reload support",
    ],
    implementation:
      "Active requests retain their runtime while new requests immediately observe the latest configuration.",
    requestState: "runtime snapshot loaded",
  },
  {
    id: "router",
    name: "Router",
    packageName: "internal/router",
    purpose: "Matches the request against configured route prefixes.",
    responsibilities: ["path matching", "longest-prefix selection", "route state handoff"],
    implementation:
      "The router chooses the most specific configured route before service policy is applied.",
    requestState: "route /api/users matched",
  },
  {
    id: "service",
    name: "Service",
    packageName: "internal/service",
    purpose: "Owns the selected route’s request policy and upstream definition.",
    responsibilities: ["service configuration", "middleware boundary", "upstream selection input"],
    implementation:
      "A service binds the matched route to the downstream behavior that should execute.",
    requestState: "service users-api selected",
  },
  {
    id: "load-balancer",
    name: "Load Balancer",
    packageName: "internal/loadbalancer",
    purpose: "Selects a healthy backend from the service’s upstream pool.",
    responsibilities: ["health-aware selection", "backend rotation", "unhealthy backend avoidance"],
    implementation: "Selection only considers backends currently eligible to receive the request.",
    requestState: "backend api-02 selected",
  },
  {
    id: "proxy",
    name: "Reverse Proxy",
    packageName: "httputil.ReverseProxy",
    purpose: "Forwards the request to the chosen upstream and returns its response.",
    responsibilities: ["outbound request", "header forwarding", "response streaming"],
    implementation:
      "The proxy owns the final upstream exchange while preserving the original request flow.",
    requestState: "200 response returned",
  },
  {
    id: "upstream",
    name: "Healthy Upstream",
    packageName: "backend service",
    purpose: "Processes the proxied request and produces the application response.",
    responsibilities: ["receive request", "execute application logic", "return response"],
    implementation:
      "Torus forwards only to a backend that remains available to the selected service.",
    requestState: "api-02 / 200 OK",
  },
];

export function ExecutionPipeline() {
  const [activeStage, setActiveStage] = useState(stages[0]);
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="execution-pipeline"
      className="border-b border-[var(--line)] bg-[var(--paper-deep)]"
    >
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
        <div className="max-w-2xl">
          <SectionEyebrow>Execution pipeline</SectionEyebrow>
          <h2 className="mt-4 text-[var(--text-h2)] font-semibold tracking-[-0.045em]">
            A request has one deliberate path.
          </h2>
          <p className="mt-5 leading-7 text-[var(--ink-soft)]">
            Inspect any stage to see its responsibility, implementation boundary and the state
            passed to the next component.
          </p>
        </div>

        <div className="mt-14 overflow-x-auto pb-2">
          <div className="flex min-w-max flex-col items-stretch gap-0 lg:flex-row lg:items-center">
            {stages.map((stage, index) => (
              <div key={stage.id} className="flex flex-col lg:flex-row lg:items-center">
                <motion.button
                  type="button"
                  onMouseEnter={() => setActiveStage(stage)}
                  onFocus={() => setActiveStage(stage)}
                  onClick={() => setActiveStage(stage)}
                  whileHover={reduceMotion ? undefined : { y: -3 }}
                  whileTap={reduceMotion ? undefined : { y: -1 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                  aria-pressed={activeStage.id === stage.id}
                  className={`group/pipeline min-w-44 border p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--signal)] dark:hover:bg-[var(--ink)] dark:hover:text-[var(--paper)] ${activeStage.id === stage.id ? "border-[var(--line-strong)] bg-[var(--surface)]" : "border-[var(--line)] bg-[var(--paper-deep)]"}`}
                >
                  <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] text-[var(--ink-faint)] dark:group-hover/pipeline:text-[var(--paper)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-7 block text-base font-medium tracking-[-0.02em] text-[var(--ink)] dark:group-hover/pipeline:text-[var(--paper)]">
                    {stage.name}
                  </span>
                  <span className="mt-1 block font-[family-name:var(--font-ibm-plex-mono)] text-[11px] text-[var(--ink-soft)] dark:group-hover/pipeline:text-[var(--paper)]">
                    {stage.packageName}
                  </span>
                </motion.button>
                {index < stages.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="mx-auto h-7 w-px bg-[var(--line-strong)] lg:mx-0 lg:h-px lg:w-7"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 min-h-76 border border-[var(--line-strong)] bg-[var(--surface)] p-6 sm:p-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeStage.id}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="grid gap-8 lg:grid-cols-[1fr_1.15fr]"
            >
              <div>
                <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] tracking-[0.12em] text-[var(--ink-faint)] uppercase">
                  {activeStage.packageName}
                </p>
                <h3 className="mt-4 text-2xl font-medium tracking-[-0.035em] text-[var(--ink)]">
                  {activeStage.name}
                </h3>
                <p className="mt-4 leading-7 text-[var(--ink-soft)]">{activeStage.purpose}</p>
                <div className="mt-7 border-l border-[var(--line-strong)] pl-4">
                  <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] tracking-[0.1em] text-[var(--ink-faint)] uppercase">
                    Request state
                  </p>
                  <code className="mt-2 block font-[family-name:var(--font-ibm-plex-mono)] text-sm text-[var(--ink)]">
                    {activeStage.requestState}
                  </code>
                </div>
              </div>
              <div className="grid gap-7 sm:grid-cols-2">
                <div>
                  <h4 className="text-sm font-medium text-[var(--ink)]">Responsibilities</h4>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--ink-soft)]">
                    {activeStage.responsibilities.map((responsibility) => (
                      <li key={responsibility} className="flex gap-2">
                        <span aria-hidden="true" className="text-[var(--ink-faint)]">
                          —
                        </span>
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-[var(--ink)]">Implementation notes</h4>
                  <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">
                    {activeStage.implementation}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
