import Link from "next/link";

import { getDocContent } from "@/lib/docs/content";
import { getAdjacentDocs, hrefForDoc, type DocEntry } from "@/lib/docs/navigation";

import { DocsTableOfContents, type TableOfContentsItem } from "./DocsTableOfContents";

const tableOfContents: TableOfContentsItem[] = [
  { id: "why-this-exists", title: "Why this exists" },
  { id: "example", title: "Example" },
  { id: "configuration", title: "Configuration" },
  { id: "implementation-notes", title: "Implementation notes" },
  { id: "related-documentation", title: "Related documentation" },
];

export async function DocArticle({ doc }: { doc: DocEntry }) {
  const { previous, next } = getAdjacentDocs(doc);
  const Content = await getDocContent(doc.slug);
  const sourcePath = doc.packagePath ?? "docs";

  return (
    <div className="min-w-0 px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
      <div className="mx-auto grid max-w-[1040px] gap-12 xl:grid-cols-[minmax(0,760px)_180px] xl:gap-16">
        <article className="min-w-0">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-2 gap-y-1 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] tracking-[0.1em] text-[var(--ink-faint)] uppercase">
            <Link href="/docs" className="transition-colors hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--signal)]">Documentation</Link>
            <span aria-hidden="true">/</span>
            <span>{doc.category}</span>
          </nav>

          <header className="pb-11 sm:pb-14">
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.045em] text-[var(--ink)] sm:text-5xl sm:leading-[1.05]">{doc.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--ink-soft)]">{doc.summary}</p>
            <dl className="mt-7 flex flex-wrap gap-x-5 gap-y-2 border-y border-[var(--line)] py-3 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] tracking-[0.06em] text-[var(--ink-faint)] uppercase">
              <div><dt className="sr-only">Reading time</dt><dd>{doc.readingTime} read</dd></div>
              <div><dt className="sr-only">Last updated</dt><dd>Updated {doc.updated}</dd></div>
              <div><dt className="sr-only">Version</dt><dd>v0.x</dd></div>
            </dl>
          </header>

          <div className="docs-prose [&_h1]:hidden [&_h2]:scroll-mt-10 [&_h2]:border-t [&_h2]:border-[var(--line)] [&_h2]:pt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-[-0.03em] [&_h2]:text-[var(--ink)] [&_h3]:mt-7 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-[var(--ink)] [&_p]:mt-4 [&_p]:max-w-[680px] [&_p]:text-[15px] [&_p]:leading-7 [&_p]:text-[var(--ink-soft)] [&_pre]:my-7 [&_pre]:overflow-x-auto [&_pre]:border [&_pre]:border-[var(--terminal-line)] [&_pre]:bg-[var(--terminal)] [&_pre]:p-4 [&_pre]:font-[family-name:var(--font-ibm-plex-mono)] [&_pre]:text-[13px] [&_pre]:leading-6 [&_pre]:text-[var(--terminal-text)] [&_code]:font-[family-name:var(--font-ibm-plex-mono)] [&_li]:text-[15px] [&_li]:leading-7 [&_li]:text-[var(--ink-soft)] [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
            <Content />
          </div>

          <section id="source-files" className="scroll-mt-10 border-t border-[var(--line)] py-10 sm:py-12">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--ink)]">Source files</h2>
            <p className="mt-4 max-w-[680px] text-[15px] leading-7 text-[var(--ink-soft)]">Implementation references will be pinned to release revisions. The current ownership boundary is <code className="break-all border border-[var(--line)] bg-[var(--paper-deep)] px-1.5 py-0.5 font-[family-name:var(--font-ibm-plex-mono)] text-[12px] text-[var(--ink)]">{sourcePath}</code>.</p>
          </section>

          <section id="related-documentation" className="scroll-mt-10 border-t border-[var(--line)] py-10 sm:py-12">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--ink)]">Related documentation</h2>
            <div className="mt-5 grid border-l border-t border-[var(--line)] sm:grid-cols-2">
              {[{ label: "Architecture", href: "/docs/architecture" }, { label: "Configuration reference", href: "/docs/reference/configuration" }].map((item) => <Link key={item.href} href={item.href} className="border-b border-r border-[var(--line)] px-4 py-4 text-sm text-[var(--ink-soft)] transition-colors hover:bg-[var(--paper-deep)] hover:text-[var(--ink)] focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--signal)]">{item.label}<span aria-hidden="true" className="ml-2 text-[var(--signal-dark)] dark:text-[var(--signal)]">→</span></Link>)}
            </div>
          </section>

          <nav aria-label="Documentation pagination" className="grid border-l border-t border-[var(--line)] sm:grid-cols-2">
            {previous ? <Link href={hrefForDoc(previous)} className="group border-b border-r border-[var(--line)] px-5 py-5 transition-colors hover:bg-[var(--paper-deep)] focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--signal)]"><span className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] tracking-[0.1em] text-[var(--ink-faint)] uppercase">← Previous</span><span className="mt-2 block text-sm font-medium text-[var(--ink)] group-hover:text-[var(--signal-dark)] dark:group-hover:text-[var(--signal)]">{previous.title}</span></Link> : <div className="border-b border-r border-[var(--line)]" />}
            {next ? <Link href={hrefForDoc(next)} className="group border-b border-r border-[var(--line)] px-5 py-5 transition-colors hover:bg-[var(--paper-deep)] focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--signal)] sm:text-right"><span className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] tracking-[0.1em] text-[var(--ink-faint)] uppercase">Next →</span><span className="mt-2 block text-sm font-medium text-[var(--ink)] group-hover:text-[var(--signal-dark)] dark:group-hover:text-[var(--signal)]">{next.title}</span></Link> : <div className="border-b border-r border-[var(--line)]" />}
          </nav>
        </article>

        <DocsTableOfContents items={tableOfContents} />
      </div>
    </div>
  );
}
