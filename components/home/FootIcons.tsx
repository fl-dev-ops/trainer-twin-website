/**
 * The two glyphs that open the comparison cards' summary lines: a light bulb
 * for the twin that thinks, a puzzled face for the one that only looks and
 * sounds right. Drawn on the shared icon grid (16, 1.5 stroke, round) so they
 * sit with the rest of the page's icons; colour is inherited.
 */
const base = {
  viewBox: "0 0 16 16",
  width: 18,
  height: 18,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
} as const;

export function BulbIcon() {
  return (
    <svg {...base}>
      <path d="M8 1.5a4.5 4.5 0 0 0-2.6 8.2c.4.3.6.8.6 1.3v.5h4V11c0-.5.2-1 .6-1.3A4.5 4.5 0 0 0 8 1.5Z" />
      <path d="M6.2 13.5h3.6M7 15h2" />
    </svg>
  );
}

export function ConfusedIcon() {
  return (
    <svg {...base}>
      <circle cx="8" cy="8" r="6.5" />
      <path d="M5.8 6.6v.01M10.2 6.6v.01" />
      <path d="M5.3 10.6c.9-.8 1.8-.8 2.4 0s1.6.8 3-.2" />
    </svg>
  );
}
