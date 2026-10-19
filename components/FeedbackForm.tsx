"use client";

import { useState } from "react";
import {
  FEEDBACK_TYPES,
  MAX_FEEDBACK_LENGTH,
  type FeedbackType,
} from "@/lib/feedback";
import { Check } from "./icons";
import { buttonPrimary } from "./ui";

type Status = "idle" | "sending" | "sent" | "error";

export function FeedbackForm() {
  const [type, setType] = useState<FeedbackType>("bug");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, message, website }),
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "We couldn't send your feedback. Please try again.");
      }
      setStatus("sent");
      setMessage("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "We couldn't send your feedback. Please try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-xl bg-surface p-4">
        <p className="text-lg font-bold text-ink-strong">Thank you</p>
        <p className="mt-1 leading-relaxed">
          Your feedback has been sent to the BriefWise team.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-3 text-base font-semibold text-brand-strong underline underline-offset-4"
        >
          Send more feedback
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={submit} className="space-y-5">
      <fieldset>
        <legend className="text-base font-bold text-ink-strong">What kind of feedback is it?</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {(Object.keys(FEEDBACK_TYPES) as FeedbackType[]).map((key) => (
            <label
              key={key}
              className={`cursor-pointer rounded-lg border px-3 py-2 text-sm font-semibold has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 ${
                type === key
                  ? "border-brand bg-brand-tint text-ink-strong"
                  : "border-[#c9c0b8] text-ink hover:border-ink-strong"
              }`}
            >
              <input
                type="radio"
                name="type"
                value={key}
                checked={type === key}
                onChange={() => setType(key)}
                className="sr-only"
              />
              {type === key && <Check className="mr-1.5 inline h-4 w-4 align-[-3px] text-brand-strong" />}
              {FEEDBACK_TYPES[key].label}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="feedback-message" className="text-base font-bold text-ink-strong">
          Your feedback
        </label>
        <textarea
          id="feedback-message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          readOnly={sending}
          maxLength={MAX_FEEDBACK_LENGTH + 200}
          rows={5}
          autoFocus
          required
          aria-describedby={`feedback-hint${error ? " feedback-error" : ""}`}
          aria-invalid={status === "error" || undefined}
          className="mt-2 block w-full resize-y rounded-xl border border-[#c9c0b8] bg-paper p-3 text-base leading-relaxed text-ink-strong placeholder:text-[#767676] read-only:bg-surface"
          placeholder="What happened, or what would make BriefWise better?"
        />
        <p id="feedback-hint" className="mt-2 text-sm text-ink-muted">
          Feedback is posted publicly on GitHub, so please don’t include personal or confidential
          details.
        </p>
      </div>

      {/* Honeypot: hidden from people, filled in by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </label>
      </div>

      {error && (
        <p id="feedback-error" role="alert" className="text-base font-semibold text-[#b42318]">
          {error}
        </p>
      )}

      <button type="submit" disabled={sending} className={`${buttonPrimary} w-full`}>
        {sending ? "Sending…" : "Send feedback"}
      </button>
    </form>
  );
}
