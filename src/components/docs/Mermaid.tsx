"use client";

import { useEffect, useId, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  securityLevel: "loose",
  theme: "base",

  themeVariables: {
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontSize: "18px",

    // Canvas
    background: "#ffffff",

    // Nodes
    primaryColor: "#f8fafc", // slate-50
    primaryBorderColor: "#94a3b8", // slate-400
    primaryTextColor: "#0f172a", // slate-900

    secondaryColor: "#f1f5f9", // slate-100
    secondaryBorderColor: "#94a3b8",
    secondaryTextColor: "#0f172a",

    tertiaryColor: "#ffffff",

    // Edges
    lineColor: "#64748b", // slate-500
    edgeLabelBackground: "#ffffff",

    // Clusters
    clusterBkg: "#f8fafc",
    clusterBorder: "#cbd5e1",

    // Misc
    mainBkg: "#f8fafc",
    nodeBorder: "#94a3b8",

    // Optional improvements
    textColor: "#0f172a",
    nodeTextColor: "#0f172a",
  },
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
