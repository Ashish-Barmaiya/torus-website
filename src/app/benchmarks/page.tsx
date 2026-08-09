import type { Metadata } from "next";

import { BenchmarkGrid } from "@/components/benchmarks/BenchmarkGrid";
import { benchmarkReports } from "@/lib/benchmarks/reports";

export const metadata: Metadata = {
  title: "Benchmarks | Torus",
  description: "Published performance reports for Torus Proxy.",
};

export default function BenchmarksPage() {
  return (
    <section className="border-b border-[var(--line)]">
      <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <header className="max-w-3xl border-b border-[var(--line)] pb-9 sm:pb-10">
          <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] tracking-[0.14em] text-[var(--signal-dark)] uppercase dark:text-[var(--signal)]">
            Performance archive
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.055em] text-[var(--ink)] sm:text-5xl">
            Benchmarks
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-7 text-[var(--ink-soft)]">
            Measured performance results from Torus Proxy, covering throughput, latency, runtime
            overhead, TLS, and major implementation changes.
          </p>
        </header>

        <BenchmarkGrid reports={benchmarkReports} />
      </div>
    </section>
  );
}
