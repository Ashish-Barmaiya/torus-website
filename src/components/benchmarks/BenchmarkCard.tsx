import Link from "next/link";

import type { BenchmarkReport } from "@/lib/benchmarks/reports";

export function BenchmarkCard({ report }: { report: BenchmarkReport }) {
  return (
    <article className="group h-[31rem]">
      <Link
        href={`/benchmarks/${report.slug}`}
        aria-label={`Read ${report.title}`}
        className="grid h-full grid-rows-[10.5rem_minmax(0,1fr)] overflow-hidden border border-[var(--line)] bg-[var(--surface)] transition-colors hover:border-[var(--line-strong)] hover:bg-[var(--paper-deep)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--signal)]"
      >
        <div className="grid grid-cols-2 divide-x divide-[var(--terminal-line)] border-b border-[var(--line)] bg-[var(--terminal)] text-[var(--terminal-text)]">
          {report.metrics.map((metric) => (
            <div key={metric.label} className="flex min-w-0 flex-col justify-between p-5 sm:p-6">
              <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] tracking-[0.1em] text-[var(--terminal-muted)] uppercase">
                {metric.label}
              </span>
              <span className="mt-4 font-[family-name:var(--font-ibm-plex-mono)] text-xl font-medium tracking-[-0.06em] sm:text-2xl">
                {metric.value}
              </span>
              <span className="mt-1 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] tracking-[0.08em] text-[var(--terminal-muted)] uppercase">
                {metric.detail}
              </span>
            </div>
          ))}
        </div>

        <div className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)_auto] p-5 sm:p-6">
          <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] tracking-[0.12em] text-[var(--signal-dark)] uppercase dark:text-[var(--signal)]">
            {report.category}
          </p>

          <div className="pt-5">
            <h2 className="h-16 overflow-hidden text-xl leading-7 font-semibold tracking-[-0.035em] text-[var(--ink)] sm:text-2xl sm:leading-8">
              <span className="line-clamp-2">{report.title}</span>
            </h2>
            <p className="mt-3 h-[4.5rem] overflow-hidden text-[var(--text-body-compact)] leading-6 text-[var(--ink-soft)]">
              <span className="line-clamp-3">{report.description}</span>
            </p>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-[var(--line)] pt-4 font-[family-name:var(--font-ibm-plex-mono)] text-xs leading-5 text-[var(--ink-faint)]">
            <span>
              {report.dateContext} · {report.dateLabel}
            </span>
            <span
              aria-hidden="true"
              className="shrink-0 text-[var(--signal-dark)] dark:text-[var(--signal)]"
            >
              Read report →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
