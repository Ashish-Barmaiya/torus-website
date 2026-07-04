import { PageContainer } from "@/layouts/PageLayout";

export function DocumentationSection() {
  return (
    <section id="documentation" aria-labelledby="documentation-title">
      <PageContainer width="standard" py="large">
        <div className="space-y-space-6">
          <h2 id="documentation-title" className="text-section-title">
            Documentation
          </h2>
          
          {/* Introductory Paragraph Placeholder */}
          <div className="h-4 w-5/6 max-w-content-reading bg-background-subtle rounded animate-pulse" />

          {/* Documentation Categories (5 categories) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-6">
            <div className="p-space-4 border border-border-subtle rounded-md space-y-space-2">
              <h3 className="text-block-title">Getting Started</h3>
              <div className="h-4 w-full bg-background-subtle rounded animate-pulse" />
            </div>
            <div className="p-space-4 border border-border-subtle rounded-md space-y-space-2">
              <h3 className="text-block-title">Concepts</h3>
              <div className="h-4 w-full bg-background-subtle rounded animate-pulse" />
            </div>
            <div className="p-space-4 border border-border-subtle rounded-md space-y-space-2">
              <h3 className="text-block-title">Configuration</h3>
              <div className="h-4 w-full bg-background-subtle rounded animate-pulse" />
            </div>
            <div className="p-space-4 border border-border-subtle rounded-md space-y-space-2">
              <h3 className="text-block-title">Guides</h3>
              <div className="h-4 w-full bg-background-subtle rounded animate-pulse" />
            </div>
            <div className="p-space-4 border border-border-subtle rounded-md space-y-space-2">
              <h3 className="text-block-title">Reference</h3>
              <div className="h-4 w-full bg-background-subtle rounded animate-pulse" />
            </div>
          </div>

          {/* Recommended Reading */}
          <div className="space-y-space-4">
            <h3 className="text-block-title">Recommended Reading</h3>
            <div className="space-y-space-2">
              <div className="h-4 w-1/3 bg-background-subtle rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-background-subtle rounded animate-pulse" />
              <div className="h-4 w-1/4 bg-background-subtle rounded animate-pulse" />
            </div>
          </div>

          {/* Documentation CTA Placeholder */}
          <div>
            <div className="h-4 w-40 bg-background-subtle rounded animate-pulse" />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
