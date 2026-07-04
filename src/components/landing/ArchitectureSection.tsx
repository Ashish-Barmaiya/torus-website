import { PageContainer } from "@/layouts/PageLayout";

export function ArchitectureSection() {
  return (
    <section id="architecture" aria-labelledby="architecture-title">
      <PageContainer width="wide" py="large">
        <div className="space-y-space-6">
          <h2 id="architecture-title" className="text-section-title">
            System Architecture
          </h2>
          
          {/* Introductory Paragraph Placeholder */}
          <div className="h-4 w-5/6 max-w-content-reading bg-background-subtle rounded animate-pulse" />

          {/* Architecture Diagram Placeholder */}
          <div className="w-full aspect-video border border-border-subtle rounded-md flex items-center justify-center bg-surface-secondary">
            <span className="text-xs text-text-muted">Architecture Diagram Placeholder</span>
          </div>

          {/* Subsystem Overview Placeholder (8 canonical subsystems) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-6 max-w-content-standard mx-auto">
            <div className="space-y-space-1">
              <h3 className="text-block-title">Router</h3>
              <div className="h-4 w-5/6 bg-background-subtle rounded animate-pulse" />
            </div>
            <div className="space-y-space-1">
              <h3 className="text-block-title">Middleware</h3>
              <div className="h-4 w-5/6 bg-background-subtle rounded animate-pulse" />
            </div>
            <div className="space-y-space-1">
              <h3 className="text-block-title">Load Balancer</h3>
              <div className="h-4 w-5/6 bg-background-subtle rounded animate-pulse" />
            </div>
            <div className="space-y-space-1">
              <h3 className="text-block-title">Health Checker</h3>
              <div className="h-4 w-5/6 bg-background-subtle rounded animate-pulse" />
            </div>
            <div className="space-y-space-1">
              <h3 className="text-block-title">Configuration Engine</h3>
              <div className="h-4 w-5/6 bg-background-subtle rounded animate-pulse" />
            </div>
            <div className="space-y-space-1">
              <h3 className="text-block-title">Observability</h3>
              <div className="h-4 w-5/6 bg-background-subtle rounded animate-pulse" />
            </div>
            <div className="space-y-space-1">
              <h3 className="text-block-title">Runtime</h3>
              <div className="h-4 w-5/6 bg-background-subtle rounded animate-pulse" />
            </div>
            <div className="space-y-space-1">
              <h3 className="text-block-title">Transport</h3>
              <div className="h-4 w-5/6 bg-background-subtle rounded animate-pulse" />
            </div>
          </div>

          {/* Architecture CTA Placeholder */}
          <div className="max-w-content-standard mx-auto">
            <div className="h-4 w-40 bg-background-subtle rounded animate-pulse" />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
