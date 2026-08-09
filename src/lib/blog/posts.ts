export type BlogPlatform = "Hashnode" | "Dev.to";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt?: string;
  publishedAt?: string;
  author: string;
  readingTime?: string;
  platform: BlogPlatform;
  url: string;
  external: boolean;
  coverImage: string;
  category?: string;
};

export const blogPosts: readonly BlogPost[] = [
  {
    slug: "rewriting-torus-from-nodejs-to-go",
    title: "Why I Rewrote My Reverse Proxy from Node.js to Go",
    publishedAt: "2026-07-23",
    excerpt:
      "A postmortem on rewriting a reverse proxy from Node.js to Go: 10.8× throughput, 94% lower latency, and lessons on systems architecture",
    author: "Ashish Barmaiya",
    platform: "Hashnode",
    url: "https://ashishbarmaiya.hashnode.dev/why-i-rewrote-my-reverse-proxy-from-node-js-to-go",
    external: true,
    coverImage: "/blog/why-i-rewrote-my-reverse-proxy-from-node-to-go.png",
    category: "Engineering",
  },
  {
    slug: "nodejs-clusters-graceful-teardowns",
    title: "Surviving Node.js Clusters: Graceful Teardowns, Windows Quirks, and Black-Box Testing",
    excerpt:
      "Lessons from designing Torus cluster lifecycles, testing failure paths, and making graceful shutdown work across operating systems.",
    publishedAt: "2026-04-07",
    author: "Ashish Barmaiya",
    platform: "Hashnode",
    url: "https://ashishbarmaiya.hashnode.dev/surviving-node-js-clusters-graceful-teardowns-windows-quirks-and-black-box-testing",
    external: true,
    coverImage:
      "/blog/surviving-node-js-clusters-graceful-teardowns-windows-quirks-and-black-box-testing.png",
    category: "Engineering",
  },
  {
    slug: "stream-pipeline-over-pipe",
    title: "Why I Ripped stream.pipe() Out of My Node.js API Gateway",
    excerpt:
      "A stream-lifecycle postmortem from Torus, covering half-open sockets and the move from stream.pipe() to stream.pipeline().",
    publishedAt: "2026-03-27",
    author: "Ashish Barmaiya",
    platform: "Hashnode",
    url: "https://ashishbarmaiya.hashnode.dev/why-i-ripped-streampipe-out-of-my-nodejs-api-gateway",
    external: true,
    coverImage: "/blog/why-i-ripped-stream-pipe-out-of-my-node-js-api-gateway.png",
    category: "Engineering",
  },
];
