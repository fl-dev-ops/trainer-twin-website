"use client";

import { useEffect, useRef, useState } from "react";
import { COACHES, COACH_USE_CASES } from "./coachSpotlightData";

const CYCLE_MS = 4000;
const PAUSE_MS = 15000;

/** Flat pastel colours for use-case tags, assigned per tag text so the same tag always lands on the same colour. */
const TAG_PALETTE = ["coral", "blue", "green", "purple", "teal", "gold"];
function tagClass(tag: string) {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) hash = (hash * 31 + tag.charCodeAt(i)) | 0;
  return `use-tag use-tag--${TAG_PALETTE[Math.abs(hash) % TAG_PALETTE.length]}`;
}

/**
 * A light panel: circular photos on the left, a light detail card on the
 * right for whichever coach is selected (the unselected circles drift
 * gently). Auto-cycles, pauses on hover or click.
 */
export function CoachSpotlight() {
  const [current, setCurrent] = useState(0);
  const pausedRef = useRef(false);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const id = setInterval(() => {
      if (pausedRef.current) return;
      setCurrent((prev) => (prev + 1) % COACHES.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => () => clearTimeout(pauseTimeoutRef.current), []);

  function select(i: number) {
    setCurrent(i);
    pausedRef.current = true;
    clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, PAUSE_MS);
  }

  const coach = COACHES[current];
  const uses = COACH_USE_CASES[coach.name];

  return (
    <div
      className="spot"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        clearTimeout(pauseTimeoutRef.current);
        pausedRef.current = false;
      }}
    >
      <div className="spot-grid" role="list" aria-label="Coaches exploring TrainerTwin">
        {COACHES.map((person, i) => (
          <button
            key={person.name}
            type="button"
            className={i === current ? "spot-dot on" : "spot-dot"}
            aria-label={`${person.name}, ${person.meta}`}
            aria-current={i === current ? "true" : undefined}
            onClick={() => select(i)}
          >
            <img src={person.photo} alt="" width={64} height={64} />
          </button>
        ))}
      </div>
      <div className="spot-card in" key={coach.name} aria-live="polite">
        <img src={coach.photo} alt="" width={96} height={96} />
        <div className="spot-text">
          <b>{coach.name}</b>
          <span>{coach.meta}</span>
          {uses && (
            <p>
              <span className="use-lab">{uses.length > 1 ? "Use cases" : "Use case"}</span>
              {uses.map((tag) => (
                <span className={tagClass(tag)} key={tag}>
                  {tag}
                </span>
              ))}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
