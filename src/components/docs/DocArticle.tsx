import { getDocContent, getDocHeadings } from "@/lib/docs/content";
import { getAdjacentDocs, type DocEntry } from "@/lib/docs/navigation";
import { allDocs } from "@/lib/docs/navigation";

import { DocArticleContent } from "./DocArticleContent";

export async function DocArticle({
  doc,
  metadata,
}: {
  doc: DocEntry;
  metadata?: Record<string, unknown>;
}) {
  const { previous, next } = getAdjacentDocs(doc);
  const [Content, headings] = await Promise.all([
    getDocContent(doc.slug),
    getDocHeadings(doc.slug),
  ]);

  const packagePath = (metadata?.package as string) ?? doc.packagePath ?? null;
  const files = (metadata?.files as string[]) ?? null;
  const relatedSlugs = (metadata?.related as string[]) ?? null;
  const updated = (metadata?.updated as string) ?? doc.updated;

  const relatedDocs = relatedSlugs
    ? relatedSlugs
        .map((slug) => allDocs.find((d) => d.slug.join("/") === slug.replace("/", "/")))
        .filter((doc): doc is DocEntry => Boolean(doc))
    : null;

  return (
    <DocArticleContent
      doc={doc}
      Content={Content}
      headings={headings}
      packagePath={packagePath}
      files={files}
      relatedDocs={relatedDocs ?? undefined}
      updated={updated}
      previous={previous}
      next={next}
    />
  );
}
