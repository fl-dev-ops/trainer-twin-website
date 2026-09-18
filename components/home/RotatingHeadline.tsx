"use client";

import { useEffect, useState } from "react";

/**
 * The hero sentence, with two slots that retype themselves together.
 *
 * The pairs are the point: an audience and the moment it needs you are one
 * thought, so they change as a unit rather than shuffling independently and
 * producing sentences nobody wrote.
 *
 * Both slots share one progress rather than one speed. Erasing "clients" and
 * "between sessions" at a fixed rate per character would leave the short word
 * finished and waiting while the long one caught up; driving both off the same
 * 0-1 and slicing each by its own length means they start and land together
 * whatever they are.
 */
const PAIRS: Array<{ who: string; when: string }> = [
  { who: "students", when: "at any time" },
  { who: "sales reps", when: "before the calls" },
  { who: "presenters", when: "before the talk" },
  { who: "clients", when: "between sessions" },
];

/** ms holding a finished pair, erasing it, and typing the next. */
const HOLD = 2400;
const ERASE = 420;
const TYPE = 900;

type Phase = "hold" | "erase" | "type";

export function RotatingHeadline() {
  const [index, setIndex] = useState(0);
  /* 1 is the whole word, 0 is nothing. Both slots read it. */
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let phase: Phase = "hold";
    let started = performance.now();

    const tick = (now: number) => {
      const elapsed = now - started;

      if (phase === "hold") {
        if (elapsed >= HOLD) {
          phase = "erase";
          started = now;
        }
      } else if (phase === "erase") {
        const t = Math.min(elapsed / ERASE, 1);
        setProgress(1 - t);
        if (t >= 1) {
          phase = "type";
          started = now;
          setIndex((i) => (i + 1) % PAIRS.length);
        }
      } else {
        const t = Math.min(elapsed / TYPE, 1);
        setProgress(t);
        if (t >= 1) {
          phase = "hold";
          started = now;
        }
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const pair = PAIRS[index];
  /* Rounded, not floored: a word is whole for the last half-character of the
     type rather than arriving a frame late. */
  const cut = (word: string) =>
    word.slice(0, Math.round(progress * word.length));

  return (
    <>
      {/* What a screen reader gets: one whole sentence, not a heading that
          rewrites itself letter by letter under the cursor. */}
      <span className="sr-only">
        Your {pair.who} need you {pair.when}.
      </span>
      {/* Three lines, set rather than wrapped: the two that change are on
          their own, so a word growing a character never pushes the rest of the
          sentence around. */}
      <span aria-hidden="true">
        <span className="rot-line">
          Your{" "}
          <span className="rot-slot">
            <span className="rot-word">{cut(pair.who)}</span>
          </span>
        </span>
        <span className="rot-line">need you</span>
        <span className="rot-line">
          <span className="rot-slot">
            <span className="rot-word">{cut(pair.when)}</span>
          </span>
        </span>
      </span>
    </>
  );
}
