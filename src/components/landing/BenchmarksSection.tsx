import { SectionEyebrow } from "./SectionEyebrow";

const results = [["Static upstream", "1.24M req/s", "1.8 ms", "0.0 B/op"], ["Route match + proxy", "842K req/s", "2.6 ms", "96 B/op"], ["Health-aware pool", "715K req/s", "3.1 ms", "112 B/op"]];

export function BenchmarksSection() {
  return (
    <section id="benchmarks" className="border-y border-[var(--terminal-line)] bg-[var(--terminal)] text-[var(--terminal-text)]">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><SectionEyebrow>Performance evidence</SectionEyebrow><h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl">Claims need a test harness.</h2></div><a href="#documentation" className="font-[family-name:var(--font-ibm-plex-mono)] text-xs text-[var(--terminal-text)] underline decoration-[var(--terminal-muted)] underline-offset-4 transition-colors hover:decoration-[var(--terminal-text)]">Open benchmark methodology →</a></div>
        <div className="mt-14 overflow-x-auto border border-[var(--terminal-line)]"><table className="w-full min-w-[650px] border-collapse text-left"><caption className="sr-only">Preview of Torus benchmark results</caption><thead className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] tracking-[0.11em] text-[var(--terminal-muted)] uppercase"><tr className="border-b border-[var(--terminal-line)]"><th className="px-5 py-4 font-medium">Scenario</th><th className="px-5 py-4 font-medium">Throughput</th><th className="px-5 py-4 font-medium">p99 latency</th><th className="px-5 py-4 font-medium">Allocation</th></tr></thead><tbody className="font-[family-name:var(--font-ibm-plex-mono)] text-sm">{results.map(([scenario, throughput, latency, allocation], index) => <tr key={scenario} className={index < results.length - 1 ? "border-b border-[var(--terminal-line)]" : undefined}><td className="px-5 py-5">{scenario}</td><td className="px-5 py-5">{throughput}</td><td className="px-5 py-5">{latency}</td><td className="px-5 py-5">{allocation}</td></tr>)}</tbody></table></div>
        <p className="mt-4 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] leading-5 text-[var(--terminal-muted)]">Illustrative preview. Complete environment, workload, and reproducible commands accompany each published report.</p>
      </div>
    </section>
  );
}
