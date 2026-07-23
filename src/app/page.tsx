import Footer from "@/components/Footer";
import Header from "@/components/Header";

const principles = [
  [
    "01",
    "The fast path is the product.",
    "Data-plane work stays close to the metal: predictable allocation, clear ownership, and measured trade-offs.",
  ],
  [
    "02",
    "Configuration should explain itself.",
    "Readable defaults and explicit behavior make the system easier to operate under pressure.",
  ],
  [
    "03",
    "Evidence earns confidence.",
    "Benchmarks, traces, and failure modes belong beside the implementation—not behind a claim.",
  ],
];

const capabilities = [
  [
    "01",
    "Request routing",
    "Host, path, method, and header matching with a route model that remains inspectable at scale.",
  ],
  [
    "02",
    "Load balancing",
    "Distribute work across healthy upstreams with policy that is visible, controllable, and measurable.",
  ],
  [
    "03",
    "Health checks",
    "Active checks and state transitions that remove uncertainty before a request reaches an unhealthy target.",
  ],
  [
    "04",
    "Observability",
    "Surface the signals operators need: latency, status, upstream state, and the shape of live traffic.",
  ],
];

const documentation = [
  ["01", "Getting started", "Install Torus, run a local proxy, and make the first request."],
  ["02", "Core concepts", "The request lifecycle, routes, upstreams, middleware, and health."],
  ["03", "Configuration", "A practical reference for configuration files and runtime behavior."],
  ["04", "Operations", "Deploy, observe, tune, and safely evolve an edge deployment."],
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] font-medium tracking-[0.14em] text-[var(--ink-faint)] uppercase">
      {children}
    </p>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-[var(--paper)]">
      <Header />
      <main>
        <section className="relative border-b border-[var(--line)]">
          <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:56px_56px] opacity-[0.16]" />
          <div className="relative mx-auto grid max-w-[1440px] gap-16 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[minmax(0,1.1fr)_minmax(420px,0.9fr)] lg:gap-24 lg:px-12 lg:py-[11rem]">
            <div>
              <Eyebrow>Layer 7 reverse proxy / edge gateway</Eyebrow>
              <h1 className="mt-8 max-w-3xl text-[clamp(3.6rem,8vw,7.25rem)] leading-[0.9] font-semibold tracking-[-0.075em] text-[var(--ink)]">
                Keep the edge
                <br />
                <span>understood.</span>
              </h1>
              <p className="mt-9 max-w-[34rem] text-[1.05rem] leading-8 text-[var(--ink-soft)] sm:text-xl sm:leading-8">
                Torus is a high-performance reverse proxy for teams that want the critical path to
                be fast, explicit, and explainable.
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

        <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_2fr] lg:gap-24">
            <div>
              <Eyebrow>Engineering principles</Eyebrow>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
                Designed for the work that cannot be hand-waved.
              </h2>
            </div>
            <div className="divide-y divide-[var(--line)] border-t border-[var(--line)]">
              {principles.map(([number, title, description]) => (
                <article key={number} className="grid gap-4 py-7 sm:grid-cols-[48px_1fr]">
                  <span className="font-[family-name:var(--font-ibm-plex-mono)] text-xs text-[var(--ink-faint)]">
                    {number}
                  </span>
                  <div>
                    <h3 className="text-xl font-medium tracking-[-0.025em]">{title}</h3>
                    <p className="mt-3 max-w-2xl leading-7 text-[var(--ink-soft)]">{description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="capabilities" className="border-y border-[var(--line)] bg-[var(--paper-deep)]">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
            <div className="max-w-2xl">
              <Eyebrow>Capabilities</Eyebrow>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
                Purpose-built for the data plane.
              </h2>
              <p className="mt-5 leading-7 text-[var(--ink-soft)]">
                Torus concentrates on the work between a client request and a dependable upstream
                response.
              </p>
            </div>
            <div className="mt-14 grid border-t border-l border-[var(--line)] md:grid-cols-2">
              {capabilities.map(([number, title, description]) => (
                <article
                  key={number}
                  className="min-h-60 border-r border-b border-[var(--line)] bg-transparent p-7 sm:p-9"
                >
                  <span className="font-[family-name:var(--font-ibm-plex-mono)] text-xs text-[var(--ink-faint)]">
                    {number}
                  </span>
                  <h3 className="mt-11 text-2xl font-medium tracking-[-0.035em]">{title}</h3>
                  <p className="mt-3 max-w-md leading-7 text-[var(--ink-soft)]">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="architecture"
          className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36"
        >
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
            <div>
              <Eyebrow>Architecture</Eyebrow>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
                One request path. No mystery layers.
              </h2>
              <p className="mt-5 max-w-md leading-7 text-[var(--ink-soft)]">
                From edge listener to healthy upstream, each stage has a clear responsibility and
                observable state.
              </p>
              <a
                href="#documentation"
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
                {[
                  ["Ingress", "Accept and classify"],
                  ["Route", "Match intent"],
                  ["Policy", "Apply middleware"],
                  ["Upstream", "Select and forward"],
                ].map(([name, detail], index) => (
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
                <span>control plane configures / data plane executes</span>
              </div>
            </div>
          </div>
        </section>

        <section
          id="benchmarks"
          className="border-y border-[var(--terminal-line)] bg-[var(--terminal)] text-[var(--terminal-text)]"
        >
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <Eyebrow>Performance evidence</Eyebrow>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl">
                  Claims need a test harness.
                </h2>
              </div>
              <a
                href="#documentation"
                className="font-[family-name:var(--font-ibm-plex-mono)] text-xs text-[var(--terminal-text)] underline decoration-[var(--terminal-muted)] underline-offset-4 transition-colors hover:decoration-[var(--terminal-text)]"
              >
                Open benchmark methodology →
              </a>
            </div>
            <div className="mt-14 overflow-x-auto border border-[var(--terminal-line)]">
              <table className="w-full min-w-[650px] border-collapse text-left">
                <caption className="sr-only">Preview of Torus benchmark results</caption>
                <thead className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] tracking-[0.11em] text-[var(--terminal-muted)] uppercase">
                  <tr className="border-b border-[var(--terminal-line)]">
                    <th className="px-5 py-4 font-medium">Scenario</th>
                    <th className="px-5 py-4 font-medium">Throughput</th>
                    <th className="px-5 py-4 font-medium">p99 latency</th>
                    <th className="px-5 py-4 font-medium">Allocation</th>
                  </tr>
                </thead>
                <tbody className="font-[family-name:var(--font-ibm-plex-mono)] text-sm">
                  <tr className="border-b border-[var(--terminal-line)]">
                    <td className="px-5 py-5">Static upstream</td>
                    <td className="px-5 py-5">1.24M req/s</td>
                    <td className="px-5 py-5">1.8 ms</td>
                    <td className="px-5 py-5">0.0 B/op</td>
                  </tr>
                  <tr className="border-b border-[var(--terminal-line)]">
                    <td className="px-5 py-5">Route match + proxy</td>
                    <td className="px-5 py-5">842K req/s</td>
                    <td className="px-5 py-5">2.6 ms</td>
                    <td className="px-5 py-5">96 B/op</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-5">Health-aware pool</td>
                    <td className="px-5 py-5">715K req/s</td>
                    <td className="px-5 py-5">3.1 ms</td>
                    <td className="px-5 py-5">112 B/op</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] leading-5 text-[var(--terminal-muted)]">
              Illustrative preview. Complete environment, workload, and reproducible commands
              accompany each published report.
            </p>
          </div>
        </section>

        <section
          id="documentation"
          className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36"
        >
          <div className="grid gap-12 lg:grid-cols-[0.8fr_2fr] lg:gap-24">
            <div>
              <Eyebrow>Documentation</Eyebrow>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
                Written for the person on call.
              </h2>
              <p className="mt-5 max-w-sm leading-7 text-[var(--ink-soft)]">
                Start from an outcome, understand the constraint, and keep the operational detail
                close.
              </p>
            </div>
            <div className="divide-y divide-[var(--line)] border-t border-[var(--line)]">
              {documentation.map(([number, title, description]) => (
                <a
                  href="#"
                  key={number}
                  className="group grid gap-4 py-6 sm:grid-cols-[48px_1fr_auto] sm:items-center"
                >
                  <span className="font-[family-name:var(--font-ibm-plex-mono)] text-xs text-[var(--ink-faint)]">
                    {number}
                  </span>
                  <span>
                    <span className="block text-lg font-medium tracking-[-0.02em] transition-colors group-hover:text-[var(--ink-soft)]">
                      {title}
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-[var(--ink-soft)]">
                      {description}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-[family-name:var(--font-ibm-plex-mono)] text-[var(--ink-faint)]"
                  >
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--line)] bg-[var(--paper-deep)]">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_2fr] lg:gap-24">
              <div>
                <Eyebrow>Project activity</Eyebrow>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
                  A project is a trail of decisions.
                </h2>
              </div>
              <ol className="border-t border-[var(--line)]">
                {[
                  ["New report", "The economics of upstream health checking"],
                  ["Release", "v0.8.0 — route execution refinements"],
                  ["Engineering note", "Keeping proxy configuration boring"],
                ].map(([type, title], index) => (
                  <li
                    key={title}
                    className="grid gap-3 border-b border-[var(--line)] py-5 sm:grid-cols-[140px_1fr_auto]"
                  >
                    <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] tracking-[0.1em] text-[var(--ink-faint)] uppercase">
                      {type}
                    </span>
                    <span className="font-medium">{title}</span>
                    <span className="font-[family-name:var(--font-ibm-plex-mono)] text-xs text-[var(--ink-faint)]">
                      0{index + 1} →
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
