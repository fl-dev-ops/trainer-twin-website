"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "../icons";

type Step = {
  title: string;
  copy: string;
  scene: ReactNode;
};

const FILES = [
  { name: "System design course", meta: "Course", done: true },
  { name: "Sales playbook.epub", meta: "Book", done: true },
  { name: "lesson-06.mp4", meta: "Session", done: true },
  { name: "Objection framework", meta: "Framework", done: false },
];

const STEPS: Step[] = [
  {
    title: "Add your material.",
    copy: "Courses, books, frameworks and a few of your sessions.",
    scene: (
      <div className="v1-panel v1-panel--files">
        <span className="v1-panel-label">Your library</span>
        <ul>
          {FILES.map((file) => (
            <li key={file.name} className={file.done ? "is-done" : undefined}>
              <span className="v1-file-icon">
                <Icon name="doc" />
              </span>
              <span className="v1-file-name">{file.name}</span>
              <span className="v1-file-meta">{file.meta}</span>
              {file.done ? (
                <span className="v1-file-ok">
                  <Icon name="check" />
                </span>
              ) : (
                <span className="v1-file-bar">
                  <i />
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    title: "Meet your twin.",
    copy: "Your voice, your avatar, your coaching style.",
    scene: (
      <div className="v1-panel v1-panel--twin">
        <span className="v1-twin-face">
          <Icon name="face" />
        </span>
        <span className="v1-twin-wave" aria-hidden="true">
          {Array.from({ length: 9 }, (_, i) => (
            <i key={i} style={{ ["--i" as string]: i }} />
          ))}
        </span>
        <ul className="v1-chips">
          <li>
            <Icon name="mic" />
            Your voice
          </li>
          <li>
            <Icon name="face" />
            Your avatar
          </li>
          <li>
            <Icon name="chat" />
            Your coaching style
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "Calibrate it.",
    copy: "Check the guardrails, and make sure it looks, sounds and thinks like you.",
    scene: (
      <div className="v1-panel v1-panel--calibrate">
        <span className="v1-panel-label">Guardrails</span>
        <ul className="v1-checks">
          <li>
            <Icon name="check" />
            Answers only from your material
          </li>
          <li>
            <Icon name="check" />
            Looks and sounds like you
          </li>
          <li>
            <Icon name="check" />
            Thinks and coaches like you
          </li>
        </ul>
        <p className="v1-bubble">Try asking your twin a question.</p>
      </div>
    ),
  },
  {
    title: "Share with your learners.",
    copy: "At the end of a module, a course or a book.",
    scene: (
      <div className="v1-panel v1-panel--share">
        <span className="v1-panel-label">Share your twin</span>
        <ul className="v1-chips v1-chips--stack">
          <li className="is-on">
            <Icon name="check" />
            End of a module
          </li>
          <li>End of a course</li>
          <li>End of a book</li>
        </ul>
        <span className="v1-link-box">
          <span className="v1-link-url">trainertwin.ai/s/your-twin</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          >
            <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
            <path d="M10.5 5.5v-2A1.5 1.5 0 0 0 9 2H4A1.5 1.5 0 0 0 2.5 3.5v5A1.5 1.5 0 0 0 4 10h1.5" />
          </svg>
        </span>
      </div>
    ),
  },
  {
    title: "Lean on our team.",
    copy: "End-to-end support, so your time goes into growing your practice.",
    scene: (
      <div className="v1-panel v1-panel--team">
        <span className="v1-panel-label">Dedicated platform admin</span>
        <div className="v1-ticket">
          <span className="v1-ticket-top">
            <span className="v1-ticket-dot" />
            Learner reported an issue
          </span>
          <span className="v1-ticket-body">We’re on it.</span>
        </div>
        <span className="v1-ticket-done">
          <Icon name="check" />
          Resolved by the TrainerTwin team
        </span>
      </div>
    ),
  },
];

/**
 * Where the page scroll stops driving the rail and starts being a plain
 * scroll again: a pointer wide and tall enough to hold the pinned stage, and
 * no request for reduced motion. Anywhere else the rail is an ordinary
 * horizontal scroller, as it was before the pin.
 */
const PIN_QUERY =
  "(min-width: 900px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)";

/**
 * /V1's "Set up once. Share it anywhere." — large cards on a horizontal rail,
 * a caption under each, previous/next buttons below.
 *
 * On a large screen the section pins to the viewport and the page's own
 * vertical scroll is spent moving the rail sideways, one pixel of scroll for
 * one pixel of travel, until the fifth card is in view; then it lets go and
 * the page carries on down. The section is made exactly that much taller than
 * the screen (`--v1-pin-h`) so the scroll distance is the travel and nothing
 * more. Elsewhere it is a plain scroll-snap rail, and the buttons step it.
 */
export function SetupSteps() {
  const section = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const travel = useRef(0);
  const [pinned, setPinned] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const read = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  /* Is the pin on? Follows the media query as the window changes. */
  useEffect(() => {
    const mq = window.matchMedia(PIN_QUERY);
    const sync = () => setPinned(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /* Plain rail: keep the end-stops in step with its own scrolling. */
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    read();
    el.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    return () => {
      el.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, [read]);

  /* Pinned: size the section to the travel, then turn page scroll into rail
     position. */
  useEffect(() => {
    const sec = section.current;
    const el = rail.current;
    if (!pinned || !sec || !el) {
      sec?.style.removeProperty("--v1-pin-h");
      sec?.style.removeProperty("--v1-vh");
      return;
    }

    let frame = 0;

    /* The site sets `zoom` on <body>. Layout sizes (`scrollWidth`, a height in
       CSS) are in the zoomed element's own pixels, while scroll positions and
       `getBoundingClientRect` are in screen pixels, so one pixel of travel
       costs `zoom` pixels of scroll. Everything below converts through it. */
    const zoom = () => parseFloat(getComputedStyle(document.body).zoom) || 1;

    const measure = () => {
      const z = zoom();
      travel.current = Math.max(0, el.scrollWidth - el.clientWidth);
      const screenH = window.innerHeight / z;
      sec.style.setProperty("--v1-vh", `${screenH}px`);
      sec.style.setProperty("--v1-pin-h", `${screenH + travel.current}px`);
    };

    const place = () => {
      frame = 0;
      const top = sec.getBoundingClientRect().top / zoom();
      const progress = travel.current ? Math.min(Math.max(-top / travel.current, 0), 1) : 0;
      el.scrollLeft = progress * travel.current;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(place);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    place();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    /* The travel is only right once the cards have their final size, which
       can be after this first read (fonts, images, the scrollbar appearing),
       so it is read again whenever the rail or its track changes size. */
    const observer = new ResizeObserver(onResize);
    observer.observe(el);
    if (el.firstElementChild) observer.observe(el.firstElementChild);
    void document.fonts?.ready.then(onResize);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
      sec.style.removeProperty("--v1-pin-h");
      sec.style.removeProperty("--v1-vh");
    };
  }, [pinned]);

  const step = (dir: 1 | -1) => {
    const el = rail.current;
    const card = el?.querySelector<HTMLElement>("li");
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el.firstElementChild!).columnGap) || 0;
    const by = dir * (card.offsetWidth + gap);
    /* Pinned, the page scroll IS the rail position, so the buttons move the
       page by the same distance; the scroll listener does the rest. */
    if (pinned) {
      const z = parseFloat(getComputedStyle(document.body).zoom) || 1;
      window.scrollBy({ top: by * z, behavior: "smooth" });
    } else {
      el.scrollBy({
        left: by,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    }
  };

  return (
    <section
      ref={section}
      id="how"
      className={pinned ? "sec v1-how is-pinned" : "sec v1-how"}
      aria-labelledby="how-h"
    >
      <div className="v1-pin">
        <div className="wrap">
          <div className="v1-how-head" data-reveal>
            <span className="eyebrow">How it works</span>
            <h2 id="how-h">Set up once. Share it anywhere.</h2>
          </div>
        </div>

        <div
          ref={rail}
          className="v1-rail"
          tabIndex={0}
          role="region"
          aria-label="Setup steps, scrolls sideways"
        >
          <ol className="v1-rail-track">
            {STEPS.map((item, i) => (
              <li key={item.title}>
                <div className="v1-card" aria-hidden="true">
                  <span className="v1-card-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.scene}
                </div>
                <p className="v1-caption">
                  <b>{item.title}</b> {item.copy}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="v1-rail-nav">
          <button
            type="button"
            aria-label="Previous step"
            disabled={atStart}
            onClick={() => step(-1)}
          >
            <Icon name="arrow" />
          </button>
          <button
            type="button"
            aria-label="Next step"
            disabled={atEnd}
            onClick={() => step(1)}
          >
            <Icon name="arrow" />
          </button>
        </div>
      </div>
    </section>
  );
}
