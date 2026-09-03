"use client";

import { useState } from "react";

import { SectionEyebrow } from "@/components/landing/SectionEyebrow";

const folders = [
  { name: "cmd/", description: "Application entry points and command wiring." },
  { name: "internal/config/", description: "Configuration loading and validation boundaries." },
  { name: "internal/runtime/", description: "Immutable runtime snapshots used by requests." },
  { name: "internal/router/", description: "Route matching and selection." },
  { name: "internal/proxy/", description: "Upstream request and response forwarding." },
  { name: "internal/loadbalancer/", description: "Healthy backend selection for services." },
  { name: "internal/health/", description: "Backend availability and health state." },
];

export function SourceTree() {
  const [activeFolder, setActiveFolder] = useState(folders[0]);
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div>
          <SectionEyebrow>Source tree</SectionEyebrow>
          <h2 className="mt-4 text-[var(--text-h2)] font-semibold tracking-[-0.045em]">
            The structure mirrors the request path.
          </h2>
          <p className="mt-5 max-w-md leading-7 text-[var(--ink-soft)]">
            Each folder owns a narrow concern, making it easier to follow a request through the
            project without treating the source tree like a dashboard.
          </p>
        </div>
        <div className="border border-[var(--line-strong)] bg-[var(--surface)] p-5 sm:p-7">
          <div className="grid gap-7 sm:grid-cols-[1fr_1.1fr]">
            <div className="border-t border-[var(--line)]">
              {folders.map((folder) => (
                <button
                  type="button"
                  key={folder.name}
                  onMouseEnter={() => setActiveFolder(folder)}
                  onFocus={() => setActiveFolder(folder)}
                  onClick={() => setActiveFolder(folder)}
                  className={`block w-full border-b border-[var(--line)] px-3 py-3 text-left font-[family-name:var(--font-ibm-plex-mono)] text-sm transition-colors hover:text-[var(--signal)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--signal)] ${activeFolder.name === folder.name ? "text-[var(--ink)]" : "text-[var(--ink-soft)]"}`}
                >
                  {folder.name}
                </button>
              ))}
            </div>
            <div className="border-t border-[var(--line-strong)] pt-5 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-5">
              <p className="font-[family-name:var(--font-ibm-plex-mono)] text-sm text-[var(--ink)]">
                {activeFolder.name}
              </p>
              <p className="mt-4 text-sm leading-6 text-[var(--ink-soft)]">
                {activeFolder.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
