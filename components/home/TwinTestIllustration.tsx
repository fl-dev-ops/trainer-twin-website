"use client";

import { useEffect, useState } from "react";
import { MutedClip } from "@/components/landing2/MutedClip";
import { Icon } from "./icons";

const ROLES = ["Sales trainer", "Tech trainer", "Expert"] as const;
const HOLD = 2200;
const BLUR = 280;

/**
 * Step 3 of Build your Twin: the twin answering in-voice.
 * Shared with the DNA step-3 card. `turns` / `roleRotator` stay available
 * if another stage needs a two-turn chat.
 */
export function TwinTestIllustration({
  turns = 1,
  roleRotator = false,
}: {
  turns?: 1 | 2;
  roleRotator?: boolean;
}) {
  return (
    <>
      <div className="steps-planes">
        <div className="st-pane st-pane--front st-pane--solo">
          <div className="st-bar">
            <Icon name="chat" />
            Your twin
            {roleRotator ? <TwinRoleRotator /> : null}
          </div>
          <div className="st-body">
            <p className="st-bubble st-bubble--ask st-msg st-msg--1">
              When do I use this formula?
            </p>
            <p className="st-bubble st-bubble--twin st-msg st-msg--2">
              Try a real example first: what clues tell you it applies?
            </p>
            {turns === 2 ? (
              <>
                <p className="st-bubble st-bubble--ask st-msg st-msg--3">
                  The problem mentions a rate of change. Is that the clue?
                </p>
                <p className="st-bubble st-bubble--twin st-msg st-msg--4">
                  Yes. When you see a rate, start with the derivative form,
                  then check units.
                </p>
              </>
            ) : null}
            <span
              className={
                turns === 2 ? "st-source st-msg st-msg--5" : "st-source"
              }
            >
              From Lesson 6
            </span>
          </div>
        </div>
      </div>
      <span className="st-overlay">
        <span className="steps-tip">
          <Icon name="check" />
          Sounds like you
        </span>

        {/* The twin, live on camera — on the overlay rather than inside the
            pane, so it shares the tip's own coordinate space and can be set
            to the tip's own bottom offset: same row, opposite side. */}
        <span className="st-pip">
          <MutedClip src="/tt/presenter.mp4" className="st-pip-video" />
          <span className="st-pip-wave" aria-hidden="true">
            <span className="st-pip-bar" />
            <span className="st-pip-bar" />
            <span className="st-pip-bar" />
            <span className="st-pip-bar" />
            <span className="st-pip-bar" />
            <span className="st-pip-bar" />
            <span className="st-pip-bar" />
            <span className="st-pip-bar" />
          </span>
        </span>
      </span>
    </>
  );
}

function TwinRoleRotator() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduce) {
      const id = window.setInterval(() => {
        setIndex((i) => (i + 1) % ROLES.length);
      }, HOLD);
      return () => window.clearInterval(id);
    }

    let timer = 0;
    let frame = 0;
    let cancelled = false;

    const cycle = () => {
      timer = window.setTimeout(() => {
        setPhase("out");
        timer = window.setTimeout(() => {
          setIndex((i) => (i + 1) % ROLES.length);
          frame = requestAnimationFrame(() => {
            if (!cancelled) setPhase("in");
          });
          if (!cancelled) cycle();
        }, BLUR);
      }, HOLD);
    };

    cycle();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <span className={`st-role st-role--${phase}`} aria-hidden="true">
      {ROLES[index]}
    </span>
  );
}
