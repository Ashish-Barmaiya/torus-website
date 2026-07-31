import type { ReactNode } from "react";

type MdxDocument = (props: Record<string, unknown>) => ReactNode;
type MdxLoader = () => Promise<{ default: MdxDocument }>;

const mdxDocuments: Record<string, MdxLoader> = {
  introduction: () => import("../../../content/docs/introduction.mdx"),
  "getting-started/installation": () => import("../../../content/docs/getting-started/installation.mdx"),
  "getting-started/quick-start": () => import("../../../content/docs/getting-started/quick-start.mdx"),
  architecture: () => import("../../../content/docs/architecture.mdx"),
  "architecture/execution-pipeline": () => import("../../../content/docs/architecture/execution-pipeline.mdx"),
  runtime: () => import("../../../content/docs/runtime.mdx"),
  router: () => import("../../../content/docs/router.mdx"),
  services: () => import("../../../content/docs/services.mdx"),
  "reverse-proxy": () => import("../../../content/docs/reverse-proxy.mdx"),
  configuration: () => import("../../../content/docs/configuration.mdx"),
  routing: () => import("../../../content/docs/routing.mdx"),
  tls: () => import("../../../content/docs/tls.mdx"),
  "load-balancing": () => import("../../../content/docs/load-balancing.mdx"),
  "health-checks": () => import("../../../content/docs/health-checks.mdx"),
  deployment: () => import("../../../content/docs/deployment.mdx"),
  "deployment/docker": () => import("../../../content/docs/deployment/docker.mdx"),
  "deployment/linux": () => import("../../../content/docs/deployment/linux.mdx"),
  "deployment/systemd": () => import("../../../content/docs/deployment/systemd.mdx"),
  "deployment/oracle-cloud": () => import("../../../content/docs/deployment/oracle-cloud.mdx"),
  observability: () => import("../../../content/docs/observability.mdx"),
  "observability/logging": () => import("../../../content/docs/observability/logging.mdx"),
  "observability/metrics": () => import("../../../content/docs/observability/metrics.mdx"),
  "observability/health-endpoint": () => import("../../../content/docs/observability/health-endpoint.mdx"),
  "benchmarking/methodology": () => import("../../../content/docs/benchmarking/methodology.mdx"),
  "benchmarking/reports": () => import("../../../content/docs/benchmarking/reports.mdx"),
  "benchmarking/datasets": () => import("../../../content/docs/benchmarking/datasets.mdx"),
  "reference/configuration": () => import("../../../content/docs/reference/configuration.mdx"),
  "reference/cli": () => import("../../../content/docs/reference/cli.mdx"),
  "reference/packages": () => import("../../../content/docs/reference/packages.mdx"),
  adrs: () => import("../../../content/docs/adrs.mdx"),
  roadmap: () => import("../../../content/docs/roadmap.mdx"),
};

export async function getDocContent(slug: string[]): Promise<MdxDocument> {
  const document = mdxDocuments[slug.join("/")];

  if (!document) {
    throw new Error(`Missing MDX document for ${slug.join("/")}`);
  }

  return (await document()).default;
}
