import Link from "next/link";

const links = [
  { href: "#capabilities", label: "Capabilities" },
  { href: "#architecture", label: "Architecture" },
  { href: "#benchmarks", label: "Benchmarks" },
  { href: "#documentation", label: "Documentation" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--terminal-line)] bg-[var(--terminal)] text-[var(--terminal-text)]">
      <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="grid gap-12 border-b border-[var(--terminal-line)] pb-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-[family-name:var(--font-ibm-plex-mono)] text-base font-semibold tracking-[0.14em]">
              TORUS
            </p>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[var(--terminal-muted)]">
              A high-performance Layer 7 reverse proxy and edge API gateway, written in Go.
            </p>
          </div>
          <div>
            <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.14em] text-[var(--terminal-muted)]">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {links.map((link) => (
                <li key={link.href}>
                  <a className="transition-colors hover:text-white" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.14em] text-[var(--terminal-muted)]">
              Project
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  className="transition-colors hover:text-white"
                  href="https://github.com/Ashish-Barmaiya/torus-proxy"
                >
                  GitHub
                </a>
              </li>
              <li>
                <Link className="transition-colors hover:text-white" href="/LICENSE">
                  MIT License
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-5 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] text-[var(--terminal-muted)] sm:flex sm:items-center sm:justify-between">
          <p>© 2026 Torus Project</p>
          <p className="mt-2 sm:mt-0">Built for the unglamorous path between request and response.</p>
        </div>
      </div>
    </footer>
  );
}
