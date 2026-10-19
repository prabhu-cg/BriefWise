"use client";

import { useEffect, useRef, useState } from "react";
import { FeedbackForm } from "./FeedbackForm";
import { Close, MessageSquare } from "./icons";

/** Floating feedback button that opens a non-modal panel in the bottom-right corner. */
export function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="no-print fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <section
          role="dialog"
          aria-labelledby="feedback-title"
          className="max-h-[calc(100dvh-6rem)] w-[min(24rem,calc(100vw-2rem))] overflow-y-auto rounded-xl border border-line bg-paper p-5 shadow-[0_24px_64px_-16px_rgb(38_38_38/0.45)]"
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h2 id="feedback-title" className="text-lg font-extrabold tracking-tight text-ink-strong">
                Send feedback
              </h2>
              <p className="mt-1 text-sm text-ink-muted">Found a problem or have an idea? Tell us.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                buttonRef.current?.focus();
              }}
              aria-label="Close feedback"
              className="-mr-2 -mt-1 rounded-lg p-2 text-ink-strong hover:bg-surface"
            >
              <Close className="h-5 w-5" />
            </button>
          </div>
          <FeedbackForm />
        </section>
      )}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="inline-flex items-center gap-2 rounded-full bg-ink-strong px-4 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgb(38_38_38/0.6)] transition-colors hover:bg-brand-strong"
      >
        <MessageSquare className="h-5 w-5" />
        Feedback
      </button>
    </div>
  );
}
