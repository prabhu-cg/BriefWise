/** Judgements about the stakeholder's input (not the brief text), used by Brief Health. */
export type BriefSignals = {
  problemClear: boolean;
  objectivesClear: boolean;
  usersIdentified: boolean;
  successMeasuresDefined: boolean;
  constraintsStated: boolean;
};

export type RefinedBrief = {
  problem: string;
  businessObjectives: string[];
  userProblem: string;
  potentialRequirements: string[];
  assumptions: string[];
  clarificationQuestions: string[];
  recommendedNextSteps: string[];
  /**
   * Optional (added in Phase 2). Points the stakeholder explicitly made,
   * kept close to their own wording, so the reader can separate what was
   * said from what was inferred.
   */
  statedByStakeholder?: string[];
  /** Optional (added in Phase 3). Absent on briefs generated before Phase 3. */
  signals?: BriefSignals;
};
