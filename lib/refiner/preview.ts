import { SAMPLE_BRIEF } from "../sample";
import type { BriefRefiner, RefineResult } from "./types";

/**
 * Phase 1 stand-in used until an AI service is connected.
 *
 * It does not analyse the input. It returns a fixed, clearly labelled
 * example (`meta.preview = true`) so the full interface can be exercised.
 */
export const previewRefiner: BriefRefiner = {
  async refine() {
    await new Promise((resolve) => setTimeout(resolve, 900));
    const result: RefineResult = {
      brief: SAMPLE_BRIEF,
      meta: { provider: "preview", preview: true },
    };
    return result;
  },
};
