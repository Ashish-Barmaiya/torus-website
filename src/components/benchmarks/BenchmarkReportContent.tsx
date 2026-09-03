import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import type { BenchmarkReport } from "@/lib/benchmarks/reports";

type MdxDocument = (props: Record<string, unknown>) => ReactNode;

function ReportMdxH1({
  children,
  className,
  hiddenTitle,
  ...props
}: ComponentProps<"h1"> & { hiddenTitle: string }) {
  if (children === hiddenTitle) {
    return null;
  }

  return (
    <h2
      {...props}
      className={`scroll-mt-10 border-t border-[var(--line)] pt-10 text-[var(--text-h2)] font-semibold tracking-[-0.03em] text-[var(--ink)] ${className ?? ""}`}
    >
      {children}
    </h2>
  );
}

export function BenchmarkReportContent({
  report,
  Content,
}: {
  report: BenchmarkReport;
  Content: MdxDocument;
}) {
  return (
    <div className="px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
      <article className="mx-auto max-w-[840px]">
        <nav
          aria-label="Breadcrumb"
          className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] tracking-[0.1em] text-[var(--ink-faint)] uppercase"
        >
          <Link
            href="/benchmarks"
            className="transition-colors hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--signal)]"
          >
            Benchmarks
          </Link>
          <span aria-hidden="true" className="mx-2">
            /
          </span>
          <span>{report.category}</span>
        </nav>

        <header className="border-b border-[var(--line)] pb-8 sm:pb-10">
          <p className="mt-5 font-[family-name:var(--font-ibm-plex-mono)] text-[12px] tracking-[0.14em] text-[var(--signal-dark)] uppercase dark:text-[var(--signal)]">
            Benchmark report
          </p>
          <h1 className="docs-article-title mt-4 font-semibold tracking-[-0.055em] text-(--ink)">
            {report.title}
          </h1>
          <p className="mt-5 max-w-2xl text-[var(--text-body)] leading-[1.65] text-[var(--ink-soft)]">
            {report.description}
          </p>
          <dl className="mt-7 flex flex-wrap gap-x-5 gap-y-2 border-y border-[var(--line)] py-4 font-[family-name:var(--font-ibm-plex-mono)] text-[12px] tracking-[0.06em] text-[var(--ink-faint)] uppercase">
            <div>
              <dt className="sr-only">{report.dateContext}</dt>
              <dd>
                {report.dateContext}: {report.dateLabel}
              </dd>
            </div>
            <div>
              <dt className="sr-only">Scope</dt>
              <dd>{report.category}</dd>
            </div>
          </dl>
        </header>

        <div className="docs-prose [&_a]:text-[var(--signal-dark)] [&_a]:underline [&_a]:decoration-[var(--line-strong)] dark:[&_a]:text-[var(--signal)] [&_blockquote]:my-9 [&_blockquote]:border-l-2 [&_blockquote]:border-[var(--line-strong)] [&_blockquote]:pl-5 [&_blockquote]:text-[var(--ink)] [&_code]:font-[family-name:var(--font-ibm-plex-mono)] [&_h1]:hidden [&_h2]:scroll-mt-10 [&_h2]:border-t [&_h2]:border-[var(--line)] [&_h2]:pt-12 [&_h2]:text-[30px] [&_h2]:font-semibold [&_h2]:tracking-[-0.03em] [&_h2]:text-[var(--ink)] [&_h3]:mt-9 [&_h3]:text-[var(--text-h3)] [&_h3]:font-semibold [&_h3]:text-[var(--ink)] [&_hr]:my-12 [&_hr]:border-0 [&_hr]:border-t [&_hr]:border-[var(--line)] [&_img]:mt-9 [&_img]:h-auto [&_img]:max-w-full [&_li]:text-[var(--text-body)] [&_li]:leading-[1.7] [&_li]:text-[var(--ink)] [&_ol]:mt-6 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_p]:mt-6 [&_p]:max-w-[740px] [&_p]:text-[var(--text-body)] [&_p]:leading-[1.7] [&_p]:text-[var(--ink)] [&_pre]:my-9 [&_pre]:overflow-x-auto [&_pre]:border [&_pre]:border-[var(--terminal-line)] [&_pre]:bg-[var(--terminal)] [&_pre]:p-5 [&_pre]:font-[family-name:var(--font-ibm-plex-mono)] [&_pre]:text-[var(--text-small)] [&_pre]:leading-7 [&_pre]:text-[var(--terminal-text)] [&_table]:my-9 [&_table]:block [&_table]:w-full [&_table]:min-w-max [&_table]:border-collapse [&_table]:overflow-x-auto [&_table]:border-[var(--line)] [&_table]:text-left [&_table]:text-[var(--text-body-compact)] [&_table_tbody]:divide-y [&_table_tbody]:divide-[var(--line)] [&_table_td]:border-r [&_table_td]:px-4 [&_table_td]:py-3.5 [&_table_td]:text-[var(--ink)] [&_table_th]:border-b [&_table_th]:border-[var(--line)] [&_table_th]:bg-[var(--paper-deep)] [&_table_th]:px-4 [&_table_th]:py-3.5 [&_table_th]:font-semibold [&_ul]:mt-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
          <Content
            components={{
              h1: (props: ComponentProps<"h1">) => (
                <ReportMdxH1 {...props} hiddenTitle={report.title} />
              ),
            }}
          />
        </div>

        <aside className="mt-12 border border-[var(--line)] bg-[var(--paper-deep)] p-5 sm:p-6">
          <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] tracking-[0.12em] text-[var(--ink-faint)] uppercase">
            Benchmarking documentation
          </p>
          <p className="mt-5 max-w-2xl text-[19px] leading-[1.7] text-[var(--ink)]">
            For the test methodology and local reproduction guidance, see the Benchmarking section
            in the documentation.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <Link
              href="/docs/benchmarking/methodology"
              className="text-[var(--signal-dark)] underline decoration-[var(--line)] transition-colors hover:text-[var(--ink)] dark:text-[var(--signal)]"
            >
              Methodology
            </Link>
            <Link
              href="/docs/benchmarking/reproducing-benchmarks"
              className="text-[var(--signal-dark)] underline decoration-[var(--line)] transition-colors hover:text-[var(--ink)] dark:text-[var(--signal)]"
            >
              Reproduce benchmarks
            </Link>
          </div>
        </aside>
      </article>
    </div>
  );
}
