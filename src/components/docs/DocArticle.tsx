import { getDocContent, getDocHeadings, type DocMetadata } from "@/lib/docs/content";
import { getAdjacentDocs, type DocEntry } from "@/lib/docs/navigation";
import { allDocs } from "@/lib/docs/navigation";

import { DocArticleContent } from "./DocArticleContent";

export async function DocArticle({ doc, metadata }: { doc: DocEntry; metadata?: DocMetadata }) {
  const { previous, next } = getAdjacentDocs(doc);
  const [Content, headings] = await Promise.all([
    getDocContent(doc.slug),
    getDocHeadings(doc.slug),
  ]);

  const packagePath = metadata?.package ?? doc.packagePath;
  const files = metadata?.files;
  const relatedSlugs = metadata?.related;
  const updated = metadata?.updated ?? doc.updated;
  const readingTime = metadata?.readingTime ?? doc.readingTime;

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
      readingTime={readingTime}
      previous={previous}
      next={next}
    />
  );
}
