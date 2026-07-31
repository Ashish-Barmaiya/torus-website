import { SectionEyebrow } from "@/components/landing/SectionEyebrow";

export function ArchitectureHero() {
  return (
    <section className="border-b border-[var(--line)]">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="max-w-3xl">
          <SectionEyebrow>Architecture walkthrough</SectionEyebrow>
          <h1 className="mt-6 text-[clamp(3.4rem,7vw,6.75rem)] leading-[0.92] font-semibold tracking-[-0.07em] text-[var(--ink)]">
            Inside Torus
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--ink-soft)] sm:text-xl">
            Follow a request as it moves through every stage of Torus—from the HTTP listener to a
            healthy upstream. Every component has a single responsibility, making request execution
            predictable, observable and easy to reason about.
          </p>
          <a
            href="#execution-pipeline"
            className="mt-10 inline-flex items-center gap-2 rounded-[2px] bg-[var(--ink)] px-5 py-3 text-sm font-medium text-[var(--paper)] shadow-[inset_0_0_0_1px_rgb(255_255_255_/_0.09)] transition-colors hover:bg-[#293432] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--signal)]"
          >
            Start Walkthrough <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
