import type { ReactNode } from "react";

type MdxDocument = (props: Record<string, unknown>) => ReactNode;
type MdxLoader = () => Promise<{ default: MdxDocument }>;

export type BenchmarkMetric = {
  label: string;
  value: string;
  detail: string;
};

export type BenchmarkReport = {
  slug: string;
  title: string;
  description: string;
  category: string;
  dateContext: string;
  dateLabel: string;
  publishedOrder: number;
  metrics: readonly BenchmarkMetric[];
};

type BenchmarkDocument = {
  report: BenchmarkReport;
  loader: MdxLoader;
};

const benchmarkDocuments: Record<string, BenchmarkDocument> = {
  "node-to-go": {
    report: {
      slug: "node-to-go",
      title: "Benchmark-001: Node.js to Go Performance Evaluation",
      description:
        "A historical performance evaluation of Torus Proxy before and after its rewrite from Node.js to Go.",
      category: "Go vs Node.js",
      dateContext: "Latest results",
      dateLabel: "June 2026",
      publishedOrder: 202606,
      metrics: [
        {
          label: "Full proxy throughput",
          value: "17,865.81",
          detail: "req/sec",
        },
        {
          label: "Go vs Node.js",
          value: "~10.8×",
          detail: "throughput",
        },
      ],
    },
    loader: () => import("../../../content/benchmarks/node-to-go.mdx"),
  },
  "observability-overhead": {
    report: {
      slug: "observability-overhead",
      title: "Benchmark-003: Performance Impact of Observability",
      description:
        "A controlled benchmark measuring the throughput, latency, and runtime overhead introduced by Torus observability.",
      category: "Observability",
      dateContext: "Report date",
      dateLabel: "August 1, 2026",
      publishedOrder: 20260801,
      metrics: [
        {
          label: "wrk throughput",
          value: "−3.45%",
          detail: "with observability",
        },
        {
          label: "wrk mean latency",
          value: "+3.60%",
          detail: "with observability",
        },
      ],
    },
    loader: () => import("../../../content/benchmarks/observability-overhead.mdx"),
  },
  "http-vs-https": {
    report: {
      slug: "http-vs-https",
      title: "Benchmark-002: HTTP vs HTTPS Performance Evaluation",
      description:
        "A controlled benchmark measuring the performance cost of TLS termination in Torus.",
      category: "TLS",
      dateContext: "Report date",
      dateLabel: "July 16, 2026",
      publishedOrder: 20260716,
      metrics: [
        {
          label: "wrk throughput",
          value: "−6.54%",
          detail: "with TLS",
        },
        {
          label: "wrk mean latency",
          value: "+6.66%",
          detail: "with TLS",
        },
      ],
    },
    loader: () => import("../../../content/benchmarks/http-vs-https.mdx"),
  },
};

export const benchmarkReports = Object.values(benchmarkDocuments)
  .map(({ report }) => report)
  .sort((left, right) => right.publishedOrder - left.publishedOrder);

export function getBenchmarkReport(slug: string): BenchmarkReport | undefined {
  return benchmarkDocuments[slug]?.report;
}

export async function getBenchmarkReportContent(slug: string): Promise<MdxDocument> {
  const document = benchmarkDocuments[slug];

  if (!document) {
    throw new Error(`Missing benchmark report for ${slug}`);
  }

  return (await document.loader()).default;
}
