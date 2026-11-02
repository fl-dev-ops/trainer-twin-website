import localFont from "next/font/local";

/**
 * The two marketing-only faces (§3), scoped to this route.
 *
 * The product's type system is three roles wide — Noto Serif / Figtree /
 * JetBrains Mono, loaded in src/styles/fonts.ts — and these two never appear in
 * product UI, so they are loaded per marketing route rather than at the root:
 *
 *   plex   — the oversized footer watermark.
 *   hanken — the footer's own tighter scale, never above the footer boundary.
 *
 * The variables are `--h-*` rather than `--tt-*` on purpose: the token file is
 * the single source of truth for `--tt-*` (D57), and these are supplied by
 * next/font at build time, not by it.
 */

export const fontWordmark = localFont({
  variable: "--h-font-wordmark",
  src: "../fonts/ibm-plex-sans-600-latin.woff2",
  weight: "600",
  display: "swap",
});

export const fontFooter = localFont({
  variable: "--h-font-footer",
  // One variable file declared at the two weights the Google config used.
  src: [
    { path: "../fonts/hanken-grotesk-latin.woff2", weight: "400" },
    { path: "../fonts/hanken-grotesk-latin.woff2", weight: "600" },
  ],
  display: "swap",
});

export const homeFontVariables = `${fontWordmark.variable} ${fontFooter.variable}`;
