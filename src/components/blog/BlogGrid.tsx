import type { BlogPost } from "@/lib/blog/posts";

import { BlogCard } from "./BlogCard";

export function BlogGrid({ posts }: { posts: readonly BlogPost[] }) {
  return (
    <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
