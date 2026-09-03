"use client";

import Link from "next/link";
import { useState } from "react";

type NavigationItem = { href: string; label: string };

export function MobileNavigation({ items }: { items: NavigationItem[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((open) => !open)}
        className="inline-flex size-9 items-center justify-center border border-[var(--line)] text-[var(--ink-soft)] transition-colors hover:border-[var(--line-strong)] hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--signal)]"
      >
        <span className="sr-only">{isOpen ? "Close navigation" : "Open navigation"}</span>
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 fill-none stroke-current stroke-[1.7]">
          {isOpen ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {isOpen ? (
        <div id="mobile-navigation" className="fixed inset-x-0 top-[4.75rem] z-50 border-b border-[var(--line)] bg-[var(--paper)] px-5 py-5 shadow-[0_14px_28px_rgb(0_0_0_/_0.08)]">
          <nav aria-label="Mobile navigation" className="mx-auto grid max-w-[1440px] gap-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex min-h-11 items-center border-b border-[var(--line)] px-1 text-base font-medium text-[var(--ink)] transition-colors hover:text-[var(--signal-dark)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--signal)] dark:hover:text-[var(--signal)]"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://github.com/Ashish-Barmaiya/torus-proxy"
              className="mt-3 inline-flex min-h-11 items-center self-start border border-[var(--line-strong)] px-3 font-[family-name:var(--font-ibm-plex-mono)] text-xs text-[var(--ink-soft)] transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--signal)]"
            >
              View source on GitHub
            </a>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
