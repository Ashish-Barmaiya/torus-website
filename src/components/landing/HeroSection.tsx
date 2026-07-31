import Link from "next/link";

import { PageContainer } from "@/layouts/PageLayout";

export function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative border-b border-[var(--line)]"
    >
      <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:56px_56px] opacity-[0.11]" />

      <PageContainer width="wide" py="large">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1.1fr)_420px] lg:items-end">
          {/* Left */}

          <div>
            <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] tracking-[0.18em] text-[var(--ink-faint)] uppercase">
              Layer 7 Reverse Proxy · Edge API Gateway
            </p>

            <h1
              id="hero-title"
              className="mt-8 max-w-4xl text-[clamp(4rem,8vw,7rem)] leading-[0.9] font-semibold tracking-[-0.07em] text-[var(--ink)]"
            >
              Keep every
              <br />
              request
              <br />
              understandable.
            </h1>

            <p className="mt-10 max-w-2xl text-[1.1rem] leading-8 text-[var(--ink-soft)]">
              Torus is a high-performance Layer 7 reverse proxy and edge API gateway written in Go.
              It is built around explicit routing, predictable behavior, and observable request
              execution.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-5">
              <Link
                href="/docs"
                className="inline-flex items-center rounded-sm bg-[var(--ink)] px-6 py-3 text-sm font-medium text-[var(--paper)] transition-colors hover:bg-[#2b3438]"
              >
                Read Documentation
              </Link>

              <Link
                href="/benchmarks"
                className="text-sm font-medium text-[var(--ink)] underline decoration-[var(--line-strong)] underline-offset-4 transition hover:decoration-[var(--ink)]"
              >
                Performance Benchmarks →
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-8 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] tracking-[0.12em] text-[var(--ink-faint)] uppercase">
              <span>Go</span>

              <span>MIT</span>

              <span>Open Source</span>
            </div>
          </div>

          {/* Right */}

          <aside className="trace-panel rounded-sm border border-[var(--terminal-line)] bg-[var(--terminal)]">
            <div className="flex items-center justify-between border-b border-[var(--terminal-line)] px-6 py-4 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] tracking-[0.12em] text-[var(--terminal-muted)] uppercase">
              <span>Request Trace</span>

              <span className="flex items-center gap-2">
                <span className="trace-live h-2 w-2 rounded-full bg-[var(--signal)]" />
                Live
              </span>
            </div>

            <div className="space-y-6 px-6 py-8 font-[family-name:var(--font-ibm-plex-mono)] text-sm">
              <Trace step="01" label="Ingress" value="GET /v1/users" />

              <Trace step="02" label="Route" value="public-api" />

              <Trace step="03" label="Upstream" value="api-eu-01" />

              <Trace step="04" label="Latency" value="2.4 ms" />
            </div>

            <div className="border-t border-[var(--terminal-line)] px-6 py-4 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] tracking-[0.12em] text-[var(--terminal-muted)] uppercase">
              trace_id · 7f4ce19b
            </div>
          </aside>
        </div>
      </PageContainer>
    </section>
  );
}

function Trace({ step, label, value }: { step: string; label: string; value: string }) {
  return (
    <div className="grid grid-cols-[44px_88px_1fr] items-center gap-4">
      <span className="text-[var(--terminal-muted)]">{step}</span>

      <span className="text-[var(--terminal-muted)]">{label}</span>

      <span className="text-[var(--terminal-text)]">{value}</span>
    </div>
  );
}
