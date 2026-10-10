import { aiRefiner, isAiConfigured } from "./ai";
import { previewRefiner } from "./preview";
import type { BriefRefiner } from "./types";

/**
 * Server-side factory. Uses the AI refiner when gateway credentials are
 * configured; otherwise falls back to the clearly labelled preview refiner so
 * the app stays usable in local development.
 */
export function getRefiner(): BriefRefiner {
  return isAiConfigured() ? aiRefiner : previewRefiner;
}
