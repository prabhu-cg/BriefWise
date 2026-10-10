import { NextResponse } from "next/server";
import { getRefiner } from "@/lib/refiner";
import { RefinerError } from "@/lib/refiner/ai";
import { validateInput, MAX_INPUT_LENGTH } from "@/lib/refiner/validate";
import { rateLimit } from "@/lib/rate-limit";

export const maxDuration = 60;

const MAX_BODY_BYTES = MAX_INPUT_LENGTH * 4 + 1024;

function fail(message: string, status: number, headers?: HeadersInit) {
  return NextResponse.json({ error: message }, { status, headers });
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const limit = rateLimit(ip);
  if (!limit.ok) {
    return fail("You've refined a lot of briefs in a short time. Please wait a few minutes and try again.", 429, {
      "Retry-After": String(limit.retryAfter),
    });
  }

  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) return fail("That request is too large.", 413);

  let body: unknown;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return fail("That request is too large.", 413);
    body = JSON.parse(text);
  } catch {
    return fail("Invalid request.", 400);
  }

  const check = validateInput((body as { input?: unknown } | null)?.input);
  if (!check.ok) return fail(check.message, 400);

  try {
    const result = await getRefiner().refine({ input: check.value });
    return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    // Log the failure category only, never the submitted content or provider detail.
    const reason = error instanceof RefinerError ? error.reason : "unknown";
    console.error(`[refine] failed: ${reason}`);
    return fail(
      reason === "invalid"
        ? "BriefWise couldn't produce a reliable brief from that response. Please try again."
        : "The refinement service is unavailable right now. Please try again in a moment.",
      502,
    );
  }
}
