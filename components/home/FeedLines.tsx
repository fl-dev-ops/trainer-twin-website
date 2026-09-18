"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The curved feed from each source chip into the figure, with a pulse running
 * along every line. The same connector treatment TrainerTwin_home draws
 * between its hub and its facet pills.
 *
 * Measured rather than authored. The chips are a flex column whose items wrap
 * to two lines at some widths, so their centres are not known until layout has
 * run; the paths are built from the real boxes and rebuilt whenever the panel
 * resizes. Marking the ends with `data-feed-from` / `data-feed-to` /
 * `data-feed-out` keeps this component from needing to know anything about the
 * diagram's structure — either fan can gain or lose a chip without it.
 */

/** Must match the `tt-home-feed` duration in home.css. */
const PULSE_SECONDS = 3.4;

export function FeedLines() {
  const ref = useRef<SVGSVGElement>(null);
  const [paths, setPaths] = useState<string[]>([]);
  const [box, setBox] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    const svg = ref.current;
    const host = svg?.parentElement;
    if (!svg || !host) return;

    const measure = () => {
      const hub = host.querySelector("[data-feed-to]");
      if (!hub) return;

      /* A hidden box measures as a point. On a phone both chip columns are
         display:none (see home.css), and without this every chip would return
         the same empty rect and the fans would become sets of identical
         degenerate curves — drawn nowhere, but still in the tree. Filtered
         rather than checked, so one column going while the other stays leaves
         the fan that still has chips at the end of it. */
      const laidOut = (el: Element) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0;
      };
      const sources = Array.from(
        host.querySelectorAll("[data-feed-from]"),
      ).filter(laidOut);
      const results = Array.from(
        host.querySelectorAll("[data-feed-out]"),
      ).filter(laidOut);
      if (!laidOut(hub) || sources.length + results.length === 0) {
        setPaths((prev) => (prev.length === 0 ? prev : []));
        return;
      }

      /* The diagram is scaled by a transform, and getBoundingClientRect
         reports painted pixels. The SVG's own viewBox lives in the layout box
         underneath that transform, so every measurement is divided back out —
         taken from the host itself rather than hard-coded, so the lines stay
         put if the scale ever changes. */
      const hostRect = host.getBoundingClientRect();
      const scale = host.offsetWidth ? hostRect.width / host.offsetWidth : 1;
      if (!scale) return;

      const at = (el: Element) => {
        const r = el.getBoundingClientRect();
        return {
          left: (r.left - hostRect.left) / scale,
          right: (r.right - hostRect.left) / scale,
          mid: (r.top - hostRect.top + r.height / 2) / scale,
        };
      };

      /* Handles pulled well out from each end, so every line leaves its chip
         horizontally and arrives at the figure horizontally however far it has
         to travel vertically — which is what makes them read as one fan rather
         than as a handful of unrelated arcs. */
      const curve = (sx: number, sy: number, ex: number, ey: number) => {
        const reach = Math.max(18, (ex - sx) * 0.55);
        return `M${sx.toFixed(1)} ${sy.toFixed(1)} C${(sx + reach).toFixed(1)} ${sy.toFixed(1)} ${(ex - reach).toFixed(1)} ${ey.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`;
      };

      /* Both fans are drawn from the chip's edge that faces the figure to the
         figure's edge that faces it, and always written in the direction the
         material travels — chip to figure on the left, figure to chip on the
         right. The pulse runs from the start of whatever path it is on, so
         that one choice is what sends it inward on one side and outward on the
         other without a second animation. */
      const mid = at(hub);
      const next = [
        ...sources.map((el) => {
          const from = at(el);
          return curve(from.right, from.mid, mid.left, mid.mid);
        }),
        ...results.map((el) => {
          const to = at(el);
          return curve(mid.right, mid.mid, to.left, to.mid);
        }),
      ];

      setBox({ w: host.offsetWidth, h: host.offsetHeight });
      setPaths(next);
    };

    const observer = new ResizeObserver(measure);
    observer.observe(host);
    for (const el of host.querySelectorAll(
      "[data-feed-from], [data-feed-to], [data-feed-out]",
    )) {
      observer.observe(el);
    }
    measure();
    const later = window.setTimeout(measure, 50);
    window.addEventListener("resize", measure);
    document.fonts?.ready?.then(measure);
    return () => {
      observer.disconnect();
      window.clearTimeout(later);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      fill="none"
      className="feed"
      viewBox={box ? `0 0 ${box.w} ${box.h}` : undefined}
    >
      {paths.map((d, i) => (
        /* Keyed by position, not by the path data: these are a fixed list in
           a fixed order, and two of them can measure to the same curve. */
        <g key={i}>
          <path d={d} stroke="var(--tt-neutral-700)" strokeWidth="1" />
          {/* White, the night scope's own ink (§7), so the pulse is the same
              colour as the type and the figure it is feeding rather than a
              third hue on the panel.

              `pathLength` normalises every path to 100 units, so one dash
              pattern gives them all the same pulse whatever their real length
              — the short top line and the long bottom one stay in step. */}
          <path
            d={d}
            pathLength={100}
            stroke="var(--tt-on-night)"
            strokeWidth="2"
            strokeLinecap="round"
            className="feed-pulse"
            /* Spread evenly across one cycle rather than derived from position,
               so they fire as an even cascade instead of clumping. */
            style={{
              animationDelay: `${((i / paths.length) * PULSE_SECONDS).toFixed(3)}s`,
            }}
          />
        </g>
      ))}
    </svg>
  );
}
