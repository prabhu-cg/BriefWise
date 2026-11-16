import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "About",
  description: "What BriefWise is, how it is built, and who built it.",
  alternates: { canonical: "/about" },
};

const STACK = [
  ["Framework", "Next.js 16 (App Router), TypeScript (strict)"],
  ["Styling", "Tailwind CSS v4, with a token-based light and dark theme"],
  ["Icons & type", "Hand-drawn SVG icons, Newsreader and DM Sans (self-hosted)"],
  ["State", "React"],
  ["AI & validation", "Vercel AI SDK with Zod-validated structured output"],
  ["Routing", "Next.js App Router"],
  ["Storage", "localStorage, browser-local"],
  ["Feedback", "GitHub Issues"],
  ["Hosting", "Vercel — two serverless routes (refine, feedback), no database"],
];

export default function AboutPage() {
  return (
    <LegalPage title="About BriefWise" badge="V1" description="Turn vague briefs into clear direction.">
      <h2>What it is</h2>
      <p>
        BriefWise is a focused utility that turns messy stakeholder requests into structured UX
        briefs. It replaces a blank page with a fixed structure — the problem, business objectives,
        user problem, potential requirements, assumptions, clarification questions and recommended
        next steps — and keeps what was stated, what may be assumed and what is still unknown
        visibly apart. Every section can be edited, and the result can be copied, exported as
        Markdown or printed.
      </p>
      <p>
        There is no account to create. Your draft and working brief are stored locally in your
        browser. Your text is sent to an AI service only when you refine it, and BriefWise does not
        log or store it.
      </p>
      <p>
        It is deliberately not a project-management system, a requirements-management platform or
        a general-purpose chatbot.
      </p>

      <h2>How it is built</h2>
      <dl>
        {STACK.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <p>
        The source is public at{" "}
        <a href="https://github.com/prabhu-cg/BriefWise" rel="noopener">
          github.com/prabhu-cg/BriefWise
        </a>
        .
      </p>

      <h2>What is coming</h2>
      <p>
        Export formats beyond Markdown and print, and keeping past briefs, are being considered but
        deliberately not built. BriefWise stays a small refinement utility.
      </p>

      <h2>Who built BriefWise, and why</h2>
      <p>
        BriefWise was built by me, Prabhu Raja, a senior designer with 15+ years of experience
        across enterprise and B2B software. I work on enterprise products, design systems and
        digital experiences, with a simple aim: designing clarity from complexity.
      </p>
      <p>
        I built it because most projects don’t go wrong from a lack of effort — they go wrong
        because the request was never clear. The problem, the objectives and the open questions
        stay buried in a vague ask until the design work has started. BriefWise puts that
        discipline up front, with a brief that says plainly what was stated, what is assumed and
        what still needs an answer.
      </p>
      <p>
        It is an independent project. I scoped, designed and built it myself, with AI in the loop,
        as part of how I now take products from idea to shipped. You can see more of my work at{" "}
        <a href="https://prabhuraja.vercel.app" rel="noopener">
          prabhuraja.vercel.app
        </a>
        .
      </p>
      <p>
        Feedback, feature requests, or just want to say hello:{" "}
        <a href="mailto:prabhu_cg@proton.me">prabhu_cg@proton.me</a>, or open an issue on{" "}
        <a href="https://github.com/prabhu-cg/BriefWise/issues" rel="noopener">
          GitHub
        </a>
        .
      </p>
    </LegalPage>
  );
}
