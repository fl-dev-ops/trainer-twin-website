import { Card, CardBody, CardTitle } from "@/components/Card";
import { CardStroke } from "@/components/home/CardStroke";
import { CursorGrid } from "@/components/CursorGrid";
import { EarlyAccessSteps } from "@/components/home/EarlyAccessSteps";
import { PageFooter } from "@/components/home/PageFooter";
import { ShinyText } from "@/components/home/ShinyText";
import { SiteHeader } from "@/components/home/SiteHeader";
import { CtaLink } from "@/components/home/CtaLink";
import { Icon, type IconName } from "@/components/home/icons";
import { MutedClip } from "@/components/landing2/MutedClip";
import { NAV_V3 } from "@/components/home/nav";
import { ScrollEffects } from "@/components/landing2/ScrollEffects";
import {
  INVITE_FOUNDING,
  INVITE_HERO,
  INVITE_LAYERS,
  INVITE_TEAM,
} from "@/data/invite-trainer";

/** Section links on the home; absolute so they work from this nested route.
    Still what the footer's own "Product" column reads — those are useful
    deep links back into the sections a footer visitor is already past. */
const HOME_NAV = NAV_V3.map((item) => ({
  ...item,
  href: item.href.startsWith("#") ? `/${item.href}` : item.href,
}));

const INVITE_NAV = [
  { href: "/", label: "Home" },
  { href: "/careers", label: "Career" },
];

const HERO_VIDEO_SRC = "/home-v3/interactive-twin/twin_video_2.mp4";

/** Three plain fact cards floating half on the clip, half off — the same
    treatment the v3 home's hero wore before it went back to its own
    cards-with-a-cycling-illustration. */
const HERO_FACTS = [
  {
    key: "intelligence",
    title: "Your Intelligence",
    body: "Notes, recorded sessions, voice recording, docs from any channels.",
  },
  {
    key: "dna",
    title: "Your training DNA",
    body: "We extract your patterns and how you explain, hints and assess.",
  },
  {
    key: "presence",
    title: "Your Presence",
    body: "A few minutes of your voice: pace, tone and pauses.",
  },
] as const;

/**
 * Equity program / founding-trainer invite. Copy from trainertwin.com/invite,
 * chrome and section rhythm from /TrainerTwin_home_v3.
 */
export function InviteTrainerPage() {
  return (
    <>
      <SiteHeader
        nav={INVITE_NAV}
        mobileMenu
        ctaLabel="Become a founding trainer"
      />
      <main id="top" className="invite-page">
        <Hero />
        <Layers />
        <EquityProgram />
        <Team />
      </main>
      <PageFooter nav={HOME_NAV} layout="v3" cta={<EarlyAccessSteps />} />
      <ScrollEffects />
    </>
  );
}

/**
 * Same chrome as `HeroV3` — wash, corner lattice, cursor grid, the
 * copy-column-plus-art two-up grid — with this page's own static copy in
 * place of the rotating headline, and a clip of the twin instead of the
 * "Your Intelligence / Presence / training DNA" pills, which argue the home
 * page's own three-step story rather than this one's.
 */
