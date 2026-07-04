import { PageContainer } from "@/layouts/PageLayout";

export function HeroSection() {
  return (
    <section id="hero" aria-labelledby="hero-title">
      <PageContainer width="standard" py="large">
        <div className="space-y-space-5">
          <h1 id="hero-title" className="text-display">
            TORUS
          </h1>
          
          {/* One Sentence Description Placeholder */}
          <div className="h-6 w-3/4 max-w-md bg-background-subtle rounded animate-pulse" />
          
          {/* Supporting Paragraph Placeholder */}
          <div className="space-y-space-2 max-w-content-reading">
            <div className="h-4 w-full bg-background-subtle rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-background-subtle rounded animate-pulse" />
          </div>

          {/* Primary Actions Placeholders */}
          <div className="flex items-center gap-space-4">
            <div className="h-10 w-32 bg-background-subtle rounded animate-pulse" />
            <div className="h-10 w-32 bg-background-subtle rounded animate-pulse" />
          </div>

          {/* Project Metadata Placeholders */}
          <div className="flex gap-space-3">
            <div className="h-4 w-12 bg-background-subtle rounded animate-pulse" />
            <div className="h-4 w-12 bg-background-subtle rounded animate-pulse" />
            <div className="h-4 w-12 bg-background-subtle rounded animate-pulse" />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
