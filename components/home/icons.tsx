/**
 * The homepage's glyph set.
 *
 * Every icon is drawn on a 16 viewBox except `face`, which is drawn on 24 and is
 * the only one that fills rather than strokes — it stands in for a person at
 * three very different sizes (a 16px avatar in a tile, a 78%-of-a-circle
 * presenter, a half-height figure in a promo clip), and a 1.5px stroke
 * disappears at the small end and looks like wire at the large one.
 *
 * Size comes from CSS in every case (`.chip svg`, `.can svg`, `.who-go svg`…),
 * which is why there is no `size` prop. The width/height attributes are a floor
 * for the case where a caller forgets: an SVG with a viewBox and no size at all
 * lays out at 300x150.
 */
export type IconName =
  | "face"
  | "info"
  | "arrow"
  | "check"
  | "x"
  | "doc"
  | "video"
  | "mic"
  | "phone"
  | "play"
  | "folder"
  | "cloud"
  | "chat"
  | "chevron";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
} as const;

const PATHS: Record<IconName, React.ReactElement> = {
  face: (
    <>
      <circle cx="12" cy="7.5" r="4.5" fill="currentColor" />
      <path d="M3 24c0-5.5 4-9.5 9-9.5s9 4 9 9.5Z" fill="currentColor" />
    </>
  ),
  info: (
    <>
      <circle cx="8" cy="8" r="6.25" {...stroke} />
      <path d="M8 7.25v4M8 4.9v.9" {...stroke} />
    </>
  ),
  arrow: (
    <path
      d="M3 8h10M9 4l4 4-4 4"
      {...stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  check: (
    <path
      d="m3.5 8.5 3 3 6-7"
      {...stroke}
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  x: <path d="m4.5 4.5 7 7m0-7-7 7" {...stroke} strokeLinecap="round" />,
  doc: (
    <path
      d="M3 2h7l3 3v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z M9.5 2v3.5H13 M5 9h6 M5 11.5h4"
      {...stroke}
    />
  ),
  video: (
    <>
      <rect x="1.5" y="3.5" width="9" height="9" rx="1.5" {...stroke} />
      <path d="m10.5 7 4-2.5v7l-4-2.5" {...stroke} strokeLinejoin="round" />
    </>
  ),
  mic: (
    <>
      <rect x="5.5" y="1.5" width="5" height="8" rx="2.5" {...stroke} />
      <path
        d="M3 7.5a5 5 0 0 0 10 0M8 12.5v2"
        {...stroke}
        strokeLinecap="round"
      />
    </>
  ),
  phone: (
    <>
      <rect x="4" y="1.5" width="8" height="13" rx="1.5" {...stroke} />
      <path d="m7 6 2.5 1.75L7 9.5Z" fill="currentColor" />
    </>
  ),
  play: (
    <>
      <rect x="1.5" y="3" width="13" height="10" rx="1.5" {...stroke} />
      <path d="m6.5 5.75 3.75 2.25-3.75 2.25Z" fill="currentColor" />
    </>
  ),
  folder: (
    <path
      d="M1.75 4.25A1.25 1.25 0 0 1 3 3h3.25l1.5 1.75H13a1.25 1.25 0 0 1 1.25 1.25v6A1.25 1.25 0 0 1 13 13.25H3A1.25 1.25 0 0 1 1.75 12Z"
      {...stroke}
      strokeLinejoin="round"
    />
  ),
  cloud: (
    <path
      d="M4.5 12.5h7a3 3 0 0 0 .4-5.97A4 4 0 0 0 4.2 7.1a2.7 2.7 0 0 0 .3 5.4Z"
      {...stroke}
      strokeLinejoin="round"
    />
  ),
  chat: (
    <path
      d="M2 4.5A1.5 1.5 0 0 1 3.5 3h9A1.5 1.5 0 0 1 14 4.5v5a1.5 1.5 0 0 1-1.5 1.5H7l-3 2.5V11h-.5A1.5 1.5 0 0 1 2 9.5Z"
      {...stroke}
    />
  ),
  chevron: (
    <path
      d="M6 3.25 11.25 8 6 12.75"
      {...stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

export function Icon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const box = name === "face" ? 24 : 16;
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${box} ${box}`}
      width="16"
      height="16"
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}
