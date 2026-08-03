"use client";

import { useId, useState } from "react";

import { CodeBlock } from "./CodeBlock";

export type CodeTab = { label: string; code: string; filename?: string; language?: string };

export function CodeTabs({ tabs }: { tabs: CodeTab[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const id = useId();
  const selectedTab = tabs[selectedIndex] ?? tabs[0];

  if (!selectedTab) return null;

  return (
    <div className="my-7">
      <div role="tablist" aria-label="Code examples" className="flex gap-4 overflow-x-auto border-b border-[var(--line)]">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            id={`${id}-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={selectedIndex === index}
            aria-controls={`${id}-panel-${index}`}
            onClick={() => setSelectedIndex(index)}
            className={`border-b px-0.5 py-2 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--signal)] ${selectedIndex === index ? "border-[var(--signal)] text-[var(--signal-dark)] dark:text-[var(--signal)]" : "border-transparent text-[var(--ink-faint)] hover:text-[var(--ink-soft)]"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div id={`${id}-panel-${selectedIndex}`} role="tabpanel" aria-labelledby={`${id}-tab-${selectedIndex}`}>
        <CodeBlock filename={selectedTab.filename} language={selectedTab.language}>{selectedTab.code}</CodeBlock>
      </div>
    </div>
  );
}
