import { PageContainer } from "@/layouts/PageLayout";

export function EngineeringPrinciplesSection() {
  return (
    <section id="principles" aria-labelledby="principles-title">
      <PageContainer width="standard" py="large">
        <div className="space-y-space-6">
          <h2 id="principles-title" className="text-section-title">
            Engineering Principles
          </h2>
          
          {/* Introductory Paragraph Placeholder */}
          <div className="h-4 w-5/6 max-w-content-reading bg-background-subtle rounded animate-pulse" />
          
          {/* Principle Grid Placeholder (6 canonical principles) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-6">
            <div className="space-y-space-2 p-space-4 border border-border-subtle rounded-md">
              <h3 className="text-subsection-title">Performance First</h3>
              <div className="h-4 w-full bg-background-subtle rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-background-subtle rounded animate-pulse" />
            </div>
            <div className="space-y-space-2 p-space-4 border border-border-subtle rounded-md">
              <h3 className="text-subsection-title">Simplicity Through Design</h3>
              <div className="h-4 w-full bg-background-subtle rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-background-subtle rounded animate-pulse" />
            </div>
            <div className="space-y-space-2 p-space-4 border border-border-subtle rounded-md">
              <h3 className="text-subsection-title">Correctness Before Optimization</h3>
              <div className="h-4 w-full bg-background-subtle rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-background-subtle rounded animate-pulse" />
            </div>
            <div className="space-y-space-2 p-space-4 border border-border-subtle rounded-md">
              <h3 className="text-subsection-title">Explicit Over Implicit</h3>
              <div className="h-4 w-full bg-background-subtle rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-background-subtle rounded animate-pulse" />
            </div>
            <div className="space-y-space-2 p-space-4 border border-border-subtle rounded-md">
              <h3 className="text-subsection-title">Observability by Default</h3>
              <div className="h-4 w-full bg-background-subtle rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-background-subtle rounded animate-pulse" />
            </div>
            <div className="space-y-space-2 p-space-4 border border-border-subtle rounded-md">
              <h3 className="text-subsection-title">Evidence-Driven Engineering</h3>
              <div className="h-4 w-full bg-background-subtle rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-background-subtle rounded animate-pulse" />
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
