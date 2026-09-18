"use client";

import { SiriOrb } from "@/components/SiriOrb";
import { DitherCube } from "./DitherCube";
import { Icon, type IconName } from "./icons";
import "@/app/TrainerTwin_home_2/landing.css";

/**
 * knowledge + persona + DNA = your twin.
 *
 * Written as an equation because that is what the section says in words: you add
 * two things, we work out the third. The `+` and `=` are decorative — the three
 * cards carry it in text.
 */
export function BuildYourTwin() {
  return (
    <section className="sec sec--sunken" id="build" aria-labelledby="build-h">
      <div className="wrap">
        <div className="head">
          <span className="eyebrow">What you give your twin</span>
          <h2 id="build-h">Build your twin</h2>
          <p>You add two things. We work out the third.</p>
        </div>

        <div className="kit">
          <article className="kit-card">
            <div className="kit-art">
              <KnowledgeArt />
            </div>
            <div className="kit-body">
              <span className="kit-tag">You add</span>
              <h3>Your knowledge</h3>
              <p>
                Class notes, recorded sessions, and docs from Notion or Google
                Drive.
              </p>
            </div>
          </article>

          <span className="op" aria-hidden="true">
            +
          </span>

          <article className="kit-card">
            <div className="kit-art">
              <PersonaArt />
            </div>
            <div className="kit-body">
              <span className="kit-tag">You add</span>
              <h3>Your persona</h3>
              <p>
                A few minutes of your voice: your pace, your tone, your pauses.
              </p>
            </div>
          </article>

          <span className="op" aria-hidden="true">
            =
          </span>

          <article className="kit-card kit-card--us">
            <div className="kit-art">
              <DnaArt />
            </div>
            <div className="kit-body">
              <span className="kit-tag">We extract</span>
              <h3>Your DNA</h3>
              <p>
                Your teaching and coaching style, and the patterns in how you
                explain, hint and assess.
              </p>
            </div>
          </article>

          <span className="op" aria-hidden="true">
            =
          </span>

          <div className="kit-result">
            {/* The hero's cube, split into eight — what the three cards add up
                to, drawn the same way the thing they feed is drawn. It takes
                its ink from CSS, so the same component that renders white on
                the hero's night panel renders dark here. */}
            <DitherCube size={104} parts={2} />
            <h3>Your twin</h3>
            <span className="disclosure">
              AI twin of <b>you</b>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * The sources feeding into one node — the shape TrainerTwin_home draws for
 * "Give it your knowledge", rebuilt at the size this card actually is.
 *
 * Not that component reused: its stage carries a 440px floor and its labels are
 * sized against a 599px panel, so dropping it into a 200px card slot would put
 * its type under 7px. Same idea, drawn for the space.
 */
const SOURCES: Array<{
  icon: "doc" | "video" | "folder" | "cloud";
  x: number;
}> = [
  { icon: "doc", x: 26 },
  { icon: "video", x: 76 },
  { icon: "folder", x: 126 },
  { icon: "cloud", x: 176 },
];

export function KnowledgeArt() {
  return (
    <div className="kn" aria-hidden="true">
      <div className="kn-row">
        {SOURCES.map((s, i) => (
          <span
            key={s.icon}
            className="kn-src"
            style={{ ["--i" as string]: i }}
          >
            <Icon name={s.icon} />
          </span>
        ))}
      </div>

      {/* The trunk each source drops into, and the one that carries on down. */}
      <svg className="kn-wires" viewBox="0 0 200 34" fill="none">
        {SOURCES.map((s, i) => (
          <path
            key={s.icon}
            d={`M${s.x} 0 L${s.x} 12 Q${s.x} 20 ${s.x < 100 ? s.x + 8 : s.x - 8} 20 L100 20`}
            stroke="var(--tt-border-field)"
            strokeWidth="1"
            style={{ ["--i" as string]: i }}
            className="kn-wire"
          />
        ))}
        <path
          d="M100 20 L100 34"
          stroke="var(--tt-border-field)"
          strokeWidth="1"
        />
      </svg>

      <span className="kn-node">Knowledge</span>
    </div>
  );
}

/**
 * The facets converging on the twin — the mind map TrainerTwin_home draws for
 * "Give it your persona", rebuilt for a 148px card.
 *
 * Not that component reused, for the same reason as the knowledge card: it is
 * laid out against a 599px stage and carries eight pills, which at this width
 * would set "Personalisation" at about 6px. Six of the short ones, at a size
 * that can actually be read.
 *
 * The orb IS the real one — `SiriOrb`, the same component the original uses —
 * so the centre of the drawing is shared rather than imitated. Its rules live
 * in the landing stylesheet imported above.
 */
const FACETS: Array<{ label: string; icon: IconName; side: "l" | "r" }> = [
  { label: "Coaching", icon: "chat", side: "l" },
  { label: "Evaluation", icon: "doc", side: "l" },
  { label: "Questioning", icon: "info", side: "l" },
  { label: "Voice", icon: "mic", side: "r" },
  { label: "Tone", icon: "play", side: "r" },
  { label: "Pacing", icon: "video", side: "r" },
];

/** Where each row sits, and where the wires meet in the middle.

    CHIP_W is shared with the CSS on purpose: the chips are anchored to the
    outer edges and the wires start at their inner ones, so a chip that sized
    to its own label would leave a gap on every row but the longest. One fixed
    width means both ends of every wire are known. */
const ROW_Y = [40, 74, 108];
const HUB = { x: 120, y: 74 };
const BOX_W = 240;
const CHIP_W = 84;

export function PersonaArt() {
  return (
    <div className="pn" aria-hidden="true">
      <svg className="pn-wires" viewBox="0 0 240 148" fill="none">
        {FACETS.map((f, n) => {
          const i = n % 3;
          const y = ROW_Y[i];
          const startX = f.side === "l" ? CHIP_W : BOX_W - CHIP_W;
          const endX = f.side === "l" ? HUB.x - 20 : HUB.x + 20;
          const bend = f.side === "l" ? 12 : -12;
          const d = `M${startX} ${y} C${startX + bend} ${y} ${endX - bend} ${HUB.y} ${endX} ${HUB.y}`;
          return (
            <g key={f.label}>
              <path d={d} stroke="var(--tt-border-field)" strokeWidth="1" />
              {/* The same blue pulse the original runs down its connectors. */}
              <path
                d={d}
                pathLength={100}
                stroke="var(--tt-blue-500)"
                strokeWidth="1.6"
                strokeLinecap="round"
                className="pn-pulse"
                style={{ ["--i" as string]: n }}
              />
            </g>
          );
        })}
      </svg>

      {FACETS.map((f, n) => (
        <span
          key={f.label}
          className={`pn-chip pn-chip--${f.side}`}
          style={{ ["--y" as string]: `${ROW_Y[n % 3]}px` }}
        >
          <Icon name={f.icon} />
          {f.label}
        </span>
      ))}

      <span className="pn-hub">
        <SiriOrb size="34px" animationDuration={12} blur="3px" />
        <span className="pn-pct" />
      </span>
    </div>
  );
}

/**
 * What gets extracted, fanning out of one node — the third card in the family,
 * and deliberately the inverse of the first: knowledge converges many sources
 * into one, DNA opens one style out into the patterns inside it.
 *
 * Its pulses run orange rather than blue. This is the card that says "we
 * extract", and orange is the platform acting (D03) — the other two are things
 * you hand over.
 */
const TRAITS: Array<{ label: string; icon: IconName; x: number }> = [
  { label: "Explain", icon: "chat", x: 37 },
  { label: "Hint", icon: "info", x: 120 },
  { label: "Assess", icon: "check", x: 203 },
];

export function DnaArt() {
  return (
    <div className="dn" aria-hidden="true">
      <span className="kn-node">Teaching style</span>

      <svg className="dn-wires" viewBox="0 0 240 46" fill="none">
        {TRAITS.map((t, i) => {
          const d = `M120 0 C120 20 ${t.x} 24 ${t.x} 46`;
          return (
            <g key={t.label}>
              <path d={d} stroke="var(--tt-border-field)" strokeWidth="1" />
              <path
                d={d}
                pathLength={100}
                stroke="var(--tt-primary)"
                strokeWidth="1.6"
                strokeLinecap="round"
                className="dn-pulse"
                style={{ ["--i" as string]: i }}
              />
            </g>
          );
        })}
      </svg>

      <div className="dn-row">
        {TRAITS.map((t) => (
          <span key={t.label} className="dn-chip">
            <Icon name={t.icon} />
            {t.label}
          </span>
        ))}
      </div>
    </div>
  );
}
