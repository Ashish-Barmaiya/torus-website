import type { ReactNode } from "react";
import Link from "next/link";

import { type HeadingItem } from "@/lib/docs/headings";
import { hrefForDoc, type DocEntry } from "@/lib/docs/navigation";

import { DocsTableOfContents } from "./DocsTableOfContents";

function formatDate(dateString?: string): string | null {
  if (!dateString || dateString === "Placeholder") return null;

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  } catch {
    return null;
  }
}

interface DocArticleContentProps {
  doc: DocEntry;
  Content: (props: Record<string, unknown>) => ReactNode;
  headings: HeadingItem[];
  packagePath: string | null;
  files: string[] | null;
  relatedDocs?: DocEntry[];
  updated: string;
  previous?: DocEntry;
  next?: DocEntry;
}

export function DocArticleContent({
  doc,
  Content,
  headings,
  packagePath,
  files,
  relatedDocs,
  updated,
  previous,
  next,
}: DocArticleContentProps) {
  const hasHeadings = headings.length > 0;

  return (
    <div className="min-w-0 px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
      <div className="mx-auto grid max-w-[1040px] gap-12 xl:grid-cols-[minmax(0,760px)_180px] xl:gap-16">
        <article className="min-w-0">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-x-2 gap-y-1 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] tracking-[0.1em] text-[var(--ink-faint)] uppercase"
          >
            <Link
              href="/docs"
              className="transition-colors hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--signal)]"
            >
              Documentation
            </Link>
            <span aria-hidden="true">/</span>
            <span>{doc.category}</span>
          </nav>

          <header className="pb-11 sm:pb-14">
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.045em] text-[var(--ink)] sm:text-5xl sm:leading-[1.05]">
              {doc.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--ink-soft)]">{doc.summary}</p>
            <dl className="mt-7 flex flex-wrap gap-x-5 gap-y-2 border-y border-[var(--line)] py-3 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] tracking-[0.06em] text-[var(--ink-faint)] uppercase">
              <div>
                <dt className="sr-only">Reading time</dt>
                <dd>{doc.readingTime} read</dd>
              </div>
              {formatDate(updated) && (
                <div>
                  <dt className="sr-only">Last updated</dt>
                  <dd>Last updated {formatDate(updated)}</dd>
                </div>
              )}
            </dl>
          </header>

          <div className="docs-prose [&_table_th]:font--medium [&_a]:text-[var(--signal-dark)] [&_a]:underline [&_a]:decoration-[var(--line)] dark:[&_a]:text-[var(--signal)] [&_blockquote]:my-7 [&_blockquote]:border-l-2 [&_blockquote]:border-[var(--line)] [&_blockquote]:pl-4 [&_blockquote]:text-[var(--ink-soft)] [&_code]:font-[family-name:var(--font-ibm-plex-mono)] [&_h1]:hidden [&_h2]:scroll-mt-10 [&_h2]:border-t [&_h2]:border-[var(--line)] [&_h2]:pt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-[-0.03em] [&_h2]:text-[var(--ink)] [&_h3]:mt-7 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-[var(--ink)] [&_li]:text-[15px] [&_li]:leading-7 [&_li]:text-[var(--ink-soft)] [&_p]:mt-4 [&_p]:max-w-[680px] [&_p]:text-[15px] [&_p]:leading-7 [&_p]:text-[var(--ink-soft)] [&_pre]:my-7 [&_pre]:overflow-x-auto [&_pre]:border [&_pre]:border-[var(--terminal-line)] [&_pre]:bg-[var(--terminal)] [&_pre]:p-4 [&_pre]:font-[family-name:var(--font-ibm-plex-mono)] [&_pre]:text-[13px] [&_pre]:leading-6 [&_pre]:text-[var(--terminal-text)] [&_table]:my-7 [&_table]:w-full [&_table]:border-collapse [&_table]:border [&_table]:border-[var(--line)] [&_table]:text-left [&_table]:text-sm [&_table_tbody]:divide-y [&_table_tbody]:divide-[var(--line)] [&_table_td]:border-r [&_table_td]:px-3 [&_table_td]:py-2.5 [&_table_td]:text-[var(--ink-soft)] [&_table_th]:border-b [&_table_th]:border-[var(--line)] [&_table_th]:bg-[var(--paper-deep)] [&_table_th]:px-3 [&_table_th]:py-2.5 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
            <Content />
          </div>

          {packagePath && (
            <section
              id="source-files"
              className="scroll-mt-10 border-t border-[var(--line)] py-10 sm:py-12"
            >
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--ink)]">
                Source files
              </h2>
              <p className="mt-4 max-w-[680px] text-[15px] leading-7 text-[var(--ink-soft)]">
                Implementation references will be pinned to release revisions. The current ownership
                boundary is{" "}
                <code className="border border-[var(--line)] bg-[var(--paper-deep)] px-1.5 py-0.5 font-[family-name:var(--font-ibm-plex-mono)] text-[12px] break-all text-[var(--ink)]">
                  {packagePath}
                </code>
                .
              </p>
              {files && files.length > 0 && (
                <div className="mt-4">
                  <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] tracking-[0.12em] text-[var(--ink-faint)] uppercase">
                    Key files
                  </p>
                  <ul className="mt-2 space-y-1">
                    {files.map((file) => (
                      <li
                        key={file}
                        className="font-[family-name:var(--font-ibm-plex-mono)] text-xs text-[var(--ink-soft)]"
                      >
                        {file}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {relatedDocs && relatedDocs.length > 0 && (
            <section
              id="related-documentation"
              className="scroll-mt-10 border-t border-[var(--line)] py-10 sm:py-12"
            >
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--ink)]">
                Related documentation
              </h2>
              <div className="mt-5 grid border-t border-l border-[var(--line)] sm:grid-cols-2">
                {relatedDocs.map((item) => (
                  <Link
                    key={item.slug.join("/")}
                    href={hrefForDoc(item)}
                    className="border-r border-b border-[var(--line)] px-4 py-4 text-sm text-[var(--ink-soft)] transition-colors hover:bg-[var(--paper-deep)] hover:text-[var(--ink)] focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--signal)]"
                  >
                    {item.title}
                    <span
                      aria-hidden="true"
                      className="ml-2 text-[var(--signal-dark)] dark:text-[var(--signal)]"
                    >
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <nav
            aria-label="Documentation pagination"
            className="grid border-t border-l border-[var(--line)] sm:grid-cols-2"
          >
            {previous ? (
              <Link
                href={hrefForDoc(previous)}
                className="group border-r border-b border-[var(--line)] px-5 py-5 transition-colors hover:bg-[var(--paper-deep)] focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--signal)]"
              >
                <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] tracking-[0.1em] text-[var(--ink-faint)] uppercase">
                  ← Previous
                </span>
                <span className="mt-2 block text-sm font-medium text-[var(--ink)] group-hover:text-[var(--signal-dark)] dark:group-hover:text-[var(--signal)]">
                  {previous.title}
                </span>
              </Link>
            ) : (
              <div className="border-r border-b border-[var(--line)]" />
            )}
            {next ? (
              <Link
                href={hrefForDoc(next)}
                className="group border-r border-b border-[var(--line)] px-5 py-5 transition-colors hover:bg-[var(--paper-deep)] focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--signal)] sm:text-right"
              >
                <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] tracking-[0.1em] text-[var(--ink-faint)] uppercase">
                  Next →
                </span>
                <span className="mt-2 block text-sm font-medium text-[var(--ink)] group-hover:text-[var(--signal-dark)] dark:group-hover:text-[var(--signal)]">
                  {next.title}
                </span>
              </Link>
            ) : (
              <div className="border-r border-b border-[var(--line)]" />
            )}
          </nav>
        </article>

        {hasHeadings && <DocsTableOfContents items={headings} />}
      </div>
    </div>
  );
}
