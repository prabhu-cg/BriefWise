import { z } from "zod";
import type { RefinedBrief } from "../types";

/**
 * Schema sent to the model. Kept free of length constraints because not every
 * provider supports them in structured-output mode; limits are enforced in
 * `normaliseBrief` instead.
 */
export const briefOutputSchema = z.object({
  statedByStakeholder: z
    .array(z.string())
    .describe(
      "Points the stakeholder explicitly made, close to their own wording. Nothing inferred.",
    ),
  problem: z
    .string()
    .describe(
      "One or two sentences on the problem as stated. If the real problem is not defined, say so plainly.",
    ),
  businessObjectives: z
    .array(z.string())
    .describe("Objectives the stakeholder stated or clearly implied. Empty if none."),
  userProblem: z
    .string()
    .describe(
      "What users or customers struggle with, as stated. If not stated, say it has not been described.",
    ),
  potentialRequirements: z
    .array(z.string())
    .describe(
      "Things the solution may need to do, phrased as possibilities to review. Not commitments.",
    ),
  assumptions: z
    .array(z.string())
    .describe("Interpretations that are plausible but NOT confirmed by the stakeholder."),
  clarificationQuestions: z
    .array(z.string())
    .describe("Questions whose answers are missing or ambiguous and matter to the work."),
  recommendedNextSteps: z
    .array(z.string())
    .describe("Practical steps to take before or alongside design to resolve the unknowns."),
  signals: z
    .object({
      problemClear: z
        .boolean()
        .describe("True only if the stakeholder described a concrete problem, not just a wish or a solution."),
      objectivesClear: z
        .boolean()
        .describe("True only if at least one business objective was stated or is unambiguous."),
      usersIdentified: z
        .boolean()
        .describe("True only if the stakeholder said who the users or customers are."),
      successMeasuresDefined: z
        .boolean()
        .describe("True only if the stakeholder stated how success would be measured."),
      constraintsStated: z
        .boolean()
        .describe("True only if constraints such as time, budget, platform, brand or legal were stated."),
    })
    .describe("Honest judgements about the stakeholder's input. When unsure, answer false."),
});

const MAX_LIST_ITEMS = 8;
const MAX_ITEM_LENGTH = 500;

const clean = (value: string) => value.replace(/\s+/g, " ").trim();

function cleanList(items: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of items) {
    const item = clean(raw);
    if (!item || item.length > MAX_ITEM_LENGTH) continue;
    const key = item.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
    if (out.length === MAX_LIST_ITEMS) break;
  }
  return out;
}

export class InvalidBriefError extends Error {}

/**
 * Validates the model output against what the UI needs and returns a clean
 * `RefinedBrief`. Throws `InvalidBriefError` when the result is unusable.
 */
export function normaliseBrief(raw: unknown): RefinedBrief {
  const parsed = briefOutputSchema.safeParse(raw);
  if (!parsed.success) throw new InvalidBriefError("Schema mismatch");

  const data = parsed.data;
  const problem = clean(data.problem);
  const userProblem = clean(data.userProblem);
  const clarificationQuestions = cleanList(data.clarificationQuestions);
  const recommendedNextSteps = cleanList(data.recommendedNextSteps);

  if (
    !problem ||
    problem.length > MAX_ITEM_LENGTH * 2 ||
    !userProblem ||
    userProblem.length > MAX_ITEM_LENGTH * 2 ||
    clarificationQuestions.length === 0 ||
    recommendedNextSteps.length === 0
  ) {
    throw new InvalidBriefError("Incomplete brief");
  }

  return {
    statedByStakeholder: cleanList(data.statedByStakeholder),
    problem,
    businessObjectives: cleanList(data.businessObjectives),
    userProblem,
    potentialRequirements: cleanList(data.potentialRequirements),
    assumptions: cleanList(data.assumptions),
    clarificationQuestions,
    recommendedNextSteps,
    signals: data.signals,
  };
}
