import { SectionEyebrow } from "./SectionEyebrow";

const activity = [["New report", "The economics of upstream health checking"], ["Release", "v0.8.0 — route execution refinements"], ["Engineering note", "Keeping proxy configuration boring"]];

export function ActivitySection() {
  return (
    <section className="border-t border-[var(--line)] bg-[var(--paper-deep)]">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_2fr] lg:gap-24">
          <div><SectionEyebrow>Project activity</SectionEyebrow><h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">A project is a trail of decisions.</h2></div>
          <ol className="border-t border-[var(--line)]">
            {activity.map(([type, title], index) => <li key={title} className="grid gap-3 border-b border-[var(--line)] py-5 sm:grid-cols-[140px_1fr_auto]"><span className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] tracking-[0.1em] text-[var(--ink-faint)] uppercase">{type}</span><span className="font-medium">{title}</span><span className="font-[family-name:var(--font-ibm-plex-mono)] text-xs text-[var(--ink-faint)]">0{index + 1} →</span></li>)}
          </ol>
        </div>
      </div>
    </section>
  );
}
