import { SectionEyebrow } from "./SectionEyebrow";

const results = [
  {
    benchmark: "B-002",
    title: "HTTP vs HTTPS Performance",
    highlight: "−6.54% throughput",
    summary: "+6.66% mean latency • 100% request success",
  },
  {
    benchmark: "B-001",
    title: "Node.js → Go Rewrite",
    highlight: "10.8× throughput",
    summary: "17,865 req/s • 6.12 ms latency",
  },
];

export function BenchmarksSection() {
  return (
    <section
      id="benchmarks"
      className="border-y border-[var(--terminal-line)] bg-[var(--terminal)] text-[var(--terminal-text)]"
    >
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <SectionEyebrow>Performance evidence</SectionEyebrow>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl">
              Every optimization is measured.
            </h2>

            <p className="mt-5 max-w-2xl text-[15px] leading-7 text-[var(--terminal-muted)]">
              Torus publishes reproducible engineering benchmarks with documented methodology,
              hardware profiles, raw datasets, and statistical analysis. Performance claims are
              backed by repeatable experiments, not isolated benchmark runs.
            </p>
          </div>

          <a
            href="https://github.com/Ashish-Barmaiya/torus-proxy/tree/main/docs/benchmarking/reports"
            className="font-[family-name:var(--font-ibm-plex-mono)] text-xs text-[var(--terminal-text)] underline decoration-[var(--terminal-muted)] underline-offset-4 transition-colors hover:decoration-[var(--terminal-text)]"
          >
            View benchmark reports →
          </a>
        </div>

        <div className="mt-14 overflow-x-auto border border-[var(--terminal-line)]">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <caption className="sr-only">Published Torus benchmark reports</caption>

            <thead className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] tracking-[0.11em] text-[var(--terminal-muted)] uppercase">
              <tr className="border-b border-[var(--terminal-line)]">
                <th className="px-5 py-4 font-medium">Benchmark</th>
                <th className="px-5 py-4 font-medium">Report</th>
                <th className="px-5 py-4 font-medium">Primary Result</th>
                <th className="px-5 py-4 font-medium">Summary</th>
              </tr>
            </thead>

            <tbody className="font-[family-name:var(--font-ibm-plex-mono)] text-sm">
              {results.map((result, index) => (
                <tr
                  key={result.benchmark}
                  className={
                    index !== results.length - 1
                      ? "border-b border-[var(--terminal-line)]"
                      : undefined
                  }
                >
                  <td className="px-5 py-5">{result.benchmark}</td>
                  <td className="px-5 py-5">{result.title}</td>
                  <td className="px-5 py-5">{result.highlight}</td>
                  <td className="px-5 py-5">{result.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] leading-5 text-[var(--terminal-muted)]">
          Every report includes benchmark methodology, environment profiles, reproducible commands,
          statistical summaries, and raw benchmark datasets.
        </p>
      </div>
    </section>
  );
}
