import {
  ApiReference,
  ArchitectureDiagram,
  BenchmarkCard,
  CodeBlock,
  CodeTabs,
  Command,
  ConfigReference,
  Info,
  Note,
  RequestFlow,
  Tip,
  Warning,
} from "@/components/docs/MdxComponents";

function Heading({ children, ...props }: ComponentProps<"h2">) {
  const id = typeof children === "string" ? children.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") : undefined;
  return <h2 id={id} {...props}>{children as ReactNode}</h2>;
}

export function useMDXComponents(components: Record<string, unknown>) {
  return {
    h1: () => null,
    h2: Heading,
    ApiReference,
    ArchitectureDiagram,
    BenchmarkCard,
    CodeBlock,
    CodeTabs,
    Command,
    ConfigReference,
    Info,
    Note,
    RequestFlow,
    Tip,
    Warning,
    ...components,
  };
}
import type { ComponentProps, ReactNode } from "react";
