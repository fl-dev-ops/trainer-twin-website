"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "./useInView";

/**
 * v3 Interactive twin stage. Photo or clip in the centre, trait pills on the
 * left, a four-turn coaching thread on the right. Drop
 * `trainers_twin_avatar.mp4` in `public/home-v3/interactive-twin/` to replace
 * the still — no extra flag.
 *
 * The chat timeline, wave, trait cycle and video only run while this stage is
 * in view, so the story starts when the reader reaches the section rather than
 * from page load.
 */
const TWIN_IMAGE_SRC = "/home-v3/interactive-twin/twin-avatar.png";
const TWIN_VIDEO_SRC = "/home-v3/interactive-twin/trainers_twin_avatar.mp4";
const TWIN_VIDEO_SRC_ALT = "/home-v3/interactive-twin/trainer's_twin_avatar.mp4";

const TRAITS = [
  "Sounds like you",
  "Thinks like you",
  "Trains like you",
  "Questions like you",
] as const;

const TRAIT_HOLD = 2200;
const TRAIT_BLUR = 280;

const THREAD = [
  {
    who: "Arjun",
    side: "learner" as const,
    text: "When do I use this formula?",
  },
  {
    who: "Trainer’s Twin",
    side: "twin" as const,
    text: "Try a real example first - what clues tell you it applies?",
  },
  {
    who: "Arjun",
    side: "learner" as const,
    text: "The problem mentions a rate of change - is that the clue?",
  },
  {
    who: "Trainer’s Twin",
    side: "twin" as const,
    text: "Yes. When you see a rate, start with the derivative form - then check units.",
  },
] as const;

export function InteractiveTwinArt() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={inView ? "art-sq itwin is-inview" : "art-sq itwin"}
      role="img"
      aria-label="Trainer’s Twin speaking in a 1:1 coaching session. Arjun asks when to use a formula; the twin hints, then confirms that a rate of change means starting from the derivative."
    >
      <ul className="itwin-pills">
        <li>
          <TraitRotator active={inView} />
        </li>
      </ul>

      <div className="itwin-hero">
        <div className="itwin-plate" aria-hidden="true" />
        <div className="itwin-media">
          <TwinFace active={inView} />
          <span className="itwin-wave" aria-hidden="true">
            {Array.from({ length: 7 }, (_, i) => (
              <i key={i} style={{ ["--i" as string]: i }} />
            ))}
          </span>
        </div>
        <p className="itwin-caption">
          <span>Trainer’s Twin</span>
          <span>{"<1:1 coaching>"}</span>
        </p>
      </div>

      <div className="itwin-thread">
        {THREAD.map((turn, i) => (
          <div
            key={`${turn.who}-${i}`}
            className={`itwin-turn itwin-turn--${turn.side}`}
            style={{ ["--i" as string]: i }}
          >
            <div className="itwin-bubble">
              <div className="itwin-bubble-head">
                <span className="itwin-who">{turn.who}</span>
                <time dateTime="10:15">10:15 AM</time>
              </div>
              <p className="itwin-text">{turn.text}</p>
            </div>
          </div>
        ))}
        <p className="itwin-meta" style={{ ["--i" as string]: THREAD.length }}>
          From Lesson 6
        </p>
      </div>
    </div>
  );
}

function TwinFace({ active }: { active: boolean }) {
  const [useStill, setUseStill] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || useStill) return;
    if (active) {
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [active, useStill]);

  if (useStill) {
    return (
      <img
        className="itwin-face"
        src={TWIN_IMAGE_SRC}
        alt=""
        width={280}
        height={360}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className="itwin-face"
      muted
      loop
      playsInline
      controls={false}
      preload="metadata"
      poster={TWIN_IMAGE_SRC}
      onError={() => setUseStill(true)}
    >
      <source src={TWIN_VIDEO_SRC} type="video/mp4" />
      <source src={TWIN_VIDEO_SRC_ALT} type="video/mp4" />
    </video>
  );
}

function TraitRotator({ active }: { active: boolean }) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    if (!active) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduce) {
      const id = window.setInterval(() => {
        setIndex((i) => (i + 1) % TRAITS.length);
      }, TRAIT_HOLD);
      return () => window.clearInterval(id);
    }

    let timer = 0;
    let frame = 0;
    let cancelled = false;

    const cycle = () => {
      timer = window.setTimeout(() => {
        setPhase("out");
        timer = window.setTimeout(() => {
          setIndex((i) => (i + 1) % TRAITS.length);
          frame = requestAnimationFrame(() => {
            if (!cancelled) setPhase("in");
          });
          if (!cancelled) cycle();
        }, TRAIT_BLUR);
      }, TRAIT_HOLD);
    };

    cycle();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [active]);

  return (
    <span className="itwin-trait-slot">
      {TRAITS.map((label) => (
        <span key={label} className="itwin-trait-ghost" aria-hidden="true">
          {label}
        </span>
      ))}
      <span className={`itwin-trait itwin-trait--${phase}`}>{TRAITS[index]}</span>
    </span>
  );
}
