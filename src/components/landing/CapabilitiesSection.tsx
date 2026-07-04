import { PageContainer } from "@/layouts/PageLayout";

export function CapabilitiesSection() {
  return (
    <section id="capabilities" aria-labelledby="capabilities-title">
      <PageContainer width="standard" py="large">
        <div className="space-y-space-6">
          <h2 id="capabilities-title" className="text-section-title">
            Core Capabilities
          </h2>
          
          {/* Introductory Paragraph Placeholder */}
          <div className="h-4 w-5/6 max-w-content-reading bg-background-subtle rounded animate-pulse" />

          {/* Capability Matrix Placeholder (8 canonical capabilities) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-6">
            <div className="space-y-space-2 border-t border-border-subtle pt-space-4">
              <h3 className="text-subsection-title">Layer 7 Request Routing</h3>
              <div className="h-4 w-5/6 bg-background-subtle rounded animate-pulse" />
            </div>
            <div className="space-y-space-2 border-t border-border-subtle pt-space-4">
              <h3 className="text-subsection-title">Reverse Proxy</h3>
              <div className="h-4 w-5/6 bg-background-subtle rounded animate-pulse" />
            </div>
            <div className="space-y-space-2 border-t border-border-subtle pt-space-4">
              <h3 className="text-subsection-title">Active Health Checking</h3>
              <div className="h-4 w-5/6 bg-background-subtle rounded animate-pulse" />
            </div>
            <div className="space-y-space-2 border-t border-border-subtle pt-space-4">
              <h3 className="text-subsection-title">Load Balancing</h3>
              <div className="h-4 w-5/6 bg-background-subtle rounded animate-pulse" />
            </div>
            <div className="space-y-space-2 border-t border-border-subtle pt-space-4">
              <h3 className="text-subsection-title">Middleware Pipeline</h3>
              <div className="h-4 w-5/6 bg-background-subtle rounded animate-pulse" />
            </div>
            <div className="space-y-space-2 border-t border-border-subtle pt-space-4">
              <h3 className="text-subsection-title">Configuration System</h3>
              <div className="h-4 w-5/6 bg-background-subtle rounded animate-pulse" />
            </div>
            <div className="space-y-space-2 border-t border-border-subtle pt-space-4">
              <h3 className="text-subsection-title">Observability</h3>
              <div className="h-4 w-5/6 bg-background-subtle rounded animate-pulse" />
            </div>
            <div className="space-y-space-2 border-t border-border-subtle pt-space-4">
              <h3 className="text-subsection-title">Extensibility</h3>
              <div className="h-4 w-5/6 bg-background-subtle rounded animate-pulse" />
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
