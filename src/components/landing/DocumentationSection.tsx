import { SectionEyebrow } from "./SectionEyebrow";

const documentation = [["01", "Getting started", "Install Torus, run a local proxy, and make the first request."], ["02", "Core concepts", "The request lifecycle, routes, upstreams, middleware, and health."], ["03", "Configuration", "A practical reference for configuration files and runtime behavior."], ["04", "Operations", "Deploy, observe, tune, and safely evolve an edge deployment."]];

export function DocumentationSection() {
  return (
    <section id="documentation" className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_2fr] lg:gap-24">
        <div><SectionEyebrow>Documentation</SectionEyebrow><h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">Written for the person on call.</h2><p className="mt-5 max-w-sm leading-7 text-[var(--ink-soft)]">Start from an outcome, understand the constraint, and keep the operational detail close.</p></div>
        <div className="divide-y divide-[var(--line)] border-t border-[var(--line)]">
          {documentation.map(([number, title, description]) => <a href="#" key={number} className="group grid gap-4 py-6 sm:grid-cols-[48px_1fr_auto] sm:items-center"><span className="font-[family-name:var(--font-ibm-plex-mono)] text-xs text-[var(--ink-faint)]">{number}</span><span><span className="block text-lg font-medium tracking-[-0.02em] transition-colors group-hover:text-[var(--ink-soft)]">{title}</span><span className="mt-1 block text-sm leading-6 text-[var(--ink-soft)]">{description}</span></span><span aria-hidden="true" className="font-[family-name:var(--font-ibm-plex-mono)] text-[var(--ink-faint)]">→</span></a>)}
        </div>
      </div>
    </section>
  );
}
