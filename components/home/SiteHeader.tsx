"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Logo } from "@/components/Logo";
import { CtaLink } from "./CtaLink";
import { NAV } from "./nav";
import { WhoMenu } from "./WhoMenu";

/**
 * "Who it’s for" is a mega-menu when this is on and a plain section link when
 * it is off. Held off while the pages it opens onto are still being built —
 * flip it back to true once the Tech Trainer page is ready, and the menu and
 * its panel come back untouched.
 */
const WHO_MENU_ENABLED = false;

/**
 * Every section the observer watches. It is the union across the pages that
 * use this header, not one page's running order — each renders a subset, and
 * a selector that matches nothing is simply skipped below.
 */
const WATCHED = [
  ".hero",
  "#can-do",
  "#compare",
  "#who",
  "#build",
  "#training-dna",
  "#founders",
  "#how-it-differs",
  "#early-access",
];

/**
 * The bar has no surface of its own, so it has to carry its own contrast: the
 * page shows straight through it and the lockup, links and button reverse to
 * whatever is passing underneath. These are the regions that PAINT dark, which
 * is not the same as the sections that are dark: v3's hero draws its ground in
 * a wash that deliberately runs up behind the bar, so the hero's own box starts
 * where the bar ends and would read as absent at rest. The wash is the shape
 * the eye sees, so it is the one measured; `.hero` covers the other pages,
 * where the section itself is the ground.
 */
const DARK_UNDER = ".hero-v3-wash, .hero, .tt-night";

/**
 * The sticky bar. Two pieces of state above the fold: which section is in
 * view, and whether what is under the bar is dark.
 */
export function SiteHeader({
  nav = NAV,
  mobileMenu = false,
  ctaLabel = "Early access",
  logoColor,
}: {
  nav?: typeof NAV;
  /** v3: section links collapse behind a menu icon below 768px. */
  mobileMenu?: boolean;
  /** v3: "Request a demo" — the other two pages keep the default. */
  ctaLabel?: string;
  /** Careers keeps the lockup in ink instead of brand orange. */
  logoColor?: string;
} = {}) {
  const [current, setCurrent] = useState<string | null>(null);
  /* Only /TrainerTwin_home_v3's stylesheet draws anything for `is-on-dark`;
     on the other two pages the class lands on the bar and styles nothing, so
     this needs no prop to gate it. */
  const [onDark, setOnDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const barRef = useRef<HTMLElement>(null);

  /* The probe is the bar's own midline: the reversal should land when the
     boundary is halfway up the bar, so neither half spends long in the wrong
     colour. Measured rather than assumed, because the bar grows a row taller at
     the breakpoint where the nav wraps. Read on a rAF rather than per scroll
     event: `getBoundingClientRect` is a layout read, and one a frame is all a
     class toggle can use. */
  useEffect(() => {
    const regions = Array.from(document.querySelectorAll(DARK_UNDER));
    let frame = 0;

    const read = () => {
      frame = 0;
      const box = barRef.current?.getBoundingClientRect();
      const line = box ? box.top + box.height / 2 : 0;
      setOnDark(
        regions.some((el) => {
          const region = el.getBoundingClientRect();
          return region.top <= line && region.bottom >= line;
        }),
      );
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    /* A band through the middle of the viewport: a section counts as "in view"
       only once it owns the centre, which is what stops the marker flickering
       between two of them mid-scroll. */
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCurrent(entry.target.id || null);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const selector of WATCHED) {
      const el = document.querySelector(selector);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileMenu || !menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [mobileMenu, menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={onDark ? "hdr is-on-dark" : "hdr"} ref={barRef}>
      <div className="wrap hdr-in">
        <a
          href="/"
          aria-label="TrainerTwin home"
          className="hdr-logo shrink-0"
        >
          {/* The project lockup, not a re-drawing of it — the same component
              and the same size /TrainerTwin_home carries, so the two bars show
              one mark rather than two treatments of it. It is one colour
              across mark and wordmark, which is §9's rule. */}
          <Logo size={22} color={logoColor} />
        </a>
        <nav className="nav" aria-label="Sections">
          {nav.map((item) =>
            WHO_MENU_ENABLED && item.href === "#who" ? (
              <WhoMenu
                key={item.href}
                href={item.href}
                label={item.label}
                current={current === "who"}
              />
            ) : (
              <a
                key={item.href}
                href={item.href}
                aria-current={
                  current === item.href.slice(1) ? "true" : undefined
                }
              >
                {item.label}
              </a>
            ),
          )}
        </nav>
        <CtaLink size="sm" href="#early-access" className="hdr-cta">
          {ctaLabel}
        </CtaLink>
        {mobileMenu ? (
          <button
            type="button"
            className="hdr-menu-btn"
            aria-expanded={menuOpen}
            aria-controls="hdr-v3-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
            >
              {menuOpen ? (
                <path d="M6 6l12 12M18 6 6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        ) : null}
      </div>
      {mobileMenu ? (
        <>
          {/* No `hidden` on either: a `display: none` panel cannot be
              transitioned, so both stay rendered and are hidden by state.
              `inert` does what `hidden` did for tab order and assistive tech
              while the menu reads as closed. */}
          <button
            type="button"
            className={
              menuOpen ? "hdr-menu-scrim is-open" : "hdr-menu-scrim"
            }
            inert={!menuOpen}
            tabIndex={-1}
            aria-label="Close menu"
            onClick={closeMenu}
          />
          <div
            id="hdr-v3-menu"
            className={menuOpen ? "hdr-menu is-open" : "hdr-menu"}
            inert={!menuOpen}
          >
            <nav className="hdr-menu-nav" aria-label="Sections">
              {nav.map((item, i) => (
                <a
                  key={item.href}
                  href={item.href}
                  style={{ ["--i" as string]: i } as CSSProperties}
                  aria-current={
                    current === item.href.slice(1) ? "true" : undefined
                  }
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </>
      ) : null}
    </header>
  );
}
