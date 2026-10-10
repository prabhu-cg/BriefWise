import { generateText, Output } from "ai";
import { groq } from "@ai-sdk/groq";
import { SYSTEM_PROMPT, buildPrompt } from "./prompt";
import { InvalidBriefError, briefOutputSchema, normaliseBrief } from "./schema";
import type { BriefRefiner, RefineResult } from "./types";

/** Groq model id, used when GROQ_API_KEY is set. Supports JSON-schema structured output. */
const DEFAULT_GROQ_MODEL = "openai/gpt-oss-120b";
/** AI Gateway model id, used otherwise. */
const DEFAULT_GATEWAY_MODEL = "anthropic/claude-sonnet-5.5";

const isGroq = () => Boolean(process.env.GROQ_API_KEY);

export type RefinerFailure = "provider" | "invalid";

export class RefinerError extends Error {
  constructor(
    public readonly reason: RefinerFailure,
    options?: { cause?: unknown },
  ) {
    super(reason, options);
  }
}

/** True when server-side credentials for Groq or the AI Gateway are available. */
export function isAiConfigured(): boolean {
  return Boolean(
    process.env.GROQ_API_KEY || process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN,
  );
}

export const aiRefiner: BriefRefiner = {
  async refine({ input }) {
    const modelId =
      process.env.BRIEFWISE_MODEL || (isGroq() ? DEFAULT_GROQ_MODEL : DEFAULT_GATEWAY_MODEL);

    let output: unknown;
    try {
      const result = await generateText({
        model: isGroq() ? groq(modelId) : modelId,
        system: SYSTEM_PROMPT,
        prompt: buildPrompt(input),
        output: Output.object({ schema: briefOutputSchema }),
        temperature: 0.2,
        maxOutputTokens: 4000,
        maxRetries: 1,
        abortSignal: AbortSignal.timeout(50_000),
        ...(isGroq() && {
          providerOptions: { groq: { reasoningEffort: "low" } },
        }),
      });
      output = result.output;
    } catch (error) {
      // Never forward provider detail or request content to the client or logs.
      throw new RefinerError("provider", { cause: error });
    }

    let brief;
    try {
      brief = normaliseBrief(output);
    } catch (error) {
      if (error instanceof InvalidBriefError) throw new RefinerError("invalid");
      throw error;
    }

    const result: RefineResult = {
      brief,
      meta: { provider: isGroq() ? `groq/${modelId}` : modelId, preview: false },
    };
    return result;
  },
};
