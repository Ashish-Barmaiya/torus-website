"use client";

import { useEffect, useState } from "react";

export type TableOfContentsItem = { id: string; title: string };

export function DocsTableOfContents({ items }: { items: TableOfContentsItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) setActiveId(visibleEntry.target.id);
      },
      { rootMargin: "-18% 0px -70% 0px" },
    );

    const headings = items.map((item) => document.getElementById(item.id)).filter((heading): heading is HTMLElement => Boolean(heading));
    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items]);

  return (
    <aside aria-label="On this page" className="hidden xl:block">
      <div className="sticky top-8 border-l border-[var(--line)] pl-5">
        <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] font-medium tracking-[0.12em] text-[var(--ink-faint)] uppercase">On this page</p>
        <ol className="mt-3 space-y-1.5">
          {items.map((item) => <li key={item.id}><a href={`#${item.id}`} className={`block text-xs leading-5 transition-colors hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--signal)] ${activeId === item.id ? "text-[var(--signal-dark)] dark:text-[var(--signal)]" : "text-[var(--ink-faint)]"}`}>{item.title}</a></li>)}
        </ol>
      </div>
    </aside>
  );
}
