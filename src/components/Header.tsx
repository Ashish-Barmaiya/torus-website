"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { MobileNavigation } from "./MobileNavigation";
import ThemeToggle from "./ThemeToggle";

const navigation = [
  { href: "/architecture", label: "Architecture" },
  { href: "/benchmarks", label: "Benchmarks" },
  { href: "/blog", label: "Blog" },
  { href: "/docs", label: "Documentation" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-[var(--line)] bg-[var(--paper)]">
      <div className="mx-auto flex h-[4.5rem] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="font-[family-name:var(--font-ibm-plex-mono)] text-[16px] font-semibold tracking-[0.13em] text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--signal)]"
        >
          TORUS
        </Link>

        <nav aria-label="Primary navigation" className="hidden h-full items-center gap-8 md:flex">
          {navigation.map((item) => {
            const isActive = item.href === "/docs" ? pathname.startsWith("/docs") : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`inline-flex h-full items-center border-b-2 text-[15px] font-medium tracking-[0.01em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--signal)] ${isActive ? "border-[var(--signal)] text-[var(--ink)]" : "border-transparent text-[var(--ink-soft)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <MobileNavigation items={navigation} />
          <ThemeToggle />
          <a
            href="https://github.com/Ashish-Barmaiya/torus-proxy"
            className="hidden items-center gap-2 border border-[var(--ink)] px-3 py-1.5 font-[family-name:var(--font-ibm-plex-mono)] text-[13px] font-medium text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--signal)] min-[360px]:inline-flex"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-3.5 fill-current">
              <path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.14.68-3.8-1.33-3.8-1.33-.5-1.3-1.24-1.64-1.24-1.64-1.02-.7.08-.7.08-.7 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.94.1-.73.39-1.22.7-1.5-2.51-.28-5.15-1.26-5.15-5.59 0-1.24.44-2.25 1.16-3.04-.12-.29-.5-1.44.11-3 0 0 .95-.3 3.1 1.16a10.7 10.7 0 0 1 5.64 0c2.15-1.46 3.1-1.16 3.1-1.16.61 1.56.23 2.71.11 3 .72.79 1.16 1.8 1.16 3.04 0 4.34-2.65 5.3-5.17 5.58.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z" />
            </svg>
            Source
          </a>
        </div>
      </div>
    </header>
  );
}
