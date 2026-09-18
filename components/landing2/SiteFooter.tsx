import type { ReactNode } from "react";
import { CursorGrid } from "@/components/CursorGrid";
import { Logo } from "@/components/Logo";
import { InviteForm } from "./InviteForm";
import "./site-footer-v3.css";

/** One link in the grid. `href` is `#top` where there is nowhere to go yet.
    `live: false` renders it as plain, unlinked text with a "Coming soon" pill
    instead of a link to nowhere — same treatment `WhoMenu` gives the same
    fields. Omitted (or true) keeps the ordinary clickable link. */
export type FooterLink = { label: string; href: string; live?: boolean };
export type FooterColumn = { heading: string; links: FooterLink[] };

const placeholders = (labels: string[]): FooterLink[] =>
  labels.map((label) => ({ label, href: "#top" }));

/**
 * What this footer carries when nobody says otherwise — the Tech Trainer
 * page's own columns. A page whose sections differ passes its own (see
 * `components/home/PageFooter.tsx`), which is the only way one footer can sit
 * under two pages without linking each to the other's anchors.
 */
export const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    heading: "Product",
    links: placeholders(["Use cases", "How it works", "Integrate", "Compare"]),
  },
  {
    heading: "Resources",
    /* Blog, Help centre, Updates and Build in public are parked, not deleted:
       they had no destinations and were all pointing at `#top`, which is a
       link that lies. They come back when the pages do.

         { label: "Blog", href: "#top" },
         { label: "Help centre", href: "#top" },
         { label: "Updates", href: "#top" },
         { label: "Build in public", href: "#top" },
    */
    links: [
      { label: "Equity program", href: "/invite" },
    ],
  },
  {
    heading: "Legals",
    links: placeholders([
      "Cookies",
      "Terms of service",
      "Privacy policy",
      "Data sourcing",
    ]),
  },
];

/**
 * The real brand marks, drawn here rather than exported: the Figma frame
 * carries stand-in glyphs for these — a link, an aperture, a briefcase and a
 * play box — which say nothing about where the links actually go. All four are
 * authored on the same 24 grid and filled with currentColor, so they take the
 * bottom bar's colour and its hover with it.
 */
