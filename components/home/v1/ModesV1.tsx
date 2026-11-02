import { Aurora } from "@/components/Aurora";
import { InteractiveTwinArt } from "../InteractiveTwinArt";
import { Way } from "../ThreeWays";
import { PractiseArt } from "./PractiseArt";

const DOMAINS = ["Sales", "Communication", "Leadership"];

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
              <li key={domain}>{domain}</li>
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
            art={<InteractiveTwinArt />}
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
