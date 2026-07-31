import Link from "next/link";
import { SectionEyebrow } from "./SectionEyebrow";

const activity = [
  {
    type: "New report",
    title: "HTTP vs HTTPS Performance Evaluation",
    href: "https://github.com/Ashish-Barmaiya/torus-proxy/blob/main/docs/benchmarking/reports/Benchmark-002-http-vs-https.md",
  },
  {
    type: "Release",
    title: "v0.2.0 — Zero-Downtime Configuration Hot Reload",
    href: "https://github.com/Ashish-Barmaiya/torus-proxy/releases/tag/v0.2.0",
  },
  {
    type: "New Blog",
    title: "Why I Rewrote My Reverse Proxy from Node.js to Go",
    href: "https://ashishbarmaiya.hashnode.dev/why-i-rewrote-my-reverse-proxy-from-node-js-to-go#",
  },
];

export function ActivitySection() {
  return (
    <section className="border-t border-[var(--line)] bg-[var(--paper-deep)]">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_2fr] lg:gap-24">
          <div>
            <SectionEyebrow>Project activity</SectionEyebrow>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
              A project is a trail of decisions.
            </h2>
          </div>

          <ol className="border-t border-[var(--line)]">
            {activity.map((item, index) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className="group grid gap-3 border-b border-[var(--line)] py-5 transition-colors hover:bg-[var(--paper-deep)] sm:grid-cols-[140px_1fr_auto]"
                >
                  <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] tracking-[0.1em] text-[var(--ink-faint)] uppercase">
                    {item.type}
                  </span>

                  <span className="font-medium transition-colors group-hover:text-[var(--signal)]">
                    {item.title}
                  </span>

                  <span className="font-[family-name:var(--font-ibm-plex-mono)] text-xs text-[var(--ink-faint)] transition-transform duration-200 group-hover:translate-x-1">
                    0{index + 1} →
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
