import type { ReactNode } from "react";
import { Aurora } from "@/components/Aurora";
import { CtaLink } from "./CtaLink";
import { GlowCard } from "./GlowCard";
import { Icon } from "./icons";
import { InteractiveTwinArt } from "./InteractiveTwinArt";
import { LessonMakerV3 } from "./LessonMakerV3";

/**
 * The two things a twin is, one row each.
 *
 * Laid out the way TrainerTwin_home draws "What you give your twin": each row
 * is a pair of panels meeting on a hard edge — the copy on a pale blueprint
 * lattice, the illustration on a four-point mesh gradient — and the pairing
 * alternates side down the page. Every row carries the same dark CTA, as it
 * does there.
 *
 * Interactive twin (v3) is its own speaking-portrait composition.
 * Explainer videos keep the making-of clip.
 */
export function ThreeWays({
  explainer,
  interactive: interactiveCopy,
  explainerFirst = false,
  art = "default",
}: {
  explainer?: {
    title: string;
    body: string;
    points: string[];
  };
  interactive?: {
    title: string;
    body: string;
    points: string[];
  };
  /** v3: Explainer videos above Interactive twin. */
  explainerFirst?: boolean;
  /**
   * Which illustrations to draw. `v3` is the square, layered pair on the
   * four-beat clock; `default` is the original three-beat pair. This is a
   * prop rather than a swap because `/TrainerTwin_home` and `_v1` render this
   * same component against their OWN stylesheets, which still carry the
   * three-beat rules — new markup there would animate against the wrong CSS.
   */
  art?: "default" | "v3";
} = {}) {
  const v3 = art === "v3";

  const interactive = (
          <Way
            id="interactive-twin"
            tone="orchid"
            v3={v3}
            kicker="Interactive twin"
            title={
              interactiveCopy?.title ??
              "A version of you your students can reach anytime"
            }
            body={
              interactiveCopy?.body ??
              "It looks like you, sounds like you and teaches the way you do. With it, you can offer your students:"
            }
            points={
              interactiveCopy?.points ?? [
                "Learning from you",
                "Practice with you",
                "Doubt clearing, 24×7",
              ]
            }
            art={v3 ? <ChatArtV3 /> : <ChatArt />}
          />
  );

  const explainerWay = (
          <Way
            id="explainer-videos"
            reversed
            tone="orchid"
            v3={v3}
            kicker="Explainer videos"
            title={
              explainer?.title ??
              "Explainers for the lessons you repeat every batch"
            }
            body={
              explainer?.body ??
              "Short animated videos in your voice and your style, for the concepts you explain again and again. Students can rewatch them as often as they need."
            }
            points={explainer?.points}
            art={
              v3 ? (
                <LessonMakerV3 />
              ) : (
                <GlowCard
                  className="glow-mk"
                  background="var(--tt-night-panel)"
                  radius="var(--tt-radius-md)"
                >
                  <LessonArt />
                </GlowCard>
              )
            }
          />
  );

  return (
    <section className="sec sec--aurora" id="can-do" aria-labelledby="can-do-h">
      {/* The seam between the fold and the page proper: a slow wash across the
          top of this section, in three tokens rather than three hexes. Light
          enough to be noticed only on the way past. */}
      <Aurora
        className="sec-aurora"
        colorStops={["--tt-blue-300", "--tt-primary-subtle", "--tt-primary"]}
        blend={0.78}
        amplitude={0.65}
        speed={0.32}
        lightMode
      />
      <div className="wrap">
        <div className="head" data-reveal>
          <span className="eyebrow">What your twin can do</span>
          <h2 id="can-do-h">One twin, two ways to use it</h2>
          <p>
            Every one of them has your face, your voice and your style. Pick
            the ones your {v3 ? "learners" : "students"} need.
          </p>
        </div>

        <div className="ways">
          {explainerFirst ? (
            <>
              {explainerWay}
              {interactive}
            </>
          ) : (
            <>
              {interactive}
              {explainerWay}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function Way({
  id,
  kicker,
  title,
  body,
  points,
  art,
  tone,
  reversed = false,
  v3 = false,
}: {
  /** Anchor the nav menu points at, so a card there lands on the right row. */
  id: string;
  kicker: string;
  title: string;
  body: string;
  points?: string[];
  art: ReactNode;
  /** Which of the three meshes sits behind the illustration (see home.css). */
  tone: "moss" | "orchid" | "clay";
  reversed?: boolean;
  /**
   * `.hdr-cta` (the header's dark gradient pill) is only right for this row
   * on v3 — `.way-copy` is a light panel there. `/TrainerTwin_home` and `_v1`
   * define `.hdr-cta` too, against their own header, so adding the class
   * unconditionally here would have reskinned this CTA on both of them as
   * well. False keeps their plain `strong` button untouched.
   */
  v3?: boolean;
}) {
  return (
    <div id={id} className={`way${reversed ? " way--reversed" : ""}`} data-reveal>
      {/* Copy in normal flow, never scaled: text that shrinks with a transform
          stops being readable long before the layout runs out of room. */}
      <div className="way-copy">
        {/* The grid lines live on `.way-copy`'s own `::before` so their
            centre-fade mask never touches this content — a mask on the
            panel itself would fade the copy along with the lines. */}
        <div className="way-copy-inner">
          <span className="kicker">{kicker}</span>
          <h3>{title}</h3>
          <p>{body}</p>
          {points ? (
            <ul className="can">
              {points.map((item) => (
                <li key={item}>
                  <Icon name="check" />
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
          <CtaLink
            size="md"
            href="#early-access"
            className={v3 ? "hdr-cta way-cta" : "way-cta"}
          >
            {v3 ? "Request a demo" : "Request for early demo"}
            <Icon name="chevron" />
          </CtaLink>
        </div>
      </div>

      <div className={`way-art way-art--${tone}`}>{art}</div>
    </div>
  );
}

/* --------------------------------------------------------- illustrations */

const LEARNER_Q =
  "Your API slows down when more users log in. Where do you look first?";

/**
 * Two night chats: solid Trainer, dotted Trainer's twin. The sequence inside
 * each window is the making-of clock — three 3.2s panes on 9.6s, `mk-pane`
 * enter/exit — so this row and Explainer videos speak the same motion.
 */
function ChatArt() {
  return (
    <div
      className="twin-pair"
      role="img"
      aria-label="Two chats. Trainer types a reply to a learner’s slow-API question. Trainer's twin thinks, then types an answer from Lesson 6."
    >
      <GlowCard
        className="glow-chat"
        background="var(--tt-night-panel)"
        radius="var(--tt-radius-md)"
      >
        <ChatWindow
          kind="trainer"
          name="Trainer"
          question={LEARNER_Q}
          reply="The database — too many queries per request. Pull a slow-query log and prove it."
        />
      </GlowCard>
      <div className="twin-win twin-win--wire">
        <ChatWindow
          kind="twin"
          name="Trainer's twin"
          question={LEARNER_Q}
          reply="Good instinct, that’s the bottleneck. Now tell me how you’d prove it."
          source="From your notes, Lesson 6"
        />
      </div>
    </div>
  );
}

function ChatWindow({
  kind,
  name,
  question,
  reply,
  source,
}: {
  kind: "trainer" | "twin";
  name: string;
  question: string;
  reply: string;
  source?: string;
}) {
  return (
    <div className={`chat chat--${kind}`}>
      <div className="chat-top">
        <span className="chat-who">
          <Icon name="face" />
          {name}
        </span>
      </div>
      <div className="chat-body">
        <p className="bubble bubble--me">{question}</p>
        <div className="mk-stage chat-stage">
          {kind === "trainer" ? (
            <>
              <ChatStatus i={0}>typing…</ChatStatus>
              <ChatStatus i={1}>typing…</ChatStatus>
            </>
          ) : (
            <>
              <ChatStatus i={0}>thinking…</ChatStatus>
              <ChatStatus i={1}>typing…</ChatStatus>
            </>
          )}
          <div className="mk-pane chat-answer" style={step(2)}>
            <p className="bubble bubble--twin">{reply}</p>
            {source ? <span className="source">{source}</span> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatStatus({ i, children }: { i: number; children: string }) {
  return (
    <span className="mk-pane chat-status" style={step(i)} aria-hidden="true">
      {children}
      <span className="mk-caret" />
    </span>
  );
}

/**
 * Making one: prompt, style, publish.
 *
 * Three panes cross-fading on one clock — a single 9.6s cycle, each pane
 * delayed by a third of it — so the sequence is CSS and nothing here has to
 * hold state or run a timer. The rail above brightens in step with them on the
 * same cycle and the same delays, which is what keeps label and pane from ever
 * drifting apart: they are the same animation, twice.
 *
 * Real text throughout, like the cards in "Who it's for" — a bar can show that
 * a step exists, only words show what the step is.
 */
const MAKE_STEPS = ["Enter prompt", "Pick your style", "Verify and publish"];

const STYLES = ["Whiteboard", "Slides", "Talking head"];

function LessonArt() {
  return (
    <div
      className="mk"
      role="img"
      aria-label="Three steps: enter a prompt, pick a style and generate, then verify the video and publish"
    >
      <div className="mk-rail">
        {MAKE_STEPS.map((label, i) => (
          <span key={label} className="mk-tab" style={step(i)}>
            <span className="mk-num">{i + 1}</span>
            {label}
          </span>
        ))}
      </div>

      <div className="mk-stage">
        {/* 1 — the prompt, typed in. */}
        <div className="mk-pane" style={step(0)}>
          <span className="mk-label">Prompt</span>
          <span className="mk-field">
            <span className="mk-typed">
              Explain recursion with a call-stack diagram
            </span>
            <span className="mk-caret" />
          </span>
          <span className="mk-hint">
            Your notes from Lesson 6 are attached.
          </span>
        </div>

        {/* 2 — a style chosen, then Generate pressed. */}
        <div className="mk-pane" style={step(1)}>
          <span className="mk-label">Style</span>
          <span className="mk-chips">
            {STYLES.map((name, i) => (
              <span
                key={name}
                className={`mk-chip${i === 0 ? " is-on" : ""}`}
                style={step(i)}
              >
                {name}
              </span>
            ))}
          </span>
          <span className="mk-act">
            <span className="mk-btn mk-btn--go">Generate</span>
            <span className="mk-cursor" />
          </span>
        </div>

        {/* 3 — the result, checked and published. */}
        <div className="mk-pane" style={step(2)}>
          <span className="mk-label">Preview</span>
          <span className="mk-preview">
            <span className="mk-play" />
            <span className="mk-time">02:14</span>
            <span className="mk-scrub" />
          </span>
          <span className="mk-act">
            <span className="mk-ok">
              <Icon name="check" />
              In your voice
            </span>
            <span className="mk-btn">Publish</span>
          </span>
        </div>
      </div>
    </div>
  );
}


/** Which slice of the cycle an element belongs to. */
function step(i: number) {
  return { ["--i" as string]: i };
}

/* ------------------------------------------------------ v3 illustrations

   Square, and layered the way the comparison cards are: a dimmed plane
   behind, the lit one in front, one crisp callout. Both run the same
   four-beat clock, so the two rows still read as one piece of motion. */

/** Interactive twin, v3 — portrait, trait pills, sequenced coaching thread. */
function ChatArtV3() {
  return <InteractiveTwinArt />;
}
