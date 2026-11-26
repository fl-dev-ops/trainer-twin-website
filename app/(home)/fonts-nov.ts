import localFont from "next/font/local";

/**
 * Fonts for the November homepage. Both now use Figtree, the live site's font (with its italic), after review
 * feedback that Bricolage Grotesque and DM Sans looked bigger and less neat, especially on phones. The two
 * variables are kept so the stylesheet can still treat headings and text separately.
 * (next/font needs literal values here, so the file list is written out twice.)
 */
export const fontNovDisplay = localFont({
  variable: "--tt26-display",
  src: [
    { path: "../fonts/figtree-latin.woff2", weight: "300 900", style: "normal" },
    { path: "../fonts/figtree-italic-latin.woff2", weight: "300 900", style: "italic" },
  ],
  display: "swap",
});

export const fontNovBody = localFont({
  variable: "--tt26-body",
  src: [
    { path: "../fonts/figtree-latin.woff2", weight: "300 900", style: "normal" },
    { path: "../fonts/figtree-italic-latin.woff2", weight: "300 900", style: "italic" },
  ],
  display: "swap",
});
