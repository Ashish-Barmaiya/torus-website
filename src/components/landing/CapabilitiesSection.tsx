import { SectionEyebrow } from "./SectionEyebrow";

const capabilities = [
  ["01", "Request routing", "Host, path, method, and header matching with a route model that remains inspectable at scale."],
  ["02", "Load balancing", "Distribute work across healthy upstreams with policy that is visible, controllable, and measurable."],
  ["03", "Health checks", "Active checks and state transitions that remove uncertainty before a request reaches an unhealthy target."],
  ["04", "Observability", "Surface the signals operators need: latency, status, upstream state, and the shape of live traffic."],
];

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="border-y border-[var(--line)] bg-[var(--paper-deep)]">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
        <div className="max-w-2xl"><SectionEyebrow>Capabilities</SectionEyebrow><h2 className="landing-section-title mt-4 font-semibold tracking-[-0.045em]">Purpose-built for the data plane.</h2><p className="mt-5 leading-7 text-[var(--ink-soft)]">Torus concentrates on the work between a client request and a dependable upstream response.</p></div>
        <div className="mt-14 grid border-t border-l border-[var(--line)] md:grid-cols-2">
          {capabilities.map(([number, title, description]) => <article key={number} className="min-h-60 border-r border-b border-[var(--line)] bg-transparent p-7 sm:p-9"><span className="font-[family-name:var(--font-ibm-plex-mono)] text-xs text-[var(--ink-faint)]">{number}</span><h3 className="mt-11 text-2xl font-medium tracking-[-0.035em]">{title}</h3><p className="mt-3 max-w-md leading-7 text-[var(--ink-soft)]">{description}</p></article>)}
        </div>
      </div>
    </section>
  );
}
