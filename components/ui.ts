const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 h-11 text-sm font-semibold whitespace-nowrap transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.98] disabled:cursor-not-allowed disabled:active:scale-100";

/** Amber fill, charcoal text. Never white on amber. */
export const buttonPrimary = `${base} bg-brand text-on-brand hover:bg-brand-hover disabled:bg-sand disabled:text-ink-muted`;
export const buttonSecondary = `${base} border border-line-strong bg-paper text-ink-strong hover:bg-sand disabled:border-line disabled:text-ink-muted disabled:hover:bg-paper`;
/** Destructive: outline with red text, never solid red. */
export const buttonDanger = `${base} border border-danger text-danger bg-paper hover:bg-danger-tint`;
export const buttonGhost =
  "inline-flex items-center justify-center gap-2 rounded-full px-3.5 h-9 text-sm font-semibold text-ink-strong transition-colors hover:bg-sand disabled:text-ink-muted disabled:hover:bg-transparent";
export const buttonLg = "h-[52px] px-8 text-base";
