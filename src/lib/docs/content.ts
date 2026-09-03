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
    loader: () => import("../../../content/docs/architecture/overview.mdx"),
    filePath: path.join(docsRoot, "architecture", "overview.mdx"),
  },
  "architecture/runtime": {
    loader: () => import("../../../content/docs/architecture/runtime.mdx"),
    filePath: path.join(docsRoot, "architecture", "runtime.mdx"),
  },
  "architecture/router": {
    loader: () => import("../../../content/docs/architecture/router.mdx"),
    filePath: path.join(docsRoot, "architecture", "router.mdx"),
  },
  "architecture/services": {
    loader: () => import("../../../content/docs/architecture/services.mdx"),
    filePath: path.join(docsRoot, "architecture", "services.mdx"),
  },
  "architecture/load-balancing": {
    loader: () => import("../../../content/docs/architecture/load-balancing.mdx"),
    filePath: path.join(docsRoot, "architecture", "load-balancing.mdx"),
  },
  "architecture/health-checks": {
    loader: () => import("../../../content/docs/architecture/health-checks.mdx"),
    filePath: path.join(docsRoot, "architecture", "health-checks.mdx"),
  },
  "architecture/reverse-proxy": {
    loader: () => import("../../../content/docs/architecture/reverse-proxy.mdx"),
    filePath: path.join(docsRoot, "architecture", "reverse-proxy.mdx"),
  },
  observability: {
    loader: () => import("../../../content/docs/observability/overview.mdx"),
    filePath: path.join(docsRoot, "observability", "overview.mdx"),
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
  configuration: {
    loader: () => import("../../../content/docs/configuration/overview.mdx"),
    filePath: path.join(docsRoot, "configuration", "overview.mdx"),
  },
  "configuration/api-version": {
    loader: () => import("../../../content/docs/configuration/api-version.mdx"),
    filePath: path.join(docsRoot, "configuration", "api-version.mdx"),
  },
  "configuration/server": {
    loader: () => import("../../../content/docs/configuration/server.mdx"),
    filePath: path.join(docsRoot, "configuration", "server.mdx"),
  },
  "configuration/routing": {
    loader: () => import("../../../content/docs/configuration/routing.mdx"),
    filePath: path.join(docsRoot, "configuration", "routing.mdx"),
  },
  "configuration/services": {
    loader: () => import("../../../content/docs/configuration/services.mdx"),
    filePath: path.join(docsRoot, "configuration", "services.mdx"),
  },
  "configuration/tls": {
    loader: () => import("../../../content/docs/configuration/tls.mdx"),
    filePath: path.join(docsRoot, "configuration", "tls.mdx"),
  },

  "configuration/health": {
    loader: () => import("../../../content/docs/configuration/health.mdx"),
    filePath: path.join(docsRoot, "configuration", "health.mdx"),
  },
  "configuration/observability": {
    loader: () => import("../../../content/docs/configuration/observability.mdx"),
    filePath: path.join(docsRoot, "configuration", "observability.mdx"),
  },

  "configuration/configuration-reload": {
    loader: () => import("../../../content/docs/configuration/configuration-reload.mdx"),
    filePath: path.join(docsRoot, "configuration", "configuration-reload.mdx"),
  },
  deployment: {
    loader: () => import("../../../content/docs/deployment/overview.mdx"),
    filePath: path.join(docsRoot, "deployment", "overview.mdx"),
  },
  "deployment/docker": {
    loader: () => import("../../../content/docs/deployment/docker.mdx"),
    filePath: path.join(docsRoot, "deployment", "docker.mdx"),
  },
  "deployment/native": {
    loader: () => import("../../../content/docs/deployment/native.mdx"),
    filePath: path.join(docsRoot, "deployment", "native.mdx"),
  },
  "deployment/systemd": {
    loader: () => import("../../../content/docs/deployment/systemd.mdx"),
    filePath: path.join(docsRoot, "deployment", "systemd.mdx"),
  },
  "deployment/production": {
    loader: () => import("../../../content/docs/deployment/production.mdx"),
    filePath: path.join(docsRoot, "deployment", "production.mdx"),
  },
  "benchmarking/methodology": {
    loader: () => import("../../../content/docs/benchmarking/methodology.mdx"),
    filePath: path.join(docsRoot, "benchmarking", "methodology.mdx"),
  },
  "benchmarking/reproducing-benchmarks": {
    loader: () => import("../../../content/docs/benchmarking/reproducing-benchmarks.mdx"),
    filePath: path.join(docsRoot, "benchmarking", "reproducing-benchmarks.mdx"),
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
  "engineering/runtime-lifecycle": {
    loader: () => import("../../../content/docs/engineering/runtime-lifecycle.mdx"),
    filePath: path.join(docsRoot, "engineering", "runtime-lifecycle.mdx"),
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
