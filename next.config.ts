import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  reactCompiler: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  async redirects() {
    return [
      { source: "/docs/deployment/linux", destination: "/docs/deployment/native", permanent: true },
      { source: "/docs/deployment/oracle-cloud", destination: "/docs/deployment/production", permanent: true },
      { source: "/docs/configuration/graceful-shutdown", destination: "/docs/deployment/systemd", permanent: true },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-frontmatter", "remark-mdx-frontmatter", "remark-gfm"],
  },
});

export default withMDX(nextConfig);
