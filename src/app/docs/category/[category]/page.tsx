import { notFound } from "next/navigation";

import { DocsCategory } from "@/components/docs/DocsCategory";
import { categorySlugFor, docsNavigation, getCategoryBySlug } from "@/lib/docs/navigation";

export function generateStaticParams() {
  return docsNavigation.map((group) => ({ category: categorySlugFor(group) }));
}

export default async function DocsCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const group = getCategoryBySlug(category);

  if (!group) {
    notFound();
  }

  return <DocsCategory group={group} />;
}
