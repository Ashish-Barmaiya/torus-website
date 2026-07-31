import { SectionEyebrow } from "./SectionEyebrow";

export function HeroSection() {
  return (
    <section className="relative border-b border-[var(--line)]">
      <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:56px_56px] opacity-[0.18]" />
      <div className="pointer-events-none absolute inset-y-0 left-[14%] w-[28%] [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:56px_56px] opacity-[0.05]" />
      <div className="pointer-events-none absolute inset-y-0 right-[8%] w-[22%] [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:56px_56px] opacity-[0.1]" />
      <div className="relative mx-auto grid max-w-[1440px] gap-16 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[minmax(0,1.1fr)_minmax(420px,0.9fr)] lg:gap-24 lg:px-12 lg:py-[11rem]">
        <div>
          <SectionEyebrow>Layer 7 reverse proxy / edge gateway</SectionEyebrow>
          <h1 className="mt-8 max-w-3xl text-[clamp(3.6rem,8vw,7.25rem)] leading-[0.9] font-semibold tracking-[-0.075em] text-[var(--ink)]">
            Keep the edge
            <br />
            <span className="text-[var(--signal-dark)]">understood.</span>
          </h1>
          <p className="mt-9 max-w-[38rem] text-[1.05rem] leading-8 text-[var(--ink-soft)] sm:text-xl sm:leading-8">
            Built in Go. Designed with reproducible benchmarks, documented architecture, and
            observable request processing.
          </p>
          <div className="mt-11 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href="#documentation"
              className="inline-flex items-center gap-2 rounded-[2px] bg-[var(--ink)] px-5 py-3 text-sm font-medium text-[var(--paper)] shadow-[inset_0_0_0_1px_rgb(255_255_255_/_0.09)] transition-colors duration-200 hover:bg-[#293432] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--signal)]"
            >
              Read the documentation <span aria-hidden="true">→</span>
            </a>
            <a
              href="#architecture"
              className="text-sm font-medium text-[var(--ink)] underline decoration-[var(--line-strong)] decoration-1 transition-colors duration-200 hover:decoration-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--signal)]"
            >
              See the request path
            </a>
          </div>
        </div>

        <div className="trace-panel group w-full self-end rounded-[2px] border border-[var(--terminal-line)] bg-[var(--terminal)] p-6 sm:p-8 lg:max-w-[33rem] lg:translate-y-4 lg:justify-self-end">
          <div className="flex items-center justify-between border-b border-[var(--terminal-line)] pb-4 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] tracking-[0.04em] text-[var(--terminal-muted)]">
            <span>torus / request trace</span>
            <span className="flex items-center gap-2">
              <span className="trace-live h-1.5 w-1.5 rounded-full bg-[#75aa91]" /> live
            </span>
          </div>
          <div className="mt-8 space-y-5 font-[family-name:var(--font-ibm-plex-mono)] text-xs leading-5 sm:text-sm">
            <div className="trace-row grid grid-cols-[96px_1fr] gap-3 border-l border-[var(--terminal-line)] pl-4">
              <span className="text-[var(--terminal-muted)]">01 ingress</span>
              <span className="text-[var(--terminal-text)]">
                GET <span>/v1/ships/17</span>
              </span>
            </div>
            <div className="trace-row grid grid-cols-[96px_1fr] gap-3 border-l border-[var(--terminal-line)] pl-4">
              <span className="text-[var(--terminal-muted)]">02 route</span>
              <span className="text-[var(--terminal-text)]">
                public-api <span>matched</span>
              </span>
            </div>
            <div className="trace-row grid grid-cols-[96px_1fr] gap-3 border-l border-[var(--terminal-line)] pl-4">
              <span className="text-[var(--terminal-muted)]">03 upstream</span>
              <span className="text-[var(--terminal-text)]">
                api-eu-03 <span>healthy</span>
              </span>
            </div>
            <div className="trace-row grid grid-cols-[96px_1fr] gap-3 border-l border-[var(--terminal-line)] pl-4">
              <span className="text-[var(--terminal-muted)]">04 response</span>
              <span className="text-[var(--terminal-text)]">
                200 <span>3.8 ms</span>
              </span>
            </div>
          </div>
          <div className="mt-9 flex items-center justify-between border-t border-[var(--terminal-line)] pt-4 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] tracking-[0.03em] text-[var(--terminal-muted)]">
            <span>trace_id: 7f4c…e19b</span>
            <span>edge / bom-01</span>
          </div>
        </div>
      </div>
    </section>
  );
}
