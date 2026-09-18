"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { cn } from "@/components/cn";
import { FIELDS, type FieldKey } from "./fields";
import "@/app/TrainerTwin_home_2/landing.css";

/**
 * The "Who it's for" nav item, with the Services panel from
 * /TrainerTwin_home hanging under it.
 *
 * Ported rather than imported: that one is written against `.tt-landing`,
 * which this page's header is not inside, and it lists that page's four
 * audiences rather than this page's. The chrome is the same — 699px, the
 * 336px list beside a hairline and a column of cards, the fade-and-rise on a
 * `top` origin — so the panel carries `.tt-landing` itself, which is what
 * makes the `--l-*` vocabulary and the two animated marks resolve.
 *
 * The trigger stays a link. It is a nav item first: clicking it still goes to
 * the section, and the header's section marker still lands under it. The panel
 * is what hovering adds, not what clicking does.
 */

/** The mark in each row's tile. Same set as the source, with a dumbbell in
    place of its leadership figure — this page's fourth field is fitness. */
const ICONS: Record<FieldKey, ReactNode> = {
  tech: <path d="M9.5 8 5.5 12l4 4M14.5 8l4 4-4 4" />,
  sales: <path d="M4 16.5l5.5-5.5 3.5 3.5L20 7.5M15.5 7.5H20v4.5" />,
  communication: (
    <>
      <path d="M4.5 6.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3h-6l-6 4.5v-12.5Z" />
      <path d="M8.5 8h7M8.5 11h4.5" />
    </>
  ),
  fitness: <path d="M6.5 9v6M4 10.5v3M17.5 9v6M20 10.5v3M6.5 12h11" />,
};

/**
 * The cards down the right: what a twin is, once a field has one. These are
 * the two rows of "One twin, two ways to use it", and each card opens the
 * row it names.
 *
 * Kept to one line of subtext apiece so the two share the list's height
 * without a card running past it.
 */
const WAYS: Array<{
  label: string;
  blurb: string;
  href: string;
  art: "rings" | "frames";
}> = [
  {
    label: "Interactive twin",
    blurb: "Answers doubts any time.",
    href: "#interactive-twin",
    art: "rings",
  },
  {
    label: "Explainer videos",
    blurb: "The lessons you repeat.",
    href: "#explainer-videos",
    art: "frames",
  },
];

