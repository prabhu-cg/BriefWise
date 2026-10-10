import type { RefinedBrief } from "./types";

export const SAMPLE_STATEMENT =
  "We need a new website because the existing one is old and customers can't find our services. Marketing also wants better SEO and we'd like to showcase our case studies.";

/** Illustrative output for the sample statement. Used by the landing page and the Phase 1 preview refiner. */
export const SAMPLE_BRIEF: RefinedBrief = {
  signals: {
    problemClear: true,
    objectivesClear: true,
    usersIdentified: false,
    successMeasuresDefined: false,
    constraintsStated: false,
  },
  statedByStakeholder: [
    "The existing website is old",
    "Customers can't find the organisation's services",
    "Marketing wants better SEO",
    "They would like to showcase case studies",
  ],
  problem:
    "Customers are not finding the organisation's services on the current website, and the site is perceived as outdated. It is not yet clear whether the cause is content, navigation, search visibility or design.",
  businessObjectives: [
    "Help prospective customers discover and understand the services offered",
    "Improve organic search visibility for key services",
    "Use case studies to build credibility and support enquiries",
  ],
  userProblem:
    "Customers arrive wanting a particular service but struggle to locate it, so they leave or contact the team another way.",
  potentialRequirements: [
    "Clear, task-oriented navigation to each service",
    "Service pages with content structured for search",
    "A browsable case study section linked to relevant services",
    "Basic analytics to measure discovery and enquiries",
  ],
  assumptions: [
    "A new website is the right solution rather than improving the existing one",
    "Customers' difficulty is about findability, not interest in the services",
    "Case studies are what customers need to make a decision",
  ],
  clarificationQuestions: [
    "What evidence shows customers can't find the services (analytics, feedback, sales conversations)?",
    "Which services matter most to the business right now?",
    "What does “old” mean here: visual design, content, technology or all three?",
    "How will you know the new site has worked, and by when?",
  ],
  recommendedNextSteps: [
    "Gather existing evidence on how customers search for and navigate to services",
    "Confirm priority services and success measures with stakeholders",
    "Review the current site's structure and search performance",
    "Align on scope before moving to design",
  ],
};
