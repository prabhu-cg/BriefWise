import type { RefinedBrief } from "./types";

const list = (items: string[]) => {
  const clean = items.map((item) => item.trim()).filter(Boolean);
  return clean.length ? clean.map((item) => `- ${item}`).join("\n") : "_None identified_";
};

const text = (value: string) => value.trim() || "_Not specified_";

export function briefToMarkdown(brief: RefinedBrief): string {
  const parts = ["# UX Brief"];
  if (brief.statedByStakeholder?.some((item) => item.trim())) {
    parts.push("## Stated by the stakeholder", list(brief.statedByStakeholder));
  }
  parts.push(
    "## Problem",
    text(brief.problem),
    "## Business objectives",
    list(brief.businessObjectives),
    "## User problem",
    text(brief.userProblem),
    "## Potential requirements",
    list(brief.potentialRequirements),
    "## Assumptions",
    list(brief.assumptions),
    "## Questions requiring clarification",
    list(brief.clarificationQuestions),
    "## Recommended next steps",
    list(brief.recommendedNextSteps),
  );
  return parts.join("\n\n") + "\n";
}

export function markdownFilename(date = new Date()): string {
  const day = date.toISOString().slice(0, 10);
  return `ux-brief-${day}.md`;
}
