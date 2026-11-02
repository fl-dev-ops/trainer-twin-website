import localFont from "next/font/local";

/**
 * The homepage is set in Figtree alone. The shared stylesheets reach for Noto Serif
 * (titles), JetBrains Mono (labels) and, in the footer, Hanken Grotesk / IBM
 * Plex — `.tt-homepage` in home.css points all of those variables at this one family.
 *
 * Loaded with its italic too: the hero's lead-in lines are italic, and without
 * the file the browser would slant the upright letters instead of drawing them.
 */
export const fontHome = localFont({
  variable: "--home-font",
  src: [
    { path: "../fonts/figtree-latin.woff2", weight: "300 900", style: "normal" },
    { path: "../fonts/figtree-italic-latin.woff2", weight: "300 900", style: "italic" },
  ],
  display: "swap",
});
