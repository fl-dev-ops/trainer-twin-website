"use client";

import { useEffect, useState } from "react";
import { LogoSymbol } from "@/components/Logo";
import { MutedClip } from "@/components/landing2/MutedClip";
import { cn } from "@/components/cn";
import { Icon } from "./icons";
import { useInView } from "./useInView";

const FILM_SRC = "/home-v3/interactive-twin/twin_video_2.mp4";

/**
 * The same question the Chatbot card is asked, answered the twin's way: in the
 * trainer's own words, citing the lesson it came from, and then offered back as
 * video — which is the one thing neither of the other two columns can do.
 */
const TURNS = [
  { side: "me", text: "Why is my API slow?" },
  { side: "twin", text: "Same thing we hit in Lesson 6 — N+1 calls." },
  { side: "twin", text: "Want me to walk you through it?" },
] as const;

type Phase = "dna" | "ask" | "reply1" | "reply2" | "hold" | "video";

/** Which of the three cards is in front at each phase. */
const CARD_AT: Record<Phase, 0 | 1 | 2> = {
  dna: 0,
  ask: 1,
  reply1: 1,
  reply2: 1,
  hold: 1,
  video: 2,
};

/** How many of the three chat turns have arrived by each phase. */
const SHOWN_AT: Record<Phase, number> = {
  dna: 0,
  ask: 1,
  reply1: 2,
  reply2: 3,
  hold: 3,
  video: 3,
};

/* One lap: the persona wave holds its own pulse for a beat, then the card
   goes back and the chat card comes up with the three turns typing in, then
   it goes back too and the twin's answer arrives as video for three seconds,
   before the DNA card comes back up. A phase clock rather than three
   independent CSS timelines because the active card and the chat turns have
   to agree on one running order. */
const SEQUENCE: Array<{ phase: Phase; ms: number }> = [
  { phase: "dna", ms: 2600 },
  { phase: "ask", ms: 700 },
  { phase: "reply1", ms: 900 },
  { phase: "reply2", ms: 900 },
  { phase: "hold", ms: 700 },
  { phase: "video", ms: 3000 },
];

/**
 * v3-only, the featured Trainer Twin card's art: three cards in one stack,
 * each arguing one row of the list beside it — the persona wave for "Your
 * teaching DNA", chat for "Interactive experiences", video for "Creates
 * videos" — coming up in front and going back in turn rather than crossfading
 * into each other, so each keeps its own title.
 */
