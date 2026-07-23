import Link from "next/link";

const navigation = [
  { href: "#capabilities", label: "Capabilities" },
  { href: "#architecture", label: "Architecture" },
  { href: "#benchmarks", label: "Benchmarks" },
  { href: "#documentation", label: "Documentation" },
];

export default function Header() {
  return (
    <header className="border-b border-[var(--line)] bg-[var(--paper)]">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="font-[family-name:var(--font-ibm-plex-mono)] text-[15px] font-semibold tracking-[0.13em] text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--signal)]"
        >
          TORUS
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-7 md:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--signal)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="https://github.com/Ashish-Barmaiya/torus-proxy"
          className="inline-flex items-center gap-2 border border-[var(--ink)] px-3 py-1.5 font-[family-name:var(--font-ibm-plex-mono)] text-xs font-medium text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--signal)]"
        >
          <span aria-hidden="true">↗</span>
          Source
        </a>
      </div>
    </header>
  );
}
