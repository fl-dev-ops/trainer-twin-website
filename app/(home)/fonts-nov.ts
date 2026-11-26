import localFont from "next/font/local";

/** Fonts for the November homepage: Bricolage Grotesque for headings, DM Sans for text. Self-hosted, latin subset. */
export const fontNovDisplay = localFont({
  variable: "--tt26-display",
  src: "../fonts/bricolage-latin.woff2",
  weight: "200 800",
  display: "swap",
});

export const fontNovBody = localFont({
  variable: "--tt26-body",
  src: "../fonts/dm-sans-latin.woff2",
  weight: "100 1000",
  display: "swap",
});
