"use client";

import { useEffect, useRef, useState } from "react";
import { BriefResult, visibleSections, type Draft, type Drafts, type Field } from "./BriefResult";
import { BriefHealth } from "./BriefHealth";
import { buttonGhost, buttonPrimary, buttonSecondary } from "./ui";
import { AlertTriangle, ArrowRight, Check, Copy, Download, Info, Printer, Refresh } from "./icons";
import { briefToMarkdown, markdownFilename } from "@/lib/brief-markdown";
import type { WorkingBrief } from "@/lib/brief-storage";

type Props = {
  work: WorkingBrief;
  drafts: Drafts;
  focusHeading: boolean;
  storageIssue: string | null;
  onDraftChange: (field: Field, draft: Draft | undefined) => void;
  onSave: (field: Field, value: Draft) => void;
  onRestore: (field: Field) => void;
  onRefineAgain: () => void;
  onStartOver: () => void;
};

type Notice = { tone: "ok" | "error"; text: string } | null;

export function BriefView({
  work,
  drafts,
  focusHeading,
  storageIssue,
  onDraftChange,
  onSave,
  onRestore,
  onRefineAgain,
  onStartOver,
}: Props) {
  const { brief, generated, meta } = work;
  const [notice, setNotice] = useState<Notice>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sections = visibleSections(brief, drafts);
  const questionCount = brief.clarificationQuestions.filter((q) => q.trim()).length;
  const pendingDrafts = Object.keys(drafts).length;

  useEffect(() => {
    if (focusHeading) headingRef.current?.focus();
  }, [focusHeading]);

  useEffect(() => {
    if (!notice || notice.tone === "error") return;
    const timer = setTimeout(() => setNotice(null), 4000);
    return () => clearTimeout(timer);
  }, [notice]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(briefToMarkdown(brief));
      setNotice({ tone: "ok", text: "Brief copied to the clipboard." });
    } catch {
      setNotice({
        tone: "error",
        text: "Couldn't copy to the clipboard. Use Export Markdown to save the brief instead.",
      });
    }
  }

  function handleExport() {
    try {
      const blob = new Blob([briefToMarkdown(brief)], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = markdownFilename();
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setNotice({ tone: "ok", text: "Markdown file exported." });
    } catch {
      setNotice({
        tone: "error",
        text: "Couldn't create the file. Use Copy brief and paste it into a document instead.",
      });
    }
  }

  function handlePrint() {
    try {
      window.print();
    } catch {
      setNotice({ tone: "error", text: "Couldn't open the print dialog. Try your browser's Print command." });
    }
  }

  return (
    <div className="bw-rise mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14 print:max-w-none print:p-0">
      <p role="status" className="sr-only">
        {notice?.text ?? ""}
      </p>
      <div className="grid gap-10 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-16 print:block">
        <aside className="no-print lg:sticky lg:top-24 lg:self-start">
          <div className="flex flex-col gap-3">
            <button type="button" onClick={handleCopy} className={buttonPrimary}>
              <Copy />
              Copy brief
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button type="button" onClick={handleExport} className={`${buttonSecondary} px-3`}>
                <Download />
                Markdown
              </button>
              <button type="button" onClick={handlePrint} className={`${buttonSecondary} px-3`}>
                <Printer />
                Print
              </button>
            </div>
            <button type="button" onClick={onRefineAgain} className={buttonSecondary}>
              <Refresh />
              Refine again
            </button>

            {notice && (
              <p
                className={`flex gap-2 text-sm leading-snug ${notice.tone === "error" ? "text-[#8c1d18]" : "text-ink"}`}
              >
                {notice.tone === "error" ? (
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                ) : (
                  <Check className="mt-0.5 h-4 w-4 shrink-0" />
                )}
                <span>{notice.text}</span>
              </p>
            )}

            <button type="button" disabled aria-describedby="reqstudio-note" className={buttonSecondary}>
              Send to ReqStudio
            </button>
            <p id="reqstudio-note" className="text-sm text-ink-muted">
              Sending to ReqStudio is coming soon.
            </p>
          </div>

          <nav aria-label="Brief sections" className="mt-8 hidden lg:block">
            <p className="text-sm font-bold text-ink-muted">On this page</p>
            <ul className="mt-3 space-y-1">
              <li>
                <a href="#health" className="block rounded-md py-1.5 text-sm font-semibold hover:text-brand-strong">
                  Brief health
                </a>
              </li>
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block rounded-md py-1.5 text-sm font-semibold hover:text-brand-strong"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button type="button" onClick={onStartOver} className={`${buttonGhost} mt-6 -ml-3`}>
            Start a new brief
          </button>
        </aside>

        <div>
          <div className="hidden print:block">
            <h1 className="text-3xl font-extrabold text-ink-strong">UX Brief</h1>
            <p className="mt-1 text-sm text-ink-muted">
              Prepared with BriefWise · {new Date(work.savedAt).toLocaleDateString("en-GB")}
            </p>
          </div>

          <h1
            ref={headingRef}
            tabIndex={-1}
            className="text-4xl font-extrabold tracking-[-0.03em] text-ink-strong outline-none print:hidden sm:text-5xl"
          >
            Your working brief
          </h1>
          <p className="mt-3 text-lg print:hidden">
            {questionCount > 0 ? (
              <>
                <a href="#questions" className="font-semibold text-brand-strong underline underline-offset-4">
                  {questionCount} question{questionCount === 1 ? "" : "s"} still need answers
                </a>{" "}
                before design work starts.
              </>
            ) : (
              "No open questions are listed."
            )}{" "}
            Every section can be edited.
          </p>

          <div className="no-print mt-6 space-y-4">
            {meta.preview && (
              <div className="flex gap-3 rounded-xl border border-[#f0cdb8] bg-brand-tint p-4">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-strong" />
                <div>
                  <p className="font-bold text-ink-strong">Preview mode</p>
                  <p className="mt-0.5 leading-relaxed">
                    This brief is an illustrative example, not an analysis of your text. If the
                    AI service has been connected since, choose Refine again to generate a real one.
                  </p>
                </div>
              </div>
            )}
            {!meta.preview && (
              <div className="flex gap-3 rounded-xl border border-line bg-surface p-4">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-ink-muted" />
                <p className="leading-relaxed">
                  Generated by AI from your text. Potential requirements and assumptions are
                  inferences, so confirm them with the stakeholder before relying on them.
                </p>
              </div>
            )}
            {storageIssue && (
              <div role="alert" className="flex gap-3 rounded-xl border border-[#e8b4af] bg-[#fdf1f0] p-4">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[#8c1d18]" />
                <p className="leading-relaxed">{storageIssue}</p>
              </div>
            )}
            {pendingDrafts > 0 && (
              <p className="text-sm text-ink-muted">
                {pendingDrafts} section{pendingDrafts === 1 ? " has" : "s have"} unsaved changes.
              </p>
            )}
          </div>

          <div id="health" className="mt-8 scroll-mt-24 print:mt-6">
            <BriefHealth brief={brief} />
          </div>

          <details className="group no-print mt-6 rounded-xl border border-line bg-surface">
            <summary className="flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-ink-strong">
              Original request
              <span aria-hidden="true" className="text-ink-muted transition-transform group-open:rotate-90">
                <ArrowRight />
              </span>
            </summary>
            <p className="whitespace-pre-wrap border-t border-line px-4 py-3 leading-relaxed">{work.input}</p>
          </details>

          <div className="mt-10 print:mt-6">
            <BriefResult
              brief={brief}
              generated={generated}
              drafts={drafts}
              onDraftChange={onDraftChange}
              onSave={onSave}
              onRestore={onRestore}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
