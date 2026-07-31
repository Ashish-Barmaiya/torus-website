"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { SectionEyebrow } from "@/components/landing/SectionEyebrow";

const routes = ["/", "/api", "/api/users", "/api/users/admin"];

export function RoutingVisualization() {
  const [matched, setMatched] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div>
          <SectionEyebrow>Routing visualization</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
            The most specific route wins.
          </h2>
          <p className="mt-5 max-w-md leading-7 text-[var(--ink-soft)]">
            Torus evaluates the request path against configured prefixes.{" "}
            <code className="font-[family-name:var(--font-ibm-plex-mono)] text-sm text-[var(--ink)]">
              /api/users
            </code>{" "}
            wins because it is the longest configured prefix that matches the request.
          </p>
          <button
            type="button"
            onClick={() => setMatched((value) => !value)}
            className="mt-8 inline-flex border border-[var(--line-strong)] px-4 py-2.5 font-[family-name:var(--font-ibm-plex-mono)] text-xs font-medium text-[var(--ink)] transition-colors hover:border-[var(--ink)] dark:hover:bg-[var(--ink)] dark:hover:text-[var(--paper)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--signal)]"
          >
            {matched ? "Reset match" : "Run match"}
          </button>
        </div>
        <div className="border border-[var(--line-strong)] bg-[var(--surface)] p-6 sm:p-8">
          <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] tracking-[0.1em] text-[var(--ink-faint)] uppercase">
            Incoming request
          </p>
          <code className="mt-3 block font-[family-name:var(--font-ibm-plex-mono)] text-sm text-[var(--ink)]">
            GET /api/users/42
          </code>
          <div className="mt-8 border-t border-[var(--line)]">
            {routes.map((route, index) => {
              const isWinner = route === "/api/users";
              return (
                <motion.div
                  key={route}
                  initial={false}
                  animate={matched && isWinner && !reduceMotion ? { x: [0, 4, 0] } : { x: 0 }}
                  transition={{ duration: 0.32, ease: "easeOut" }}
                  className={`flex items-center justify-between border-b border-[var(--line)] px-4 py-4 font-[family-name:var(--font-ibm-plex-mono)] text-sm transition-colors ${matched && isWinner ? "bg-[var(--paper)] font-semibold text-[var(--signal)] dark:bg-[var(--ink)] dark:text-[var(--paper)]" : "text-[var(--ink-soft)]"}`}
                >
                  <span>{route}</span>
                  <span
                    className={`text-[11px] ${matched && isWinner ? "text-[var(--signal)] dark:text-[var(--paper)]" : ""}`}
                  >
                    {matched
                      ? isWinner
                        ? "longest match"
                        : route === "/api/users/admin"
                          ? "no match"
                          : "prefix match"
                      : String(index + 1).padStart(2, "0")}
                  </span>
                </motion.div>
              );
            })}
          </div>
          <p className="mt-5 text-sm leading-6 text-[var(--ink-soft)]">
            Longest-prefix routing keeps related request paths close together while retaining a
            deterministic selection rule.
          </p>
        </div>
      </div>
    </section>
  );
}
