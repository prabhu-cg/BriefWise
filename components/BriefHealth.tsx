import type { RefinedBrief } from "@/lib/types";
import { assessBrief } from "@/lib/brief-health";
import { Check } from "./icons";

function Gap() {
  return (
    <span
      aria-hidden="true"
      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-brand text-xs font-extrabold leading-none text-brand-strong"
    >
      !
    </span>
  );
}

export function BriefHealth({ brief }: { brief: RefinedBrief }) {
  const health = assessBrief(brief);
  return (
    <section
      aria-labelledby="health-title"
      className="rounded-xl border border-line bg-surface p-6 print:bg-transparent sm:p-8"
    >
      <p className="text-sm font-bold text-ink-muted">Brief health</p>
      <h2 id="health-title" className="mt-1 text-2xl font-extrabold tracking-tight text-ink-strong">
        {health.headline}
      </h2>
      <p className="mt-1 max-w-prose leading-relaxed">{health.summary}</p>

      <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
        {health.items.map((item) => (
          <li key={item.id} className="flex items-start gap-3 leading-snug">
            {item.ok ? (
              <span
                aria-hidden="true"
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink-strong text-white"
              >
                <Check className="h-3 w-3" />
              </span>
            ) : (
              <Gap />
            )}
            <span>
              <span className="sr-only">{item.ok ? "Clear: " : "Gap: "}</span>
              {item.label}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-sm text-ink-muted">
        A guide based on the stakeholder&rsquo;s text and your edits, not a measure of quality.
      </p>
    </section>
  );
}
