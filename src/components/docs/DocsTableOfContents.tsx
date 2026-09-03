"use client";

import { useEffect, useState } from "react";
import { type HeadingItem } from "@/lib/docs/headings";

export function DocsTableOfContents({ items }: { items?: HeadingItem[] }) {
  const [activeId, setActiveId] = useState(items?.[0]?.id ?? "");

  useEffect(() => {
    if (!items || items.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) setActiveId(visibleEntry.target.id);
      },
      { rootMargin: "-18% 0px -70% 0px" },
    );

    const headingElements = items
      .map((item) => document.getElementById(item.id))
      .filter((heading): heading is HTMLElement => Boolean(heading));

    headingElements.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items]);

  if (!items || items.length === 0) {
    return null;
  }

  const groupedHeadings = items.filter((h) => h.level <= 3);

  return (
    <aside aria-label="On this page" className="hidden xl:block">
      <div className="sticky top-9 border-l border-[var(--line)] pl-5">
        <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] font-medium tracking-[0.12em] text-[var(--ink-faint)] uppercase">
          On this page
        </p>
        <ol className="mt-3.5 space-y-2">
          {groupedHeadings.map((heading) => (
            <li
              key={heading.id}
              style={{
                marginLeft: heading.level === 3 ? "0.75rem" : "0",
              }}
            >
              <a
                href={`#${heading.id}`}
                className={`block text-[13px] leading-6 transition-colors hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--signal)] ${
                  activeId === heading.id
                    ? "text-[var(--signal-dark)] dark:text-[var(--signal)]"
                    : "text-[var(--ink-faint)]"
                }`}
              >
                {heading.title}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}
