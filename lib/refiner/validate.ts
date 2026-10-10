export const MIN_INPUT_LENGTH = 20;
export const MAX_INPUT_LENGTH = 8000;

export type InputCheck =
  | { ok: true; value: string }
  | { ok: false; message: string };

export function validateInput(raw: unknown): InputCheck {
  if (typeof raw !== "string") {
    return { ok: false, message: "Add the stakeholder's request to refine." };
  }
  const value = raw.trim();
  if (value.length < MIN_INPUT_LENGTH) {
    return {
      ok: false,
      message: `Add a little more detail (at least ${MIN_INPUT_LENGTH} characters).`,
    };
  }
  if (value.length > MAX_INPUT_LENGTH) {
    return {
      ok: false,
      message: `That's too long to refine in one go (maximum ${MAX_INPUT_LENGTH.toLocaleString("en-US")} characters).`,
    };
  }
  return { ok: true, value };
}
