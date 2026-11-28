"use client";

import { useEffect } from "react";

/**
 * Scales the whole page up on large screens, so it fills the screen the way
 * it does on a laptop, instead of sitting pinned to a 1440px column with
 * empty margins on an ultrawide monitor. `--tte-z` compensates the hero's
 * `min-height` for the zoom (page.css: `calc(100svh / var(--tte-z, 1))`).
 *
 * `zoom` is non-standard (Chromium/Safari; no Firefox support) — carried over
 * from the prototype as-is. Resets on unmount since `document.body` is the
 * same node across client-side navigations in the App Router.
 */
export function PageZoomEffect() {
  useEffect(() => {
    const root = document.documentElement;
    function fit() {
      const z = Math.min(1.7, Math.max(1, window.innerWidth / 1440));
      document.body.style.zoom = String(z);
      root.style.setProperty("--tte-z", String(z));
    }
    fit();
    window.addEventListener("resize", fit);
    return () => {
      window.removeEventListener("resize", fit);
      document.body.style.zoom = "";
      root.style.removeProperty("--tte-z");
    };
  }, []);

  return null;
}
