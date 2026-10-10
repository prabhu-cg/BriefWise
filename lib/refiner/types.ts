import type { RefinedBrief } from "../types";

export type RefineRequest = {
  input: string;
};

export type RefineResult = {
  brief: RefinedBrief;
  meta: {
    /** Identifier of the service that produced the brief, e.g. "preview". */
    provider: string;
    /**
     * True when the brief is illustrative placeholder output that was NOT
     * generated from the user's input. The UI must say so.
     */
    preview: boolean;
  };
};

/** The one seam Phase 2 needs to implement to connect a real AI service. */
export interface BriefRefiner {
  refine(request: RefineRequest): Promise<RefineResult>;
}
