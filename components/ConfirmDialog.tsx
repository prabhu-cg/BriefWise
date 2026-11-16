"use client";

import { useEffect, useRef } from "react";
import { buttonDanger, buttonSecondary } from "./ui";
import { AlertTriangle } from "./icons";

type Props = {
  open: boolean;
  title: string;
  children: React.ReactNode;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
};

/** Native <dialog>: focus is trapped and Escape cancels. Focus starts on the safe option. Used only for destructive confirmations. */
export function ConfirmDialog({
  open,
  title,
  children,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="confirm-title"
      onCancel={(event) => {
        event.preventDefault();
        onCancel();
      }}
      className="bw-dialog no-print m-auto w-[min(28rem,calc(100%-2.5rem))] overflow-hidden rounded-[20px] border border-line bg-paper p-0 text-ink shadow-[var(--shadow-lg)] backdrop:bg-[var(--c-scrim)]"
    >
      <div className="p-6 sm:p-8">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-danger-tint text-danger">
          <AlertTriangle className="h-5 w-5" />
        </span>
        <h2 id="confirm-title" className="mt-5 text-xl leading-snug">
          {title}
        </h2>
        <div className="mt-3 space-y-2 leading-relaxed">{children}</div>
      </div>
      <div className="flex flex-col-reverse gap-3 border-t border-line bg-surface px-6 py-4 sm:flex-row sm:justify-end sm:px-8">
        <button type="button" onClick={onCancel} autoFocus className={buttonSecondary}>
          {cancelLabel}
        </button>
        <button type="button" onClick={onConfirm} className={buttonDanger}>
          {confirmLabel}
        </button>
      </div>
    </dialog>
  );
}
