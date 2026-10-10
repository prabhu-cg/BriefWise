import type { RefineResult } from "./types";

export class RefineError extends Error {}

/** Browser-side call to the app's own /api/refine route. */
export async function refineBrief(
  input: string,
  signal?: AbortSignal,
): Promise<RefineResult> {
  let response: Response;
  try {
    response = await fetch("/api/refine", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
      signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    throw new RefineError(
      "We couldn't reach BriefWise. Check your connection and try again.",
    );
  }

  if (!response.ok) {
    let message = "Something went wrong while refining your brief. Please try again.";
    try {
      const data = (await response.json()) as { error?: string };
      if (data.error) message = data.error;
    } catch {
      // keep generic message
    }
    throw new RefineError(message);
  }

  return (await response.json()) as RefineResult;
}
