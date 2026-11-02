"use client";

import { Icon } from "../icons";
import { useInView } from "../useInView";

const SCENARIOS = ["Tough buyer", "Hesitant client", "Difficult team member"];
const SKILLS = [
  { label: "Price", on: true },
  { label: "Timing", on: true },
  { label: "Trust", on: false },
];

/**
 * Practise mode, as one scene: a persona plays the other side, the learner
 * answers, the twin debriefs and scores. Three beats on one CSS clock (see
 * `.p1-beat` in v1.css), held until the card is on screen so the sequence
 * starts when the reader arrives rather than from page load.
 */
export function PractiseArt() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={inView ? "p1 is-inview" : "p1"}
      role="img"
      aria-label="A practice scene. A tough-buyer persona says the price is twice the budget. The learner asks what it would need to deliver to sign this quarter. The twin debriefs and scores the conversation 78 percent."
    >
      <div className="p1-card">
        <div className="p1-bar">
          <span className="p1-bar-title">
            <Icon name="phone" />
            Role-play · Procurement
          </span>
          <span className="p1-live">Live</span>
        </div>

        <ul className="p1-scenarios">
          {SCENARIOS.map((name, i) => (
            <li key={name} className={i === 0 ? "is-on" : undefined}>
              {name}
            </li>
          ))}
        </ul>

        <div className="p1-thread">
          <div className="p1-msg p1-msg--persona p1-beat" style={{ ["--i" as string]: 0 }}>
            <span className="p1-who">Persona · Tough buyer</span>
            <p>Honestly, you are twice what we budgeted.</p>
          </div>
          <div className="p1-msg p1-msg--learner p1-beat" style={{ ["--i" as string]: 1 }}>
            <span className="p1-who">Learner</span>
            <p>What would it need to deliver for you to sign this quarter?</p>
          </div>
        </div>

        <div className="p1-debrief p1-beat" style={{ ["--i" as string]: 2 }}>
          <span className="p1-who">Your twin debriefs</span>
          <div className="p1-score">
            <b>78%</b>
            <span>objections handled</span>
          </div>
          <span className="p1-chips">
            {SKILLS.map((skill) => (
              <span
                key={skill.label}
                className={skill.on ? "p1-chip is-on" : "p1-chip"}
              >
                {skill.on ? <Icon name="check" /> : null}
                {skill.label}
              </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