export function WhoMenu({
  href,
  label,
  current,
}: {
  href: string;
  label: string;
  current?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const closing = useRef<number | undefined>(undefined);

  /* Hover opens it, and leaving closes it after a beat. The beat matters: the
     panel hangs 18px below the bar, and without it the pointer would leave the
     menu on the way down and shut it before it arrived. Mouse only —
     pointerenter fires on a tap too, and on a touch screen the press should
     follow the link rather than open a panel the tap is about to leave. */
  const hover = (opening: boolean) => (event: ReactPointerEvent) => {
    if (event.pointerType !== "mouse") return;
    window.clearTimeout(closing.current);
    if (opening) setOpen(true);
    else closing.current = window.setTimeout(() => setOpen(false), 160);
  };

  useEffect(() => () => window.clearTimeout(closing.current), []);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={wrap}
      className="relative"
      onPointerEnter={hover(true)}
      onPointerLeave={hover(false)}
      /* Focus is the keyboard's hover: tabbing to the item opens the panel, so
         the next Tab walks into it, and focus leaving the wrapper closes it.
         React's onFocus/onBlur are focusin/focusout, so both fire for anything
         inside. */
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <a
        href={href}
        className="nav-trigger"
        aria-current={current ? "true" : undefined}
        aria-expanded={open}
        aria-controls="who-menu"
      >
        {label}
        <svg
          aria-hidden="true"
          width="9"
          height="6"
          viewBox="0 0 9 6"
          fill="none"
          className={cn(
            "mt-px transition-transform duration-200 ease-standard max-lg:hidden",
            open && "rotate-180",
          )}
        >
          <path
            d="M1 1.25 4.5 4.75 8 1.25"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>

      {/* The gap the panel hangs below the trigger, made hoverable, so the
          pointer can cross it without leaving the menu.

          10px, not the source's 18: that number is measured from ITS trigger
          box, which is the 24px of the word itself, where this one is a 40px
          hit area. Ten puts the panel's top edge at the same place relative to
          the bar — 13px up under it — which is what is actually seen. */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-full left-1/2 h-[10px] w-[699px] -translate-x-1/2 max-lg:hidden",
          open ? "block" : "hidden",
        )}
      />

      <div
        id="who-menu"
        aria-label="Who it’s for"
        /* Kept in the tree rather than `hidden`, which would take it out of the
           layout and leave the fade nothing to run on. `inert` is what keeps
           its links out of the tab order and off the screen reader while it is
           closed; visibility is in the transition so it flips only once the
           panel has finished fading, rather than the moment it starts.

           Below lg it is not rendered at all: the nav is a scrolling row at
           that width, and an absolutely placed panel inside an overflowing
           strip would be clipped by it. */
        inert={!open}
        className={cn(
          "tt-landing absolute top-[calc(100%+10px)] left-1/2 w-[699px] rounded-[16px] border border-[var(--l-line)] bg-white p-2 shadow-[0_14px_40px_rgba(22,24,28,0.12)] max-lg:hidden",
          "grid grid-cols-[336px_1px_minmax(0,1fr)] gap-2",
          "origin-top transition-[opacity,transform,visibility] duration-200 ease-standard",
          open
            ? "visible -translate-x-1/2 translate-y-0 scale-100 opacity-100"
            : "pointer-events-none invisible -translate-x-1/2 -translate-y-2 scale-[0.985] opacity-0",
        )}
      >
        <div className="flex flex-col">
          {FIELDS.map((field) => {
            const body = (
              <>
                <span
                  className={cn(
                    "l-menu-tile grid h-[34px] w-[34px] shrink-0 place-items-center rounded-[9px]",
                    field.live
                      ? "bg-[var(--l-brand)]/10 text-[var(--l-brand)]"
                      : "bg-[var(--tt-neutral-100)] text-[var(--tt-neutral-700)]",
                  )}
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="l-menu-icon h-[17px] w-[17px]"
                  >
                    {ICONS[field.key]}
                  </svg>
                </span>

                <span className="min-w-0 flex-1">
                  <span className="font-ui flex items-center gap-2 text-[15px] font-semibold text-[var(--l-ink)]">
                    {field.label}
                    {field.live ? null : (
                      <span className="font-ui rounded-full bg-[var(--tt-neutral-100)] px-[7px] py-[2px] text-[10px] font-medium whitespace-nowrap text-[var(--tt-neutral-600)]">
                        Coming soon
                      </span>
                    )}
                  </span>
                  <span className="font-ui mt-1 block text-[13px] leading-[18px] text-[var(--l-ink-body)]">
                    {field.blurb}
                  </span>
                </span>
              </>
            );

            return field.live ? (
              <a
                key={field.key}
                href={field.href}
                onClick={() => setOpen(false)}
                className="l-menu-row flex items-start gap-3 rounded-[10px] p-2.5 no-underline transition-colors duration-150 ease-standard hover:bg-[var(--tt-neutral-50)]"
              >
                {body}
              </a>
            ) : (
              // Not a link and not focusable: there is nowhere for it to go yet.
              <span
                key={field.key}
                className="l-menu-row flex items-start gap-3 rounded-[10px] p-2.5"
              >
                {body}
              </span>
            );
          })}

          <span
            aria-hidden="true"
            className="mx-2.5 my-1 block h-px bg-[var(--l-line)]"
          />

          <a
            href="#early-access"
            onClick={() => setOpen(false)}
            className="l-menu-row flex items-start gap-3 rounded-[10px] p-2.5 no-underline transition-colors duration-150 ease-standard hover:bg-[var(--tt-neutral-50)]"
          >
            <span className="l-menu-tile grid h-[34px] w-[34px] shrink-0 place-items-center rounded-[9px] bg-[var(--l-brand)]/10 text-[var(--l-brand)]">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="l-menu-icon h-[17px] w-[17px]"
              >
                <rect x="4.5" y="4.5" width="15" height="15" rx="3.5" />
                <path d="M12 8.5v7M8.5 12h7" />
              </svg>
            </span>

            <span className="min-w-0 flex-1">
              <span className="font-ui flex items-center gap-2 text-[15px] font-semibold text-[var(--l-ink)]">
                Extend your expertise & monetise
              </span>
              <span className="font-ui mt-1 block text-[13px] leading-[18px] text-[var(--l-ink-body)]">
                Helping you reach greater audiences.
              </span>
            </span>
          </a>
        </div>

        <span aria-hidden="true" className="my-1 block bg-[var(--l-line)]" />

        <div className="flex flex-col gap-2 py-1 pr-1">
          {WAYS.map((way) => (
            <a
              key={way.href}
              href={way.href}
              onClick={() => setOpen(false)}
              className="group relative flex-1 overflow-hidden rounded-[12px] border border-[var(--l-line)] bg-white p-[14px] no-underline transition-colors duration-150 ease-standard hover:border-[var(--tt-neutral-300)]"
            >
              {way.art === "frames" ? <FramesArt /> : <RingsArt />}
              <span className="font-ui relative block text-[15px] font-semibold text-[var(--l-ink)]">
                {way.label}
              </span>
              <span className="font-ui relative mt-1.5 block max-w-[205px] text-[13px] leading-[19px] text-[var(--l-ink-body)]">
                {way.blurb}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * The Explainer Video mark: a line that wanders the dot field on the field's
 * own 9px pitch, turning at right angles like a snake. The route is authored
 * rather than generated — a random walk would give the server and the client
 * different paths, and a new one on every render.
 */
const SNAKE =
  "M13 94 H40 V58 H22 V22 H67 V49 H94 V13 H121 V76 H85 V112 H40 V85";

function FramesArt() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 block w-[132px] overflow-hidden"
    >
      <span className="l-dotfield absolute inset-0 block" />
      <svg
        className="absolute top-0 left-0"
        width="132"
        height="132"
        viewBox="0 0 132 132"
        fill="none"
      >
        <defs>
          <linearGradient
            id="l-menu-snake"
            x1="0"
            y1="0"
            x2="132"
            y2="132"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#f9c08a" />
            <stop offset="0.55" stopColor="#f2803c" />
            <stop offset="1" stopColor="#dd5312" />
          </linearGradient>
        </defs>
        {/* The trail: the same run, wider and faint, a beat behind the head. */}
        <path className="l-snake l-snake-tail" d={SNAKE} pathLength={100} />
        <path className="l-snake" d={SNAKE} pathLength={100} />
      </svg>
    </span>
  );
}

/**
 * The Interactive Twin mark: rings out from the corner with a live arc running
 * each one, at a different rate per ring so they never line up.
 */
function RingsArt() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 132 108"
      className="pointer-events-none absolute right-0 bottom-0 block h-[108px] w-[132px]"
      fill="none"
    >
      {[40, 62, 84].map((r, i) => (
        <g key={r}>
          <circle
            cx="122"
            cy="100"
            r={r}
            stroke="var(--tt-neutral-200)"
            strokeWidth="1"
          />
          <circle
            className="l-ring"
            cx="122"
            cy="100"
            r={r}
            stroke="var(--tt-primary)"
            strokeWidth="1.4"
            pathLength={100}
            strokeDasharray="7 93"
            style={{ animationDuration: `${7 + i * 2.5}s` }}
          />
        </g>
      ))}
    </svg>
  );
}
