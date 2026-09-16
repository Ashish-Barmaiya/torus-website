import { ExecutionDemo } from "@/components/architecture/ExecutionDemo";

export default async function DemoPage({
  searchParams,
}: {
  searchParams: Promise<{ execution_id?: string | string[] }>;
}) {
  const params = await searchParams;
  const executionId = Array.isArray(params.execution_id)
    ? params.execution_id[0]
    : params.execution_id;

  return (
    <>
      <section className="border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] font-medium tracking-[0.14em] text-[var(--ink-faint)] uppercase">
            Torus demo
          </p>
          <h1 className="mt-4 font-semibold tracking-[-0.055em] text-[var(--text-h1)]">
            Live execution stream
          </h1>
          <p className="mt-5 max-w-2xl leading-7 text-[var(--ink-soft)]">
            Observe one controller execution through its real lifecycle events.
          </p>
        </div>
      </section>
      <ExecutionDemo executionId={executionId} />
    </>
  );
}