const SOCIALS = [
  {
    label: "LinkedIn",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "YouTube",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
  {
    label: "Instagram",
    path: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.846-10.405a1.441 1.441 0 0 1-2.88 0 1.44 1.44 0 0 1 2.88 0z",
  },
  {
    label: "X",
    path: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.933zm-1.291 19.49h2.039L6.486 3.24H4.298l13.312 17.403z",
  },
];

export function SiteFooter({
  columns = DEFAULT_COLUMNS,
  cta,
  hideCta = false,
  eyebrow,
  title,
  body,
  points,
  pointsNote,
  layout = "default",
}: {
  columns?: FooterColumn[];
  /**
   * Replaces the stacked invite form. Copy stays on the left; `cta` sits on
   * the right, stacking under the copy below `md`.
   */
  cta?: ReactNode;
  /** Drops the whole intro-copy-plus-form row, for a page that already asks
      for the invite elsewhere (careers) and does not need the footer asking
      again above its own link grid. */
  hideCta?: boolean;
  /** Overrides the `v3` eyebrow ("Help shape what comes next"). No effect
      on `default`, which does not show one. */
  eyebrow?: string;
  /** Overrides the headline for either layout. */
  title?: ReactNode;
  /** Overrides the one-line subtext. Pass multiple `<p>`s for more than a
      line — invite_trainer's founding pitch runs three. */
  body?: ReactNode;
  /** Optional check-list under the subtext (v3 Linear-style band). */
  points?: string[];
  pointsNote?: string;
  /**
   * `v3`: full-viewport CTA band, then a light link chrome.
   * Home / v1 keep `default`.
   */
  layout?: "default" | "v3";
} = {}) {
  const copy = (
    <div
      className={
        cta
          ? "flex flex-col items-start gap-2 text-left"
          : "flex flex-col items-center gap-2"
      }
    >
      {layout === "v3" ? <ExpertiseBadge /> : null}
      {layout === "v3" ? (
        <span className="eyebrow" data-reveal>
          {eyebrow ?? "Help shape what comes next"}
        </span>
      ) : null}
      <h2
        data-reveal
        className="font-display text-[20px] leading-[1.3] font-semibold tracking-[-0.32px] text-[var(--tt-neutral-200)] sm:text-[30px] sm:leading-[1.2] md:text-[36px] md:leading-[44px]"
      >
        {title ??
          (layout === "v3" ? (
            "Build a Twin that trains like you"
          ) : (
            <>
              Your expertise shouldn&rsquo;t scale
              {/* Two lines at every width — the mobile size is set so the
                  first half fits on one. */}
              <br /> only when you&rsquo;re available
            </>
          ))}
      </h2>
      {body ? (
        <div
          data-reveal
          data-reveal-delay="80"
          className="l-footer-type flex max-w-[720px] flex-col gap-3 text-[16px] leading-[24px] text-[var(--tt-neutral-500)]"
        >
          {body}
        </div>
      ) : (
        <p
          data-reveal
          data-reveal-delay="80"
          className="l-footer-type max-w-[720px] text-[16px] leading-[24px] text-[var(--tt-neutral-500)]"
        >
          {layout === "v3"
            ? "Join the early-access list to hear when we’re ready to invite trainers to try the experience and help us make it real."
            : "Create your Twin and give every learner more opportunities to practice with the way you teach."}
        </p>
      )}
      {points && points.length > 0 ? (
        <ul className="ea-points" data-reveal data-reveal-delay="120">
          {points.map((point) => (
            <li key={point}>
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                width="16"
                height="16"
              >
                <path
                  d="m3.5 8.5 3 3 6-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {point}
            </li>
          ))}
        </ul>
      ) : null}
      {pointsNote ? (
        <p className="ea-points-note" data-reveal data-reveal-delay="160">
          {pointsNote}
        </p>
      ) : null}
    </div>
  );

  const ctaRow = hideCta ? null : cta ? (
    <div className="l-footer-cta-row grid items-start gap-10 border-b border-[var(--l-line-footer)] pb-[48px] md:grid-cols-2 md:gap-16">
      {copy}
      <div data-reveal data-reveal-delay="160">
        {cta}
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center gap-9 border-b border-[var(--l-line-footer)] pb-[48px] text-center">
      {copy}
      <InviteForm data-reveal data-reveal-delay="160" />
    </div>
  );

  const chrome = (
    <>
        {/* ----------------------------------------------------- link grid */}
        <div className="grid gap-12 py-12 md:grid-cols-12 md:gap-8">
          <div className="flex flex-col items-start gap-6 md:col-span-4">
            {/* 28, down from 40 — the lockup was reading as a second
                headline above the strapline rather than as a mark. v3 goes
                further, to 22, matching its own header's `<Logo size={22} />`
                — the other two pages' headers draw their own bespoke lockup,
                so 28 stays their footer's own size rather than a mismatch. */}
            <Logo
              size={layout === "v3" ? 22 : 28}
              className={
                layout === "v3"
                  ? "l-footer-logo"
                  : "l-footer-logo text-white!"
              }
            />
            <p className="l-footer-type text-[14px] leading-[20px] text-[var(--tt-neutral-500)]">
              Trainer&rsquo;s AI twin that scale their reach and 1:1 impact.
            </p>
            <span className="l-footer-status inline-flex items-center gap-2 rounded-full border border-[var(--l-line-footer)] bg-[var(--tt-neutral-800)] px-[12px] py-[8px]">
              <span className="h-2 w-2 rounded-full bg-[var(--l-live)]" />
              <span className="font-mono text-[11px] leading-[16px] font-normal text-[var(--tt-neutral-500)]">
                All systems operational
              </span>
            </span>
          </div>

          {/* The columns share what is left of the grid evenly rather than
              being placed one by one, so a page can pass three or five without
              the layout having to be told about it. v3 is the exception:
              dropping Legals left three columns spread thin across the same
              8-span width, so v3 clusters them tighter and to the right
              instead of stretching each to fill the leftover space. */}
          <div
            className={
              layout === "v3"
                ? "flex flex-col gap-8 sm:flex-row sm:justify-end sm:gap-20 md:col-span-8"
                : "flex flex-col gap-10 sm:flex-row sm:gap-8 md:col-span-8"
            }
          >
            {columns.map((column) => (
              <nav
                key={column.heading}
                className={layout === "v3" ? "sm:flex-none" : "sm:flex-1"}
              >
                <h3 className="l-footer-type text-[14px] leading-[20px] font-semibold tracking-[0.7px] text-[var(--tt-neutral-200)] uppercase">
                  {column.heading}
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {column.links.map((link) =>
                    link.live === false ? (
                      <li
                        key={link.label}
                        className="font-ui flex items-center gap-2 text-[14px] leading-[20px] text-[var(--tt-neutral-400)]"
                      >
                        {link.label}
                        <span className="font-ui rounded-full bg-white/10 px-[7px] py-[2px] text-[10px] font-medium whitespace-nowrap text-[var(--tt-neutral-300)]">
                          Coming soon
                        </span>
                      </li>
                    ) : (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="font-ui text-[14px] leading-[20px] text-[var(--tt-neutral-400)] transition-colors duration-150 ease-standard hover:text-white"
                        >
                          {link.label}
                        </a>
                      </li>
                    ),
                  )}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="l-footer-end">
        {/* ------------------------------------------------- watermark
            The wordmark alone now. The design stacked two full-bleed ridges
            around it — one behind, one crossing its lower half — and both are
            gone; what is left is meant to sink into the ground rather than sit
            on it, so it is taken well down in opacity. It still drifts slower
            than the page, which is the only thing giving it depth now that
            there is nothing in front of it. */}
        <div
          aria-hidden="true"
          className="l-footer-wordmark pointer-events-none relative h-[120px] select-none sm:h-[190px] md:h-[278px]"
        >
          <div
            data-parallax="0.24"
            className="l-wordmark absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[var(--tt-neutral-700)] to-[var(--tt-neutral-950)] bg-clip-text text-[13.1vw] leading-[1.1] tracking-[-0.01em] text-transparent opacity-40"
          >
            TrainerTwin
          </div>
        </div>

        {/* ---------------------------------------------------- bottom bar */}
        <div className="l-footer-bar relative flex flex-col items-start justify-between gap-6 border-t border-[var(--l-line-footer)] pt-[32px] sm:flex-row sm:items-center">
          <div className="l-footer-type flex flex-wrap items-center gap-4 text-[14px] leading-[20px] text-[var(--tt-neutral-600)]">
            <span>© 2026 TrainerTwin.ai All rights reserved</span>
            <span className="l-footer-hey inline-flex items-center gap-4">
              <span aria-hidden="true">|</span>
              <a
                href="#top"
                className="transition-colors hover:text-[var(--tt-neutral-400)]"
              >
                Hey AI, learn about us
              </a>
            </span>
          </div>

          <div className="flex items-center gap-6">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href="#top"
                aria-label={social.label}
                className="text-[var(--tt-neutral-600)] transition-colors duration-150 hover:text-[var(--tt-neutral-400)]"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
        </div>
    </>
  );

  if (layout === "v3") {
    return (
      <footer id="early-access" className="l-footer-v3 relative">
        {ctaRow ? (
          <section
            id="build"
            className="l-footer-v3-cta relative overflow-clip"
          >
            <div className="pointer-events-none absolute -top-[280px] -left-[280px] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(255,102,0,0.22)_0%,rgba(255,150,80,0.08)_35%,rgba(255,197,178,0)_70%)] blur-[120px]" />
            <div className="pointer-events-none absolute -right-[280px] -bottom-[200px] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(255,102,0,0.22)_0%,rgba(255,150,80,0.08)_35%,rgba(255,197,178,0)_70%)] blur-[120px]" />
            <div className="relative mx-auto w-full max-w-[1280px] px-6">
              {ctaRow}
            </div>
          </section>
        ) : null}
        {/* The dark end of the page. `tt-night` sits on a full-bleed wrapper
            rather than on the measure itself, so the ground and the lit seam
            across its top run the whole width. */}
        <div className="l-footer-v3-chrome tt-night relative">
          {/* Same lattice as the hero's, at the hero's own settings — the
              cursor grid opens the page and closes it, on the two grounds
              dark enough for it to read. */}
          <div className="l-footer-v3-cursor" aria-hidden="true">
            <CursorGrid
              cellSize={48}
              radius={150}
              color="#fe5900"
              falloff="smooth"
              maxOpacity={0.45}
              fillOpacity={0.12}
              lineWidth={1.1}
              cellRadius={3}
              holdTime={140}
              fadeDuration={1500}
              pulseSpeed={520}
              gridOpacity={0}
              gridColor="#e7ebf1"
            />
          </div>
          <div className="l-footer-v3-content relative mx-auto w-full max-w-[1280px] px-6 pb-6">
            {chrome}
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer
      id="early-access"
      className="tt-night tt-night-deep relative overflow-clip border-t border-[var(--l-line-footer)] pt-20 pb-6 md:pt-[80px]"
    >
      {/* The two blurred brand blooms, opposite corners. */}
      <div className="pointer-events-none absolute -top-[280px] -left-[280px] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(255,102,0,0.22)_0%,rgba(255,150,80,0.08)_35%,rgba(255,197,178,0)_70%)] blur-[120px]" />
      <div className="pointer-events-none absolute -right-[280px] -bottom-[200px] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(255,102,0,0.22)_0%,rgba(255,150,80,0.08)_35%,rgba(255,197,178,0)_70%)] blur-[120px]" />

      <div className="relative mx-auto w-full max-w-[1280px] px-6">
        {ctaRow}
        {chrome}
      </div>
    </footer>
  );
}

function ExpertiseBadge() {
  return (
    <span className="ea-badge" aria-hidden="true">
      <span className="ea-badge-glow" />
      <svg className="ea-badge-mark" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="29" className="ea-badge-fill" />
        <circle cx="32" cy="32" r="30.5" className="ea-badge-ring" />
        <rect
          x="18"
          y="23"
          width="28"
          height="18"
          rx="2.2"
          className="ea-badge-stroke"
        />
        <path d="M18.5 24.5 32 33.5 45.5 24.5" className="ea-badge-stroke" />
        <path
          d="M44 40.5h6M47 37.5v6"
          className="ea-badge-stroke"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/**
 * One of the two exported ridge silhouettes. They carry their own gradient
 * fills, so they render as plain <img> rather than being redrawn here — and
 * they stretch to whatever box they are given, exactly as the Figma does.
 */
