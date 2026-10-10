import Link from "next/link";
import { SAMPLE_BRIEF, SAMPLE_STATEMENT } from "@/lib/sample";
import { buttonPrimary, buttonSecondary } from "@/components/ui";
import { ArrowRight } from "@/components/icons";

const STEPS = [
  { title: "Paste", body: "Paste the stakeholder's original request." },
  {
    title: "Refine",
    body: "BriefWise identifies the important information and ambiguity.",
  },
  {
    title: "Review",
    body: "Review problems, objectives, assumptions, requirements and unanswered questions.",
  },
  {
    title: "Take it forward",
    body: "Copy, export or send the refined brief to ReqStudio.",
  },
];

function Flag({
  index,
  tag,
  children,
}: {
  index: number;
  tag: string;
  children: React.ReactNode;
}) {
  return (
    <span>
      <mark
        className="bw-mark text-ink-strong"
        style={{ "--i": index } as React.CSSProperties}
      >
        {children}
      </mark>
      <span className="sr-only"> (flagged as {tag})</span>
      <span
        aria-hidden="true"
        className="mx-1 inline-block -translate-y-0.5 rounded-md border border-line bg-paper px-1.5 py-0.5 align-middle text-xs font-bold text-ink-strong"
      >
        {tag}
      </span>
    </span>
  );
}

function BriefList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-relaxed">
          <span aria-hidden="true" className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-sm bg-brand" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-28 lg:pt-24">
        <div>
          <h1 className="text-balance text-5xl font-extrabold leading-[1.04] tracking-[-0.035em] text-ink-strong sm:text-6xl lg:text-[4.25rem]">
            Turn vague briefs into clear direction.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed sm:text-xl sm:leading-relaxed">
            BriefWise turns messy stakeholder requests into structured UX
            briefs, helping you separate the problem from assumptions, identify
            missing information and clarify what needs to happen next.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/refiner" className={buttonPrimary}>
              Refine a brief
              <ArrowRight />
            </Link>
            <a href="#example" className={buttonSecondary}>
              See an example
            </a>
          </div>
        </div>

        <figure className="rounded-2xl border border-line bg-paper p-6 shadow-[0_1px_2px_rgb(38_38_38/0.06),0_24px_48px_-24px_rgb(38_38_38/0.25)] sm:p-8">
          <figcaption className="text-sm font-bold text-ink-muted">
            What the stakeholder said, read closely
          </figcaption>
          <p className="mt-5 text-lg leading-[2.1] text-ink">
            “<Flag index={0} tag="Assumed solution">We need a new website</Flag>{" "}
            because <Flag index={1} tag="Vague">the existing one is old</Flag>{" "}
            and{" "}
            <Flag index={2} tag="Problem">customers can&rsquo;t find our services</Flag>.{" "}
            <Flag index={3} tag="Objective">Marketing also wants better SEO</Flag>{" "}
            and we&rsquo;d like to{" "}
            <Flag index={4} tag="Objective">showcase our case studies</Flag>.”
          </p>
        </figure>
      </section>

      {/* Example */}
      <section id="example" className="scroll-mt-16 bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
          <h2 className="max-w-2xl text-balance text-3xl font-extrabold tracking-[-0.025em] text-ink-strong sm:text-4xl">
            From a messy request to something you can act on
          </h2>

          <div className="mt-12 grid items-start gap-6 lg:grid-cols-[1fr_auto_1.35fr]">
            <div className="lg:sticky lg:top-24">
              <h3 className="text-sm font-bold text-ink-muted">Before</h3>
              <blockquote className="mt-3 rounded-xl border border-dashed border-[#c9c0b8] p-6 text-lg leading-relaxed sm:p-8">
                “{SAMPLE_STATEMENT}”
              </blockquote>
            </div>

            <div
              aria-hidden="true"
              className="hidden pt-14 text-brand lg:block lg:sticky lg:top-24"
            >
              <ArrowRight className="h-7 w-7" />
            </div>

            <div>
              <h3 className="text-sm font-bold text-brand-strong">After</h3>
              <div className="mt-3 divide-y divide-line rounded-xl border border-line bg-paper shadow-[0_1px_2px_rgb(38_38_38/0.05),0_16px_32px_-20px_rgb(38_38_38/0.25)]">
                <div className="p-6 sm:p-8">
                  <h4 className="font-bold text-ink-strong">Problem</h4>
                  <p className="mt-2 leading-relaxed">{SAMPLE_BRIEF.problem}</p>
                </div>
                <div className="p-6 sm:p-8">
                  <h4 className="font-bold text-ink-strong">Business objectives</h4>
                  <BriefList items={SAMPLE_BRIEF.businessObjectives} />
                </div>
                <div className="p-6 sm:p-8">
                  <h4 className="font-bold text-ink-strong">User problem</h4>
                  <p className="mt-2 leading-relaxed">{SAMPLE_BRIEF.userProblem}</p>
                </div>
                <div className="bg-brand-tint p-6 sm:p-8">
                  <h4 className="font-bold text-ink-strong">Clarification questions</h4>
                  <BriefList items={SAMPLE_BRIEF.clarificationQuestions.slice(0, 3)} />
                </div>
                <p className="px-6 py-4 text-sm text-ink-muted sm:px-8">
                  The full brief also covers potential requirements,
                  assumptions and recommended next steps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <h2 className="text-balance text-3xl font-extrabold tracking-[-0.025em] text-ink-strong sm:text-4xl">
            How it works
          </h2>
          <ol className="divide-y divide-line border-y border-line">
            {STEPS.map((step, index) => (
              <li
                key={step.title}
                className="grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-1 py-6 sm:grid-cols-[3rem_11rem_1fr]"
              >
                <span className="text-2xl font-extrabold text-brand-strong tabular-nums">
                  <span className="sr-only">Step </span>
                  {index + 1}
                </span>
                <h3 className="text-xl font-bold text-ink-strong">{step.title}</h3>
                <p className="col-start-2 leading-relaxed sm:col-start-3">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-ink-strong text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:py-20">
          <p className="max-w-xl text-balance text-3xl font-extrabold leading-tight tracking-[-0.025em] sm:text-4xl">
            Got a request that doesn&rsquo;t quite make sense yet?
          </p>
          <Link href="/refiner" className={buttonPrimary}>
            Refine a brief
            <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
