import type { RefinedBrief } from "./types";
import type { RefineResult } from "./refiner/types";

const WORK_KEY = "briefwise:work";
const VERSION = 1;

export type WorkingBrief = {
  input: string;
  /** What the AI produced. Used to show what has been edited. */
  generated: RefinedBrief;
  /** The current working brief, including the user's edits. */
  brief: RefinedBrief;
  meta: RefineResult["meta"];
  savedAt: number;
};

const isStringArray = (v: unknown): v is string[] =>
  Array.isArray(v) && v.every((item) => typeof item === "string");

function isBrief(v: unknown): v is RefinedBrief {
  if (!v || typeof v !== "object") return false;
  const b = v as Record<string, unknown>;
  return (
    typeof b.problem === "string" &&
    typeof b.userProblem === "string" &&
    isStringArray(b.businessObjectives) &&
    isStringArray(b.potentialRequirements) &&
    isStringArray(b.assumptions) &&
    isStringArray(b.clarificationQuestions) &&
    isStringArray(b.recommendedNextSteps) &&
    (b.statedByStakeholder === undefined || isStringArray(b.statedByStakeholder))
  );
}

export type LoadResult =
  | { status: "empty" }
  | { status: "ok"; work: WorkingBrief }
  | { status: "invalid" }
  | { status: "unavailable" };

export function loadWork(): LoadResult {
  let raw: string | null;
  try {
    raw = window.localStorage.getItem(WORK_KEY);
  } catch {
    return { status: "unavailable" };
  }
  if (!raw) return { status: "empty" };

  try {
    const data = JSON.parse(raw) as Record<string, unknown>;
    const meta = data.meta as RefineResult["meta"] | undefined;
    if (
      data.version !== VERSION ||
      typeof data.input !== "string" ||
      !isBrief(data.generated) ||
      !isBrief(data.brief) ||
      !meta ||
      typeof meta.provider !== "string" ||
      typeof meta.preview !== "boolean"
    ) {
      return { status: "invalid" };
    }
    return {
      status: "ok",
      work: {
        input: data.input,
        generated: data.generated,
        brief: data.brief,
        meta,
        savedAt: typeof data.savedAt === "number" ? data.savedAt : Date.now(),
      },
    };
  } catch {
    return { status: "invalid" };
  }
}

/** Returns false when the browser refused the write (private mode, quota, blocked). */
export function saveWork(work: WorkingBrief): boolean {
  try {
    window.localStorage.setItem(WORK_KEY, JSON.stringify({ version: VERSION, ...work }));
    return true;
  } catch {
    return false;
  }
}

export function clearWork() {
  try {
    window.localStorage.removeItem(WORK_KEY);
  } catch {
    // nothing to clear if storage is unavailable
  }
}
