"use client";

import { useState } from "react";

type CodeBlockProps = {
  children: string;
  filename?: string;
  language?: string;
  highlightedLines?: number[];
};

export function CodeBlock({ children, filename, language = "text", highlightedLines = [] }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const lines = children.trim().split("\n");

  async function copyCode() {
    await navigator.clipboard.writeText(children.trim());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="my-7 overflow-hidden border border-[var(--terminal-line)] bg-[var(--terminal)] text-[var(--terminal-text)]">
      <div className="flex min-h-10 items-center justify-between gap-3 border-b border-[var(--terminal-line)] px-3">
        <span className="min-w-0 truncate font-[family-name:var(--font-ibm-plex-mono)] text-[10px] tracking-[0.08em] text-[var(--terminal-muted)] uppercase">{filename ?? language}</span>
        <button
          type="button"
          onClick={copyCode}
          className="shrink-0 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] text-[var(--terminal-muted)] transition-colors hover:text-[var(--terminal-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--signal)]"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto py-3 text-[13px] leading-6">
        <code>
          {lines.map((line, index) => (
            <span key={`${line}-${index}`} className={`block min-w-max px-4 ${highlightedLines.includes(index + 1) ? "bg-[color:var(--signal)]/15" : ""}`}>
              <span aria-hidden="true" className="mr-4 inline-block w-4 select-none text-right text-[var(--terminal-muted)]">{index + 1}</span>
              {line || " "}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
