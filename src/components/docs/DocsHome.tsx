import Link from "next/link";

import { docsNavigation, hrefForCategory } from "@/lib/docs/navigation";

export function DocsHome() {
  return (
    <article className="min-w-0 px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-[1000px]">
        <header className="border-b border-[var(--line)] pb-12 sm:pb-16">
          <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] font-medium tracking-[0.14em] text-[var(--signal-dark)] uppercase dark:text-[var(--signal)]">
            Torus documentation
          </p>
          <h1 className="docs-article-title mt-5 max-w-2xl font-semibold tracking-[-0.045em] text-(--ink) lg:leading-[1.03]">
            Documentation
          </h1>
          <p className="mt-6 max-w-xl text-[var(--text-body)] leading-[1.7] text-[var(--ink-soft)]">
            Everything required to install, configure, operate, and understand Torus.
          </p>
          <p className="max-w-xl text-sm leading-8 text-[var(--ink-soft)]">Version v0.2.0</p>
        </header>

        <section aria-labelledby="documentation-categories" className="pt-12 sm:pt-16">
          <div className="mb-7 flex items-end justify-between gap-6">
            <div>
              <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] tracking-[0.14em] text-[var(--ink-faint)] uppercase">
                Browse by discipline
              </p>
              <h2
                id="documentation-categories"
                className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[var(--ink)]"
              >
                The complete field guide
              </h2>
            </div>
            <p className="hidden text-right font-[family-name:var(--font-ibm-plex-mono)] text-[11px] text-[var(--ink-faint)] sm:block">
              {docsNavigation.reduce((sum, group) => sum + group.items.length, 0)} articles
            </p>
          </div>

          <div className="grid border-t border-l border-[var(--line)] sm:grid-cols-2 xl:grid-cols-3">
            {docsNavigation.map((group) => {
              const description =
                group.items[0]?.summary ?? "Documentation under active development.";
              const readingTime = group.items.reduce(
                (sum, item) => sum + Number.parseInt(item.readingTime, 10),
                0,
              );

              return (
                <Link
                  key={group.title}
                  href={hrefForCategory(group)}
                  className="group min-h-52 border-r border-b border-[var(--line)] px-6 py-6 transition-colors hover:bg-[var(--paper-deep)] focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--signal)]"
                >
                  <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] tracking-[0.12em] text-[var(--ink-faint)] uppercase">
                    {String(group.items.length).padStart(2, "0")} articles
                  </span>
                  <h3 className="mt-6 text-xl font-semibold tracking-[-0.025em] text-[var(--ink)] transition-colors group-hover:text-[var(--signal-dark)] dark:group-hover:text-[var(--signal)]">
                    {group.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--ink-soft)]">
                    {description}
                  </p>
                  <p className="mt-6 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] text-[var(--ink-faint)]">
                    ≈ {readingTime} min reading
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </article>
  );
}
