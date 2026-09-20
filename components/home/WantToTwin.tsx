"use client";

import { useEffect, useState } from "react";

/**
 * v3-only rotating pair. Sticky prefixes stay static; the ask/can lines type
 * and erase the way `RotatingHeadline`'s slots do on the live home — swapped
 * back from the flip-card entrance FoldText gave them, to match.
 */
const PAIRS: Array<{ askPrefix: string; ask: string; can: string }> = [
  {
    askPrefix: "Tired of",
    ask: "the same doubt 100 times?",
    can: "handles the repeats.",
  },
  {
    askPrefix: "Learners stuck at",
    ask: "11 PM without you?",
    can: "answers them right then.",
  },
  {
    askPrefix: "Sixty learners,",
    ask: "one of you — no 1:1?",
    can: "makes 1:1 possible.",
  },
  {
    askPrefix: "Making content,",
    ask: "no time to teach?",
    can: "turns it into videos.",
  },
];

/* ms typing or erasing one line, and holding once both are typed. Ask and can
   type in sequence (the way FoldText's own delay staggered them) and erase in
   the reverse order, so the last thing written is the first thing taken back —
   one rAF clock drives all five phases rather than a timeout per phase, so the
   loop can't drift in a throttled background tab. */
const TYPE = 650;
const ERASE = 420;
const HOLD = 2800;

type Phase = "typeAsk" | "typeCan" | "hold" | "eraseCan" | "eraseAsk";

export function WantToTwin() {
  const [index, setIndex] = useState(0);
  /* Both start fully typed, same as `RotatingHeadline`: the first pair simply
     appears rather than typing in, and only cycles once `HOLD` has passed. */
  const [askProgress, setAskProgress] = useState(1);
  const [canProgress, setCanProgress] = useState(1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let phase: Phase = "hold";
    let started = performance.now();

    const tick = (now: number) => {
      const elapsed = now - started;

      if (phase === "hold") {
        if (elapsed >= HOLD) {
          phase = "eraseCan";
          started = now;
        }
      } else if (phase === "eraseCan") {
        const t = Math.min(elapsed / ERASE, 1);
        setCanProgress(1 - t);
        if (t >= 1) {
          phase = "eraseAsk";
          started = now;
        }
      } else if (phase === "eraseAsk") {
        const t = Math.min(elapsed / ERASE, 1);
        setAskProgress(1 - t);
        if (t >= 1) {
          setIndex((i) => (i + 1) % PAIRS.length);
          phase = "typeAsk";
          started = now;
        }
      } else if (phase === "typeAsk") {
        const t = Math.min(elapsed / TYPE, 1);
        setAskProgress(t);
        if (t >= 1) {
          phase = "typeCan";
          started = now;
        }
      } else {
        const t = Math.min(elapsed / TYPE, 1);
        setCanProgress(t);
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
  const spokenAsk = pair.askPrefix
    ? `${pair.askPrefix} ${pair.ask}`
    : pair.ask;

  /* Rounded, not floored: a word is whole for the last half-character of the
     type rather than arriving a frame late. */
  const cut = (word: string, progress: number) =>
    word.slice(0, Math.round(progress * word.length));

  return (
    <p className="hero-v3-want">
      <span className="sr-only">
        {spokenAsk} Your AI Twin {pair.can}.
      </span>
      <span aria-hidden="true">
        <span className="rot-line" key={pair.askPrefix}>{pair.askPrefix}</span>
        <span className="rot-line">
          <span className="rot-slot">
            <span className="rot-word">{cut(pair.ask, askProgress)}</span>
          </span>
        </span>
        <span className="rot-line">Your AI Twin</span>
        <span className="rot-line">
          <span className="rot-slot">
            <span className="rot-word">{cut(pair.can, canProgress)}</span>
          </span>
        </span>
      </span>
    </p>
  );
}
