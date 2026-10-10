const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-base font-semibold transition-[background-color,border-color,color,transform] duration-150 active:translate-y-px disabled:cursor-not-allowed disabled:active:translate-y-0";

export const buttonPrimary = `${base} bg-brand text-white shadow-[0_1px_0_rgb(0_0_0/0.12),0_6px_14px_-6px_rgb(199_69_4/0.55)] hover:bg-brand-strong disabled:bg-[#e3dcd6] disabled:text-[#6b625c] disabled:shadow-none`;
export const buttonSecondary = `${base} border border-[#c9c0b8] bg-paper text-ink-strong hover:border-ink-strong disabled:border-line disabled:text-ink-muted`;
export const buttonGhost =
  "inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-ink-strong transition-colors hover:bg-surface disabled:text-ink-muted disabled:hover:bg-transparent";
