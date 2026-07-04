import { PageContainer } from "@/layouts/PageLayout";

export default function Home() {
  return (
    <PageContainer width="standard" py="large" align="left">
      <h1 className="mb-space-4">Torus Project</h1>
      <p className="text-text-secondary">
        Welcome to the Torus project. Torus is a Layer 7 reverse proxy and API gateway written in Go.
      </p>
    </PageContainer>
  );
}
