"use client";

import { useEffect, useState, type ComponentType } from "react";
import { DnaArt, PersonaArt } from "./BuildYourTwin";
import { CardStroke } from "./CardStroke";
import { Icon } from "./icons";

const SOURCES: Array<{
  icon: "doc" | "video" | "folder" | "cloud";
  x: number;
}> = [
  { icon: "doc", x: 26 },
  { icon: "video", x: 76 },
  { icon: "folder", x: 126 },
  { icon: "cloud", x: 176 },
];

/**
 * v3-only knowledge drawing. Same icons → Knowledge layout as `KnowledgeArt`,
 * but connectors match DNA: solid grey paths + orange `dn-pulse` traces.
 * The light Build-your-twin card keeps the dashed `kn-wire` treatment.
 */
function KnowledgeArtV3() {
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

      <svg className="kn-wires" viewBox="0 0 200 34" fill="none">
        {SOURCES.map((s, i) => {
          const join = s.x < 100 ? s.x + 8 : s.x - 8;
          const d = `M${s.x} 0 L${s.x} 12 Q${s.x} 20 ${join} 20 L100 20 L100 34`;
          return (
            <g key={s.icon}>
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

      <span className="kn-node">Knowledge</span>
    </div>
  );
}

const PILLS: Array<{
  title: string;
  body: string;
  Art: ComponentType;
}> = [
  {
    title: "Your Intelligence",
    body: "Notes, recorded sessions, voice recording, docs from any channels.",
    Art: KnowledgeArtV3,
  },
  {
    title: "Your Presence",
    body: "A few minutes of your voice: pace, tone and pauses.",
    Art: PersonaArt,
  },
  {
    title: "Your Training DNA",
    body: "We extract your patterns — how you explain, hint and assess.",
    Art: DnaArt,
  },
];

/** Dwell while expanded — matches the knowledge / persona illustration cycle. */
const HOLD_MS = 5200;

export function HeroV3Pills() {
  const [open, setOpen] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setOpen((i) => (i + 1) % PILLS.length);
    }, HOLD_MS);

    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="hero-v3-pills-block">
      <div className="hero-v3-pills">
        {PILLS.map((pill, i) => {
          const expanded = i === open;
          const Art = pill.Art;
          return (
            <div key={pill.title} className="hero-v3-pill-wrap">
              <article
                className={
                  expanded ? "hero-v3-pill is-open" : "hero-v3-pill"
                }
              >
                <CardStroke />
                <div className="hero-v3-pill-art">
                  <div className="hero-v3-pill-art-inner">
                    <div className="hero-v3-pill-slot">
                      {expanded ? <Art key={open} /> : null}
                    </div>
                  </div>
                </div>
                <h2>{pill.title}</h2>
                <p>{pill.body}</p>
              </article>
            </div>
          );
        })}
      </div>
    </div>
  );
}
