"use client";

import { useEffect, useRef, useState } from "react";
import { BriefView } from "./BriefView";
import { ConfirmDialog } from "./ConfirmDialog";
import type { Draft, Drafts, Field } from "./BriefResult";
import { buttonGhost, buttonPrimary, buttonSecondary } from "./ui";
import { AlertTriangle, ArrowRight, Info } from "./icons";
import { SAMPLE_STATEMENT } from "@/lib/sample";
import { RefineError, refineBrief } from "@/lib/refiner/client";
import { clearWork, loadWork, saveWork, type WorkingBrief } from "@/lib/brief-storage";
import { MAX_INPUT_LENGTH, MIN_INPUT_LENGTH, validateInput } from "@/lib/refiner/validate";

type Status = "idle" | "loading" | "error";
type View = "input" | "brief";
type Confirm = "regenerate" | "start-over" | null;

const DRAFT_KEY = "briefwise:draft";

function readDraft(): string {
  try {
    return window.localStorage.getItem(DRAFT_KEY) ?? "";
  } catch {
    return "";
  }
}

function writeDraft(value: string) {
  try {
    if (value) window.localStorage.setItem(DRAFT_KEY, value);
    else window.localStorage.removeItem(DRAFT_KEY);
  } catch {
    // storage unavailable: the draft just won't persist
  }
}

const STORAGE_WARNING =
  "Your browser blocked saving, so this brief won't survive a refresh. Export or copy it to keep it.";

