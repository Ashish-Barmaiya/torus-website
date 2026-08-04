import type { ReactNode } from "react";
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

import { type HeadingItem, extractHeadingsFromSource } from "@/lib/docs/headings";

type MdxDocument = (props: Record<string, unknown>) => ReactNode;
type MdxLoader = () => Promise<{ default: MdxDocument }>;

export interface DocMetadata {
  title?: string;
  description?: string;

  package?: string;
  files?: string[];
  related?: string[];

  updated?: string;

  readingTime?: string;
  wordCount?: number;
}

const docsRoot = path.join(process.cwd(), "content", "docs");

const mdxDocuments: Record<string, { loader: MdxLoader; filePath: string }> = {
  introduction: {
    loader: () => import("../../../content/docs/introduction.mdx"),
    filePath: path.join(docsRoot, "introduction.mdx"),
  },
  "getting-started/installation": {
    loader: () => import("../../../content/docs/getting-started/installation.mdx"),
    filePath: path.join(docsRoot, "getting-started", "installation.mdx"),
  },
  "getting-started/quick-start": {
    loader: () => import("../../../content/docs/getting-started/quick-start.mdx"),
    filePath: path.join(docsRoot, "getting-started", "quick-start.mdx"),
  },
  architecture: {
    loader: () => import("../../../content/docs/architecture.mdx"),
    filePath: path.join(docsRoot, "architecture.mdx"),
  },
  "architecture/execution-pipeline": {
    loader: () => import("../../../content/docs/architecture/execution-pipeline.mdx"),
    filePath: path.join(docsRoot, "architecture", "execution-pipeline.mdx"),
  },
  runtime: {
    loader: () => import("../../../content/docs/runtime.mdx"),
    filePath: path.join(docsRoot, "runtime.mdx"),
  },
  router: {
    loader: () => import("../../../content/docs/router.mdx"),
    filePath: path.join(docsRoot, "router.mdx"),
  },
  services: {
    loader: () => import("../../../content/docs/services.mdx"),
    filePath: path.join(docsRoot, "services.mdx"),
  },
  "reverse-proxy": {
    loader: () => import("../../../content/docs/reverse-proxy.mdx"),
    filePath: path.join(docsRoot, "reverse-proxy.mdx"),
  },
  configuration: {
    loader: () => import("../../../content/docs/configuration.mdx"),
    filePath: path.join(docsRoot, "configuration.mdx"),
  },
  routing: {
    loader: () => import("../../../content/docs/routing.mdx"),
    filePath: path.join(docsRoot, "routing.mdx"),
  },
  tls: {
    loader: () => import("../../../content/docs/tls.mdx"),
    filePath: path.join(docsRoot, "tls.mdx"),
  },
  "load-balancing": {
    loader: () => import("../../../content/docs/load-balancing.mdx"),
    filePath: path.join(docsRoot, "load-balancing.mdx"),
  },
  "health-checks": {
    loader: () => import("../../../content/docs/health-checks.mdx"),
    filePath: path.join(docsRoot, "health-checks.mdx"),
  },
  deployment: {
    loader: () => import("../../../content/docs/deployment.mdx"),
    filePath: path.join(docsRoot, "deployment.mdx"),
  },
  "deployment/docker": {
    loader: () => import("../../../content/docs/deployment/docker.mdx"),
    filePath: path.join(docsRoot, "deployment", "docker.mdx"),
  },
  "deployment/linux": {
    loader: () => import("../../../content/docs/deployment/linux.mdx"),
    filePath: path.join(docsRoot, "deployment", "linux.mdx"),
  },
  "deployment/systemd": {
    loader: () => import("../../../content/docs/deployment/systemd.mdx"),
    filePath: path.join(docsRoot, "deployment", "systemd.mdx"),
  },
  "deployment/oracle-cloud": {
    loader: () => import("../../../content/docs/deployment/oracle-cloud.mdx"),
    filePath: path.join(docsRoot, "deployment", "oracle-cloud.mdx"),
  },
  observability: {
    loader: () => import("../../../content/docs/observability.mdx"),
    filePath: path.join(docsRoot, "observability.mdx"),
  },
  "observability/logging": {
    loader: () => import("../../../content/docs/observability/logging.mdx"),
    filePath: path.join(docsRoot, "observability", "logging.mdx"),
  },
  "observability/metrics": {
    loader: () => import("../../../content/docs/observability/metrics.mdx"),
    filePath: path.join(docsRoot, "observability", "metrics.mdx"),
  },
  "observability/health-endpoint": {
    loader: () => import("../../../content/docs/observability/health-endpoint.mdx"),
    filePath: path.join(docsRoot, "observability", "health-endpoint.mdx"),
  },
  "benchmarking/methodology": {
    loader: () => import("../../../content/docs/benchmarking/methodology.mdx"),
    filePath: path.join(docsRoot, "benchmarking", "methodology.mdx"),
  },
  "benchmarking/reports": {
    loader: () => import("../../../content/docs/benchmarking/reports.mdx"),
    filePath: path.join(docsRoot, "benchmarking", "reports.mdx"),
  },
  "benchmarking/datasets": {
    loader: () => import("../../../content/docs/benchmarking/datasets.mdx"),
    filePath: path.join(docsRoot, "benchmarking", "datasets.mdx"),
  },
  "reference/configuration": {
    loader: () => import("../../../content/docs/reference/configuration.mdx"),
    filePath: path.join(docsRoot, "reference", "configuration.mdx"),
  },
  "reference/cli": {
    loader: () => import("../../../content/docs/reference/cli.mdx"),
    filePath: path.join(docsRoot, "reference", "cli.mdx"),
  },
  "reference/packages": {
    loader: () => import("../../../content/docs/reference/packages.mdx"),
    filePath: path.join(docsRoot, "reference", "packages.mdx"),
  },
  adrs: {
    loader: () => import("../../../content/docs/adrs.mdx"),
    filePath: path.join(docsRoot, "adrs.mdx"),
  },
  roadmap: {
    loader: () => import("../../../content/docs/roadmap.mdx"),
    filePath: path.join(docsRoot, "roadmap.mdx"),
  },
};

function getDocument(slug: string[]) {
  const document = mdxDocuments[slug.join("/")];

  if (!document) {
    throw new Error(`Missing MDX document for ${slug.join("/")}`);
  }

  return document;
}

export async function getDocContent(slug: string[]): Promise<MdxDocument> {
  const document = getDocument(slug);
  return (await document.loader()).default;
}

function calculateWordCount(content: string): number {
  return content.trim().split(/\s+/).filter(Boolean).length;
}

function calculateReadingTime(wordCount: number): string {
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min`;
}

export async function getDocMetadata(slug: string[]): Promise<DocMetadata> {
  const document = getDocument(slug);

  const source = await fs.readFile(document.filePath, "utf8");

  const { data, content } = matter(source);

  const wordCount = calculateWordCount(content);

  return {
    ...(data as DocMetadata),

    wordCount,

    readingTime: calculateReadingTime(wordCount),
  };
}

export async function getDocHeadings(slug: string[]): Promise<HeadingItem[]> {
  const document = getDocument(slug);
  const source = await fs.readFile(document.filePath, "utf8");
  const { content } = matter(source);
  return extractHeadingsFromSource(content);
}
