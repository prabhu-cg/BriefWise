"use client";

import { useEffect, useRef, useState } from "react";
import type { RefinedBrief } from "@/lib/types";
import { buttonGhost, buttonPrimary, buttonSecondary } from "./ui";
import { Pencil, Plus, Refresh, Close } from "./icons";

export type Field =
  | "statedByStakeholder"
  | "problem"
  | "businessObjectives"
  | "userProblem"
  | "potentialRequirements"
  | "assumptions"
  | "clarificationQuestions"
  | "recommendedNextSteps";

export type Draft = string | string[];
export type Drafts = Partial<Record<Field, Draft>>;

export type SectionDef = {
  field: Field;
  id: string;
  title: string;
  kind: "text" | "list";
  /** Plain-text label for how much confidence the section carries. */
  basis?: string;
  emphasis?: boolean;
};

export const SECTIONS: SectionDef[] = [
  { field: "statedByStakeholder", id: "stated", title: "What the stakeholder stated", kind: "list", basis: "Explicitly said" },
  { field: "problem", id: "problem", title: "Problem", kind: "text", basis: "Based on what was stated" },
  { field: "businessObjectives", id: "objectives", title: "Business objectives", kind: "list", basis: "Stated or clearly implied" },
  { field: "userProblem", id: "user-problem", title: "User problem", kind: "text", basis: "Based on what was stated" },
  { field: "potentialRequirements", id: "requirements", title: "Potential requirements", kind: "list", basis: "Possibilities to review, not confirmed requirements" },
  { field: "assumptions", id: "assumptions", title: "Assumptions", kind: "list", basis: "Unconfirmed, validate before relying on" },
  { field: "clarificationQuestions", id: "questions", title: "Questions requiring clarification", kind: "list", basis: "Still unknown", emphasis: true },
  { field: "recommendedNextSteps", id: "next-steps", title: "Recommended next steps", kind: "list" },
];

/** Sections to show: the stakeholder section only exists when the brief has it. */
export function visibleSections(brief: RefinedBrief, drafts: Drafts): SectionDef[] {
  return SECTIONS.filter(
    (s) => s.field !== "statedByStakeholder" || (brief.statedByStakeholder?.length ?? 0) > 0 || s.field in drafts,
  );
}

export function sameValue(a: unknown, b: unknown) {
  return JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
}

type SectionProps = {
  def: SectionDef;
  value: Draft;
  generated: Draft;
  draft: Draft | undefined;
  onDraftChange: (field: Field, draft: Draft | undefined) => void;
  onSave: (field: Field, value: Draft) => void;
  onRestore: (field: Field) => void;
};

function cleanDraft(def: SectionDef, draft: Draft): Draft {
  if (def.kind === "text") return (draft as string).trim();
  return (draft as string[]).map((item) => item.trim()).filter(Boolean);
}

