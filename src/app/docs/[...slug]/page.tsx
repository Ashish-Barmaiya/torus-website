import { notFound } from "next/navigation";
import { DocArticle } from "@/components/docs/DocArticle";
import { allDocs, getDocBySlug } from "@/lib/docs/navigation";

export function generateStaticParams() { return allDocs.map((doc) => ({ slug: doc.slug })); }

export default async function DocPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  return <DocArticle doc={doc} />;
}
