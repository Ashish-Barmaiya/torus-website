"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

import { docsNavigation, hrefForDoc } from "@/lib/docs/navigation";

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 fill-none stroke-current stroke-[1.7]">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={`size-3 fill-none stroke-current stroke-[1.5] transition-transform ${open ? "rotate-90" : ""}`}
    >
      <path d="m6 3 5 5-5 5" />
    </svg>
  );
}

export function DocsSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [closedGroups, setClosedGroups] = useState<string[]>([]);

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return [];

    return docsNavigation
      .flatMap((group) => group.items)
      .filter((item) => `${item.title} ${item.summary} ${item.category}`.toLowerCase().includes(normalizedQuery))
      .slice(0, 6);
  }, [query]);

  const closePanel = () => setIsOpen(false);

  return (
    <>
      <div className="border-b border-[var(--line)] px-5 py-3 lg:hidden">
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="docs-navigation"
          onClick={() => setIsOpen(true)}
          className="flex w-full items-center justify-between border border-[var(--line)] bg-[var(--surface)] px-3 py-2 font-[family-name:var(--font-ibm-plex-mono)] text-xs text-[var(--ink-soft)] transition-colors hover:border-[var(--line-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--signal)]"
        >
          Browse documentation
          <Chevron open={false} />
        </button>
      </div>

      {isOpen ? (
        <button
          type="button"
          aria-label="Close documentation navigation"
          onClick={closePanel}
          className="fixed inset-0 z-40 bg-[color:var(--ink)]/20 lg:hidden"
        />
      ) : null}

      <aside
        id="docs-navigation"
        aria-label="Documentation navigation"
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(280px,calc(100vw-2rem))] flex-col border-r border-[var(--line)] bg-[var(--paper)] px-5 py-5 transition-transform duration-200 motion-reduce:transition-none lg:sticky lg:top-0 lg:z-0 lg:h-[calc(100vh-4rem)] lg:w-auto lg:translate-x-0 lg:py-8 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mb-5 flex items-center justify-between lg:hidden">
          <p className="font-[family-name:var(--font-ibm-plex-mono)] text-xs tracking-[0.1em] text-[var(--ink-faint)] uppercase">
            Documentation
          </p>
          <button
            type="button"
            onClick={closePanel}
            className="p-1 text-[var(--ink-soft)] hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--signal)]"
            aria-label="Close documentation navigation"
          >
            <span aria-hidden="true" className="text-lg leading-none">×</span>
          </button>
        </div>

        <div className="relative mb-6">
          <button
            type="button"
            onClick={() => setSearchOpen((current) => !current)}
            aria-expanded={searchOpen}
            className="flex w-full items-center gap-2 border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-left text-sm text-[var(--ink-soft)] transition-colors hover:border-[var(--line-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--signal)]"
          >
            <SearchIcon />
            <span className="flex-1">Search docs</span>
            <kbd className="hidden border border-[var(--line)] px-1 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] text-[var(--ink-faint)] sm:inline">⌘K</kbd>
          </button>

          {searchOpen ? (
            <div className="absolute inset-x-0 top-[calc(100%+0.5rem)] z-10 border border-[var(--line)] bg-[var(--surface)] p-2">
              <label className="sr-only" htmlFor="docs-search">Search documentation</label>
              <input
                id="docs-search"
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search documentation"
                className="w-full border-b border-[var(--line)] bg-transparent px-2 py-2 text-sm text-[var(--ink)] outline-none placeholder:text-[var(--ink-faint)]"
              />
              <div className="max-h-64 overflow-y-auto pt-1">
                {query && results.length === 0 ? <p className="px-2 py-3 text-xs text-[var(--ink-faint)]">No local results yet.</p> : null}
                {!query ? <p className="px-2 py-3 text-xs leading-5 text-[var(--ink-faint)]">Search indexing is prepared for a future provider.</p> : null}
                {results.map((item) => (
                  <Link
                    key={item.slug.join("/")}
                    href={hrefForDoc(item)}
                    onClick={() => { setSearchOpen(false); closePanel(); }}
                    className="block px-2 py-2 transition-colors hover:bg-[var(--paper-deep)] focus-visible:outline-2 focus-visible:outline-[var(--signal)]"
                  >
                    <span className="block text-xs font-medium text-[var(--ink)]">{item.title}</span>
                    <span className="mt-0.5 block text-[11px] text-[var(--ink-faint)]">{item.category}</span>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <nav className="min-h-0 flex-1 overflow-y-auto pr-2" aria-label="Documentation sections">
          {docsNavigation.map((group) => {
            const hasActiveItem = group.items.some((item) => hrefForDoc(item) === pathname);
            const isExpanded = hasActiveItem || !closedGroups.includes(group.title);

            return (
              <section key={group.title} className="mb-5">
                <button
                  type="button"
                  onClick={() => setClosedGroups((groups) => groups.includes(group.title) ? groups.filter((title) => title !== group.title) : [...groups, group.title])}
                  aria-expanded={isExpanded}
                  className="flex w-full items-center gap-1.5 py-1 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] font-medium tracking-[0.12em] text-[var(--ink-faint)] uppercase transition-colors hover:text-[var(--ink-soft)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--signal)]"
                >
                  <Chevron open={isExpanded} />
                  {group.title}
                </button>
                {isExpanded ? (
                  <ul className="mt-1 space-y-0.5 border-l border-[var(--line)]">
                    {group.items.map((item) => {
                      const isActive = hrefForDoc(item) === pathname;
                      return (
                        <li key={item.slug.join("/")}>
                          <Link
                            href={hrefForDoc(item)}
                            onClick={closePanel}
                            aria-current={isActive ? "page" : undefined}
                            className={`block border-l -ml-px px-3 py-1.5 text-[13px] leading-5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--signal)] ${isActive ? "border-[var(--signal)] text-[var(--signal-dark)] dark:text-[var(--signal)]" : "border-transparent text-[var(--ink-soft)] hover:text-[var(--ink)]"}`}
                          >
                            {item.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </section>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