function BriefSection({ def, value, generated, draft, onDraftChange, onSave, onRestore }: SectionProps) {
  const editing = draft !== undefined;
  const edited = !sameValue(value, generated);
  const editButtonRef = useRef<HTMLButtonElement>(null);
  const wasEditing = useRef(false);
  const [focusLast, setFocusLast] = useState(false);

  useEffect(() => {
    if (wasEditing.current && !editing) editButtonRef.current?.focus();
    wasEditing.current = editing;
  }, [editing]);

  function startEditing() {
    onDraftChange(def.field, def.kind === "text" ? (value as string) : [...(value as string[]), ...((value as string[]).length ? [] : [""])]);
  }

  const heading = (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <h2 id={`${def.id}-title`} className="text-xl font-bold tracking-tight text-ink-strong">
        {def.title}
      </h2>
      {edited && (
        <span className="rounded-md border border-line bg-surface px-2 py-0.5 text-xs font-bold text-ink-strong">
          Edited
        </span>
      )}
      {!editing && (
        <button
          ref={editButtonRef}
          type="button"
          onClick={startEditing}
          aria-label={`Edit ${def.title}`}
          className={`${buttonGhost} no-print -my-1 ml-auto print:hidden`}
        >
          <Pencil />
          Edit
        </button>
      )}
    </div>
  );

  const basis = def.basis && (
    <p className="mt-1 text-sm font-semibold text-ink-muted">{def.basis}</p>
  );

  return (
    <section
      id={def.id}
      aria-labelledby={`${def.id}-title`}
      className={`scroll-mt-24 py-8 first:pt-0 ${
        def.emphasis
          ? "my-4 rounded-xl border border-[#f0cdb8] bg-brand-tint p-6 print:border-line print:bg-transparent sm:p-8"
          : "border-t border-line first:border-t-0"
      }`}
    >
      {heading}
      {basis}

      {!editing && (
        <div className="mt-3">
          {def.kind === "text" ? (
            (value as string).trim() ? (
              <p className="max-w-prose whitespace-pre-wrap text-lg leading-relaxed">{value as string}</p>
            ) : (
              <p className="text-ink-muted">Not written yet.</p>
            )
          ) : (value as string[]).length ? (
            <ul className="max-w-prose space-y-3">
              {(value as string[]).map((item, index) => (
                <li key={`${index}-${item}`} className="flex gap-3 text-lg leading-relaxed">
                  <span aria-hidden="true" className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-sm bg-brand" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-ink-muted">
              {def.field === "statedByStakeholder"
                ? "Nothing listed."
                : "Nothing identified yet. Edit to add your own, or see the questions requiring clarification."}
            </p>
          )}
        </div>
      )}

      {editing && (
        <div className="mt-4">
          {def.kind === "text" ? (
            <>
              <label htmlFor={`${def.id}-edit`} className="sr-only">
                {def.title}
              </label>
              <textarea
                id={`${def.id}-edit`}
                autoFocus
                rows={4}
                value={draft as string}
                onChange={(event) => onDraftChange(def.field, event.target.value)}
                className="block w-full resize-y rounded-lg border border-[#c9c0b8] bg-paper p-3 text-lg leading-relaxed text-ink-strong"
              />
            </>
          ) : (
            <>
              <ul className="space-y-3">
                {(draft as string[]).map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <label htmlFor={`${def.id}-edit-${index}`} className="sr-only">
                      {def.title}, item {index + 1}
                    </label>
                    <textarea
                      id={`${def.id}-edit-${index}`}
                      autoFocus={focusLast && index === (draft as string[]).length - 1}
                      rows={2}
                      value={item}
                      onChange={(event) => {
                        const next = [...(draft as string[])];
                        next[index] = event.target.value;
                        onDraftChange(def.field, next);
                      }}
                      className="block min-w-0 flex-1 resize-y rounded-lg border border-[#c9c0b8] bg-paper p-3 text-base leading-relaxed text-ink-strong"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        onDraftChange(def.field, (draft as string[]).filter((_, i) => i !== index))
                      }
                      aria-label={`Remove ${def.title} item ${index + 1}`}
                      className={`${buttonGhost} mt-1 px-2`}
                    >
                      <Close />
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => {
                  setFocusLast(true);
                  onDraftChange(def.field, [...(draft as string[]), ""]);
                }}
                className={`${buttonGhost} mt-3`}
              >
                <Plus />
                Add item
              </button>
            </>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onSave(def.field, cleanDraft(def, draft as Draft))}
              className={buttonPrimary}
            >
              Save changes
            </button>
            <button
              type="button"
              onClick={() => {
                setFocusLast(false);
                onDraftChange(def.field, undefined);
              }}
              className={buttonSecondary}
            >
              Cancel
            </button>
            {edited && (
              <button
                type="button"
                onClick={() => {
                  setFocusLast(false);
                  onRestore(def.field);
                }}
                className={`${buttonGhost} sm:ml-auto`}
              >
                <Refresh />
                Restore generated version
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

type ResultProps = {
  brief: RefinedBrief;
  generated: RefinedBrief;
  drafts: Drafts;
  onDraftChange: (field: Field, draft: Draft | undefined) => void;
  onSave: (field: Field, value: Draft) => void;
  onRestore: (field: Field) => void;
};

export function BriefResult({ brief, generated, drafts, onDraftChange, onSave, onRestore }: ResultProps) {
  return (
    <div>
      {visibleSections(brief, drafts).map((def) => (
        <BriefSection
          key={def.id}
          def={def}
          value={(brief[def.field] ?? (def.kind === "list" ? [] : "")) as Draft}
          generated={(generated[def.field] ?? (def.kind === "list" ? [] : "")) as Draft}
          draft={drafts[def.field]}
          onDraftChange={onDraftChange}
          onSave={onSave}
          onRestore={onRestore}
        />
      ))}
    </div>
  );
}
