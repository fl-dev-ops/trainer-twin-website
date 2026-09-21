"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { ConfettiBurst } from "@/components/ui/motion-confetti";
import { MutedClip } from "@/components/landing2/MutedClip";
import { CardStroke } from "./CardStroke";
import { GlowCard } from "./GlowCard";
import { Icon } from "./icons";
import { useInView } from "./useInView";

/**
 * Explainer videos, v3 — the making-of panel.
 *
 * Its own file, and its own `"use client"`, for the same reason
 * `InteractiveTwinArt` has one: the beats no longer run on equal time, so the
 * clock cannot be a CSS keyframe with one delay per step. Upload alone holds
 * five of them — the form, a drag, a drop, a click, and the analysis that
 * follows — and only then does the rail move on. `ThreeWays` itself stays a
 * Server Component, so the two pages that render it without this illustration
 * ship no JavaScript for it.
 */

const STYLES_V3 = ["Hand-drawn", "Flat", "Whiteboard"];
const FORMATS_V3 = ["Explainer", "Promo"];

const MAKE_STEPS_V3 = ["Upload", "Script", "Style", "Format", "Publish"];

const ANALYZE_STEPS = [
  "Extracting key concepts",
  "Finding examples and stories",
  "Identifying your teaching style",
  "Structuring the lesson logically",
  "Detecting your Teaching DNA",
];

const PROMPT_TEXT = "Explain recursion with a call-stack diagram";

/** The excerpt, at the timecodes the beats land on. */
const SCRIPT_LINES: Array<[string, string]> = [
  ["00:00", "Hook — “ever traced a function calling itself?”"],
  ["00:24", "What recursion actually is"],
  ["01:05", "Worked example — factorial(4)"],
  ["02:10", "The base case, and the trap"],
];

const STORY_FRAMES = ["talk", "flow", "bars"] as const;

/** Where the finished video goes. */
const DESTINATIONS = [
  "YouTube",
  "LinkedIn",
  "Instagram",
  "LMS",
  "Website",
  "More",
] as const;

type Phase =
  | "form"
  | "drag"
  | "drop"
  | "type"
  | "click"
  | "analyzing"
  | "script"
  | "style"
  | "format"
  | "publish";

/**
 * The clock. `rail` is which segment is lit, and the first five entries all
 * hold it at 0: the tab does not advance while the upload is being performed
 * or the analysis is running, because both are still that step.
 *
 * `ms` for `format` and `publish` are also written into the stylesheet, which
 * runs the Generate press and the render's own reveal off `.is-active`. Move
 * one and the other has to move with it.
 */
const SEQUENCE: Array<{ phase: Phase; ms: number; rail: number }> = [
  { phase: "form", ms: 850, rail: 0 },
  { phase: "drag", ms: 520, rail: 0 },
  { phase: "drop", ms: 320, rail: 0 },
  { phase: "type", ms: 750, rail: 0 },
  { phase: "click", ms: 380, rail: 0 },
  { phase: "analyzing", ms: 2300, rail: 0 },
  { phase: "script", ms: 2100, rail: 1 },
  { phase: "style", ms: 1700, rail: 2 },
  { phase: "format", ms: 1800, rail: 3 },
  { phase: "publish", ms: 2800, rail: 4 },
];

/** Tabler's filled "click" mark — the trainer's own cursor, not part of the
    shared icon set since nothing else on the page needs one. Filled rather
    than stroked, so it takes `color` via `fill` instead of `stroke`. */
function CursorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 12a1 1 0 0 1 -1 1h-3a1 1 0 0 1 0 -2h3a1 1 0 0 1 1 1m6 -9v3a1 1 0 0 1 -2 0v-3a1 1 0 0 1 2 0m-6.693 1.893l2.2 2.2a1 1 0 0 1 -1.414 1.414l-2.2 -2.2a1 1 0 0 1 1.414 -1.414m12.8 0a1 1 0 0 1 0 1.414l-2.2 2.2a1 1 0 0 1 -1.414 -1.414l2.2 -2.2a1 1 0 0 1 1.414 0m-10.6 10.6a1 1 0 0 1 0 1.414l-2.2 2.2a1 1 0 1 1 -1.414 -1.414l2.2 -2.2a1 1 0 0 1 1.414 0m3.42 -4.49l.049 -.003l.098 .003l.097 .012l.097 .022l9.048 3.014c.845 .282 .928 1.445 .131 1.843l-3.702 1.851l-1.85 3.702c-.399 .797 -1.562 .714 -1.844 -.13l-3.003 -9.011l-.033 -.135l-.012 -.097v-.148l.012 -.097l.022 -.097l.03 -.094l.04 -.09l.05 -.084l.086 -.117l.067 -.07l.037 -.034l.076 -.06l.081 -.052l.087 -.043l.103 -.04l.135 -.033z" />
    </svg>
  );
}

/** The trainer's pointer, parked on whatever button it is about to press. */
function TrainerHand() {
  return (
    <span className="mk-hand mk-hand--auto" aria-hidden="true">
      <CursorIcon />
      <span className="mk-hand-tag">Trainer</span>
    </span>
  );
}

/* Where in a beat `tt-v3-mk-press` bottoms out — the frame the button is
   furthest down, which is the one the confetti should leave from. Keep in step
   with the keyframe in home.css. */
const PRESS_AT = 0.42;

