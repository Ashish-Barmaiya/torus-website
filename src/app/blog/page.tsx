import type { Metadata } from "next";

import { BlogGrid } from "@/components/blog/BlogGrid";
import { blogPosts } from "@/lib/blog/posts";

export const metadata: Metadata = {
  title: "Blog | Torus",
  description: "Engineering notes, experiments, and lessons from building Torus.",
};

export default function BlogPage() {
  return (
    <section className="border-b border-[var(--line)]">
      <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <header className="max-w-3xl border-b border-[var(--line)] pb-9 sm:pb-10">
          <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] tracking-[0.14em] text-[var(--signal-dark)] uppercase dark:text-[var(--signal)]">
            Torus journal
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.055em] text-[var(--ink)] sm:text-5xl">
            Blog
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-7 text-[var(--ink-soft)]">
            Engineering notes, experiments, and lessons from building Torus.
          </p>
        </header>

        <BlogGrid posts={blogPosts} />
      </div>
    </section>
  );
}
