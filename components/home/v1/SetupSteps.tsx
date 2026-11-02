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
        <span className="v1-share-cta">
          Share link
          <Icon name="arrow" />
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
 * /V1's "Set up once. Share it anywhere." — large cards on a horizontal rail,
 * a caption under each, previous/next buttons below. The rail is a plain
 * scroll-snap container, so touch, trackpad and keyboard all work without any
 * of this script; the buttons only add a way to step it and to see whether
 * there is more either side.
 */
export function SetupSteps() {
  const rail = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const read = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

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

  const step = (dir: 1 | -1) => {
    const el = rail.current;
    const card = el?.querySelector<HTMLElement>("li");
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el.firstElementChild!).columnGap) || 0;
    el.scrollBy({
      left: dir * (card.offsetWidth + gap),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  return (
    <section
      id="how"
      className="sec v1-how"
      aria-labelledby="how-h"
    >
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
    </section>
  );
}
