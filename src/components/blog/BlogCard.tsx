import Image from "next/image";

import type { BlogPost } from "@/lib/blog/posts";

function formatPublishedAt(publishedAt: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${publishedAt}T00:00:00Z`));
}

export function BlogCard({ post }: { post: BlogPost }) {
  const metadata = [
    post.publishedAt ? formatPublishedAt(post.publishedAt) : undefined,
    post.author,
    post.readingTime,
  ].filter(Boolean);

  return (
    <article className="group h-[34rem]">
      <a
        href={post.url}
        target={post.external ? "_blank" : undefined}
        rel={post.external ? "noreferrer" : undefined}
        aria-label={`${post.title} on ${post.platform}${post.external ? " (opens in a new tab)" : ""}`}
        className="grid h-full grid-rows-[auto_minmax(0,1fr)] overflow-hidden border border-[var(--line)] bg-[var(--surface)] transition-colors hover:border-[var(--line-strong)] hover:bg-[var(--paper-deep)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--signal)]"
      >
        <div className="relative aspect-[16/9] overflow-hidden border-b border-[var(--line)] bg-[var(--paper-deep)]">
          <Image
            src={post.coverImage}
            alt={`Cover image for ${post.title}`}
            fill
            sizes="(min-width: 1280px) 32vw, (min-width: 768px) 48vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none"
          />
        </div>

        <div className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)_auto] p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] tracking-[0.12em] text-[var(--ink-faint)] uppercase">
            {post.category ? <span>{post.category}</span> : <span aria-hidden="true" />}
            <span className="flex shrink-0 items-center gap-1.5">
              {post.platform}
              {post.external ? (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="size-3 fill-none stroke-current stroke-[1.5]"
                >
                  <path d="M6 3h7v7M13 3 7 9" />
                  <path d="M13 9v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h3" />
                </svg>
              ) : null}
            </span>
          </div>

          <div className="pt-5">
            <h2 className="h-24 overflow-hidden text-xl leading-7 font-semibold tracking-[-0.035em] text-[var(--ink)] sm:text-2xl sm:leading-8">
              <span className="line-clamp-3">{post.title}</span>
            </h2>

            <p className="mt-3 h-[4.5rem] overflow-hidden leading-6 text-[var(--ink-soft)]">
              <span className="line-clamp-3">{post.excerpt}</span>
            </p>
          </div>

          <p className="border-t border-[var(--line)] pt-4 font-[family-name:var(--font-ibm-plex-mono)] text-xs leading-5 text-[var(--ink-faint)]">
            {metadata.join(" · ")}
          </p>
        </div>
      </a>
    </article>
  );
}
