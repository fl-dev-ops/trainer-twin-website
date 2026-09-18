"use client";

import { useId } from "react";

/**
 * The gradient card edge: brand orange at the top-right corner, gone by about a
 * third of the way across, neutral grey by the bottom-left.
 *
 * Drawn as an SVG stroke rather than a CSS `border-image`, which does not
 * follow `border-radius`, or a masked ring, which needs the host's own
 * pseudo-elements — `BorderGlow` has already spent both of its. The host only
 * has to be a containing block; the stroke lays itself over the whole of it.
 *
 * `radius` must match the host's own corner radius, since the rect is drawn in
 * the host's coordinate space and cannot inherit it.
 */
export function CardStroke({ radius = 20 }: { radius?: number }) {
  const id = `card-stroke-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <svg className="card-stroke" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#CB612B" />
          <stop offset="0.3654" stopColor="#CB612B" stopOpacity="0" />
          <stop offset="1" stopColor="#666666" />
        </linearGradient>
      </defs>
      <rect
        x="0.25"
        y="0.25"
        width="99.84%"
        height="99.72%"
        rx={radius}
        ry={radius}
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth="0.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
