import { SectionEyebrow } from "./SectionEyebrow";

const requestStages = [
  ["Ingress", "Accept client connections and normalize incoming HTTP requests."],
  ["Routing", "Resolve the request using longest-prefix route matching."],
  ["Load Balancing", "Select a healthy upstream using the configured balancing policy."],
  ["Proxy", "Forward the request, enrich forwarding headers, and stream the response."],
];

export function ArchitectureSection() {
  return (
    <section
      id="architecture"
      className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36"
    >
      <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
        <div>
          <SectionEyebrow>Architecture</SectionEyebrow>

          <h2 className="landing-section-title mt-4 font-semibold tracking-[-0.045em]">
            Every request follows an explicit path.
          </h2>

          <p className="mt-5 max-w-md text-[var(--text-body)] leading-[1.7] text-[var(--ink-soft)]">
            Torus keeps request processing intentionally small and observable. Routing, load
            balancing, health awareness, and proxying remain separate responsibilities with
            well-defined execution boundaries.
          </p>

          <a
            href="/architecture"
            className="mt-8 inline-flex font-[family-name:var(--font-ibm-plex-mono)] text-xs font-medium text-[var(--ink)] underline decoration-[var(--line-strong)] underline-offset-4 transition-colors hover:decoration-[var(--ink)]"
          >
            Explore the architecture →
          </a>
        </div>

        <div className="border border-[var(--line-strong)] bg-[var(--surface)] p-5 sm:p-8">
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-4 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] tracking-[0.12em] text-[var(--ink-faint)] uppercase">
            <span>Request lifecycle</span>
            <span>01 / 04</span>
          </div>

          <ol className="mt-8 grid gap-3 sm:grid-cols-4 sm:gap-0">
            {requestStages.map(([name, detail], index) => (
              <li
                key={name}
                className="relative border border-[var(--line)] p-4 sm:border-r-0 sm:last:border-r"
              >
                <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] text-[var(--ink-faint)]">
                  0{index + 1}
                </span>

                <h3 className="mt-7 text-base font-medium">{name}</h3>

                <p className="mt-1 text-sm leading-5 text-[var(--ink-soft)]">{detail}</p>
              </li>
            ))}
          </ol>

          <div className="mt-3 flex items-center gap-3 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] text-[var(--ink-faint)]">
            <span className="h-px flex-1 bg-[var(--terminal-line)]" />
            <span>health checks inform routing • runtime reload remains atomic</span>
          </div>
        </div>
      </div>
    </section>
  );
}
