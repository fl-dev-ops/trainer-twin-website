import type { ReactNode } from "react";
import { Card, CardBody, CardTitle } from "@/components/Card";
import { Icon } from "./icons";
import { TwinTestIllustration } from "./TwinTestIllustration";

/** `bar: false` shows the figure on its own — a trait read at full confidence
    has nothing left to measure, and a full-width meter reads as a loading bar. */
const DNA_TRAITS = [
  { label: "Explains with examples", width: "100%", bar: false },
  { label: "Asks before answering", width: "100%", bar: false },
  { label: "Uses analogies", width: "85%", bar: true },
  { label: "Checks understanding", width: "88%", bar: true },
  { label: "Ends with application", width: "74%", bar: true },
] as const;

/** Three fit the panel above the fade; the rest read as bars in the plane behind. */
const DNA_SHOWN = 3;
const DNA_HIGHLIGHT = "Asks before answering";

/**
 * v3-only: three steps to build a twin (upload → DNA → test).
 * The live home still uses `BuildYourTwin` (knowledge + persona + DNA kit).
 */
export function BuildYourTwinV3() {
  return (
    <section
      id="training-dna"
      className="sec sec--sunken steps"
      aria-labelledby="build-h"
    >
      <div className="wrap">
        <div className="head">
          <span className="eyebrow">See your training DNA in action</span>
          <h2 id="build-h">Build your Twin in 3 simple steps</h2>
          <p>
            Turn your teaching style into an AI twin that can explain, hint and
            assess, just like you.
          </p>
        </div>

        <div className="steps-row">
          <StepCard
            title="Upload 3 teaching videos"
            copy="Share a few of your real sessions."
            stage={<UploadStage />}
            tip="2 of 3 uploaded"
            chip={
              <span className="steps-chip">
                <UploadIcon />
                Any topic, any style
              </span>
            }
          />
          <Arrow />
          <StepCard
            title="We analyse & extract your Teaching DNA"
            copy="Our AI studies your videos to understand how you teach."
            stage={<DnaStage />}
            tip={DNA_HIGHLIGHT}
          />
          <Arrow />
          <StepCard
            title="Test & see your Twin in action"
            copy="Chat, try a few examples, and experience your AI twin."
            frame={<TwinTestIllustration />}
          />
        </div>
      </div>
    </section>
  );
}

function StepCard({
  title,
  copy,
  stage,
  frame,
  tip,
  orbit,
  chip,
}: {
  title: string;
  copy: string;
  stage?: ReactNode;
  /** Full stage inner (planes + tip + orbit). Used by the shared twin demo. */
  frame?: ReactNode;
  /** The crisp callout. Sits outside the mask so it survives the fade. */
  tip?: string;
  /** The twin's avatar, orbited, in the corner of its own demo. */
  orbit?: boolean;
  chip?: ReactNode;
}) {
  return (
    <Card className="steps-card">
      <div className="steps-stage" aria-hidden="true">
        {frame ?? (
          <>
            <div className="steps-planes">{stage}</div>
            {tip ? (
              <span className="steps-tip">
                <Icon name="check" />
                {tip}
              </span>
            ) : null}
            {orbit ? (
              <span className="st-orb">
                <span className="st-orb-path" />
                <span className="st-orb-spin">
                  <span className="st-orb-dot" />
                </span>
                <span className="st-orb-face">
                  <Icon name="face" />
                </span>
              </span>
            ) : null}
          </>
        )}
      </div>
      <CardBody className="steps-body">
        <CardTitle>{title}</CardTitle>
        <p className="steps-copy">{copy}</p>
        {chip}
      </CardBody>
    </Card>
  );
}

function Arrow() {
  return (
    <span className="steps-arrow" aria-hidden="true">
      <Icon name="arrow" />
    </span>
  );
}

/** Two sessions in, the third still going up — the only orange in this stage. */
function UploadStage() {
  return (
    <>
      <div className="st-pane st-pane--back">
        <div className="st-bar">
          <Icon name="folder" />
          Your library
        </div>
      </div>

      <div className="st-pane st-pane--front">
        <div className="st-bar">
          <Icon name="cloud" />
          Upload sessions
        </div>
        <div className="st-body">
          <span className="st-row">
            <Icon name="video" />
            <span className="st-row-name">lesson-06.mp4</span>
            <span className="st-row-meta">24:10</span>
            <Icon name="check" className="st-done" />
          </span>
          <span className="st-row">
            <Icon name="video" />
            <span className="st-row-name">lesson-07.mp4</span>
            <span className="st-row-meta">18:42</span>
            <Icon name="check" className="st-done" />
          </span>
          <span className="st-row">
            <Icon name="video" />
            <span className="st-row-name">lesson-08.mp4</span>
            <span className="st-row-meta">64%</span>
          </span>
          <span className="st-meter st-meter--on">
            <span style={{ width: "64%" }} />
          </span>
        </div>
      </div>
    </>
  );
}

/** The traits that fit, read out; the rest as bars behind, with the helix. */
function DnaStage() {
  return (
    <>
      <div className="st-pane st-pane--back">
        <div className="st-bar">
          <Icon name="doc" />
          Transcript
        </div>
      </div>

      <div className="st-pane st-pane--front">
        <div className="st-bar">
          <Icon name="info" />
          Teaching DNA
        </div>
        <div className="st-body">
          {DNA_TRAITS.slice(0, DNA_SHOWN).map((t) => (
            <span
              key={t.label}
              className={
                t.label === DNA_HIGHLIGHT ? "st-trait st-trait--on" : "st-trait"
              }
            >
              <span className="st-trait-top">
                {t.label}
                <span className="st-trait-pct">{t.width}</span>
              </span>
              {t.bar ? (
                <span className="st-meter">
                  <span style={{ width: t.width }} />
                </span>
              ) : null}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}


function UploadIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 16 16"
      width="16"
      height="16"
    >
      <path
        d="M8 10.25V3.75M8 3.75 5.75 6M8 3.75 10.25 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.25 10.5v1.25A1.5 1.5 0 0 0 4.75 13.25h6.5a1.5 1.5 0 0 0 1.5-1.5V10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
