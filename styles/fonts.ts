import { Figtree, Noto_Serif, JetBrains_Mono } from "next/font/google";

/**
 * Shared by the Next.js root layout and the Storybook preview, so both render
 * with the real type system rather than a silent fallback.
 *
 * Weight is NOT set here — it belongs to the token layer
 * (--tt-weight-regular / --tt-weight-semibold in src/styles/tokens.css).
 * Figtree and JetBrains Mono load as variable fonts, so both steps are free.
 *
 * Role split (see design-system/foundations.html §03):
 *   display — Noto Serif, titles above 20px only. Never body, labels, or controls.
 *   ui      — Figtree, everything operable.
 *   mono    — JetBrains Mono, anything counted. Always with tabular-nums.
 */

export const fontUi = Figtree({
  variable: "--tt-font-ui",
  subsets: ["latin"],
  display: "swap",
});

export const fontDisplay = Noto_Serif({
  variable: "--tt-font-display",
  subsets: ["latin"],
  /* 400 and 600 for the product's own type scale; 700 was dropped 10 Sep 2026
     when it landed, since display titles there cap at 600. 300 is the one
     addition since — the v3 marketing hero's italic lead-in, which sits on
     the documented marketing-surface exception to the two-weight rule (see
     DECISIONS.md) rather than on the scale itself. Without this file, a CSS
     `font-weight: 300` on Noto Serif has nothing to match and silently renders
     at 400 — browsers synthesize bold, never light. */
  weight: ["300", "400", "600"],
  display: "swap",
});

export const fontMono = JetBrains_Mono({
  variable: "--tt-font-mono",
  subsets: ["latin"],
  display: "swap",
});

/** Apply to <html> (app) or a wrapping element (Storybook). */
export const fontVariables = `${fontUi.variable} ${fontDisplay.variable} ${fontMono.variable}`;
