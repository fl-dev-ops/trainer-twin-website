/**
 * Partner marks for the hero's trust line, drawn for a light ground.
 *
 * STAND-INS, not official brand artwork: the Microsoft squares and the AWS
 * smile are redrawn from their published proportions so the strip reads
 * correctly, but anything shipped publicly should use each programme's own
 * asset, under its own brand guidelines.
 */

/** The four-square Microsoft mark, in its brand colours. */
export function MicrosoftMark() {
  const squares = [
    { x: 0, y: 0, fill: "#F25022" },
    { x: 9, y: 0, fill: "#7FBA00" },
    { x: 0, y: 9, fill: "#00A4EF" },
    { x: 9, y: 9, fill: "#FFB900" },
  ];
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 17 17"
      fill="none"
      className="backer-mark"
      style={{ width: 17, height: 17 }}
    >
      {squares.map((s) => (
        <rect key={s.fill} x={s.x} y={s.y} width="8" height="8" fill={s.fill} />
      ))}
    </svg>
  );
}

/**
 * The AWS lockup: the wordmark with the smile under it. Ink rather than white
 * — #232F3E is the variant AWS publishes for light grounds.
 */
export function AwsMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 34 22"
      fill="none"
      className="backer-mark"
      style={{ width: 26, height: 17 }}
    >
      <text
        x="0"
        y="12"
        fill="#232F3E"
        style={{
          font: "600 14px var(--tt-font-ui), sans-serif",
          letterSpacing: "-0.03em",
        }}
      >
        aws
      </text>
      {/* The smile, as an arc that lifts into an arrowhead at the right. */}
      <path
        d="M1.5 17.4c5.2 3.6 17 4.4 26.4 0.2"
        stroke="#FF9900"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M24.6 15.2 32 16.6l-4.6 3.6z" fill="#FF9900" />
    </svg>
  );
}
