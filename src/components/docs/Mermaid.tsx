"use client";

import { useEffect, useId, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  securityLevel: "loose",
  theme: "neutral",
});

interface MermaidProps {
  chart: string;
}

export function Mermaid({ chart }: MermaidProps) {
  const id = useId().replace(/:/g, "");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      if (!ref.current) return;

      try {
        const { svg } = await mermaid.render(`mermaid-${id}`, chart);

        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
        }
      } catch {
        if (!cancelled && ref.current) {
          ref.current.innerHTML = "<pre>Unable to render Mermaid diagram.</pre>";
        }
      }
    }

    render();

    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  return (
    <div className="my-8 overflow-x-auto rounded-lg border border-[var(--line)] bg-[var(--surface)] p-6">
      <div ref={ref} />
    </div>
  );
}
