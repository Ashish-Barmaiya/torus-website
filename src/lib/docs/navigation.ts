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
        summary: "What Torus is and the problems it is designed to solve.",
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
        title: "Execution Pipeline",
        slug: ["architecture", "execution-pipeline"],
        summary: "How a request moves between runtime, router, service and proxy.",
        readingTime: "12 min",
        updated: "Placeholder",
        category: "Core Concepts",
        packagePath: "internal/runtime",
      },
      {
        title: "Runtime",
        slug: ["runtime"],
        summary: "Immutable runtime snapshots and safe configuration reloads.",
        readingTime: "9 min",
        updated: "Placeholder",
        category: "Core Concepts",
        packagePath: "internal/runtime",
      },
      {
        title: "Router",
        slug: ["router"],
        summary: "Longest-prefix matching and route selection.",
        readingTime: "8 min",
        updated: "Placeholder",
        category: "Core Concepts",
        packagePath: "internal/router",
      },
      {
        title: "Services",
        slug: ["services"],
        summary: "The service boundary between routes and upstreams.",
        readingTime: "7 min",
        updated: "Placeholder",
        category: "Core Concepts",
        packagePath: "internal/service",
      },
      {
        title: "Load Balancing",
        slug: ["load-balancing"],
        summary: "Health-aware upstream selection policies.",
        readingTime: "9 min",
        updated: "Placeholder",
        category: "Features",
        packagePath: "internal/loadbalancer",
      },
      {
        title: "Health Checks",
        slug: ["health-checks"],
        summary: "Tracking backend availability before a request is sent.",
        readingTime: "8 min",
        updated: "Placeholder",
        category: "Features",
        packagePath: "internal/health",
      },
      {
        title: "Reverse Proxy",
        slug: ["reverse-proxy"],
        summary: "Forwarding requests and returning upstream responses.",
        readingTime: "9 min",
        updated: "Placeholder",
        category: "Core Concepts",
        packagePath: "internal/proxy",
      },
    ],
  },
  {
    title: "Configuration",
    items: [
      {
        title: "Configuration",
        slug: ["configuration"],
        summary: "Configuration file structure and validation boundaries.",
        readingTime: "10 min",
        updated: "Placeholder",
        category: "Configuration",
        packagePath: "internal/config",
      },
      {
        title: "Routing",
        slug: ["routing"],
        summary: "Route prefixes, services and request matching.",
        readingTime: "8 min",
        updated: "Placeholder",
        category: "Configuration",
      },
      {
        title: "TLS",
        slug: ["tls"],
        summary: "TLS termination and certificate configuration.",
        readingTime: "7 min",
        updated: "Placeholder",
        category: "Configuration",
      },
      {
        title: "Hot Reload",
        slug: ["hot-reload"],
        summary: "Hot reload configuration changes without downtime.",
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
        title: "Deployment",
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
        title: "Linux",
        slug: ["deployment", "linux"],
        summary: "Linux process and filesystem considerations.",
        readingTime: "6 min",
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
        title: "Oracle Cloud",
        slug: ["deployment", "oracle-cloud"],
        summary: "Cloud deployment placeholder guidance.",
        readingTime: "6 min",
        updated: "Placeholder",
        category: "Deployment",
      },
    ],
  },
  {
    title: "Observability",
    items: [
      {
        title: "Observability",
        slug: ["observability"],
        summary: "Signals that explain the state of a running proxy.",
        readingTime: "7 min",
        updated: "Placeholder",
        category: "Observability",
      },
      {
        title: "Logging",
        slug: ["observability", "logging"],
        summary: "Request and operational logs.",
        readingTime: "6 min",
        updated: "Placeholder",
        category: "Observability",
      },
      {
        title: "Metrics",
        slug: ["observability", "metrics"],
        summary: "Metrics placeholders for traffic and upstream health.",
        readingTime: "7 min",
        updated: "Placeholder",
        category: "Observability",
      },
      {
        title: "Health Endpoint",
        slug: ["observability", "health-endpoint"],
        summary: "Health endpoint behavior and intent.",
        readingTime: "4 min",
        updated: "Placeholder",
        category: "Observability",
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
        summary: "Configuration fields, defaults and requirements.",
        readingTime: "12 min",
        updated: "Placeholder",
        category: "Reference",
      },
      {
        title: "CLI Reference",
        slug: ["reference", "cli"],
        summary: "Command-line reference placeholder.",
        readingTime: "6 min",
        updated: "Placeholder",
        category: "Reference",
      },
      {
        title: "Package Reference",
        slug: ["reference", "packages"],
        summary: "Go package reference placeholder.",
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
