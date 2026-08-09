import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BenchmarkReportContent } from "@/components/benchmarks/BenchmarkReportContent";
import {
  benchmarkReports,
  getBenchmarkReport,
  getBenchmarkReportContent,
} from "@/lib/benchmarks/reports";

export function generateStaticParams() {
  return benchmarkReports.map((report) => ({ slug: report.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const report = getBenchmarkReport(slug);

  if (!report) {
    return {};
  }

  return {
    title: `${report.title} | Torus`,
    description: report.description,
  };
}

export default async function BenchmarkReportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const report = getBenchmarkReport(slug);

  if (!report) {
    notFound();
  }

  const Content = await getBenchmarkReportContent(report.slug);

  return <BenchmarkReportContent report={report} Content={Content} />;
}
