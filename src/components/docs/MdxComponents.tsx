import type { ReactNode } from "react";

import { CodeBlock } from "./CodeBlock";
import { CodeTabs, type CodeTab } from "./CodeTabs";

type CalloutKind = "note" | "tip" | "warning" | "info";

function Callout({ children, kind, title }: { children: ReactNode; kind: CalloutKind; title?: string }) {
  const labels: Record<CalloutKind, string> = { note: "Engineering note", tip: "Operational tip", warning: "Warning", info: "Information" };

  return (
    <aside className="my-7 border-l-2 border-[var(--signal)] bg-[var(--paper-deep)] px-5 py-4 text-sm leading-6 text-[var(--ink-soft)]">
      <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] font-medium tracking-[0.12em] text-[var(--signal-dark)] uppercase dark:text-[var(--signal)]">{title ?? labels[kind]}</p>
      <div className="mt-1.5">{children}</div>
    </aside>
  );
}

export function Note({ children, title }: { children: ReactNode; title?: string }) { return <Callout kind="note" title={title}>{children}</Callout>; }
export function Tip({ children, title }: { children: ReactNode; title?: string }) { return <Callout kind="tip" title={title}>{children}</Callout>; }
export function Warning({ children, title }: { children: ReactNode; title?: string }) { return <Callout kind="warning" title={title}>{children}</Callout>; }
export function Info({ children, title }: { children: ReactNode; title?: string }) { return <Callout kind="info" title={title}>{children}</Callout>; }

export function Command({ children }: { children: string }) {
  return <CodeBlock filename="shell" language="bash">{children}</CodeBlock>;
}

export function ArchitectureDiagram({ children }: { children?: ReactNode }) {
  return (
    <figure className="my-7 border border-[var(--line)] bg-[var(--surface)] p-5">
      <div className="grid gap-px bg-[var(--line)] sm:grid-cols-4">
        {["Listener", "Runtime", "Router", "Upstream"].map((stage) => <div key={stage} className="bg-[var(--surface)] px-3 py-4 text-center font-[family-name:var(--font-ibm-plex-mono)] text-[11px] text-[var(--ink-soft)]">{stage}</div>)}
      </div>
      {children ? <figcaption className="mt-3 text-xs leading-5 text-[var(--ink-faint)]">{children}</figcaption> : null}
    </figure>
  );
}

export function RequestFlow({ children }: { children?: ReactNode }) {
  return (
    <figure className="my-7 border-y border-[var(--line)] py-5">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] text-[var(--ink-soft)]">
        {["Request", "match", "service", "backend", "response"].map((stage, index) => <span key={stage} className="flex items-center gap-3"><span className={index === 1 ? "text-[var(--signal-dark)] dark:text-[var(--signal)]" : ""}>{stage}</span>{index < 4 ? <span aria-hidden="true" className="text-[var(--ink-faint)]">→</span> : null}</span>)}
      </div>
      {children ? <figcaption className="mt-3 text-xs leading-5 text-[var(--ink-faint)]">{children}</figcaption> : null}
    </figure>
  );
}

type ConfigField = { field: string; type: string; defaultValue: string; required: boolean; description: string };

export function ConfigReference({ fields }: { fields: ConfigField[] }) {
  return (
    <div className="my-7 overflow-x-auto border border-[var(--line)]">
      <table className="w-full min-w-[620px] border-collapse text-left text-sm">
        <thead className="border-b border-[var(--line)] bg-[var(--paper-deep)] font-[family-name:var(--font-ibm-plex-mono)] text-[10px] tracking-[0.1em] text-[var(--ink-faint)] uppercase">
          <tr>{["Field", "Type", "Default", "Required", "Description"].map((heading) => <th key={heading} scope="col" className="px-3 py-2.5 font-medium">{heading}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-[var(--line)] text-[var(--ink-soft)]">
          {fields.map((field) => <tr key={field.field}><th scope="row" className="px-3 py-3 font-[family-name:var(--font-ibm-plex-mono)] text-xs font-medium text-[var(--ink)]">{field.field}</th><td className="px-3 py-3 font-[family-name:var(--font-ibm-plex-mono)] text-xs">{field.type}</td><td className="px-3 py-3 font-[family-name:var(--font-ibm-plex-mono)] text-xs">{field.defaultValue}</td><td className="px-3 py-3 text-xs">{field.required ? "Yes" : "No"}</td><td className="px-3 py-3 leading-5">{field.description}</td></tr>)}
        </tbody>
      </table>
    </div>
  );
}

export function BenchmarkCard({ id, title, summary }: { id: string; title: string; summary: string }) {
  return <aside className="my-7 border border-[var(--line)] bg-[var(--surface)] p-5"><p className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] tracking-[0.12em] text-[var(--ink-faint)] uppercase">Benchmark {id}</p><h3 className="mt-2 text-base font-semibold text-[var(--ink)]">{title}</h3><p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">{summary}</p><div className="mt-4 flex gap-4 font-[family-name:var(--font-ibm-plex-mono)] text-[11px]"><span className="text-[var(--signal-dark)] dark:text-[var(--signal)]">Report →</span><span className="text-[var(--ink-faint)]">Dataset →</span></div></aside>;
}

export function ApiReference({ method = "GET", endpoint, children }: { method?: string; endpoint: string; children?: ReactNode }) {
  return <section className="my-7 border border-[var(--line)]"><div className="flex items-center gap-3 border-b border-[var(--line)] bg-[var(--paper-deep)] px-4 py-3"><span className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] font-medium text-[var(--signal-dark)] dark:text-[var(--signal)]">{method}</span><code className="text-sm text-[var(--ink)]">{endpoint}</code></div>{children ? <div className="px-4 py-4 text-sm leading-6 text-[var(--ink-soft)]">{children}</div> : null}</section>;
}

export { CodeBlock, CodeTabs };
export type { CodeTab };
