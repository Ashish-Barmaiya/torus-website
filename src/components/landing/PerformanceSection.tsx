import { PageContainer } from "@/layouts/PageLayout";

export function PerformanceSection() {
  return (
    <section id="performance" aria-labelledby="performance-title">
      <PageContainer width="wide" py="large">
        <div className="space-y-space-6">
          <h2 id="performance-title" className="text-section-title">
            Performance Evidence
          </h2>
          
          {/* Introductory Paragraph Placeholder */}
          <div className="h-4 w-5/6 max-w-content-reading bg-background-subtle rounded animate-pulse" />

          {/* Metric Summary list (Throughput, Latency, Memory Allocation, CPU Usage, Concurrent Connections, GC Activity) */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-space-4">
            <div className="border border-border-subtle rounded-md p-space-3 text-center space-y-space-2">
              <span className="text-xs text-text-muted">Throughput</span>
              <div className="h-4 w-12 bg-background-subtle mx-auto rounded animate-pulse" />
            </div>
            <div className="border border-border-subtle rounded-md p-space-3 text-center space-y-space-2">
              <span className="text-xs text-text-muted">Latency</span>
              <div className="h-4 w-12 bg-background-subtle mx-auto rounded animate-pulse" />
            </div>
            <div className="border border-border-subtle rounded-md p-space-3 text-center space-y-space-2">
              <span className="text-xs text-text-muted">Memory Allocation</span>
              <div className="h-4 w-12 bg-background-subtle mx-auto rounded animate-pulse" />
            </div>
            <div className="border border-border-subtle rounded-md p-space-3 text-center space-y-space-2">
              <span className="text-xs text-text-muted">CPU Usage</span>
              <div className="h-4 w-12 bg-background-subtle mx-auto rounded animate-pulse" />
            </div>
            <div className="border border-border-subtle rounded-md p-space-3 text-center space-y-space-2">
              <span className="text-xs text-text-muted">Concurrent Connections</span>
              <div className="h-4 w-12 bg-background-subtle mx-auto rounded animate-pulse" />
            </div>
            <div className="border border-border-subtle rounded-md p-space-3 text-center space-y-space-2">
              <span className="text-xs text-text-muted">GC Activity</span>
              <div className="h-4 w-12 bg-background-subtle mx-auto rounded animate-pulse" />
            </div>
          </div>

          {/* Benchmark Preview list (3 slots) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-6">
            <div className="p-space-4 border border-border-subtle rounded-md space-y-space-2">
              <span className="font-mono text-xs text-text-muted">BR-001</span>
              <h3 className="text-block-title">Placeholder Title</h3>
              <div className="h-4 w-full bg-background-subtle rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-background-subtle rounded animate-pulse" />
            </div>
            <div className="p-space-4 border border-border-subtle rounded-md space-y-space-2">
              <span className="font-mono text-xs text-text-muted">BR-002</span>
              <h3 className="text-block-title">Placeholder Title</h3>
              <div className="h-4 w-full bg-background-subtle rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-background-subtle rounded animate-pulse" />
            </div>
            <div className="p-space-4 border border-border-subtle rounded-md space-y-space-2">
              <span className="font-mono text-xs text-text-muted">BR-003</span>
              <h3 className="text-block-title">Placeholder Title</h3>
              <div className="h-4 w-full bg-background-subtle rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-background-subtle rounded animate-pulse" />
            </div>
          </div>

          {/* Benchmark CTA Placeholder */}
          <div>
            <div className="h-4 w-40 bg-background-subtle rounded animate-pulse" />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
