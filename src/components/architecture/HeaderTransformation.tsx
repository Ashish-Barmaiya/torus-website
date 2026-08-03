"use client";

import { motion, useReducedMotion } from "motion/react";

import { SectionEyebrow } from "@/components/landing/SectionEyebrow";

const incomingHeaders = [
  "Host: api.torus.local",
  "User-Agent: torus-client",
  "Accept: application/json",
];
const forwardedHeaders = [
  "X-Forwarded-For: 203.0.113.12",
  "X-Forwarded-Host: api.torus.local",
  "X-Forwarded-Proto: https",
];

export function HeaderTransformation() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
      <div className="max-w-2xl">
        <SectionEyebrow>Header transformation</SectionEyebrow>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
          The upstream sees the request context.
        </h2>
        <p className="mt-5 leading-7 text-[var(--ink-soft)]">
          Torus forwards the incoming request while adding the address and protocol context the
          upstream needs to understand the original connection.
        </p>
      </div>
      <div className="mt-14 grid gap-4 lg:grid-cols-2">
        <HeaderPanel title="Incoming Request" headers={incomingHeaders} />
        <HeaderPanel
          title="Outgoing Request"
          headers={[...incomingHeaders, ...forwardedHeaders]}
          addedHeaders={forwardedHeaders}
          reduceMotion={reduceMotion}
        />
      </div>
    </section>
  );
}

function HeaderPanel({
  title,
  headers,
  addedHeaders = [],
  reduceMotion = false,
}: {
  title: string;
  headers: string[];
  addedHeaders?: string[];
  reduceMotion?: boolean | null;
}) {
  return (
    <div className="border border-[var(--line-strong)] bg-[var(--surface)] p-5 sm:p-7">
      <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] tracking-[0.11em] text-[var(--ink-faint)] uppercase">
        {title}
      </p>
      <ul className="mt-6 border-t border-[var(--line)]">
        {headers.map((header, index) => {
          const isAdded = addedHeaders.includes(header);
          return (
            <motion.li
              key={header}
              initial={isAdded && !reduceMotion ? { opacity: 0, x: -6 } : false}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.2, delay: isAdded ? index * 0.08 : 0 }}
              className={`break-words border-b border-[var(--line)] px-3 py-3 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] leading-5 sm:text-xs ${isAdded ? "text-[var(--ink)]" : "text-[var(--ink-soft)]"}`}
            >
              {isAdded && <span className="mr-2 text-[var(--signal)]">+</span>}
              {header}
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