export function TwinArt() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [i, setI] = useState(0);

  /* Reduced motion never starts the clock, so the lap stays parked on
     whichever card opened it — and the stylesheet pins that to the chat card
     instead, which is the most complete single frame of the three. */
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(
      () => setI((value) => (value + 1) % SEQUENCE.length),
      SEQUENCE[i].ms,
    );
    return () => window.clearTimeout(timer);
  }, [i, inView]);

  const phase = SEQUENCE[i].phase;
  const active = CARD_AT[phase];
  const shown = SHOWN_AT[phase];

  return (
    <div className="cmp-planes" ref={ref}>
      <div className="cmp-pane cmp-pane--back">
        <div className="cmp-pane-bar">
          <Icon name="folder" />
          Renders
        </div>
      </div>

      <div
        className={cn(
          "cmp-pane cmp-pane--front cmp-twin-card cmp-twin-card--dna",
          active === 0 && "is-on",
        )}
      >
        <div className="cmp-pane-bar">
          <LogoSymbol size={13} />
          Your training DNA
        </div>
        <div className="cmp-pane-body cmp-twin-wave-body">
          <MindMap />
        </div>
      </div>

      <div
        className={cn(
          "cmp-pane cmp-pane--front cmp-twin-card cmp-twin-card--chat",
          active === 1 && "is-on",
        )}
      >
        <div className="cmp-pane-bar">
          <LogoSymbol size={13} />
          Your twin
        </div>
        <div className="cmp-pane-body">
          {TURNS.map((turn, idx) => (
            <p
              key={turn.text}
              className={cn(
                "bubble",
                `bubble--${turn.side}`,
                "cmp-twin-bubble",
                idx < shown && "is-in",
              )}
            >
              {turn.text}
            </p>
          ))}
        </div>
      </div>

      <div
        className={cn(
          "cmp-pane cmp-pane--front cmp-twin-card cmp-twin-card--video",
          active === 2 && "is-on",
        )}
      >
        <div className="cmp-pane-bar">
          <Icon name="video" />
          Lesson 6
        </div>
        <div className="cmp-pane-body cmp-twin-film-body">
          {/* Kept running underneath rather than started on cue: a
              programmatic play() off a timer has no user gesture behind it
              and the browser refuses it, which parks the film on a frozen
              first frame. The card reveals it instead, so what arrives is
              always already moving. */}
          <MutedClip src={FILM_SRC} className="cmp-twin-film-clip" />
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------- the persona mind map */

/** The four rows both columns share, and the pill that sits on each. */
const MIND_ROWS = [42, 94, 146, 198];
const PILL_H = 26;
/** Inner edge of each column of pills, in the wires' 370-wide viewBox. */
const WIRE_L = 120;
const WIRE_R = 250;
/**
 * Where a wire stops. Not the hub's own edges (157 / 213) but 15 units inside
 * them: the viewBox is stretched to the card while the hub stays a fixed
 * square, so an end drawn at the edge would drift off it. Ending under the hub
 * means the drift is absorbed and the join never shows.
 */
const HUB_L = 172;
const HUB_R = 198;
const HUB_MID = 120;

const MIND_TRAITS = [
  { label: "Coaching", side: "left", row: 0 },
  { label: "Personalisation", side: "left", row: 1 },
  { label: "Evaluation", side: "left", row: 2 },
  { label: "Questioning", side: "left", row: 3 },
  { label: "Voice", side: "right", row: 0 },
  { label: "Tone", side: "right", row: 1 },
  { label: "Pacing", side: "right", row: 2 },
  { label: "Pauses", side: "right", row: 3 },
] as const;

/**
 * One wire per trait, leaving the pill's inner edge and arriving flat at the
 * hub. The first control point holds the line horizontal out of the pill and
 * the second flattens it into the hub, which fans the outer rows wide and
 * leaves the middle two nearly straight — the source's own shaping.
 */
const MIND_WIRES = MIND_TRAITS.map((trait) => {
  const y = MIND_ROWS[trait.row];
  return trait.side === "left"
    ? `M${WIRE_L} ${y} C${WIRE_L + 21} ${y}, ${HUB_L - 19} ${HUB_MID}, ${HUB_L} ${HUB_MID}`
    : `M${WIRE_R} ${y} C${WIRE_R - 21} ${y}, ${HUB_R + 19} ${HUB_MID}, ${HUB_R} ${HUB_MID}`;
});

/**
 * "Give it your persona", ported from tech_trainer's `VoiceArt`: eight traits
 * feed one hub, and a pulse runs each wire inward on the source's own 2.25s
 * cycle, both columns firing their top row together so the two bundles read as
 * one arrival rather than eight. Now the lap's opening beat rather than the
 * whole card: it argues the persona, and the chat + film that follow it argue
 * what the persona is FOR.
 */
function MindMap() {
  return (
    <div className="cmp-mind">
      <svg
        className="cmp-mind-wires"
        viewBox="0 0 370 240"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        {MIND_WIRES.map((d) => (
          <path
            key={d}
            className="cmp-mind-track"
            d={d}
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {/* The pulses ride the same paths. */}
        {MIND_WIRES.map((d, i) => (
          <path
            key={`pulse-${d}`}
            className="cmp-mind-pulse l-mind-flow"
            d={d}
            pathLength={100}
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{
              animationDelay: `${(MIND_TRAITS[i].row * 0.18).toFixed(2)}s`,
            }}
          />
        ))}
      </svg>

      {MIND_TRAITS.map((trait) => (
        <span
          key={trait.label}
          className={`cmp-mind-trait cmp-mind-trait--${trait.side}`}
          style={{ top: MIND_ROWS[trait.row] - PILL_H / 2 }}
        >
          {trait.label}
        </span>
      ))}

      <span className="cmp-mind-hub">
        <LogoSymbol size={22} />
      </span>
    </div>
  );
}
