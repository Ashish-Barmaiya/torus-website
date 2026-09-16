import { SectionEyebrow } from "@/components/landing/SectionEyebrow";

export function ExecutionHeader({ executionId }: { executionId?: string }) {
  return (
    <div className="max-w-3xl">
      <SectionEyebrow>Live execution</SectionEyebrow>
      <h2 className="mt-4 font-semibold tracking-[-0.045em] text-[var(--text-h2)]">
        Follow one execution as it unfolds.
      </h2>
      <p className="mt-5 max-w-2xl leading-7 text-[var(--ink-soft)]">
        The controller publishes lifecycle events in sequence. This view presents only the state the
        execution stream has actually received.
      </p>
      <p className="mt-6 font-[family-name:var(--font-ibm-plex-mono)] text-xs text-[var(--ink-faint)]">
        execution_id:{" "}
        <span className="break-all text-[var(--ink)]">{executionId || "not selected"}</span>
      </p>
    </div>
  );
}
