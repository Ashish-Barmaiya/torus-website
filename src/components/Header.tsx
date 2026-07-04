"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { name: "Documentation", href: "/docs" },
  { name: "Architecture", href: "/architecture" },
  { name: "Benchmarks", href: "/benchmarks" },
  { name: "Engineering Reports", href: "/reports" },
  { name: "Releases", href: "/releases" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-sticky w-full border-b border-border-subtle bg-surface-primary transition-colors">
      <div className="mx-auto max-w-content-full px-space-4 sm:px-space-5 md:px-space-6">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="font-mono text-lg font-bold tracking-tight text-text-primary hover:text-accent-primary transition-colors"
            >
              TORUS
            </Link>
          </div>

          {/* Center: Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-space-5">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-text-primary ${
                    active
                      ? "text-accent-primary border-b-2 border-accent-primary pb-[19px] pt-[21px] -mb-[1px]"
                      : "text-text-secondary"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center space-x-space-2 sm:space-x-space-3">
            {/* Search Placeholder Button */}
            <button
              className="inline-flex items-center justify-between rounded-md border border-border-default bg-canvas px-space-3 py-1.5 text-xs text-text-muted hover:border-border-strong hover:text-text-secondary transition-all w-28 sm:w-40 focus:outline-none focus:ring-2 focus:ring-accent-focus focus:ring-offset-2 focus:ring-offset-canvas"
              aria-label="Search documentation"
            >
              <span className="flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5" />
                <span>Search...</span>
              </span>
              <kbd className="hidden sm:inline-block font-mono text-[10px] bg-surface-secondary border border-border-subtle px-1 rounded">
                /
              </kbd>
            </button>

            {/* GitHub Link */}
            <a
              href="https://github.com/torus-proxy/torus"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md p-2 text-text-secondary hover:bg-background-subtle hover:text-text-primary transition-all focus:outline-none focus:ring-2 focus:ring-accent-focus focus:ring-offset-2 focus:ring-offset-canvas"
              aria-label="Torus on GitHub"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-text-secondary hover:bg-background-subtle hover:text-text-primary md:hidden transition-all focus:outline-none focus:ring-2 focus:ring-accent-focus focus:ring-offset-2 focus:ring-offset-canvas"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-overlay bg-black/40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer (Slide-over) */}
      <div
        className={`fixed top-0 bottom-0 right-0 z-modal w-full max-w-xs bg-surface-primary border-l border-border-subtle p-space-6 shadow-xl transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-space-6">
          <span className="font-mono text-lg font-bold text-text-primary">TORUS</span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="inline-flex items-center justify-center rounded-md p-2 text-text-secondary hover:bg-background-subtle hover:text-text-primary transition-all focus:outline-none focus:ring-2 focus:ring-accent-focus"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col space-y-space-4">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium py-2 px-space-3 rounded-md transition-colors ${
                  active
                    ? "bg-background-subtle text-accent-primary font-semibold"
                    : "text-text-secondary hover:bg-background-subtle hover:text-text-primary"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
