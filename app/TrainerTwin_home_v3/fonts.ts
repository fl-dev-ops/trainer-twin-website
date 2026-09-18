import { IBM_Plex_Sans, Hanken_Grotesk } from "next/font/google";

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

export const fontWordmark = IBM_Plex_Sans({
  variable: "--h-font-wordmark",
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

export const fontFooter = Hanken_Grotesk({
  variable: "--h-font-footer",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const homeFontVariables = `${fontWordmark.variable} ${fontFooter.variable}`;
