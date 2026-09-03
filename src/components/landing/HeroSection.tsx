import Link from "next/link";
import { SectionEyebrow } from "./SectionEyebrow";

export function HeroSection() {
  return (
    <section className="relative border-b border-[var(--line)]">
      <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:56px_56px] opacity-[0.18]" />
      <div className="pointer-events-none absolute inset-y-0 left-[14%] w-[28%] [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:56px_56px] opacity-[0.05]" />
      <div className="pointer-events-none absolute inset-y-0 right-[8%] w-[22%] [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:56px_56px] opacity-[0.1]" />
      <div className="relative mx-auto grid max-w-[1440px] gap-14 px-5 py-20 sm:gap-16 sm:px-8 sm:py-32 lg:grid-cols-[minmax(0,1.1fr)_minmax(420px,0.9fr)] lg:gap-24 lg:px-12 lg:py-28 2xl:py-[11rem]">
        <div>
          <SectionEyebrow>Layer 7 reverse proxy / edge gateway</SectionEyebrow>
          <h1 className="home-hero-title mt-7 max-w-3xl leading-[0.9] font-semibold tracking-[-0.075em] text-(--ink) sm:mt-8">
            Keep the edge
            <br />
            <span className="text-[var(--signal-dark)]">understood.</span>
          </h1>
          <p className="home-hero-lead mt-9 max-w-[38rem] text-(--ink-soft)">
            Built in Go. Designed with reproducible benchmarks, documented architecture, and
            observable request processing.
          </p>
          <div className="mt-11 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-xs bg-(--ink) px-5 py-3 text-sm font-medium text-(--paper) shadow-[inset_0_0_0_1px_rgb(255_255_255/0.09)] transition-colors duration-200 hover:bg-[#293432] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--signal)"
            >
              Read the documentation <span aria-hidden="true">→</span>
            </Link>
            <a
              href="#architecture"
              className="text-sm font-medium text-[var(--ink)] underline decoration-[var(--line-strong)] decoration-1 transition-colors duration-200 hover:decoration-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--signal)]"
            >
              See the request path
            </a>
          </div>
        </div>

        <div className="trace-panel group w-full self-end rounded-[2px] border border-[var(--terminal-line)] bg-[var(--terminal)] p-6 sm:p-8 lg:max-w-[33rem] lg:translate-y-4 lg:justify-self-end">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-[var(--terminal-line)] pb-4 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] tracking-[0.04em] text-[var(--terminal-muted)]">
            <span>torus / request trace</span>
            <span className="flex items-center gap-2">
              <span className="trace-live h-1.5 w-1.5 rounded-full bg-[#75aa91]" /> live
            </span>
          </div>
          <div className="mt-8 space-y-5 font-[family-name:var(--font-ibm-plex-mono)] text-xs leading-5 sm:text-sm">
            <div className="trace-row grid grid-cols-[88px_minmax(0,1fr)] gap-3 border-l border-[var(--terminal-line)] pl-3 sm:grid-cols-[96px_1fr] sm:pl-4">
              <span className="text-[var(--terminal-muted)]">01 ingress</span>
              <span className="text-[var(--terminal-text)]">
                GET <span>/v1/ships/17</span>
              </span>
            </div>
            <div className="trace-row grid grid-cols-[88px_minmax(0,1fr)] gap-3 border-l border-[var(--terminal-line)] pl-3 sm:grid-cols-[96px_1fr] sm:pl-4">
              <span className="text-[var(--terminal-muted)]">02 route</span>
              <span className="text-[var(--terminal-text)]">
                public-api <span>matched</span>
              </span>
            </div>
            <div className="trace-row grid grid-cols-[88px_minmax(0,1fr)] gap-3 border-l border-[var(--terminal-line)] pl-3 sm:grid-cols-[96px_1fr] sm:pl-4">
              <span className="text-[var(--terminal-muted)]">03 upstream</span>
              <span className="text-[var(--terminal-text)]">
                api-eu-03 <span>healthy</span>
              </span>
            </div>
            <div className="trace-row grid grid-cols-[88px_minmax(0,1fr)] gap-3 border-l border-[var(--terminal-line)] pl-3 sm:grid-cols-[96px_1fr] sm:pl-4">
              <span className="text-[var(--terminal-muted)]">04 response</span>
              <span className="text-[var(--terminal-text)]">
                200 <span>3.8 ms</span>
              </span>
            </div>
          </div>
          <div className="mt-9 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-[var(--terminal-line)] pt-4 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] tracking-[0.03em] text-[var(--terminal-muted)]">
            <span>trace_id: 7f4c…e19b</span>
            <span>edge / bom-01</span>
          </div>
        </div>
      </div>
    </section>
  );
}
