import { notFound } from "next/navigation";
import { DocArticle } from "@/components/docs/DocArticle";
import { allDocs, getDocBySlug } from "@/lib/docs/navigation";
import { getDocMetadata } from "@/lib/docs/content";

export function generateStaticParams() {
  return allDocs.map((doc) => ({ slug: doc.slug }));
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  const metadata = await getDocMetadata(slug);

  return <DocArticle doc={doc} metadata={metadata} />;
}

