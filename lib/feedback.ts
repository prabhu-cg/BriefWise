export const FEEDBACK_TYPES = {
  bug: { label: "Something is broken", labels: ["bug", "user-feedback"] },
  idea: { label: "An idea or request", labels: ["enhancement", "user-feedback"] },
  other: { label: "Something else", labels: ["question", "user-feedback"] },
} as const;

export type FeedbackType = keyof typeof FEEDBACK_TYPES;

export const MIN_FEEDBACK_LENGTH = 10;
export const MAX_FEEDBACK_LENGTH = 2000;

export type FeedbackCheck =
  | { ok: true; type: FeedbackType; message: string }
  | { ok: false; message: string };

export function validateFeedback(raw: unknown): FeedbackCheck {
  const { type, message } = (raw ?? {}) as { type?: unknown; message?: unknown };
  if (typeof type !== "string" || !(type in FEEDBACK_TYPES)) {
    return { ok: false, message: "Choose what kind of feedback this is." };
  }
  if (typeof message !== "string" || message.trim().length < MIN_FEEDBACK_LENGTH) {
    return {
      ok: false,
      message: `Add a little more detail (at least ${MIN_FEEDBACK_LENGTH} characters).`,
    };
  }
  const trimmed = message.trim();
  if (trimmed.length > MAX_FEEDBACK_LENGTH) {
    return {
      ok: false,
      message: `That's too long (maximum ${MAX_FEEDBACK_LENGTH.toLocaleString("en-US")} characters).`,
    };
  }
  return { ok: true, type: type as FeedbackType, message: trimmed };
}
