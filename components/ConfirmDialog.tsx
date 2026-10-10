"use client";

import { useEffect, useRef } from "react";
import { buttonPrimary, buttonSecondary } from "./ui";

type Props = {
  open: boolean;
  title: string;
  children: React.ReactNode;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
};

/** Native <dialog>: focus is trapped and Escape cancels. Focus starts on the safe option. */
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
      className="no-print m-auto w-[min(32rem,calc(100%-2.5rem))] rounded-xl border border-line bg-paper p-6 text-ink shadow-[0_24px_64px_-16px_rgb(38_38_38/0.45)] backdrop:bg-ink-strong/50 sm:p-8"
    >
      <h2 id="confirm-title" className="text-xl font-extrabold tracking-tight text-ink-strong">
        {title}
      </h2>
      <div className="mt-3 space-y-2 leading-relaxed">{children}</div>
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button type="button" onClick={onCancel} autoFocus className={buttonSecondary}>
          {cancelLabel}
        </button>
        <button type="button" onClick={onConfirm} className={buttonPrimary}>
          {confirmLabel}
        </button>
      </div>
    </dialog>
  );
}
