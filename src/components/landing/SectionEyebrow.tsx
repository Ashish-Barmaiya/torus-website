import type { ReactNode } from "react";

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] font-medium tracking-[0.14em] text-[var(--ink-faint)] uppercase">
      {children}
    </p>
  );
}
