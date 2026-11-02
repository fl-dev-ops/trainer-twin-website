import { Aurora } from "@/components/Aurora";
import { Icon } from "../icons";
import { InteractiveTwinArt } from "../InteractiveTwinArt";
import { Way } from "../ThreeWays";
import { PractiseArt } from "./PractiseArt";

/** Drawn on the same 16 grid and stroke as the shared glyph set. Communication
    borrows that set's chat bubble; the other two are not in it. */
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const DOMAINS: Array<{ label: string; icon: React.ReactNode }> = [
  {
    label: "Sales",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16">
        <path d="M2 11.5 6 7.5l2.5 2.5L14 4.5M10.5 4.5H14V8" {...stroke} />
      </svg>
    ),
  },
  { label: "Communication", icon: <Icon name="chat" /> },
  {
    label: "Leadership",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16">
        <path d="M4 14V2.5M4 3h8l-1.8 3L12 9H4" {...stroke} />
      </svg>
    ),
  },
];

/**
 * /V1's "One twin. Two modes. Three domains." — the two modes laid out the way
 * ThreeWays lays out its two ways (same `Way` rows, same section ground), under
 * a heading that names the three domains they run in.
 */
export function ModesV1() {
  return (
    <section className="sec sec--aurora" id="modes" aria-labelledby="modes-h">
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
          <span className="eyebrow">Ask &amp; Practise</span>
          <h2 id="modes-h">
            One twin. Two modes.
            <br />
            Three domains.
          </h2>
          <ul className="v1-domains" aria-label="Domains">
            {DOMAINS.map((domain) => (
              <li key={domain.label}>
                {domain.icon}
                {domain.label}
              </li>
            ))}
          </ul>
          <p>For coaches, trainers and influencers who teach these skills.</p>
        </div>

        <div className="ways">
          <Way
            id="ask"
            tone="orchid"
            v3
            kicker="Ask"
            title="Your twin answers as you."
            body="Learners ask about your topics, books and courses. Your twin answers, explains and coaches the way you would."
            points={["Topic Q&A", "Book Q&A", "Course Q&A"]}
            art={
              <div className="ask-box">
                <InteractiveTwinArt pillsAbove />
              </div>
            }
          />
          <Way
            id="practise"
            reversed
            tone="orchid"
            v3
            kicker="Practise"
            title="Personas play the other side. Your twin debriefs."
            body="AI personas play the part of a tough buyer, a hesitant client or a difficult team member. Use pre-built scenarios or create your own."
            points={[
              "Persona plays the other side",
              "Learner practises",
              "Your twin debriefs and scores",
            ]}
            art={<PractiseArt />}
          />
        </div>
      </div>
    </section>
  );
}
