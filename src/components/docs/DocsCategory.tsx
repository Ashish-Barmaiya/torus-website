import Link from "next/link";

import { hrefForDoc, type DocGroup } from "@/lib/docs/navigation";

export function DocsCategory({ group }: { group: DocGroup }) {
  return (
    <article className="min-w-0 px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-[900px]">
        <nav aria-label="Breadcrumb" className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] tracking-[0.1em] text-[var(--ink-faint)] uppercase">
          <Link href="/docs" className="transition-colors hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--signal)]">Documentation</Link>
          <span aria-hidden="true" className="mx-2">/</span>
          <span>{group.title}</span>
        </nav>
        <header className="mt-5 border-b border-[var(--line)] pb-12">
          <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] tracking-[0.14em] text-[var(--signal-dark)] uppercase dark:text-[var(--signal)]">Documentation category</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-[var(--ink)] sm:text-5xl">{group.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--ink-soft)]">A focused index of {group.items.length} {group.items.length === 1 ? "article" : "articles"} maintained as part of the Torus engineering reference.</p>
        </header>
        <section aria-labelledby="articles" className="pt-10">
          <h2 id="articles" className="sr-only">{group.title} articles</h2>
          <div className="border-l border-t border-[var(--line)]">
            {group.items.map((doc, index) => <Link key={doc.slug.join("/")} href={hrefForDoc(doc)} className="group grid gap-3 border-b border-r border-[var(--line)] px-5 py-5 transition-colors hover:bg-[var(--paper-deep)] focus-visible:relative focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--signal)] sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:items-start"><span className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] text-[var(--ink-faint)]">{String(index + 1).padStart(2, "0")}</span><span><span className="block text-base font-semibold text-[var(--ink)] transition-colors group-hover:text-[var(--signal-dark)] dark:group-hover:text-[var(--signal)]">{doc.title}</span><span className="mt-1 block max-w-xl text-sm leading-6 text-[var(--ink-soft)]">{doc.summary}</span></span><span className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] text-[var(--ink-faint)]">{doc.readingTime}</span></Link>)}
          </div>
        </section>
      </div>
    </article>
  );
}
