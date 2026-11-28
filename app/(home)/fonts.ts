import localFont from "next/font/local";

/**
 * This exploration's own two faces — not the product's Figtree / Noto Serif,
 * and not the other marketing routes' IBM Plex Sans / Hanken Grotesk. Scoped
 * to this route only, the same way the other marketing fonts.ts files are.
 *
 * Self-hosted (app/fonts, the latin subset Google Fonts serves for
 * Bricolage Grotesque 500/700 and DM Sans 400/500/700): next/font/google
 * breaks the build whenever Google serves extensionless /l/font?kit= URLs
 * (vercel/next.js#99114). Each weight is declared on its own, as Google's CSS
 * does, so weight matching renders exactly as it did with next/font/google.
 */

export const fontDisplay = localFont({
  variable: "--tte-font-display",
  src: [
    { path: "../fonts/bricolage-grotesque-latin.woff2", weight: "500" },
    { path: "../fonts/bricolage-grotesque-latin.woff2", weight: "700" },
  ],
  display: "swap",
});

export const fontBody = localFont({
  variable: "--tte-font-body",
  src: [
    { path: "../fonts/dm-sans-latin.woff2", weight: "400" },
    { path: "../fonts/dm-sans-latin.woff2", weight: "500" },
    { path: "../fonts/dm-sans-latin.woff2", weight: "700" },
  ],
  display: "swap",
});

export const explorationFontVariables = `${fontDisplay.variable} ${fontBody.variable}`;
