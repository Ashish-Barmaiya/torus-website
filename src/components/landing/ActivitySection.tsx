import { PageContainer } from "@/layouts/PageLayout";

export function ActivitySection() {
  return (
    <section id="activity" aria-labelledby="activity-title">
      <PageContainer width="standard" py="large">
        <div className="space-y-space-6">
          <h2 id="activity-title" className="text-section-title">
            Project Activity
          </h2>
          
          {/* Introductory Paragraph Placeholder */}
          <div className="h-4 w-5/6 max-w-content-reading bg-background-subtle rounded animate-pulse" />
          
          {/* Activity Container Placeholder */}
          <div className="border border-border-subtle rounded-md p-space-6 bg-surface-secondary space-y-space-4">
            <div className="h-4 w-full bg-background-subtle rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-background-subtle rounded animate-pulse" />
            <div className="h-4 w-4/5 bg-background-subtle rounded animate-pulse" />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
