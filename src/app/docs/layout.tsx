import { DocsSidebar } from "@/components/docs/DocsSidebar";

export default function DocsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mx-auto grid max-w-[1520px] lg:grid-cols-[296px_minmax(0,1fr)] lg:px-8 xl:px-12">
      <DocsSidebar />
      {children}
    </div>
  );
}
