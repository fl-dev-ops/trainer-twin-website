import { Fragment } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/Card";
import { LogoSymbol } from "@/components/Logo";
import { MutedClip } from "@/components/landing2/MutedClip";
import { CardStroke } from "./CardStroke";
import { TwinArt } from "./CompareTwinArt";
import { Icon, type IconName } from "./icons";

const TWIN_VIDEO_SRC = "/home-v3/interactive-twin/3d_video.mp4";

const COLUMNS = [
  {
    key: "chatbot",
    title: "Chatbot",
    tag: "Interactive only",
    icon: "chat",
    featured: false,
    rows: [
      { ok: true, label: "Uses your content" },
      { ok: true, label: "Answers questions" },
      { ok: false, label: "Generic teaching style" },
      { ok: false, label: "No video creation" },
      { ok: false, label: "No presence" },
    ],
  },
  {
    key: "avatar",
    title: "AI Avatar",
    tag: "Video only",
    icon: "video",
    featured: false,
    rows: [
      { ok: true, label: "Looks like you" },
      { ok: true, label: "Speaks in your voice" },
      { ok: false, label: "No teaching style" },
      { ok: false, label: "Limited to videos" },
      { ok: false, label: "No interactive Q&A" },
      { ok: false, label: "No deep knowledge" },
    ],
  },
  {
    key: "twin",
    title: "Trainer Twin",
    tag: "Videos + Interactive",
    icon: "face",
    featured: true,
    rows: [
      { ok: true, label: "Your knowledge / content" },
      { ok: true, label: "Your teaching DNA (style)" },
      { ok: true, label: "Your presence (voice, video)" },
      { ok: true, label: "Creates videos" },
      { ok: true, label: "Interactive experiences" },
      { ok: true, label: "Feels like you" },
    ],
  },
] as const satisfies ReadonlyArray<{
  key: string;
  title: string;
  tag: string;
  icon: IconName;
  featured: boolean;
  rows: ReadonlyArray<{ ok: boolean; label: string }>;
}>;

/**
 * v3-only: Chatbot vs AI Avatar vs Trainer Twin, above Who uses it.
 */
export function CompareTwin() {
  return (
    <section
      className="sec sec--line tt-night cmp"
      id="compare"
      aria-labelledby="compare-h"
    >
      <div className="wrap">
        <div className="head" data-reveal>
          <span className="eyebrow">More than content or an avatar</span>
          <h2 id="compare-h">Same content. Different experience.</h2>
          <p>
            Anyone can replicate your content. An avatar can look and sound like
            you. A chatbot can answer questions from your material. But neither
            can <strong>teach like YOU.</strong>
          </p>
        </div>

        <div className="cmp-grid" data-reveal data-reveal-delay="100">
          {COLUMNS.map((col, index) => (
            <Fragment key={col.key}>
              {/* Sits between AI Avatar and Trainer Twin — the actual
                  comparison the section is making, not a fourth column. */}
              {index === 2 ? (
                <span className="cmp-vs" aria-hidden="true">
                  Vs
                </span>
              ) : null}
              <Card
                variant={col.featured ? "raised" : "default"}
                className={
                  col.featured ? "cmp-card cmp-card--twin" : "cmp-card"
                }
              >
                {/* Not on the featured column — that one already wears its own
                    animated ring, and two edges on one card is one too many. */}
                {col.featured ? null : <CardStroke radius={20} />}
                <div className="cmp-art" aria-hidden="true">
                  <CompareArt columnKey={col.key} />
                </div>

                <CardHeader>
                  <div className="cmp-card-head">
                    <div className="cmp-card-name">
                      <span className="cmp-card-icon">
                        {col.key === "twin" ? (
                          <LogoSymbol size={16} />
                        ) : (
                          <Icon name={col.icon} />
                        )}
                      </span>
                      <CardTitle>{col.title}</CardTitle>
                    </div>
                    <span className="cmp-tag">{col.tag}</span>
                  </div>
                </CardHeader>
                <CardBody>
                  <ul className="can">
                    {col.rows.map((row) => (
                      <li
                        key={row.label}
                        className={row.ok ? undefined : "is-miss"}
                      >
                        <Icon name={row.ok ? "check" : "x"} />
                        {row.label}
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

const ASK = "Why is my API slow?";

/**
 * A layered "context screenshot" per column, so the comparison is felt before
 * it's read — and so each illustration argues its own row of the list rather
 * than decorating it. Chatbot answers out of a generic corpus with nothing to
 * cite; AI Avatar plays a video under an ask box that cannot be typed into;
 * Trainer Twin answers in the trainer's own words and cites the lesson it came
 * from, with a video sitting behind it because it does both.
 *
 * Three planes each — ground, a dimmed panel behind, a lit panel in front,
 * cropped by the card's edge. The back panel is chrome only (title bar), so
 * it reads as a window behind without inventing fake document content (D23).
 */
function CompareArt({ columnKey }: { columnKey: (typeof COLUMNS)[number]["key"] }) {
  if (columnKey === "avatar") {
    return (
      <div className="cmp-planes">
        <div className="cmp-pane cmp-pane--back">
          <div className="cmp-pane-bar">
            <Icon name="folder" />
            Renders
          </div>
        </div>

        <div className="cmp-pane cmp-pane--front">
          <div className="cmp-pane-bar">
            <Icon name="video" />
            Lesson 6
          </div>
          <div className="cmp-pane-body">
            <div className="cmp-vid">
              <MutedClip src={TWIN_VIDEO_SRC} className="cmp-vid-clip" />
              <span className="cmp-vid-time">02:14</span>
            </div>
            <span className="cmp-ask">
              <Icon name="chat" />
              Ask a question
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (columnKey === "twin") {
    return <TwinArt />;
  }

  return (
    <div className="cmp-planes">
      <div className="cmp-pane cmp-pane--back">
        <div className="cmp-pane-bar">
          <Icon name="doc" />
          Uploaded material
        </div>
      </div>

      <div className="cmp-pane cmp-pane--front">
        <div className="cmp-pane-bar">
          <Icon name="chat" />
          Assistant
        </div>
        <div className="cmp-pane-body">
          <p className="bubble bubble--me">{ASK}</p>
          <p className="bubble bubble--twin">
            Common causes are slow queries, N+1 calls and missing indexes.
          </p>
        </div>
      </div>
    </div>
  );
}

