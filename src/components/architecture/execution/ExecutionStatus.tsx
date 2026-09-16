import type { ExecutionConnectionState, ExecutionLifecycle } from "@/lib/execution";

import { connectionLabel, lifecycleLabel } from "./presentation";

export function ExecutionStatus({
  lifecycle,
  connection,
  error,
}: {
  lifecycle: ExecutionLifecycle;
  connection: ExecutionConnectionState;
  error: string | null;
}) {
  const isTerminal =
    lifecycle === "completed" || lifecycle === "failed" || lifecycle === "cancelled";

  return (
    <section
      aria-labelledby="execution-status-heading"
      className="border border-[var(--line-strong)] bg-[var(--surface)] p-5 sm:p-6"
    >
      <h3
        id="execution-status-heading"
        className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] tracking-[0.12em] text-[var(--ink-faint)] uppercase"
      >
        Current state
      </h3>
      <dl className="mt-5 grid gap-5 sm:grid-cols-3">
        <StatusValue
          label="Lifecycle"
          value={lifecycleLabel(lifecycle)}
          emphasized={isTerminal || lifecycle === "running"}
        />
        <StatusValue
          label="Connection"
          value={connectionLabel(connection)}
          emphasized={connection.kind === "connected"}
        />
        <StatusValue
          label="Terminal"
          value={isTerminal ? "Recorded" : "Awaiting event"}
          emphasized={isTerminal}
        />
      </dl>
      {error && (
        <p
          role="alert"
          className="mt-5 border-l-2 border-[var(--signal-dark)] pl-3 text-sm leading-6 text-[var(--ink-soft)]"
        >
          {error}
        </p>
      )}
    </section>
  );
}

function StatusValue({
  label,
  value,
  emphasized,
}: {
  label: string;
  value: string;
  emphasized: boolean;
}) {
  return (
    <div>
      <dt className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] tracking-[0.1em] text-[var(--ink-faint)] uppercase">
        {label}
      </dt>
      <dd
        className={`mt-2 flex items-center gap-2 text-sm ${emphasized ? "font-semibold text-[var(--signal-dark)] dark:text-[var(--signal)]" : "text-[var(--ink)]"}`}
      >
        <span
          aria-hidden="true"
          className={`size-1.5 shrink-0 rounded-full ${emphasized ? "bg-[var(--signal)]" : "bg-[var(--line-strong)]"}`}
        />
        {value}
      </dd>
    </div>
  );
}
