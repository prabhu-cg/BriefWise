import Link from "next/link";
import { SAMPLE_BRIEF, SAMPLE_STATEMENT } from "@/lib/sample";
import { buttonLg, buttonPrimary, buttonSecondary } from "@/components/ui";
import { ArrowRight } from "@/components/icons";

const STEPS = [
  { title: "Paste", body: "Paste the stakeholder's original request." },
  {
    title: "Refine",
    body: "BriefWise identifies the important information and ambiguity.",
  },
  {
    title: "Review",
    body: "Review problems, objectives, assumptions, requirements and unanswered questions. Edit any section.",
  },
  {
    title: "Take it forward",
    body: "Copy the brief, export it as Markdown or print it.",
  },
];

const BASIS = [
  {
    title: "Stated",
    body: "What the stakeholder actually said, kept apart and quoted back so you can check it.",
  },
  {
    title: "Assumed",
    body: "What may be inferred. Assumptions and potential requirements are possibilities to review, never confirmed facts.",
  },
  {
    title: "Unknown",
    body: "What still needs an answer. Vague input gets an undefined problem and clarification questions, not invented detail.",
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
      <mark className="bw-mark" style={{ "--i": index } as React.CSSProperties}>
        {children}
      </mark>
      <span className="sr-only"> (flagged as {tag})</span>
      <span
        aria-hidden="true"
        className="mx-1 inline-block -translate-y-0.5 rounded-full border border-line-strong bg-sand px-2 py-0.5 align-middle text-xs font-semibold text-ink-strong"
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
          <span aria-hidden="true" className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero (desk) */}
      <section className="bg-surface">
        <div className="site-container grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
          <div>
            <h1 className="text-balance text-5xl leading-none sm:text-6xl lg:text-[4.25rem]">
              Turn vague briefs into clear direction.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed">
              BriefWise turns messy stakeholder requests into structured UX briefs, helping you
              separate the problem from assumptions, identify missing information and clarify what
              needs to happen next.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/refiner" className={`${buttonPrimary} ${buttonLg}`}>
                Refine a brief
                <ArrowRight />
              </Link>
              <a href="#example" className={`${buttonSecondary} ${buttonLg}`}>
                See an example
              </a>
            </div>
          </div>

          <figure className="rounded-[20px] border border-line bg-paper p-6 sm:p-8">
            <figcaption className="text-sm font-semibold text-ink-muted">
              What the stakeholder said, read closely
            </figcaption>
            <p className="mt-5 text-lg leading-[2.1]">
              “<Flag index={0} tag="Assumed solution">We need a new website</Flag>{" "}
              because <Flag index={1} tag="Vague">the existing one is old</Flag> and{" "}
              <Flag index={2} tag="Problem">customers can&rsquo;t find our services</Flag>.{" "}
              <Flag index={3} tag="Objective">Marketing also wants better SEO</Flag> and
              we&rsquo;d like to{" "}
              <Flag index={4} tag="Objective">showcase our case studies</Flag>.”
            </p>
            <p className="mt-5 text-sm text-ink-muted">Sample request, fictional.</p>
          </figure>
        </div>
      </section>

      {/* Example (paper) */}
      <section id="example" className="scroll-mt-16 border-t border-line bg-paper">
        <div className="site-container py-20">
          <h2 className="max-w-2xl text-balance text-4xl leading-[1.1]">
            From a messy request to something you can act on
          </h2>

          <div className="mt-12 grid items-start gap-6 lg:grid-cols-[1fr_auto_1.35fr]">
            <div className="lg:sticky lg:top-24">
              <h3 className="text-sm font-semibold text-ink-muted">Before</h3>
              <blockquote className="mt-3 rounded-[20px] border border-dashed border-line-strong p-6 text-lg leading-relaxed sm:p-8">
                “{SAMPLE_STATEMENT}”
              </blockquote>
            </div>

            <div aria-hidden="true" className="hidden pt-14 text-ink-muted lg:sticky lg:top-24 lg:block">
              <ArrowRight className="h-7 w-7" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-brand-strong">After</h3>
              <div className="mt-3 divide-y divide-line overflow-hidden rounded-[20px] border border-line bg-paper">
                <div className="p-6 sm:p-8">
                  <h4 className="font-semibold text-ink-strong">Problem</h4>
                  <p className="mt-2 leading-relaxed">{SAMPLE_BRIEF.problem}</p>
                </div>
                <div className="p-6 sm:p-8">
                  <h4 className="font-semibold text-ink-strong">Business objectives</h4>
                  <BriefList items={SAMPLE_BRIEF.businessObjectives} />
                </div>
                <div className="p-6 sm:p-8">
                  <h4 className="font-semibold text-ink-strong">User problem</h4>
                  <p className="mt-2 leading-relaxed">{SAMPLE_BRIEF.userProblem}</p>
                </div>
                <div className="bg-brand-tint p-6 sm:p-8">
                  <h4 className="font-semibold text-ink-strong">Clarification questions</h4>
                  <BriefList items={SAMPLE_BRIEF.clarificationQuestions.slice(0, 3)} />
                </div>
                <p className="px-6 py-4 text-sm text-ink-muted sm:px-8">
                  Sample brief, fictional. The full brief also covers potential requirements,
                  assumptions and recommended next steps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stated / assumed / unknown (desk): sticky title, ruled content */}
      <section className="border-t border-line bg-surface">
        <div className="site-container grid gap-10 py-20 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="text-balance text-4xl leading-[1.1]">
              Never mistake an inference for a fact
            </h2>
            <p className="mt-4 max-w-md leading-relaxed">
              Every brief keeps three things visibly apart, so you know what to confirm before
              design starts.
            </p>
          </div>
          <dl className="divide-y divide-line border-y border-line">
            {BASIS.map((row) => (
              <div key={row.title} className="grid gap-2 py-6 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <dt className="font-serif text-2xl text-ink-strong">{row.title}</dt>
                <dd className="leading-relaxed">{row.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* How it works (paper) */}
      <section className="border-t border-line bg-paper">
        <div className="site-container grid gap-10 py-20 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <h2 className="text-balance text-4xl leading-[1.1] lg:sticky lg:top-24 lg:self-start">
            How it works
          </h2>
          <ol className="divide-y divide-line border-y border-line">
            {STEPS.map((step, index) => (
              <li
                key={step.title}
                className="grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-1 py-6 sm:grid-cols-[3rem_11rem_1fr]"
              >
                <span className="font-serif text-2xl text-brand-strong tabular-nums">
                  <span className="sr-only">Step </span>
                  {index + 1}
                </span>
                <h3 className="text-base font-semibold text-ink-strong sm:pt-2">{step.title}</h3>
                <p className="col-start-2 leading-relaxed sm:col-start-3 sm:pt-2">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Closing call to action (desk, never an amber band) */}
      <section className="border-t border-line bg-surface">
        <div className="site-container flex flex-col items-start gap-8 py-20 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-xl text-balance font-serif text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-ink-strong">
            Got a request that doesn&rsquo;t quite make sense yet?
          </p>
          <Link href="/refiner" className={`${buttonPrimary} ${buttonLg}`}>
            Refine a brief
            <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
