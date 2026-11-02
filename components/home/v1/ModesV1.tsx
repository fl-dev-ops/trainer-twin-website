import { Aurora } from "@/components/Aurora";
import { Icon } from "../icons";
import { CtaLink } from "../CtaLink";

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

/** Larger glyphs for the two mode cards, on a 24 grid (the small set is 16). */
const glyph = { ...stroke, viewBox: "0 0 24 24", width: 18, height: 18 };

const AskIcon = () => (
  <svg aria-hidden="true" {...glyph}>
    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H11l-4.5 4v-4h0A2.5 2.5 0 0 1 4 13.5Z" />
    <path d="M10 8.6a2 2 0 1 1 3 1.7c-.7.4-1 .8-1 1.5M12 13.7v.01" />
  </svg>
);

const PractiseIcon = () => (
  <svg aria-hidden="true" {...glyph}>
    <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H13a2.5 2.5 0 0 1 2.5 2.5v3A2.5 2.5 0 0 1 13 12H9l-3 2.5V12A2.5 2.5 0 0 1 4 9.5Z" />
    <path d="M18 9.5A2.5 2.5 0 0 1 20.5 12v3a2.5 2.5 0 0 1-2.5 2.5v2.5L15 17.5h-3.5a2.5 2.5 0 0 1-2-1" />
  </svg>
);

const MODES = [
  {
    id: "ask",
    icon: <AskIcon />,
    kicker: "Ask",
    title: "Your twin answers as you.",
    body: "Learners ask about your topics, books and courses. Your twin answers, explains and coaches the way you would.",
    points: ["Topic Q&A", "Book Q&A", "Course Q&A"],
  },
  {
    id: "practise",
    icon: <PractiseIcon />,
    kicker: "Practise",
    title: "Personas play the other side. Your twin debriefs.",
    body: "AI personas play the part of a tough buyer, a hesitant client or a difficult team member. Use pre-built scenarios or create your own.",
    points: [
      "Persona plays the other side",
      "Learner practises",
      "Your twin debriefs and scores",
    ],
  },
];

/**
 * /V1's "One twin. Two modes. Three domains." — the two modes as two white
 * cards side by side, under a heading that names the three domains they run in.
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

        <div className="v1-modes" data-reveal data-reveal-delay="100">
          {MODES.map((mode) => (
            <article key={mode.id} id={mode.id} className="v1-mode">
              <span className="kicker v1-mode-kicker">
                {mode.icon}
                {mode.kicker}
              </span>
              <h3>{mode.title}</h3>
              <p>{mode.body}</p>
              <ul className="can">
                {mode.points.map((point) => (
                  <li key={point}>
                    <Icon name="check" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="v1-mode-cta">
                <CtaLink size="md" href="#early-access" className="hdr-cta">
                  Request a demo
                </CtaLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
