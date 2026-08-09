import type { BenchmarkReport } from "@/lib/benchmarks/reports";

import { BenchmarkCard } from "./BenchmarkCard";

export function BenchmarkGrid({ reports }: { reports: readonly BenchmarkReport[] }) {
  return (
    <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {reports.map((report) => (
        <BenchmarkCard key={report.slug} report={report} />
      ))}
    </div>
  );
}
