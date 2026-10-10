import type { RefinedBrief } from "./types";

export type HealthItem = {
  id: string;
  ok: boolean;
  label: string;
  /** Counted toward the overall level. Assumptions and open questions are informational. */
  counts: boolean;
};

export type Health = {
  headline: string;
  summary: string;
  items: HealthItem[];
};

const filled = (items: string[]) => items.filter((item) => item.trim()).length;

/**
 * Lightweight guidance on how actionable a brief is. Derived from the current
 * (possibly edited) brief plus judgements the model made about the stakeholder's
 * input. It is a guide, not a score.
 */
export function assessBrief(brief: RefinedBrief): Health {
  const s = brief.signals;
  const assumptions = filled(brief.assumptions);
  const questions = filled(brief.clarificationQuestions);
  const hasProblem = brief.problem.trim().length > 0;

  const items: HealthItem[] = [];
  const add = (id: string, ok: boolean, good: string, bad: string, counts = true) =>
    items.push({ id, ok, label: ok ? good : bad, counts });

  add(
    "problem",
    hasProblem && (s ? s.problemClear : true),
    "Clear high-level problem",
    "Problem not clearly defined",
  );
  add(
    "objectives",
    filled(brief.businessObjectives) > 0 && (s ? s.objectivesClear : true),
    "Clear business objective",
    "Business objectives not identified",
  );
  add(
    "users",
    brief.userProblem.trim().length > 0 && (s ? s.usersIdentified : true),
    "Primary users identified",
    "Primary users not identified",
  );
  add(
    "requirements",
    filled(brief.potentialRequirements) > 0,
    "Potential requirements outlined",
    "No potential requirements yet",
  );
  if (s) {
    add("constraints", s.constraintsStated, "Constraints and context stated", "Constraints not specified");
    add("measures", s.successMeasuresDefined, "Success measures defined", "Success measures not defined");
  }
  add(
    "assumptions",
    assumptions === 0,
    "No unconfirmed assumptions listed",
    `${assumptions} assumption${assumptions === 1 ? "" : "s"} to validate`,
    false,
  );
  add(
    "questions",
    questions === 0,
    "No open questions",
    `${questions} question${questions === 1 ? "" : "s"} still unanswered`,
    false,
  );

  const counted = items.filter((item) => item.counts);
  const gaps = counted.filter((item) => !item.ok).length;
  const ratio = counted.length ? gaps / counted.length : 0;

  let headline = "Good starting point";
  let summary = "The main shape is there. Resolve the open items before design work begins.";
  if (ratio > 0.8) {
    headline = "Early draft";
    summary = "Most of what design needs is still undefined. Start with the questions below.";
  } else if (ratio > 0.5) {
    headline = "Needs more clarity";
    summary = "Some key information is missing. Clarify it before committing to a direction.";
  }

  return { headline, summary, items };
}
