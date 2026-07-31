import { SectionEyebrow } from "./SectionEyebrow";

const principles = [
  [
    "01",
    "Performance must be measured.",
    "Benchmark every architectural change before claiming improvement.",
  ],
  [
    "02",
    "Architecture should explain itself.",
    "Document major engineering decisions through ADRs instead of tribal knowledge.",
  ],
  [
    "03",
    "Observability is a feature.",
    "Every request should be inspectable from ingress to upstream.",
  ],
];

export function EngineeringPrinciplesSection() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_2fr] lg:gap-24">
        <div>
          <SectionEyebrow>Engineering principles</SectionEyebrow>
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
  );
}