function Hero() {
  return (
    <section className="hero hero--v3 invite-hero" aria-labelledby="invite-h">
      <div className="hero-v3-wash" aria-hidden="true" />
      <div className="hero-v3-corners" aria-hidden="true" />
      <div className="hero-v3-cursor" aria-hidden="true">
        <CursorGrid
          cellSize={48}
          radius={150}
          color="#fe5900"
          falloff="smooth"
          maxOpacity={0.45}
          fillOpacity={0.12}
          lineWidth={1.1}
          cellRadius={3}
          holdTime={140}
          fadeDuration={1500}
          pulseSpeed={520}
          gridOpacity={0}
          gridColor="#e7ebf1"
        />
      </div>

      <div className="hero-v3-inner">
        <div className="hero-v3-col hero-v3-col--copy">
          <div className="hero-v3-copy">
            <p className="hero-v3-eyebrow">
              <ShinyText
                text={INVITE_HERO.eyebrow.toUpperCase()}
                color="#d4c08a"
                shineColor="#ffffff"
                direction="right"
              />
            </p>
            <div className="hero-v3-titleblock">
              <h1 id="invite-h" className="invite-hero-title">
                {INVITE_HERO.title}
              </h1>
              <p className="hero-v3-lede">{INVITE_HERO.lead}</p>
            </div>

            <p className="invite-lead">{INVITE_HERO.experiencesIntro}</p>
            <ul className="can invite-can">
              {INVITE_HERO.experiences.map((item) => (
                <li key={item}>
                  <Icon name="check" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <CtaLink href="#early-access" className="hero-v3-cta" size="md">
            Become a founding trainer
          </CtaLink>
          <p className="invite-hero-disclaimer">{INVITE_HERO.disclaimer}</p>
        </div>

        <div className="hero-v3-col hero-v3-col--pills">
          <div className="hero-v3-visual">
            <div className="hero-v3-visual-video">
              <MutedClip
                src={HERO_VIDEO_SRC}
                className="hero-v3-visual-clip"
              />
            </div>

            {HERO_FACTS.map((fact) => (
              <article
                key={fact.key}
                className={`hero-v3-float hero-v3-float--${fact.key}`}
              >
                <h3>{fact.title}</h3>
                <p>{fact.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** One icon + tint per layer, matching what each layer is actually about
    rather than its position in the list. */
const LAYER_ICONS: ReadonlyArray<{
  icon: IconName;
  tone: "primary" | "blue" | "green";
}> = [
  { icon: "doc", tone: "primary" },
  { icon: "mic", tone: "blue" },
  { icon: "chat", tone: "green" },
];

function Layers() {
  return (
    <section className="sec sec--line" aria-labelledby="layers-h">
      <div className="wrap">
        <div className="head" data-reveal>
          <span className="eyebrow">{INVITE_LAYERS.eyebrow}</span>
          <h2 id="layers-h">{INVITE_LAYERS.title}</h2>
          <p>{INVITE_LAYERS.lead}</p>
        </div>
        <div className="invite-layers" data-reveal data-reveal-delay="100">
          {INVITE_LAYERS.items.map((item, i) => {
            const { icon, tone } = LAYER_ICONS[i];
            return (
              <Card key={item.title} className="invite-layer-card">
                <CardBody>
                  <span
                    className={`invite-layer-icon invite-layer-icon--${tone}`}
                    aria-hidden="true"
                  >
                    <Icon name={icon} />
                  </span>
                  <CardTitle>{item.title}</CardTitle>
                  <p>{item.body}</p>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section
      className="sec sec--line tt-night"
      id="team"
      aria-labelledby="team-h"
    >
      <div className="wrap">
        <div className="head" data-reveal>
          <span className="eyebrow">{INVITE_TEAM.eyebrow}</span>
          <h2 id="team-h">{INVITE_TEAM.title}</h2>
          <p>{INVITE_TEAM.lead}</p>
        </div>
        <ul className="invite-team" data-reveal data-reveal-delay="100">
          {INVITE_TEAM.members.map((member) => (
            <li key={member.name}>
              <img
                src={member.photo}
                alt=""
                width={200}
                height={200}
                className="invite-team-photo"
              />
              <p className="invite-team-name">{member.name}</p>
              <p className="invite-team-role">{member.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** One icon + tint per card, reusing the Layers section's own badge recipe —
    four cards read as four different things, the same reason that section
    dropped its numbering for icons. */
const EQUITY_ICONS: ReadonlyArray<{
  icon: IconName;
  tone: "primary" | "blue" | "green" | "gold";
}> = [
  { icon: "chat", tone: "primary" },
  { icon: "play", tone: "blue" },
  { icon: "doc", tone: "green" },
  { icon: "check", tone: "gold" },
];

function EquityProgram() {
  return (
    <section
      className="sec sec--line tt-night"
      id="equity"
      aria-labelledby="equity-h"
    >
      <div className="wrap">
        <div className="head" data-reveal>
          <span className="eyebrow">{INVITE_FOUNDING.eyebrow}</span>
          <h2 id="equity-h">{INVITE_FOUNDING.title}</h2>
          <p>{INVITE_FOUNDING.lead}</p>
        </div>

        <p className="invite-equity-intro" data-reveal data-reveal-delay="50">{INVITE_FOUNDING.cardsIntro}</p>

        <div className="invite-equity-grid" data-reveal data-reveal-delay="100">
          {INVITE_FOUNDING.cards.map((card, i) => {
            const { icon, tone } = EQUITY_ICONS[i];
            return (
              <Card key={card.title} className="invite-layer-card">
                <CardStroke radius={20} />
                <CardBody>
                  <span
                    className={`invite-layer-icon invite-layer-icon--${tone}`}
                    aria-hidden="true"
                  >
                    <Icon name={icon} />
                  </span>
                  <CardTitle>{card.title}</CardTitle>
                  <p>{card.body}</p>
                </CardBody>
              </Card>
            );
          })}
        </div>

        <div className="invite-equity-note">
          <LaunchIcon />
          <div>
            <p className="invite-equity-note-title">
              {INVITE_FOUNDING.note.title}
            </p>
            <p className="invite-equity-note-body">
              {INVITE_FOUNDING.note.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Not part of the shared icon set — a one-off mark for a one-off callout,
    same as the footer's own `ExpertiseBadge`. */
function LaunchIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 16 16"
      width="20"
      height="20"
      fill="none"
      className="invite-equity-note-icon"
    >
      <path
        d="M8 1.8c1.7 1.2 2.7 3.2 2.7 5.4 0 1.4-.4 2.7-1.2 3.8H6.5c-.8-1.1-1.2-2.4-1.2-3.8 0-2.2 1-4.2 2.7-5.4Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="6.6" r="1" stroke="currentColor" strokeWidth="1.1" />
      <path
        d="M6.2 11.4 5 13.6M9.8 11.4 11 13.6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
