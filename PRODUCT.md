# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
UX and product designers, in-house or agency/freelance, who receive vague or messy stakeholder requests and need a clearer brief before design work starts. They reach for BriefWise at the moment a request lands (an email, a call note, a one-line ask) and they need to decide what is actually being asked, what is being assumed and what must be clarified.

## Product Purpose
BriefWise turns messy stakeholder requests into structured UX/product briefs. It helps the designer identify the problem, business objectives, user problem, potential requirements, assumptions, clarification questions and recommended next steps. Success is a designer who can go back to the stakeholder with the right questions, and who never mistakes an inference for a confirmed fact.

BriefWise is a focused refinement utility. It is not a project-management system, a requirements-management platform, a UX research platform, a wireframing tool or a general-purpose AI chatbot.

## Positioning
Strictly separates what the stakeholder stated, what may be assumed and what is still unknown, inside a fixed UX-brief structure. A general AI chat tool does not hold this separation as a product rule, and does not produce a consistent designer-ready brief shape.

## Operating Context
Core workflow: stakeholder input, refine, structured brief, review/edit, export. Phase 1 (shell, landing, refiner UI) and Phase 2 (server-side AI refinement with validated structured output) are built.

## Capabilities and Constraints
- Next.js App Router, TypeScript, Tailwind CSS, Newsreader + DM Sans; Vercel-compatible. AI runs server-side through the Vercel AI Gateway with schema-validated structured output; no API keys in the client.
- No accounts, database, payments, subscriptions, team features or external integrations. The draft is kept in browser local storage; submitted text is not stored or logged server-side.
- Result model: `RefinedBrief` (problem, businessObjectives, userProblem, potentialRequirements, assumptions, clarificationQuestions, recommendedNextSteps, optional statedByStakeholder).
- Must never fabricate facts, statistics, research or requirements; vague input yields an undefined problem plus clarification questions.
- Undecided: export formats beyond copy-as-Markdown and print, persistence of past briefs. /refiner always opens on an empty request; a saved brief is offered, never opened automatically.

## Brand Commitments
Name BriefWise. Tagline "Turn vague briefs into clear direction." Visual system: DevLens "White Paper on a Butter Desk" (amber `#e8b923` fill, ochre `#826400` text, Newsreader headings, DM Sans body), with light and dark themes. Logo is the supplied "B" mark (`BriefWise_logo.svg`), also used as the favicon. Product should read as a professional design utility, not an AI toy: no generic AI sparkle graphics, robot or lightbulb imagery.

## Evidence on Hand
No testimonials, customers, metrics or case studies exist. Only the sample stakeholder statement and its illustrative brief (`lib/sample.ts`) and the logo. Do not invent social proof, usage numbers or customer names.

## Product Principles
1. Clarification over rewriting: the value is better questions and clearer structure, not prettier prose.
2. Never present an inference as a confirmed fact; keep stated, assumed and unknown visibly distinct.
3. Do not decide the solution; help the designer understand what was said, what may be inferred and what to clarify next.
4. Stay a small, focused utility: no dashboard, chat or project-management creep.
5. Be honest about state: label preview or placeholder output, and fail gracefully without exposing provider detail.

## Accessibility & Inclusion
Semantic HTML, keyboard navigation, visible focus, labelled form controls, WCAG AA contrast, screen-reader-friendly status messages, responsive layouts, and meaning never carried by colour alone.
