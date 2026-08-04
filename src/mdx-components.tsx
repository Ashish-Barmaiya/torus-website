import type { ComponentProps, ReactNode } from "react";
import { Mermaid } from "@/components/docs/Mermaid";

import {
  ApiReference,
  ArchitectureDiagram,
  BenchmarkCard,
  BenchmarkResult,
  CodeBlock,
  CodeTabs,
  Command,
  ConfigExample,
  ConfigReference,
  FileTree,
  Info,
  Note,
  Package,
  RequestFlow,
  Tip,
  Warning,
} from "@/components/docs/MdxComponents";

function normalizeHeadingText(text: string): string {
  return text
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/_(.*?)_/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function getTextFromChildren(children: unknown): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(getTextFromChildren).join("");
  }

  if (children && typeof children === "object" && "props" in (children as object)) {
    const props = (children as { props?: { children?: unknown } }).props;
    return getTextFromChildren(props?.children);
  }

  return "";
}

function slugify(text: string): string {
  return normalizeHeadingText(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function HeadingWithAnchor({
  level,
  children,
  id,
  className,
  ...props
}: ComponentProps<"h2"> & { level: 2 | 3 }) {
  const HeadingTag = `h${level}` as const;

  const headingId =
    id ??
    (() => {
      const text = getTextFromChildren(children);
      return text ? slugify(text) : undefined;
    })();

  return (
    <HeadingTag {...props} id={headingId} className={`group relative ${className ?? ""}`}>
      {children as ReactNode}

      {headingId && (
        <a
          href={`#${headingId}`}
          aria-label="Section link"
          className="absolute top-0 -left-6 opacity-0 transition-opacity group-hover:opacity-100"
        >
          <span className="text-[var(--signal-dark)] dark:text-[var(--signal)]">#</span>
        </a>
      )}
    </HeadingTag>
  );
}

function H2(props: ComponentProps<"h2">) {
  return <HeadingWithAnchor level={2} {...props} />;
}

function H3(props: ComponentProps<"h3">) {
  return <HeadingWithAnchor level={3} {...props} />;
}

export function useMDXComponents(components: Record<string, unknown>) {
  return {
    h1: () => null,

    h2: H2,
    h3: H3,

    h4: (props: ComponentProps<"h4">) => <h4 {...props} />,
    h5: (props: ComponentProps<"h5">) => <h5 {...props} />,
    h6: (props: ComponentProps<"h6">) => <h6 {...props} />,

    ApiReference,
    ArchitectureDiagram,
    BenchmarkCard,
    BenchmarkResult,
    CodeBlock,
    CodeTabs,
    Command,
    ConfigExample,
    ConfigReference,
    FileTree,
    Info,
    Note,
    Package,
    RequestFlow,
    Tip,
    Warning,
    Mermaid,

    ...components,
  };
}
