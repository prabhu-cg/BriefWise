import { NextResponse } from "next/server";
import { validateFeedback, MAX_FEEDBACK_LENGTH } from "@/lib/feedback";
import { fileFeedback, isGithubConfigured } from "@/lib/github";
import { rateLimit } from "@/lib/rate-limit";

const MAX_BODY_BYTES = MAX_FEEDBACK_LENGTH * 4 + 1024;

function fail(message: string, status: number, headers?: HeadersInit) {
  return NextResponse.json({ error: message }, { status, headers });
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const limit = rateLimit(`feedback:${ip}`);
  if (!limit.ok) {
    return fail("You've sent a lot of feedback in a short time. Please wait a few minutes and try again.", 429, {
      "Retry-After": String(limit.retryAfter),
    });
  }

  let body: unknown;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return fail("That request is too large.", 413);
    body = JSON.parse(text);
  } catch {
    return fail("Invalid request.", 400);
  }

  // Honeypot: real users never see this field. Pretend success so bots don't retry.
  if ((body as { website?: unknown } | null)?.website) {
    return NextResponse.json({ ok: true });
  }

  const check = validateFeedback(body);
  if (!check.ok) return fail(check.message, 400);

  if (!isGithubConfigured()) {
    return fail("Feedback isn't available right now. Please try again later.", 503);
  }

  try {
    await fileFeedback(check.type, check.message);
    return NextResponse.json({ ok: true });
  } catch (error) {
    // Log the failure only, never the submitted content.
    console.error(`[feedback] failed: ${error instanceof Error ? error.message : "unknown"}`);
    return fail("We couldn't send your feedback. Please try again in a moment.", 502);
  }
}