function Spinner() {
  return (
    <svg className="bw-spin h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Refiner() {
  const [ready, setReady] = useState(false);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [stage, setStage] = useState(0);
  const [work, setWork] = useState<WorkingBrief | null>(null);
  const [view, setView] = useState<View>("input");
  const [drafts, setDrafts] = useState<Drafts>({});
  const [confirm, setConfirm] = useState<Confirm>(null);
  const [storageIssue, setStorageIssue] = useState<string | null>(null);
  const [restoreIssue, setRestoreIssue] = useState<string | null>(null);
  const [justGenerated, setJustGenerated] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const loaded = loadWork();
    /* eslint-disable react-hooks/set-state-in-effect -- restoring from localStorage after hydration */
    if (loaded.status === "ok") {
      setWork(loaded.work);
      setInput(loaded.work.input);
      setView("brief");
    } else {
      setInput(readDraft());
      if (loaded.status === "invalid") {
        setRestoreIssue(
          "We couldn't restore your saved brief because it was incomplete. You can refine it again below.",
        );
      }
      if (loaded.status === "unavailable") {
        setStorageIssue(STORAGE_WARNING);
      }
    }
    setReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
    return () => abortRef.current?.abort();
  }, []);

  useEffect(() => {
    if (status !== "loading") return;
    const timer = setTimeout(() => setStage(1), 3500);
    return () => clearTimeout(timer);
  }, [status]);

  const check = validateInput(input);
  const trimmedLength = input.trim().length;
  const loading = status === "loading";
  const canSubmit = check.ok && !loading;

  function persist(next: WorkingBrief) {
    setWork(next);
    setStorageIssue(saveWork(next) ? null : STORAGE_WARNING);
  }

  function updateInput(value: string) {
    setInput(value);
    writeDraft(value);
    if (status === "error") {
      setStatus("idle");
      setError(null);
    }
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!check.ok || loading) return;
    if (work) setConfirm("regenerate");
    else void generate();
  }

  async function generate() {
    if (!check.ok) return;
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setConfirm(null);
    setStage(0);
    setStatus("loading");
    setError(null);
    try {
      const refined = await refineBrief(check.value, controller.signal);
      persist({
        input: check.value,
        generated: refined.brief,
        brief: refined.brief,
        meta: refined.meta,
        savedAt: Date.now(),
      });
      setDrafts({});
      setRestoreIssue(null);
      setJustGenerated(true);
      setStatus("idle");
      setView("brief");
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      // A failed regeneration leaves the current brief untouched.
      setError(
        err instanceof RefineError
          ? err.message
          : "Something went wrong while refining your brief. Please try again.",
      );
      setStatus("error");
    }
  }

  function handleClear() {
    abortRef.current?.abort();
    updateInput("");
    setError(null);
    setStatus("idle");
    textareaRef.current?.focus();
  }

  function handleExample() {
    updateInput(SAMPLE_STATEMENT);
    textareaRef.current?.focus();
  }

  function backToBrief() {
    abortRef.current?.abort();
    setStatus("idle");
    setError(null);
    if (work) setInput(work.input);
    setJustGenerated(false);
    setView("brief");
  }

  function refineAgain() {
    setView("input");
    requestAnimationFrame(() => textareaRef.current?.focus());
  }

  function changeDraft(field: Field, draft: Draft | undefined) {
    setDrafts((current) => {
      const next = { ...current };
      if (draft === undefined) delete next[field];
      else next[field] = draft;
      return next;
    });
  }

  function saveSection(field: Field, value: Draft) {
    if (!work) return;
    persist({ ...work, brief: { ...work.brief, [field]: value }, savedAt: Date.now() });
    changeDraft(field, undefined);
  }

  function restoreSection(field: Field) {
    if (!work) return;
    const original = work.generated[field];
    const brief = { ...work.brief };
    if (original === undefined) delete brief[field];
    else (brief as Record<string, unknown>)[field] = original;
    persist({ ...work, brief, savedAt: Date.now() });
    changeDraft(field, undefined);
  }

  function startOver() {
    clearWork();
    writeDraft("");
    abortRef.current?.abort();
    setWork(null);
    setDrafts({});
    setInput("");
    setStatus("idle");
    setError(null);
    setConfirm(null);
    setStorageIssue(null);
    setJustGenerated(false);
    setView("input");
    requestAnimationFrame(() => textareaRef.current?.focus());
  }

  if (!ready) {
    return <div className="mx-auto min-h-[60vh] max-w-6xl px-5 py-10 sm:px-8" aria-hidden="true" />;
  }

  const editedCount = work
    ? (Object.keys(work.brief) as (keyof typeof work.brief)[]).filter(
        (key) => JSON.stringify(work.brief[key]) !== JSON.stringify(work.generated[key]),
      ).length
    : 0;
  const unsaved = Object.keys(drafts).length;

  const dialogs = (
    <>
      <ConfirmDialog
        open={confirm === "regenerate"}
        title="Replace your current brief?"
        confirmLabel="Replace brief"
        cancelLabel="Keep current brief"
        onConfirm={() => void generate()}
        onCancel={() => setConfirm(null)}
      >
        <p>
          Refining again generates a new brief from the request below and replaces all the content in
          your current one.
        </p>
        {(editedCount > 0 || unsaved > 0) && (
          <p className="font-semibold text-ink-strong">
            {editedCount > 0 &&
              `Your edits to ${editedCount} section${editedCount === 1 ? "" : "s"} will be lost`}
            {editedCount > 0 && unsaved > 0 && ", along with "}
            {editedCount === 0 && unsaved > 0 && "You have "}
            {unsaved > 0 && `${unsaved} unsaved change${unsaved === 1 ? "" : "s"}`}
            {"."}
          </p>
        )}
        <p>If the new brief fails to generate, your current one stays as it is.</p>
      </ConfirmDialog>
      <ConfirmDialog
        open={confirm === "start-over"}
        title="Start a new brief?"
        confirmLabel="Discard and start new"
        cancelLabel="Keep this brief"
        onConfirm={startOver}
        onCancel={() => setConfirm(null)}
      >
        <p>This removes the current brief, including any edits, from this browser. It can&rsquo;t be undone.</p>
        <p>Use Copy brief or Markdown first if you want to keep it.</p>
      </ConfirmDialog>
    </>
  );

  if (view === "brief" && work) {
    return (
      <>
        <BriefView
          work={work}
          drafts={drafts}
          focusHeading={justGenerated}
          storageIssue={storageIssue}
          onDraftChange={changeDraft}
          onSave={saveSection}
          onRestore={restoreSection}
          onRefineAgain={refineAgain}
          onStartOver={() => setConfirm("start-over")}
        />
        {dialogs}
      </>
    );
  }

  const helper =
    trimmedLength === 0
      ? "Nothing to refine yet."
      : trimmedLength < MIN_INPUT_LENGTH
        ? `Add a little more detail, at least ${MIN_INPUT_LENGTH} characters.`
        : "Ready to refine.";
  const hasBrief = work !== null;

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-16">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-16">
        <form onSubmit={handleSubmit} noValidate aria-busy={loading}>
          {hasBrief && (
            <div className="mb-8 flex flex-col gap-3 rounded-xl border border-line bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex gap-3 leading-snug">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-ink-muted" />
                <span>
                  <span className="font-bold text-ink-strong">Your current brief is kept</span> until
                  you confirm a new one.
                </span>
              </p>
              <button type="button" onClick={backToBrief} className={buttonSecondary}>
                Back to your brief
              </button>
            </div>
          )}

          {restoreIssue && (
            <div role="alert" className="mb-8 flex gap-3 rounded-xl border border-[#e8b4af] bg-[#fdf1f0] p-4">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[#8c1d18]" />
              <p className="leading-relaxed">{restoreIssue}</p>
            </div>
          )}

          <h1 className="text-balance text-4xl font-extrabold leading-[1.08] tracking-[-0.03em] text-ink-strong sm:text-5xl">
            <label htmlFor="brief-input">What did the stakeholder say?</label>
          </h1>
          <p id="brief-hint" className="mt-4 max-w-2xl text-lg leading-relaxed">
            Paste the original request, notes or rough brief. Keep it messy, BriefWise will help
            structure it.
          </p>

          <div className="mt-8 rounded-xl border border-[#c9c0b8] bg-paper shadow-[0_1px_2px_rgb(38_38_38/0.05)] transition-shadow focus-within:border-brand focus-within:shadow-[0_0_0_3px_rgb(199_69_4/0.25)]">
            <textarea
              id="brief-input"
              ref={textareaRef}
              value={input}
              onChange={(event) => updateInput(event.target.value)}
              onKeyDown={(event) => {
                if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
                  event.currentTarget.form?.requestSubmit();
                }
              }}
              readOnly={loading}
              maxLength={MAX_INPUT_LENGTH + 500}
              rows={10}
              placeholder="We need a new website because the existing one is old and customers can't find our services..."
              aria-describedby={`brief-hint brief-meta${error ? " brief-error" : ""}`}
              aria-invalid={status === "error" || undefined}
              className="block min-h-64 w-full resize-y rounded-t-xl bg-transparent p-5 text-lg leading-relaxed text-ink-strong outline-none placeholder:text-[#767676] read-only:bg-surface"
            />
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line px-3 py-2">
              <button type="button" onClick={handleExample} disabled={loading} className={buttonGhost}>
                Use an example
              </button>
              <div id="brief-meta" className="flex items-center gap-3 px-2 text-sm text-ink-muted">
                <span>{helper}</span>
                <span
                  className={`tabular-nums ${trimmedLength > MAX_INPUT_LENGTH ? "font-bold text-brand-strong" : ""}`}
                >
                  {trimmedLength.toLocaleString("en-US")} / {MAX_INPUT_LENGTH.toLocaleString("en-US")}
                </span>
              </div>
            </div>
          </div>

          {error && (
            <div
              id="brief-error"
              role="alert"
              className="mt-5 flex gap-3 rounded-xl border border-[#e8b4af] bg-[#fdf1f0] p-4"
            >
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[#8c1d18]" />
              <div>
                <p className="font-bold text-[#8c1d18]">
                  {hasBrief ? "Couldn’t regenerate the brief" : "Couldn’t refine this brief"}
                </p>
                <p className="mt-0.5">{error}</p>
                {hasBrief && <p className="mt-0.5">Your current brief has not been changed.</p>}
              </div>
            </div>
          )}
          {!error && !check.ok && trimmedLength > MAX_INPUT_LENGTH && (
            <p className="mt-3 font-semibold text-brand-strong">{check.message}</p>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button type="submit" disabled={!canSubmit} className={buttonPrimary}>
              {loading && <Spinner />}
              {loading
                ? "Refining…"
                : status === "error"
                  ? "Try again"
                  : hasBrief
                    ? "Regenerate brief"
                    : "Refine brief"}
              {!loading && <ArrowRight />}
            </button>
            <button type="button" onClick={handleClear} disabled={!input} className={buttonSecondary}>
              Clear
            </button>
            <p className="hidden text-sm text-ink-muted sm:ml-auto sm:block">or press Ctrl/⌘ + Enter</p>
          </div>

          <p role="status" className="mt-4 min-h-6 text-ink-muted">
            {loading
              ? stage === 0
                ? "Analysing your brief…"
                : "Identifying objectives, assumptions and open questions…"
              : ""}
          </p>
        </form>

        <aside aria-labelledby="gets-title" className="lg:pt-3">
          <h2 id="gets-title" className="text-lg font-bold text-ink-strong">
            What you&rsquo;ll get
          </h2>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {[
              ["Problem", "What is actually wrong, in one clear statement."],
              ["Business objectives", "What the business wants to achieve."],
              ["User problem", "What people are struggling with."],
              ["Potential requirements", "What the solution may need to do."],
              ["Assumptions", "What is being taken for granted."],
              ["Questions requiring clarification", "What still needs an answer."],
              ["Recommended next steps", "What to do before design starts."],
            ].map(([title, body]) => (
              <li key={title} className="py-3">
                <p className="font-semibold text-ink-strong">{title}</p>
                <p className="text-sm text-ink-muted">{body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-ink-muted">
            No account needed. Your work is saved in this browser. Your text is sent to an AI service
            only when you refine.
          </p>
        </aside>
      </div>
      {dialogs}
    </div>
  );
}