export function LessonMakerV3() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [at, setAt] = useState(0);
  /* Bumped on each Publish press; the burst fires on the change, not on a
     click, because nobody clicks anything in here. */
  const [published, setPublished] = useState(0);

  useEffect(() => {
    /* Frozen on the first frame for anyone who asked for less motion — the
       upload form is a complete picture on its own, so there is nothing to
       cycle to. Same call `WantToTwin` makes. The clock also waits until this
       stage is on screen, so the making-of starts with the section, not the
       page. */
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setTimeout(() => {
      setAt((i) => (i + 1) % SEQUENCE.length);
    }, SEQUENCE[at].ms);
    return () => window.clearTimeout(id);
  }, [at, inView]);

  /* The pointer presses Publish partway through the last beat, so the burst is
     scheduled to that same moment rather than to the beat starting. */
  useEffect(() => {
    if (!inView) return;
    if (SEQUENCE[at].phase !== "publish") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setTimeout(
      () => setPublished((n) => n + 1),
      SEQUENCE[at].ms * PRESS_AT,
    );
    return () => window.clearTimeout(id);
  }, [at, inView]);

  const { phase, rail } = SEQUENCE[at];
  const pane = (i: number) => (i === rail ? "mk-pane is-active" : "mk-pane");
  /* Panes 1-4 run the pointer on their own beat: one keyframe, a duration per
     pane, so the press always lands at the same point of whatever that beat
     happens to be. Upload is not among them — its pointer has a drag to do
     first, and is driven by phase instead. */
  const beat = (i: number) =>
    ({
      ["--mk-beat" as string]: `${SEQUENCE.find((sq) => sq.rail === i)?.ms}ms`,
    }) as CSSProperties;

  return (
    <div
      ref={ref}
      className={inView ? "art-sq is-light is-inview" : "art-sq is-light"}
      role="img"
      aria-label="Five steps: drop your training material in or type a prompt, wait while it is analysed, read the script it wrote, pick a hand-drawn style, choose an explainer video and press generate, then check the render is in your voice and publish."
    >
      {/* Over the lit panel rather than inside it: `BorderGlow` owns both of
          its own pseudo-elements, and `.art-front` is `inset: 0` of this box,
          so a stroke at the same inset lands exactly on its edge. */}
      <CardStroke radius={20} />

      <GlowCard
        className="glow-mk art-front"
        background="#fff"
        surface="light"
        radius="20px"
      >
        <div className="mk mk--v3">
          {/* A segmented control. The thumb is one segment wide and steps by
              whole multiples of its own width, so the rail needs the index and
              nothing else — no measurement, and no count baked into a
              keyframe. */}
          <div
            className="mk-rail"
            style={{ ["--mk-step" as string]: rail } as CSSProperties}
          >
            {MAKE_STEPS_V3.map((label, i) => (
              <span
                key={label}
                className={i === rail ? "mk-tab is-current" : "mk-tab"}
              >
                {label}
              </span>
            ))}
          </div>

          <div className="mk-stage mk-stage--v3">
            {/* 1 — upload. Two views under one tab: the form the material is
                dropped into, then the analysis that runs on it. Swapped rather
                than cross-faded, and remounted on `key` so the new one plays
                its own entrance. */}
            <div className={pane(0)}>
              {phase === "analyzing" ? (
                <div key="analyzing" className="mk-swap mk-analyzing">
                  <p className="mk-analyzing-title">Analyzing your content…</p>
                  <ul className="mk-analyzing-list">
                    {ANALYZE_STEPS.map((label, i) => (
                      <li key={label} style={{ ["--i" as string]: i } as CSSProperties}>
                        <span className="mk-analyzing-tick">
                          <Icon name="check" />
                        </span>
                        {label}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div key="form" className="mk-swap mk-upload">
                  <p className="mk-upload-title">
                    Generate video with your
                    <br />
                    training materials or prompt
                  </p>
                  {/* Upload first, prompt second: the material is what the
                      pointer actually does something with, so it leads. */}
                  <span
                    className={
                      phase === "drop" || phase === "type" || phase === "click"
                        ? "mk-drop has-file"
                        : "mk-drop"
                    }
                  >
                    <span className="mk-drop-files">
                      <Icon name="doc" />
                      <Icon name="video" />
                      <Icon name="folder" />
                    </span>
                  </span>
                  <span className="mk-prompt">
                    {phase === "type" || phase === "click" ? (
                      <span key="typed" className="mk-prompt-typed">
                        {PROMPT_TEXT}
                        <span className="mk-caret" />
                      </span>
                    ) : (
                      <span className="mk-prompt-placeholder">
                        Type your prompt
                      </span>
                    )}
                  </span>
                  <span className="mk-act">
                    <span
                      className={
                        phase === "click" ? "mk-btn is-pressed" : "mk-btn"
                      }
                    >
                      Next
                    </span>
                  </span>
                  {/* The trainer's own pointer. Position is a class, not a
                      keyframe, so the same element eases between the three
                      stops instead of restarting a timeline at each one. */}
                  <span
                    className={`mk-hand mk-hand--${phase}`}
                    aria-hidden="true"
                  >
                    <CursorIcon />
                    <span className="mk-hand-tag">Trainer</span>
                  </span>
                </div>
              )}
            </div>

            {/* 2 — the script it wrote, and the frames it drew for it. Two
                columns, because the pair IS the output: a script nobody can
                picture and a storyboard nobody can read are each half. */}
            <div className={`${pane(1)} mk-pane--auto`} style={beat(1)}>
              <span className="mk-story">
                <span className="mk-story-col">
                  <span className="mk-story-head">Script</span>
                  <span className="mk-story-lines">
                    {SCRIPT_LINES.map(([at, beat], i) => (
                      <span
                        key={at}
                        className="mk-story-line"
                        style={{ ["--i" as string]: i } as CSSProperties}
                      >
                        <b>{at}</b>
                        {beat}
                      </span>
                    ))}
                  </span>
                </span>

                <span className="mk-story-col">
                  <span className="mk-story-head">Storyboard</span>
                  <span className="mk-story-frames">
                    {STORY_FRAMES.map((frame, i) => (
                      <span
                        key={frame}
                        className={`mk-frame mk-frame--${frame}`}
                        style={{ ["--i" as string]: i } as CSSProperties}
                      >
                        <StoryFrame kind={frame} />
                      </span>
                    ))}
                  </span>
                </span>
              </span>
              <span className="mk-act">
                <span className="mk-btn">
                  Next
                  <TrainerHand />
                </span>
              </span>
            </div>

            {/* 3 — a style chosen. */}
            <div className={`${pane(2)} mk-pane--auto`} style={beat(2)}>
              <span className="mk-label">Style</span>
              <span className="mk-tiles">
                {STYLES_V3.map((name, i) => (
                  <span
                    key={name}
                    className={`mk-tile${i === 0 ? " is-on" : ""}`}
                  >
                    {i === 0 ? <TileCheck /> : null}
                    <StyleMark kind={name} />
                    <span className="mk-tile-name">{name}</span>
                  </span>
                ))}
              </span>
              <span className="mk-hint">Drawn the way you sketch on a board.</span>
              <span className="mk-act">
                <span className="mk-btn">
                  Next
                  <TrainerHand />
                </span>
              </span>
            </div>

            {/* 4 — a format chosen, then Generate pressed. */}
            <div className={`${pane(3)} mk-pane--auto`} style={beat(3)}>
              <span className="mk-label">Format</span>
              <span className="mk-tiles">
                {FORMATS_V3.map((name, i) => (
                  <span
                    key={name}
                    className={`mk-tile${i === 0 ? " is-on" : ""}`}
                  >
                    {i === 0 ? <TileCheck /> : null}
                    <FormatMark kind={name} />
                    <span className="mk-tile-name">{name}</span>
                  </span>
                ))}
              </span>
              <span className="mk-act">
                <span className="mk-btn">
                  Generate
                  <TrainerHand />
                </span>
              </span>
            </div>

            {/* 5 — the result, checked, and where it goes. */}
            <div className={`${pane(4)} mk-pane--auto`} style={beat(4)}>
              <CoursePreview />
              <span className="mk-dests">
                {DESTINATIONS.map((name, i) => (
                  <span
                    key={name}
                    className="mk-dest"
                    style={{ ["--i" as string]: i } as CSSProperties}
                  >
                    {i === 0 ? <TileCheck className="mk-dest-check" /> : null}
                    <DestMark kind={name} />
                    {name}
                  </span>
                ))}
              </span>
              <span className="mk-act">
                <span className="mk-ok">
                  <Icon name="check" />
                  In your voice
                </span>
                {/* The one orange button in the sequence: `--go` is the
                    emphasis modifier, and publishing is the step worth
                    emphasising. */}
                <span className="mk-btn mk-btn--go">
                  Publish
                  <TrainerHand />
                  <ConfettiBurst
                    className="mk-confetti"
                    fireKey={published}
                    particleCount={45}
                    startVelocity={18}
                    spread={110}
                    duration={2.2}
                    size={0.62}
                  />
                </span>
              </span>
            </div>
          </div>
        </div>
      </GlowCard>

      <span className="art-tip">
        <Icon name="check" />
        Never on camera
      </span>
    </div>
  );
}

/**
 * The destination marks, all on one 24 grid and filled with `currentColor`.
 *
 * The three brand marks are the same paths the footer's social row already
 * carries, drawn monochrome here rather than in brand colour: logos at full
 * saturation in a 40px row would out-shout the render above them, and the
 * page's own palette is the one thing every other mark in this illustration
 * shares. The other three are generic by nature — a cap, a globe, an ellipsis
 * — and are drawn rather than borrowed.
 */
function DestMark({ kind }: { kind: (typeof DESTINATIONS)[number] }) {
  const paths: Record<(typeof DESTINATIONS)[number], string> = {
    YouTube:
      "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
    LinkedIn:
      "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    Instagram:
      "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.846-10.405a1.441 1.441 0 0 1-2.88 0 1.44 1.44 0 0 1 2.88 0z",
    LMS: "M12 3 1.5 8.5 12 14l8.5-4.45V15h1.5V8.5L12 3zM5.5 11.8v3.9c0 1.1 2.9 2.8 6.5 2.8s6.5-1.7 6.5-2.8v-3.9L12 15.2l-6.5-3.4z",
    Website:
      "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.9 6h-2.6a15.6 15.6 0 0 0-1.4-3.6A8 8 0 0 1 18.9 8zM12 4.1c.7 1 1.3 2.3 1.7 3.9h-3.4c.4-1.6 1-2.9 1.7-3.9zM4.3 14A8 8 0 0 1 4 12c0-.7.1-1.4.3-2h3a17.5 17.5 0 0 0 0 4h-3zm.8 2h2.6c.3 1.3.8 2.5 1.4 3.6A8 8 0 0 1 5.1 16zm2.6-8H5.1a8 8 0 0 1 4-3.6C8.5 5.5 8 6.7 7.7 8zM12 19.9c-.7-1-1.3-2.3-1.7-3.9h3.4c-.4 1.6-1 2.9-1.7 3.9zm2.1-5.9H9.9a15.6 15.6 0 0 1 0-4h4.2a15.6 15.6 0 0 1 0 4zm.8 5.6c.6-1.1 1.1-2.3 1.4-3.6h2.6a8 8 0 0 1-4 3.6zm1.7-5.6a17.5 17.5 0 0 0 0-4h3a8 8 0 0 1 0 4h-3z",
    More: "M6 10.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm6 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm6 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z",
  };

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={paths[kind]} />
    </svg>
  );
}

/**
 * The three storyboard cells. Drawn rather than photographed, and abstract on
 * purpose: they stand for "a piece to camera, a diagram, a chart", which is
 * what a storyboard cell is at this size — a shape you recognise, not a frame
 * you read.
 */
function StoryFrame({ kind }: { kind: (typeof STORY_FRAMES)[number] }) {
  if (kind === "talk") {
    return (
      <svg viewBox="0 0 64 36" fill="none" aria-hidden="true">
        <circle cx="44" cy="17" r="7" className="sb-fill" />
        <path d="M34 30c1.6-5 5.6-8 10-8s8.4 3 10 8" className="sb-fill" />
        <rect x="6" y="12" width="18" height="3" rx="1.5" className="sb-soft" />
        <rect x="6" y="19" width="12" height="3" rx="1.5" className="sb-soft" />
      </svg>
    );
  }
  if (kind === "flow") {
    return (
      <svg viewBox="0 0 64 36" fill="none" aria-hidden="true">
        <rect x="5" y="13" width="14" height="10" rx="3" className="sb-box" />
        <rect x="25" y="13" width="14" height="10" rx="3" className="sb-box" />
        <rect x="45" y="13" width="14" height="10" rx="3" className="sb-box" />
        <path d="M19 18h6M39 18h6" className="sb-line" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 36" fill="none" aria-hidden="true">
      <rect x="10" y="20" width="9" height="9" rx="2" className="sb-fill" />
      <rect x="24" y="14" width="9" height="15" rx="2" className="sb-fill" />
      <rect x="38" y="8" width="9" height="21" rx="2" className="sb-fill" />
    </svg>
  );
}

function CoursePreview() {
  return (
    <span className="mk-preview mk-preview--course">
      <span className="sd">
        <span className="sd-title">System design course</span>
        <span className="sd-canvas">
          <svg className="sd-flow" viewBox="0 0 400 168" aria-hidden="true">
            <path
              className="sd-edge"
              style={{ ["--n" as string]: 0 }}
              d="M62 78 H86"
            />
            <path
              className="sd-edge"
              style={{ ["--n" as string]: 1 }}
              d="M158 78 H178"
            />
            <path
              className="sd-edge"
              style={{ ["--n" as string]: 2 }}
              d="M242 62 C258 62 258 34 274 34"
            />
            <path
              className="sd-edge"
              style={{ ["--n" as string]: 3 }}
              d="M242 78 H274"
            />
            <path
              className="sd-edge"
              style={{ ["--n" as string]: 4 }}
              d="M242 94 C258 94 258 122 274 122"
            />
            <path
              className="sd-edge sd-edge--dash"
              style={{ ["--n" as string]: 5 }}
              d="M210 100 V116"
            />

            <g className="sd-node" style={{ ["--n" as string]: 0 }}>
              <rect x="8" y="60" width="54" height="36" rx="8" fill="#E7F6EA" stroke="#8FCB98" />
              <circle cx="22" cy="78" r="7" fill="none" stroke="#3E8F4A" strokeWidth="1.4" />
              <path d="M19 80.2c1.2-3 4.8-3 6 0" fill="none" stroke="#3E8F4A" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="22" cy="76.2" r="1.5" fill="#3E8F4A" />
              <text x="34" y="82" fill="#24582C">
                User
              </text>
            </g>

            <g className="sd-node" style={{ ["--n" as string]: 1 }}>
              <rect x="86" y="60" width="72" height="36" rx="8" fill="#fff" stroke="#D0D5DD" />
              <circle cx="102" cy="78" r="7" fill="none" stroke="#667085" strokeWidth="1.3" />
              <path
                d="M97 78h10M102 73c2 1.6 2 6.4 0 10M102 73c-2 1.6-2 6.4 0 10"
                fill="none"
                stroke="#667085"
                strokeWidth="1.1"
              />
              <text x="113" y="76" fill="#344054">
                Load
              </text>
              <text x="113" y="86" fill="#344054">
                Balancer
              </text>
            </g>

            <g className="sd-node sd-node--pulse" style={{ ["--n" as string]: 2 }}>
              <rect x="178" y="56" width="64" height="44" rx="10" fill="#EDE8FB" stroke="#9B8AD4" />
              <rect x="190" y="68" width="10" height="12" rx="1.5" fill="none" stroke="#6B5BB0" strokeWidth="1.2" />
              <rect x="203" y="68" width="10" height="12" rx="1.5" fill="none" stroke="#6B5BB0" strokeWidth="1.2" />
              <text x="188" y="90" fill="#4C3D86">
                Web Servers
              </text>
            </g>

            <g className="sd-node" style={{ ["--n" as string]: 3 }}>
              <rect x="274" y="16" width="88" height="36" rx="8" fill="#E7F1FB" stroke="#8BB0DC" />
              <rect x="286" y="26" width="12" height="16" rx="2" fill="none" stroke="#3D6FA8" strokeWidth="1.2" />
              <text x="304" y="32" fill="#1F4E7A">
                Cache
              </text>
              <text x="304" y="43" fill="#1F4E7A">
                (Redis)
              </text>
            </g>

            <g className="sd-node" style={{ ["--n" as string]: 4 }}>
              <rect x="274" y="60" width="96" height="36" rx="8" fill="#EEE8FC" stroke="#B09AD9" />
              <ellipse cx="292" cy="72" rx="7" ry="3" fill="none" stroke="#6B5BB0" strokeWidth="1.2" />
              <path
                d="M285 72v10c0 1.8 3.2 3 7 3s7-1.2 7-3V72"
                fill="none"
                stroke="#6B5BB0"
                strokeWidth="1.2"
              />
              <text x="306" y="74" fill="#4C3D86">
                Database
              </text>
              <text x="306" y="85" fill="#4C3D86">
                (MySQL)
              </text>
            </g>

            <g className="sd-node" style={{ ["--n" as string]: 5 }}>
              <rect x="274" y="104" width="88" height="36" rx="8" fill="#E6F7F3" stroke="#7EBFB3" />
              <rect x="286" y="114" width="12" height="10" rx="1.5" fill="none" stroke="#2F7A6E" strokeWidth="1.2" />
              <path d="M288 118h8M288 121h5" stroke="#2F7A6E" strokeWidth="1" />
              <text x="304" y="120" fill="#1F5C52">
                Storage
              </text>
              <text x="304" y="131" fill="#1F5C52">
                (S3)
              </text>
            </g>

            <g className="sd-node" style={{ ["--n" as string]: 6 }}>
              <rect x="178" y="116" width="72" height="36" rx="8" fill="#FFF4E5" stroke="#E2B36A" />
              <path
                d="M190 138v-10l3 3 3-6 3 8 3-5v10"
                fill="none"
                stroke="#B7791F"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              <text x="208" y="132" fill="#8A5A12">
                Analytics
              </text>
              <text x="214" y="143" fill="#8A5A12">
                Service
              </text>
            </g>
          </svg>

          <span className="sd-talk">
            <span className="sd-wave" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </span>
            <span className="sd-avatar" aria-hidden="true">
              <MutedClip
                src="/home-v3/interactive-twin/trainers_twin_avatar.mp4"
                className="sd-avatar-video"
              />
            </span>
          </span>

          <span className="sd-bar">
            <span className="sd-clock">12:00</span>
            <span className="sd-prog">
              <span className="sd-prog-fill" />
            </span>
            <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
              <rect x="2" y="2" width="2.4" height="8" rx="0.6" fill="currentColor" />
              <rect x="7.6" y="2" width="2.4" height="8" rx="0.6" fill="currentColor" />
            </svg>
            <span className="sd-cc">CC</span>
            <span>2x</span>
          </span>
        </span>
      </span>
    </span>
  );
}

function TileCheck({ className }: { className?: string } = {}) {
  return (
    <span
      className={className ? `mk-tile-check ${className}` : "mk-tile-check"}
      aria-hidden="true"
    >
      <svg viewBox="0 0 12 12" width="10" height="10" fill="none">
        <path
          d="M2.5 6.2 5 8.6 9.5 3.4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/* Tabler's square-half, filled circles, and chalkboard-teacher — unchanged
   from the source, same reasoning as `FormatMark` just below: `.mk-tile-art`
   sizes the `<svg>` itself, so the 24-unit viewBox these ship on needs no
   translation to the 40-unit grid the rest of this file draws on. "Flat" is
   the one filled mark of the three, which is Tabler's own distinction
   (icons-tabler-filled vs -outline) and not a mistake to reconcile away. */
function StyleMark({ kind }: { kind: (typeof STYLES_V3)[number] }) {
  if (kind === "Flat") {
    return (
      <svg className="mk-tile-art" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.5 12a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
        <path d="M17.5 12a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
        <path d="M12 2a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
      </svg>
    );
  }
  if (kind === "Whiteboard") {
    return (
      <svg
        className="mk-tile-art"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M8 19h-3a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v11a1 1 0 0 1 -1 1" />
        <path d="M12 14a2 2 0 1 0 4.001 -.001a2 2 0 0 0 -4.001 .001" />
        <path d="M17 19a2 2 0 0 0 -2 -2h-2a2 2 0 0 0 -2 2" />
      </svg>
    );
  }
  return (
    <svg
      className="mk-tile-art"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 4v16" />
      <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14" />
      <path d="M12 13l7.5 -7.5" />
      <path d="M12 18l8 -8" />
      <path d="M15 20l5 -5" />
      <path d="M12 8l4 -4" />
    </svg>
  );
}

/* Tabler's device-mobile and brand-youtube marks, at Tabler's own 24-unit
   grid and 2px stroke — unchanged from the source rather than redrawn to the
   40-unit grid the rest of this file's icons use, since `.mk-tile-art` sizes
   the `<svg>` itself and does not care what viewBox is inside it. */
function FormatMark({ kind }: { kind: (typeof FORMATS_V3)[number] }) {
  if (kind === "Promo") {
    return (
      <svg
        className="mk-tile-art"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 5a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-14" />
        <path d="M11 4h2" />
        <path d="M12 17v.01" />
      </svg>
    );
  }
  return (
    <svg
      className="mk-tile-art"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8" />
      <path d="M10 9l5 3l-5 3l0 -6" />
    </svg>
  );
}
