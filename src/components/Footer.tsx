import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border-subtle bg-surface-primary transition-colors py-space-7 md:py-space-8 mt-auto">
      <div className="mx-auto max-w-content-full px-space-4 sm:px-space-5 md:px-space-6">
        <div className="grid grid-cols-2 gap-space-6 sm:grid-cols-4 lg:grid-cols-5">
          {/* Column 1: Brand Info */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-1 flex flex-col justify-between">
            <div>
              <span className="font-mono text-base font-bold text-text-primary tracking-tight">TORUS</span>
              <p className="mt-space-3 text-xs text-text-muted max-w-xs">
                A Layer 7 reverse proxy and API gateway written in Go. Engineered for precision, reliability, and performance.
              </p>
            </div>
            <p className="mt-space-6 text-xs text-text-muted">
              &copy; {currentYear} Torus Project. All rights reserved.
            </p>
          </div>

          {/* Column 2: Project */}
          <div>
            <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider">Project</h4>
            <ul className="mt-space-4 space-y-space-2">
              <li>
                <Link href="/" className="text-xs text-text-secondary hover:text-text-primary transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/architecture" className="text-xs text-text-secondary hover:text-text-primary transition-colors">
                  Architecture
                </Link>
              </li>
              <li>
                <Link href="/benchmarks" className="text-xs text-text-secondary hover:text-text-primary transition-colors">
                  Benchmarks
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Documentation */}
          <div>
            <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider">Documentation</h4>
            <ul className="mt-space-4 space-y-space-2">
              <li>
                <Link href="/docs" className="text-xs text-text-secondary hover:text-text-primary transition-colors">
                  Getting Started
                </Link>
              </li>
              <li>
                <Link href="/docs/concepts" className="text-xs text-text-secondary hover:text-text-primary transition-colors">
                  Core Concepts
                </Link>
              </li>
              <li>
                <Link href="/docs/config" className="text-xs text-text-secondary hover:text-text-primary transition-colors">
                  Configuration
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Engineering */}
          <div>
            <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider">Engineering</h4>
            <ul className="mt-space-4 space-y-space-2">
              <li>
                <Link href="/reports" className="text-xs text-text-secondary hover:text-text-primary transition-colors">
                  Engineering Reports
                </Link>
              </li>
              <li>
                <Link href="/releases" className="text-xs text-text-secondary hover:text-text-primary transition-colors">
                  Release History
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/torus-proxy/torus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-text-secondary hover:text-text-primary transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Legal */}
          <div>
            <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider">Legal</h4>
            <ul className="mt-space-4 space-y-space-2">
              <li>
                <a href="/LICENSE" className="text-xs text-text-secondary hover:text-text-primary transition-colors">
                  License (MIT)
                </a>
              </li>
              <li>
                <Link href="/privacy" className="text-xs text-text-secondary hover:text-text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
