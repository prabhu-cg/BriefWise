---
name: BriefWise
description: Turn vague briefs into clear direction.
colors:
  accent: "#e8b923"
  accent-hover: "#d4a615"
  accent-text: "#826400"
  accent-tint: "#faf4df"
  on-accent: "#353335"
  paper: "#ffffff"
  desk: "#fcfaf3"
  sand: "#f8f4e4"
  ink: "#4d4a4d"
  ink-strong: "#353335"
  ink-muted: "#6b6b6b"
  hairline: "#ece5cc"
  hairline-strong: "#dccfa6"
  control-border: "#8a7f6e"
  danger: "#b3261e"
typography:
  display: { fontFamily: "Newsreader, Georgia, serif", fontSize: "4.25rem", fontWeight: 500, lineHeight: 1, letterSpacing: "-0.02em" }
  headline: { fontFamily: "Newsreader, Georgia, serif", fontSize: "2.25rem", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.02em" }
  body: { fontFamily: "DM Sans, ui-sans-serif, system-ui, sans-serif", fontSize: "1rem", fontWeight: 400, lineHeight: 1.6 }
  label: { fontFamily: "DM Sans, ui-sans-serif, system-ui, sans-serif", fontSize: "0.875rem", fontWeight: 600 }
rounded: { field: "8px", panel: "12px", card: "20px", pill: "9999px" }
---

# Design System: BriefWise

BriefWise uses the DevLens system (github.com/prabhu-cg/DevLens, DESIGN.md): **White Paper on a Butter Desk**. Desk (`#fcfaf3`) is chrome and alternating bands; paper (`#fff`) is where people work. Amber is a fill; text that carries it is ochre. Tokens live in `app/globals.css` as `--c-*` variables, mapped to Tailwind names (`brand` = amber fill, `brand-strong` = ochre text, `brand-tint`, `surface` = desk, `sand`, `paper`, `ink*`, `line*`, `danger*`).

## Rules
- Newsreader 500 at -0.02em for every h1/h2 (enforced in `globals.css`); DM Sans for everything else.
- Buttons, nav items and chips are pills (44px default); fields 8px; inner panels and callouts 12px; cards and dialogs 20px.
- Flat pages: hairline and ground, not shadow. Shadows only for what leaves the page (feedback widget, dialogs).
- Selection is butter (`brand-tint` + `brand-strong`), hover is sand. Destructive buttons are red outlines.
- Light is default; dark is warm charcoal (`#141312` ground, `#1c1b19` cards) via `data-theme="dark"` on `<html>`, stored in `localStorage` as `briefwise.theme`. No system option.
- No eyebrows, no section numbers, no gradients, no amber text, no white text on amber.
- Keep stated / assumed / unknown visibly distinct in every view of a brief. Samples are labelled fictional.

## Layout
- `.site-container` (72rem, 24px gutters) for nav, sections, footer and app pages.
- Landing alternates desk and paper; sticky title left, ruled content right; the closing call to action is desk, never an amber band.
- Legal pages (`/about`, `/privacy`, `/terms`) use `LegalPage`: Newsreader h1 with optional badge and description, then one 20px card capped at 48rem on the desk ground.
- Refiner: empty request plus a desk "What you'll get" card. Brief view: a sticky desk card of actions and an "On this page" index whose active link follows scroll.
