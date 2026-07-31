import Link from "next/link";

import { getAdjacentDocs, hrefForDoc, type DocEntry } from "@/lib/docs/navigation";

import { CodeBlock } from "./CodeBlock";
import { DocsTableOfContents, type TableOfContentsItem } from "./DocsTableOfContents";
import { ArchitectureDiagram, BenchmarkCard, ConfigReference, Note, RequestFlow } from "./MdxComponents";

const tableOfContents: TableOfContentsItem[] = [
  { id: "why-this-exists", title: "Why this exists" },
  { id: "example", title: "Example" },
  { id: "configuration", title: "Configuration" },
  { id: "implementation-notes", title: "Implementation notes" },
  { id: "related-documentation", title: "Related documentation" },
];

function PlaceholderParagraph({ doc, section }: { doc: DocEntry; section: string }) {
  return (
    <p>
      This section is the working location for the <span className="text-[var(--ink)]">{section.toLowerCase()}</span> guidance for {doc.title}. It is intentionally structured around operational decisions, observable behavior, and the boundaries maintained in the Torus codebase.
    </p>
  );
}

function ArticleSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="scroll-mt-10 border-t border-[var(--line)] py-10 sm:py-12">
      <h2 id={id} className="text-2xl font-semibold tracking-[-0.03em] text-[var(--ink)]">{title}</h2>
      <div className="mt-4 max-w-[680px] space-y-4 text-[15px] leading-7 text-[var(--ink-soft)]">{children}</div>
    </section>
  );
}

export function DocArticle({ doc }: { doc: DocEntry }) {
  const { previous, next } = getAdjacentDocs(doc);
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
              <div className="flex gap-2"><dt className="sr-only">Reading time</dt><dd>{doc.readingTime} read</dd></div>
              <div className="flex gap-2"><dt className="sr-only">Last updated</dt><dd>Updated {doc.updated}</dd></div>
              <div className="flex gap-2"><dt className="sr-only">Version</dt><dd>v0.x</dd></div>
            </dl>
          </header>

          <ArticleSection id="why-this-exists" title="Why this exists">
            <PlaceholderParagraph doc={doc} section="design rationale" />
            <ArchitectureDiagram>The control path stays explicit: each boundary has one job and a named source of truth.</ArchitectureDiagram>
          </ArticleSection>

          <ArticleSection id="example" title="Example">
            <PlaceholderParagraph doc={doc} section="minimal example" />
            <CodeBlock filename="torus.yaml" language="yaml" highlightedLines={[5, 6]}>{`server:
  address: ":8080"

routes:
  - prefix: /api
    service: api`}</CodeBlock>
            <RequestFlow>Placeholder request path; production guidance will describe failure modes and timing at every handoff.</RequestFlow>
          </ArticleSection>

          <ArticleSection id="configuration" title="Configuration">
            <PlaceholderParagraph doc={doc} section="configuration contract" />
            <ConfigReference fields={[
              { field: "server.address", type: "string", defaultValue: '":8080"', required: false, description: "Address accepted by the listener." },
              { field: "routes[].prefix", type: "string", defaultValue: "—", required: true, description: "Path prefix used for deterministic route matching." },
              { field: "routes[].service", type: "string", defaultValue: "—", required: true, description: "Named service selected after a successful match." },
            ]} />
            <Note title="Configuration placeholder">Field semantics, validation rules, and compatibility notes will be maintained here alongside each release.</Note>
          </ArticleSection>

          <ArticleSection id="implementation-notes" title="Implementation notes">
            <PlaceholderParagraph doc={doc} section="implementation notes" />
            <p>Source ownership is expected to remain legible from the documentation. The current implementation boundary is <code className="border border-[var(--line)] bg-[var(--paper-deep)] px-1.5 py-0.5 font-[family-name:var(--font-ibm-plex-mono)] text-[12px] text-[var(--ink)]">{sourcePath}</code>.</p>
            <BenchmarkCard id="TBD" title="Benchmark reference" summary="A linked, reproducible benchmark report will appear here when this subsystem has a published workload." />
          </ArticleSection>

          <ArticleSection id="related-documentation" title="Related documentation">
            <PlaceholderParagraph doc={doc} section="related documentation" />
            <div className="grid border-l border-t border-[var(--line)] sm:grid-cols-2">
              {[
                { label: "Architecture", href: "/docs/architecture" },
                { label: "Configuration reference", href: "/docs/reference/configuration" },
              ].map((item) => <Link key={item.href} href={item.href} className="border-b border-r border-[var(--line)] px-4 py-4 text-sm text-[var(--ink-soft)] transition-colors hover:bg-[var(--paper-deep)] hover:text-[var(--ink)] focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--signal)]">{item.label}<span aria-hidden="true" className="ml-2 text-[var(--signal-dark)] dark:text-[var(--signal)]">→</span></Link>)}
            </div>
          </ArticleSection>

          <nav aria-label="Documentation pagination" className="grid border-l border-t border-[var(--line)] sm:grid-cols-2">
            {previous ? <Link href={hrefForDoc(previous)} className="group border-b border-r border-[var(--line)] px-5 py-5 transition-colors hover:bg-[var(--paper-deep)] focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--signal)]"><span className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] tracking-[0.1em] text-[var(--ink-faint)] uppercase">← Previous</span><span className="mt-2 block text-sm font-medium text-[var(--ink)] group-hover:text-[var(--signal-dark)] dark:group-hover:text-[var(--signal)]">{previous.title}</span></Link> : <div className="border-b border-r border-[var(--line)]" />}
            {next ? <Link href={hrefForDoc(next)} className="group border-b border-r border-[var(--line)] px-5 py-5 text-right transition-colors hover:bg-[var(--paper-deep)] focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--signal)]"><span className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] tracking-[0.1em] text-[var(--ink-faint)] uppercase">Next →</span><span className="mt-2 block text-sm font-medium text-[var(--ink)] group-hover:text-[var(--signal-dark)] dark:group-hover:text-[var(--signal)]">{next.title}</span></Link> : <div className="border-b border-r border-[var(--line)]" />}
          </nav>
        </article>

        <DocsTableOfContents items={tableOfContents} />
      </div>
    </div>
  );
}
