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
          className="bw-rise max-h-[calc(100dvh-6rem)] w-[min(24rem,calc(100vw-2rem))] overflow-y-auto rounded-[20px] border border-line bg-paper p-5 shadow-[var(--shadow-lg)]"
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h2 id="feedback-title" className="text-xl">
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
              className="-mr-1 -mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink-strong hover:bg-sand"
            >
              <Close className="h-4 w-4" />
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
        className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong bg-paper px-5 text-sm font-semibold text-ink-strong shadow-[var(--shadow-md)] transition-colors hover:bg-sand"
      >
        <MessageSquare className="h-[18px] w-[18px]" />
        Feedback
      </button>
    </div>
  );
}
