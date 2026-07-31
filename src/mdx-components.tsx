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

export function useMDXComponents(components: Record<string, unknown>) {
  return {
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
