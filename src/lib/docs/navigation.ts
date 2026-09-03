export type DocEntry = {
  title: string;
  slug: string[];
  summary: string;
  readingTime: string;
  updated: string;
  category: string;
  packagePath?: string;
};

export type DocGroup = { title: string; items: DocEntry[] };

export const docsNavigation: DocGroup[] = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Introduction",
        slug: ["introduction"],
        summary: "An overview of Torus, and the engineering philosophy behind the project.",
        readingTime: "4 min",
        updated: "Placeholder",
        category: "Getting Started",
      },
      {
        title: "Installation",
        slug: ["getting-started", "installation"],
        summary: "Prepare a Torus binary for local or production use.",
        readingTime: "5 min",
        updated: "Placeholder",
        category: "Getting Started",
      },
      {
        title: "Quick Start",
        slug: ["getting-started", "quick-start"],
        summary: "Run a proxy and send the first request.",
        readingTime: "8 min",
        updated: "Placeholder",
        category: "Getting Started",
      },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      {
        title: "Architecture",
        slug: ["architecture"],
        summary: "The request path through Torus.",
        readingTime: "10 min",
        updated: "Placeholder",
        category: "Core Concepts",
        packagePath: "internal",
      },
      {
        title: "Runtime",
        slug: ["architecture", "runtime"],
        summary: "The immutable runtime snapshot used to process every request.",
        readingTime: "5 min",
        updated: "Placeholder",
        category: "Core Concepts",
        packagePath: "internal/runtime",
      },
      {
        title: "Router",
        slug: ["architecture", "router"],
        summary: "How Torus resolves incoming requests to logical services.",
        readingTime: "3 min",
        updated: "Placeholder",
        category: "Core Concepts",
        packagePath: "internal/router",
      },
      {
        title: "Services",
        slug: ["architecture", "services"],
        summary: "The logical abstraction between routing and backend selection.",
        readingTime: "3 min",
        updated: "Placeholder",
        category: "Core Concepts",
        packagePath: "internal/service",
      },
      {
        title: "Load Balancing",
        slug: ["architecture", "load-balancing"],
        summary: "Selecting a healthy upstream backend for every request.",
        readingTime: "2 min",
        updated: "Placeholder",
        category: "Features",
        packagePath: "internal/loadbalancer",
      },
      {
        title: "Health Checks",
        slug: ["architecture", "health-checks"],
        summary: "Monitoring backend availability through active health probing.",
        readingTime: "8 min",
        updated: "Placeholder",
        category: "Features",
        packagePath: "internal/health",
      },
      {
        title: "Reverse Proxy",
        slug: ["architecture", "reverse-proxy"],
        summary: "Forwarding requests and returning upstream responses.",
        readingTime: "9 min",
        updated: "Placeholder",
        category: "Core Concepts",
        packagePath: "internal/proxy",
      },
    ],
  },
  {
    title: "Observability",
    items: [
      {
        title: "Overview",
        slug: ["observability"],
        summary: "An introduction to Torus' observability capabilities.",
        readingTime: "7 min",
        updated: "Placeholder",
        category: "Observability",
      },
      {
        title: "Logging",
        slug: ["observability", "logging"],
        summary: "Structured request and operational logging in Torus.",
        readingTime: "6 min",
        updated: "Placeholder",
        category: "Observability",
      },
      {
        title: "Metrics",
        slug: ["observability", "metrics"],
        summary: "Metrics exported by Torus for monitoring runtime behavior and performance.",
        readingTime: "7 min",
        updated: "Placeholder",
        category: "Observability",
      },
      {
        title: "Health Endpoint",
        slug: ["observability", "health-endpoint"],
        summary: "Reporting the operational readiness of a running Torus instance.",
        readingTime: "4 min",
        updated: "Placeholder",
        category: "Observability",
      },
    ],
  },
  {
    title: "Configuration",
    items: [
      {
        title: "Overview",
        slug: ["configuration"],
        summary: "An introduction to Torus configuration.",
        readingTime: "10 min",
        updated: "Placeholder",
        category: "Configuration",
        packagePath: "internal/config",
      },
      {
        title: "API Version",
        slug: ["configuration", "api-version"],
        summary: "Configuration schema versioning in Torus.",
        readingTime: "3 min",
        updated: "Placeholder",
        category: "Configuration",
      },
      {
        title: "Server",
        slug: ["configuration", "server"],
        summary: "Configuring the HTTP or HTTPS listener for Torus.",
        readingTime: "1 min",
        updated: "Placeholder",
        category: "Configuration",
      },
      {
        title: "Routing",
        slug: ["configuration", "routing"],
        summary: "Configure request paths and map them to services.",
        readingTime: "8 min",
        updated: "Placeholder",
        category: "Configuration",
      },
      {
        title: "Services",
        slug: ["configuration", "services"],
        summary: "Configure services and the upstream backends they own.",
        readingTime: "6 min",
        updated: "Placeholder",
        category: "Configuration",
      },
      {
        title: "TLS",
        slug: ["configuration", "tls"],
        summary: "Configuring HTTPS termination for Torus..",
        readingTime: "7 min",
        updated: "Placeholder",
        category: "Configuration",
      },
      {
        title: "Health",
        slug: ["configuration", "health"],
        summary: "Configuring active health checks for upstream backends.",
        readingTime: "1 min",
        updated: "Placeholder",
        category: "Configuration",
      },
      {
        title: "Observability",
        slug: ["configuration", "observability"],
        summary: "Configuring Prometheus metrics collection and Grafana dashboards.",
        readingTime: "5 min",
        updated: "Placeholder",
        category: "Configuration",
      },

      {
        title: "Configuration Reload",
        slug: ["configuration", "configuration-reload"],
        summary:
          "Update Torus configuration without restarting the proxy or interrupting active requests.",
        readingTime: "7 min",
        updated: "Placeholder",
        category: "Configuration",
      },
    ],
  },
  {
    title: "Deployment",
    items: [
      {
        title: "Overview",
        slug: ["deployment"],
        summary: "Production deployment patterns for Torus.",
        readingTime: "8 min",
        updated: "Placeholder",
        category: "Deployment",
      },
      {
        title: "Docker",
        slug: ["deployment", "docker"],
        summary: "Containerized Torus deployments.",
        readingTime: "6 min",
        updated: "Placeholder",
        category: "Deployment",
      },
      {
        title: "Native",
        slug: ["deployment", "native"],
        summary: "Run Torus directly for local development, debugging, and benchmarking.",
        readingTime: "7 min",
        updated: "Placeholder",
        category: "Deployment",
      },
      {
        title: "systemd",
        slug: ["deployment", "systemd"],
        summary: "A service unit for reliable process supervision.",
        readingTime: "5 min",
        updated: "Placeholder",
        category: "Deployment",
      },
      {
        title: "Production",
        slug: ["deployment", "production"],
        summary: "Deploy Torus as a systemd-managed service on a Linux virtual machine.",
        readingTime: "10 min",
        updated: "Placeholder",
        category: "Deployment",
      },
    ],
  },
  {
    title: "Benchmarking",
    items: [
      {
        title: "Benchmark Methodology",
        slug: ["benchmarking", "methodology"],
        summary: "How to read and reproduce Torus benchmarks.",
        readingTime: "9 min",
        updated: "Placeholder",
        category: "Benchmarking",
      },
      {
        title: "Reproducing Benchmarks",
        slug: ["benchmarking", "reproducing-benchmarks"],
        summary: "Instructions for reproducing Torus benchmarks.",
        readingTime: "7 min",
        updated: "Placeholder",
        category: "Benchmarking",
      },
      {
        title: "Benchmark Reports",
        slug: ["benchmarking", "reports"],
        summary: "Published benchmark reports placeholder.",
        readingTime: "5 min",
        updated: "Placeholder",
        category: "Benchmarking",
      },
      {
        title: "Datasets",
        slug: ["benchmarking", "datasets"],
        summary: "Benchmark datasets and fixtures placeholder.",
        readingTime: "4 min",
        updated: "Placeholder",
        category: "Benchmarking",
      },
    ],
  },
  {
    title: "Reference",
    items: [
      {
        title: "Configuration Reference",
        slug: ["reference", "configuration"],
        summary: "Complete reference for the Torus v2 configuration schema.",
        readingTime: "12 min",
        updated: "Placeholder",
        category: "Reference",
      },
      {
        title: "CLI Reference",
        slug: ["reference", "cli"],
        summary: "Command-line interface reference for Torus and the development mock backend.",
        readingTime: "6 min",
        updated: "Placeholder",
        category: "Reference",
      },
      {
        title: "Package Reference",
        slug: ["reference", "packages"],
        summary: "A reference to the packages and subsystem boundaries that make up Torus.",
        readingTime: "8 min",
        updated: "Placeholder",
        category: "Reference",
      },
    ],
  },
  {
    title: "Engineering",
    items: [
      {
        title: "ADRs",
        slug: ["adrs"],
        summary: "Architecture decision records.",
        readingTime: "5 min",
        updated: "Placeholder",
        category: "Engineering",
      },
      {
        title: "Runtime Lifecycle",
        slug: ["engineering", "runtime-lifecycle"],
        summary: "How runtime generations are built, replaced, drained, and stopped.",
        readingTime: "6 min",
        updated: "2026-09-03",
        category: "Engineering",
        packagePath: "docs/engineering/architecture",
      },
    ],
  },
];

export const allDocs = docsNavigation.flatMap((group) => group.items);
export const hrefForDoc = (doc: DocEntry) => `/docs/${doc.slug.join("/")}`;
export const categorySlugFor = (group: DocGroup) => group.title.toLowerCase().replaceAll(" ", "-");
export const hrefForCategory = (group: DocGroup) => `/docs/category/${categorySlugFor(group)}`;
export const getCategoryBySlug = (slug: string) =>
  docsNavigation.find((group) => categorySlugFor(group) === slug);
export const getDocBySlug = (slug: string[]) =>
  allDocs.find((doc) => doc.slug.join("/") === slug.join("/"));
export const getAdjacentDocs = (doc: DocEntry) => {
  const index = allDocs.findIndex((entry) => entry.slug.join("/") === doc.slug.join("/"));
  return { previous: allDocs[index - 1], next: allDocs[index + 1] };
};
