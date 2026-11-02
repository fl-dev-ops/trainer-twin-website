import { Figtree } from "next/font/google";

/**
 * /V1 is set in Figtree alone. The shared stylesheets reach for Noto Serif
 * (titles), JetBrains Mono (labels) and, in the footer, Hanken Grotesk / IBM
 * Plex — `.tt-v1` in v1.css points all of those variables at this one family.
 *
 * Loaded with its italic too: the hero's lead-in lines are italic, and without
 * the file the browser would slant the upright letters instead of drawing them.
 */
export const fontV1 = Figtree({
  variable: "--v1-font",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});
