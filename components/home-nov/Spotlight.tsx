"use client";

import { useEffect, useRef, useState } from "react";
import { COACHES } from "./coaches";

/** How long each coach stays in the spotlight before the next one takes over. */
const ROTATE_MS = 5000;
/** After a visitor clicks a face, stay on it this long before rotating again. */
const CLICK_HOLD_MS = 12000;

/**
 * Coach spotlight: one card on the left, every coach's face on the right.
 * It rotates through all coaches every 5 seconds and loops. Hovering the panel pauses it;
 * clicking a face jumps to that coach and holds there for a while.
 */
export function Spotlight() {
  const [cur, setCur] = useState(1);
  const [manual, setManual] = useState(false);
  const hovering = useRef(false);
  const holdUntil = useRef(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (hovering.current || Date.now() < holdUntil.current) return;
      setCur((c) => (c + 1) % COACHES.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, []);

  const pick = (i: number) => {
    holdUntil.current = Date.now() + CLICK_HOLD_MS;
    setManual(true);
    setCur(i);
  };

  const x = COACHES[cur];

  return (
    <div
      className="spot"
      onMouseEnter={() => {
        if (window.matchMedia("(hover:hover) and (pointer:fine)").matches) hovering.current = true;
      }}
      onMouseLeave={() => {
        hovering.current = false;
      }}
    >
      {/* key restarts the entrance animation each time the coach changes */}
      <div className="spot-card in" id="spot-card" key={x.name} aria-live={manual ? "polite" : "off"}>
        <img id="spot-photo" src={x.photo} alt={x.name} width={144} height={144} />
        <div className="spot-text">
          <b id="spot-name">{x.name}</b>
          <span id="spot-meta">{x.meta}</span>
          {x.uses.length > 0 && (
            <p id="spot-use">
              <span className="use-lab">{x.uses.length > 1 ? "Use cases" : "Use case"}</span>
              {x.uses.map((u) => (
                <span className="use-tag" key={u}>
                  {u}
                </span>
              ))}
            </p>
          )}
        </div>
      </div>
      <div className="spot-grid" id="spot-grid" aria-label="Coaches exploring TrainerTwin">
        {COACHES.map((c, i) => (
          <button
            key={c.name}
            type="button"
            className={"spot-dot" + (i === cur ? " on" : "")}
            style={{ animationDelay: `${(-(i * 0.37)).toFixed(2)}s` }}
            aria-label={`${c.name}, ${c.meta}`}
            aria-pressed={i === cur}
            onClick={() => pick(i)}
          >
            <img src={c.photo} alt="" width={112} height={112} />
          </button>
        ))}
      </div>
    </div>
  );
}
