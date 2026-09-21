"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const ASKS = [
  "Create more videos?",
  "Be available 24/7?",
  "Enable more 1:1 practice?",
  "Reach more people?",
];
const HOLD_MS = 3200;

function FoldWord({ text }: { text: string }) {
  const reduced = useReducedMotion();

  return (
    <span className="rot-word rot-word--fold" style={{ perspective: 700 }}>
      {Array.from(text).map((character, index) => (
        <motion.span
          key={`${character}-${index}`}
          style={{ display: "inline-block", transformOrigin: "50% 0%" }}
          initial={reduced ? false : { opacity: 0, rotateX: -92 }}
          animate={{ opacity: 1, rotateX: 0 }}
          transition={{
            duration: 1,
            delay: index * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {character === " " ? "\u00a0" : character}
        </motion.span>
      ))}
    </span>
  );
}

export function WantToTwin() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(
      () => setIndex((current) => (current + 1) % ASKS.length),
      HOLD_MS,
    );

    return () => window.clearInterval(id);
  }, []);

  const ask = ASKS[index];

  return (
    <p className="hero-v3-want">
      <span className="sr-only">
        Want to {ask} Your AI Twin can do it
      </span>
      <span aria-hidden="true">
        <span className="rot-line">Want to</span>
        <span className="rot-line">
          <span className="rot-slot">
            <FoldWord key={ask} text={ask} />
          </span>
        </span>
        <span className="rot-line">Your AI Twin can do it</span>
      </span>
    </p>
  );
}
