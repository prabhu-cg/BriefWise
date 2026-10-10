---
name: BriefWise
description: Turn vague briefs into clear direction.
colors:
  brand-orange: "#C74504"
  brand-orange-deep: "#A93A03"
  brand-tint: "#FCF1EA"
  ink: "#444444"
  ink-strong: "#262626"
  ink-muted: "#666666"
  line: "#E6E1DC"
  surface: "#FAF8F6"
  paper: "#FFFFFF"
  control-border: "#C9C0B8"
  highlight: "#FBE2D2"
  error-text: "#8C1D18"
  error-surface: "#FDF1F0"
typography:
  display:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 6vw, 4.25rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  xs: "2px"
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "24px"
  lg: "48px"
  xl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.brand-orange}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
  button-primary-hover:
    backgroundColor: "{colors.brand-orange-deep}"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-strong}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
  button-ghost:
    textColor: "{colors.ink-strong}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
  input-panel:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.lg}"
  callout-attention:
    backgroundColor: "{colors.brand-tint}"
    rounded: "{rounded.lg}"
---

# Design System: BriefWise

## Overview

**Creative North Star: "The Editor's Desk"**

BriefWise looks like a good editor's markup on a clean page: warm paper, dark ink, hairline rules and a single highlighter-orange accent that marks what matters. It is a focused refinement utility, so the interface stays calm and structured and lets the stakeholder's words and the resulting brief carry the weight.

Density is generous. Hierarchy comes from type size, weight and whitespace, not from containers. Orange is reserved for the primary action, the logo's accent stroke and the places where the product is pointing at something (flagged phrases, open questions).

**Key Characteristics:**
- One accent colour, used sparingly; warm neutrals do the rest.
- Single typeface (Manrope), contrast made with weight and size.
- Structure from hairlines and spacing; cards only where content is a self-contained object.
- Meaning is always in text as well as colour.

## Colors

A warm-neutral palette with one saturated orange.

- **Brand Orange** (`#C74504`): primary buttons, the logo accent, list markers, flagged-phrase underline. Passes AA against white (4.9:1) for text and UI.
- **Brand Orange Deep** (`#A93A03`): hover state and orange text on tinted backgrounds.
- **Brand Tint** (`#FCF1EA`) and **Highlight** (`#FBE2D2`): the "needs attention" surfaces: clarification questions, the preview notice and the highlighter marks.
- **Ink** (`#444444`) is body text; **Ink Strong** (`#262626`) is headings and the dark closing band; **Ink Muted** (`#666666`) is secondary text (5.7:1 on white).
- **Line** (`#E6E1DC`) hairlines; **Surface** (`#FAF8F6`) alternating section background; **Control Border** (`#C9C0B8`) outlines of interactive controls.
- **Error** pair (`#8C1D18` on `#FDF1F0`) is used only for failed requests.

Do not introduce a second accent hue. Do not use orange for large fills outside the primary button and the dark CTA band's button.

## Typography

**Manrope** throughout (variable, `next/font`), weights 400-800.

- **Display** 48-68px, 800, -0.035em, balanced: landing hero only.
- **Headline** 36-48px, 800, -0.025em: page and section titles.
- **Title** 20px, 700: section headings inside briefs and rows.
- **Body** 18px / 1.625: reading text, capped around 65ch (`max-w-prose`).
- **Label** 14px, 600: basis captions ("Explicitly said", "Unconfirmed"), helper text, nav.

Numerals in counters and steps use tabular figures.

## Layout

- Container `max-w-6xl`, 20px gutter on mobile, 32px from `sm`.
- Section rhythm 80-112px vertical on the landing page; 40-64px on the Refiner.
- Landing alternates white and `surface` bands, ending in a dark ink band.
- Refiner input: two columns from `lg` (form + "What you'll get" aside). Result: a sticky 17rem rail (actions and jump links) beside a single reading column.
- Below `lg` everything stacks; actions come first on the result view.

## Elevation & Depth

Mostly flat and hairline-led. Structure comes from 1px `line` borders and tonal surfaces.

Shadows are soft, offset and blurred, and appear in only three places: the hero quote panel, the example "After" panel and the primary button. Focus uses a 3px orange ring (outline on controls, ring on the input panel via `focus-within`). No glows, no hard offset shadows.

## Shapes

Gentle, not pillowy: 8px controls, 12px panels and callouts, 16px on the hero panel only. The logo's soft-cornered "B" sets the tone. Hairline dividers (`divide-y`) are preferred over boxing each item.

## Components

- **Primary button**: orange fill, white 16px/600 text, 8px radius, subtle drop shadow, 1px press translate; disabled state is a warm grey with explanatory helper text nearby.
- **Secondary button**: paper fill, `control-border` outline, darkens border on hover.
- **Ghost button**: text-only with a `surface` hover, for in-panel actions ("Use an example").
- **Input panel**: one bordered 12px container holding the textarea and a toolbar row (example, helper, counter). Focus-within turns the border orange with a soft ring.
- **Highlighter mark** (`.bw-mark`): `highlight` fill with a 2px orange underline, sweeps in once on load; tag chip follows in plain text.
- **Callouts**: full 1px border with icon and bold lead line. Brand tint for attention/preview, neutral surface for AI provenance, error pair for failures. Never a coloured side stripe.
- **Result sections**: heading, a muted one-line "basis" caption (explicitly said / based on what was stated / possibilities not confirmed / unconfirmed / still unknown), then content separated by hairlines. Clarification questions sit in a brand-tint panel.
- **Brief health panel**: surface-tinted hairline panel with a plain-language headline ("Good starting point"), a one-line summary and a two-column checklist. Met items use a dark filled check; gaps use an orange outlined "!" with text. It always carries the caveat that it is guidance, not a score.
- **Section editing**: an "Edit" ghost button beside each section heading opens an in-place editor (textarea, or one textarea per list item with remove and add). Save, Cancel and "Restore generated version" sit below. Edited sections carry an "Edited" text chip.
- **Confirm dialog**: native modal for destructive actions (replace brief, start new). Focus starts on the safe option; the destructive action is the filled button.
- **Print**: header, footer and controls are hidden; the brief prints as a plain document titled "UX Brief".
- **Navigation**: sticky header with logo and two links; current page shown with a `surface` pill and `aria-current`.

## Motion

One authored moment per surface: the highlighter sweep on the landing hero, and a short 320ms rise when a result appears. Both are disabled under `prefers-reduced-motion`. Loading uses a small spinner plus staged text, never fake percentages.

## Do's and Don'ts

**Do**
- Keep orange for action and attention; let neutrals carry everything else.
- Pair every colour signal with text (basis captions, tags, icons with labels).
- Use plain, product-specific copy; name the action on buttons and the recovery in errors.
- Keep the stated / assumed / unknown distinction visible in any new view of a brief.

**Don't**
- Add AI sparkle iconography, gradient text or glass effects.
- Wrap every section in a card or nest cards.
- Add eyebrow labels above headings or colour side-stripes on callouts.
- Present inferred content (requirements, assumptions) with the same visual weight as stated content without a basis caption.
