"use client";

import { useEffect, useRef, useState } from "react";
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

/**
 * `lead` / `asks` / `tail` default to the original v3 sentence; the homepage passes its
 * own. The fold, the timing and the markup are the same either way.
 */
export function WantToTwin({
  lead = "Want to",
  asks = ASKS,
  tail = "Your AI Twin can do it",
  inline = false,
}: {
  lead?: string;
  asks?: readonly string[];
  tail?: string;
  /** The lead-in and the changing word share one line, the tail below:
      "Turn your [course]" / "into a two-way conversation." */
  inline?: boolean;
} = {}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(
      () => setIndex((current) => (current + 1) % asks.length),
      HOLD_MS,
    );

    return () => window.clearInterval(id);
  }, [asks.length]);

  const ask = asks[index];

  // Inline: size the slot to the current word so the line stays centred.
  // A ResizeObserver re-measures when the font loads or the size steps down;
  // its box size is in layout px, unaffected by the hero's scale transform.
  const ghostRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [slotWidth, setSlotWidth] = useState<number>();
  useEffect(() => {
    const ghost = ghostRefs.current[index];
    if (!inline || !ghost) return;
    const observer = new ResizeObserver(([entry]) => setSlotWidth(entry.borderBoxSize[0].inlineSize));
    observer.observe(ghost);
    return () => observer.disconnect();
  }, [inline, index]);

  return (
    <p className="hero-v3-want">
      <span className="sr-only">
        {lead} {ask} {tail}
      </span>
      <span aria-hidden="true">
        {inline ? (
          <span className="rot-line">
            <span className="rot-lead">{lead}</span>{" "}
            {/* Every word is laid under the live one, invisible: the slot is
                as wide as the widest until the current word is measured, then
                eases to that word's width. */}
            <span
              className="rot-slot rot-slot--fixed"
              style={slotWidth ? { width: slotWidth } : undefined}
            >
              {asks.map((word, i) => (
                <span
                  key={word}
                  ref={(node) => {
                    ghostRefs.current[i] = node;
                  }}
                  className="rot-ghost"
                  aria-hidden="true"
                >
                  {word}
                </span>
              ))}
              <FoldWord key={ask} text={ask} />
            </span>
          </span>
        ) : (
          <>
            <span className="rot-line">{lead}</span>
            <span className="rot-line">
              <span className="rot-slot">
                <FoldWord key={ask} text={ask} />
              </span>
            </span>
          </>
        )}
        <span className="rot-line">{tail}</span>
      </span>
    </p>
  );
}
