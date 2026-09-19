"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { FIELDS, type Field, type FieldKey } from "./fields";
import { CtaLink } from "./CtaLink";
import { GlowCard } from "./GlowCard";
import { Icon, type IconName } from "./icons";
import { useInView } from "./useInView";

/** Which screen plays in which card. The fields themselves live in fields.ts,
    shared with the nav menu that points at this section. */
const ART: Record<FieldKey, ComponentType> = {
  tech: CodeArt,
  sales: ObjectionArt,
  communication: LevelArt,
  fitness: TrackArt,
};

const PROFILE_ART = {
  experts: ReachArt,
  tech: CodeArt,
  sales: ObjectionArt,
  /* "Teach something else" — the CEFR ladder stands in for the long tail
     (languages, exam prep) without inventing a fifth illustration. */
  other: LevelArt,
} as const;

/** The scroll layout draws its own scenes; the cards keep the small ones. */
const SCROLL_ART = {
  experts: AlwaysOnScene,
  tech: CodeReviewScene,
  sales: RoleplayScene,
  other: SubjectsScene,
} as const;

export type WhoProfileCard = {
  key: string;
  kicker: string;
  title: string;
  body: string;
  canLabel?: string;
  points?: string[];
  href: string;
  art: keyof typeof PROFILE_ART;
  /** Scroll layout only; v3 defaults to "Request a demo". */
  cta?: string;
};

/**
 * Five cards: the four trainer fields, then one for extending and monetising.
 * Each has a small screen showing the kind of work a twin does there — a file
 * with an error in it, an objection being scored, a ladder of CEFR levels, a
 * week of sessions logged, a reach readout.
 *
 * All cards are drawn identically on night: the category colours that once
 * separated them are gone, and the illustration does that job instead.
 *
 * The screens are decorative and `aria-hidden` — each one restates something
 * the card already says in words. They animate on hover only, so nothing moves
 * until a reader is looking at a particular card, and the global reduced-motion
 * rule collapses the durations, which leaves each screen in its finished state
 * rather than flickering through one.
 *
 * Five no longer fit a row, so the cards scroll sideways. The default view
 * shows the first three with the fourth peeking; the arrows and a wheel over
 * the row bring the fourth and fifth into view.
 */
export function WhoItsFor({
  fields = FIELDS,
  carousel = true,
  profiles,
  night = true,
  layout = "cards",
}: {
  fields?: Field[];
  /** Home / v1 keep the five-card rail. v3 passes false for a filled row. */
  carousel?: boolean;
  /** v3: replace the field + extend set with these three profiles. */
  profiles?: WhoProfileCard[];
  /** Home / v1 keep the dark band. v3 Who uses it is light. */
  night?: boolean;
  /**
   * `scroll` is the v3 treatment: GitHub-Issues-style accordion on the left,
   * matching illustration on the right. A prop rather than a swap because
   * `/TrainerTwin_home` and `_v1` render this same component against their own
   * stylesheets, which carry none of the accordion rules.
   */
  layout?: "cards" | "scroll";
} = {}) {
  if (layout === "scroll" && profiles) {
    return <WhoScroll profiles={profiles} />;
  }

  return (
    /* The one dark band between two light sections — `.tt-night` carries the
       whole treatment (§7, D13). v3 drops it so this section sits on canvas. */
    <section
      className={night ? "sec sec--line tt-night" : "sec sec--line"}
      id="who"
      aria-labelledby="who-h"
    >
      <div className="wrap">
        <div className="head">
          {/* Not "Who it's for" again: the kicker names the section and the
              title says it, and setting the same words twice in two faces
              reads as a mistake rather than as a hierarchy. */}
          <span className="eyebrow">Who uses it</span>
          <h2 id="who-h">Who it’s for</h2>
          <p>Pick your field to see how trainers like you use it.</p>
        </div>

        <WhoRail carousel={carousel}>
          {profiles
            ? profiles.map((card) => {
                const Art = PROFILE_ART[card.art];
                return (
                  <FieldCard
                    key={card.key}
                    href={card.href}
                    kicker={card.kicker}
                    title={card.title}
                    body={card.body}
                    canLabel={card.canLabel}
                    points={card.points}
                    cta={card.cta ?? "Request for early demo"}
                  >
                    <Art />
                  </FieldCard>
                );
              })
            : [
                ...fields.map((field) => {
                  const Art = ART[field.key];
                  return (
                    <FieldCard
                      key={field.key}
                      href={field.href}
                      title={field.label}
                      body={field.body}
                      cta="See how it works"
                    >
                      <Art />
                    </FieldCard>
                  );
                }),
                <FieldCard
                  key="extend"
                  href="#early-access"
                  title="Extend your expertise & monetise"
                  body="Helping you reach greater audiences. Your twin takes what you already teach to people a diary never has hours for."
                  cta="Get in touch"
                >
                  <ReachArt />
                </FieldCard>,
              ]}
        </WhoRail>

        <a className="who-other" href="#early-access">
          <div>
            <h3>Teach something else?</h3>
            <p>
              Languages, finance, design, exam prep. Tell us what you need and
              we’ll work it out with you.
            </p>
          </div>
          <span className="who-go">
            Get in touch
            <Icon name="arrow" />
          </span>
        </a>
      </div>
    </section>
  );
}

const ACCORDION_HOLD = 5600;

/**
 * v3 "Who it's for": accordion list + one illustration, then the Other card
 * as its own row. Auto-advances so each persona can be read, and a click
 * still jumps.
 */
function WhoScroll({ profiles }: { profiles: WhoProfileCard[] }) {
  const items = profiles.filter((card) => card.key !== "other");
  const other = profiles.find((card) => card.key === "other");
  const [open, setOpen] = useState(0);
  const [paused, setPaused] = useState(false);
  const { ref, inView } = useInView<HTMLElement>();

  useEffect(() => {
    if (!inView || paused || items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => {
      setOpen((i) => (i + 1) % items.length);
    }, ACCORDION_HOLD);
    return () => window.clearTimeout(timer);
  }, [open, paused, items.length, inView]);

  return (
    <section
      ref={ref}
      className="sec sec--line tt-night who-scroll"
      id="who"
      aria-labelledby="who-h"
    >
      <div className="wrap">
        <div className="head" data-reveal>
          <span className="eyebrow">Who uses it</span>
          <h2 id="who-h">Who it’s for</h2>
          <p>Pick your field to see how trainers like you use it.</p>
        </div>

        <div
          className="who-acc"
          data-reveal
          data-reveal-delay="100"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node)) {
              setPaused(false);
            }
          }}
        >
          <div className="who-acc-list">
            {items.map((card, i) => {
              const expanded = i === open;
              const panelId = `who-acc-panel-${card.key}`;
              return (
                <div
                  key={card.key}
                  className={
                    expanded ? "who-acc-item is-open" : "who-acc-item"
                  }
                >
                  <button
                    type="button"
                    className="who-acc-trigger"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpen(i)}
                  >
                    <span className="who-acc-kicker">
                      {card.kicker || card.title}
                    </span>
                    <span className="who-acc-mark" aria-hidden="true">
                      <span className="who-acc-mark-h" />
                      <span className="who-acc-mark-v" />
                    </span>
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    /* No `hidden` — a display:none panel cannot be
                       transitioned. Collapsed instead by the height-animating
                       grid track below (`.who-acc-panel`), and `inert` takes
                       over `hidden`'s job of pulling it out of tab order and
                       assistive-tech reach while it reads as closed. */
                    inert={!expanded}
                    className={
                      expanded ? "who-acc-panel is-open" : "who-acc-panel"
                    }
                  >
                    <div className="who-acc-panel-inner">
                      <p className="who-acc-title">{card.title}</p>
                      <p className="who-acc-body">{card.body}</p>
                      {card.points && card.points.length > 0 ? (
                        <ul className="can">
                          {card.points.map((item) => (
                            <li key={item}>
                              <Icon name="check" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="who-acc-stage" aria-hidden="true">
            {items.map((card, i) => {
              const Scene = SCROLL_ART[card.art];
              return (
                <div
                  key={card.key}
                  className={
                    i === open ? "who-acc-slide is-on" : "who-acc-slide"
                  }
                >
                  <div className="ws-slide-inner">
                    <Scene />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {other ? (
          <article className="ws-card ws-card--catchall" data-reveal data-reveal-delay="150">
            <div className="ws-card-copy">
              <h3>{other.kicker || "Other Trainers"}</h3>
              <p>{other.body}</p>
            </div>
            <CtaLink
              size="md"
              href={other.href}
              className="hero-v3-cta ws-cta ws-cta--catchall"
            >
              {other.cta ?? "Get in touch"}
            </CtaLink>
          </article>
        ) : null}
      </div>
    </section>
  );
}

/* ------------------------------------------------- the scroll-layout scenes

   Three planes each: a dimmed one behind carrying bars rather than lettering
   (D23, and it reads as out of focus), a lit one in front cropped by the
   frame's right edge, and one crisp callout over the pair. Each scene shows
   the work that audience's twin actually does, so the illustration argues the
   copy beside it rather than decorating it. All of it is `aria-hidden` — the
   copy says every one of these things in words. */

function BackPlane({ icon, label }: { icon: IconName; label: string }) {
  return (
    <div className="cmp-pane wsa-back">
      <div className="cmp-pane-bar">
        <Icon name={icon} />
        {label}
      </div>
      <div className="cmp-pane-body">
        <span className="cmp-line cmp-line--80" />
        <span className="cmp-line cmp-line--60" />
        <span className="cmp-line cmp-line--40" />
      </div>
    </div>
  );
}

function ScenePlanes({ children }: { children: ReactNode }) {
  return <div className="cmp-planes">{children}</div>;
}

function Tip({ children }: { children: string }) {
  return (
    <span className="art-tip wsa-tip">
      <Icon name="check" />
      {children}
    </span>
  );
}

/** Experts and coaches: the twin answering at hours nobody keeps. */
function AlwaysOnScene() {
  return (
    <>
      <ScenePlanes>
        <BackPlane icon="chat" label="Questions" />
        <div className="cmp-pane wsa-front">
          <div className="cmp-pane-bar">
            <Icon name="face" />
            Your twin
            <span className="cmp-live">Live</span>
          </div>
          <div className="cmp-pane-body">
            <span className="wsa-stat">
              <b>3.1×</b>
              reach this month
            </span>
            <span className="wsa-row">
              <Icon name="check" />
              Answered a pricing question
              <span className="wsa-row-meta">02:14</span>
            </span>
            <span className="wsa-row">
              <Icon name="check" />
              Walked through module 4
              <span className="wsa-row-meta">06:40</span>
            </span>
            <span className="wsa-row">
              <Icon name="check" />
              Cleared a doubt on setup
              <span className="wsa-row-meta">23:58</span>
            </span>
          </div>
        </div>
      </ScenePlanes>
      <Tip>While you sleep</Tip>
    </>
  );
}

/** Tech trainers: the twin hinting at the bug instead of fixing it. */
function CodeReviewScene() {
  return (
    <>
      <ScenePlanes>
        <BackPlane icon="folder" label="Your repo" />
        <div className="cmp-pane wsa-front">
          <div className="cmp-pane-bar">
            <Icon name="doc" />
            getTotal.js
          </div>
          <div className="cmp-pane-body">
            <span className="wsa-code">
              {"function getTotal(items) {\n  return items.reduce(\n    (a, b) => a + b.price, 0\n  );\n}"}
            </span>
            <span className="wsa-code is-err">
              Cannot read properties of undefined
            </span>
            <p className="bubble bubble--twin">
              What is <code>items</code> when the cart is empty?
            </p>
            <span className="source">From your notes, Lesson 6</span>
          </div>
        </div>
      </ScenePlanes>
      <Tip>Hints, not answers</Tip>
    </>
  );
}

/** Sales trainers: an objection practised, and scored against the framework. */
function RoleplayScene() {
  return (
    <>
      <ScenePlanes>
        <BackPlane icon="folder" label="Scenarios" />
        <div className="cmp-pane wsa-front">
          <div className="cmp-pane-bar">
            <Icon name="phone" />
            Role-play · Procurement
          </div>
          <div className="cmp-pane-body">
            <p className="bubble bubble--me">
              Honestly, you are twice what we budgeted.
            </p>
            <p className="bubble bubble--twin">
              What would it need to be worth to sign this quarter?
            </p>
            <span className="wsa-chips">
              <span className="wsa-chip is-on">
                <Icon name="check" />
                Price
              </span>
              <span className="wsa-chip is-on">
                <Icon name="check" />
                Timing
              </span>
              <span className="wsa-chip">Trust</span>
            </span>
            <span className="wsa-stat">
              <b>78%</b>
              objections handled
            </span>
          </div>
        </div>
      </ScenePlanes>
      <Tip>Scored every time</Tip>
    </>
  );
}

/** Everyone else: whatever the subject, the same twin underneath. */
function SubjectsScene() {
  const rows = [
    { label: "Spanish · B1", width: "72%", on: true },
    { label: "Personal finance", width: "54%", on: false },
    { label: "Exam prep · Quant", width: "86%", on: false },
  ];
  return (
    <>
      <ScenePlanes>
        <BackPlane icon="cloud" label="Your material" />
        <div className="cmp-pane wsa-front">
          <div className="cmp-pane-bar">
            <Icon name="info" />
            Subjects
          </div>
          <div className="cmp-pane-body">
            {rows.map((row) => (
              <span key={row.label} className="wsa-row-group">
                <span className="wsa-row">
                  {row.label}
                  <span className="wsa-row-meta">{row.width}</span>
                </span>
                <span
                  className={row.on ? "wsa-meter wsa-meter--on" : "wsa-meter"}
                >
                  <span style={{ width: row.width }} />
                </span>
              </span>
            ))}
            <span className="source">Built from what you upload</span>
          </div>
        </div>
      </ScenePlanes>
      <Tip>Any subject</Tip>
    </>
  );
}

function FieldCard({
  href,
  kicker,
  title,
  body,
  canLabel,
  points,
  cta,
  children,
}: {
  href: string;
  kicker?: string;
  title: string;
  body: string;
  canLabel?: string;
  points?: string[];
  cta: string;
  children: ReactNode;
}) {
  return (
    /* The card is the glow wrapper; the link is what fills it. */
    <GlowCard
      className="who-card"
      background="var(--tt-surface-raised)"
      radius="var(--tt-radius-lg)"
    >
      <a className="who-tile" href={href}>
        <div className="who-scene">{children}</div>
        <div className="who-info">
          {kicker ? <span className="who-kicker">{kicker}</span> : null}
          <h3>{title}</h3>
          <p>{body}</p>
          {points && points.length > 0 ? (
            <div className="who-can">
              {canLabel ? <p className="who-can-label">{canLabel}</p> : null}
              <ul className="can">
                {points.map((item) => (
                  <li key={item}>
                    <Icon name="check" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {/* A span, not a nested link — the whole tile is the link,
            and a link inside a link is two hit areas fighting. */}
          <span className="who-go">
            {cta}
            <Icon name="arrow" />
          </span>
        </div>
      </a>
    </GlowCard>
  );
}

function WhoRail({
  children,
  carousel = true,
}: {
  children: ReactNode;
  carousel?: boolean;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const left = el.scrollLeft;
    setCanPrev(left > 2);
    setCanNext(max - left > 2);
  }, []);

  useEffect(() => {
    if (!carousel) return;
    const el = scrollerRef.current;
    if (!el) return;
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    el.addEventListener("scroll", update, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", update);
    };
  }, [carousel, update]);

  useEffect(() => {
    if (!carousel) return;
    const el = scrollerRef.current;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return;
      const dominantY = Math.abs(event.deltaY) > Math.abs(event.deltaX);
      const delta = dominantY ? event.deltaY : event.deltaX;
      if (delta === 0) return;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 2) return;
      const next = el.scrollLeft + delta;
      const clamped = Math.max(0, Math.min(max, next));
      if (clamped === el.scrollLeft) return;
      event.preventDefault();
      el.scrollLeft = clamped;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [carousel]);

  const cardStep = () => {
    const el = scrollerRef.current;
    if (!el) return 0;
    const card = el.querySelector<HTMLElement>(".who-card");
    const gap = Number.parseFloat(getComputedStyle(el).columnGap || "16") || 16;
    return (card?.offsetWidth ?? Math.round(el.clientWidth * 0.72)) + gap;
  };

  const scrollByCard = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * cardStep(), behavior: "smooth" });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollByCard(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollByCard(-1);
    }
  };

  return (
    <div className={`who-rail${carousel ? "" : " who-rail--fill"}`}>
      {carousel ? (
        <div className="who-arrows">
          <button
            type="button"
            className="who-arrow"
            aria-label="Show previous fields"
            disabled={!canPrev}
            onClick={() => scrollByCard(-1)}
          >
            <Icon name="chevron" className="who-arrow-prev" />
          </button>
          <button
            type="button"
            className="who-arrow"
            aria-label="Show next fields"
            disabled={!canNext}
            onClick={() => scrollByCard(1)}
          >
            <Icon name="chevron" />
          </button>
        </div>
      ) : null}
      <div
        ref={scrollerRef}
        className="who-tiles"
        tabIndex={carousel ? 0 : undefined}
        role={carousel ? "region" : undefined}
        aria-roledescription={carousel ? "carousel" : undefined}
        aria-label="Who it’s for"
        onKeyDown={carousel ? onKeyDown : undefined}
      >
        {children}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- screens

   Real text, not placeholder bars: a grey bar says "some UI happens here",
   where `Cannot read properties of undefined` says what a tech trainer's twin
   is actually looking at. Set small — these are `aria-hidden` props inside a
   276px card, read as texture first and detail second — which is why each one
   also carries a caption naming what it is.

   `--i` is each element's place in the stagger, so one set of keyframes in
   home.css drives all four screens on hover. */

/** Tech: the file, and the line that throws. */
const CODE = [
  "function getTotal(items) {",
  "  return items.reduce(",
  "    (a, b) => a + b.price, 0",
  "  );",
  "}",
];

function CodeArt() {
  return (
    <div className="usecase" aria-hidden="true">
      <span className="u-top">
        <span className="u-chrome">
          <span />
          <span />
          <span />
        </span>
        <span className="u-cap">getTotal.js</span>
      </span>
      <span className="u-code">
        {CODE.map((line, i) => (
          <span key={line} className="u-code-line" style={cell(0, i)}>
            <span className="u-num">{i + 1}</span>
            <span className="u-txt">{line}</span>
          </span>
        ))}
        <span
          className="u-code-line u-code-line--err"
          style={cell(0, CODE.length)}
        >
          <span className="u-num" />
          <span className="u-txt">Cannot read properties of undefined</span>
        </span>
      </span>
    </div>
  );
}

/** Sales: three objections met, and the score that earns. */
const OBJECTIONS = ["Price", "Timing", "Trust"];

function ObjectionArt() {
  return (
    <div className="usecase usecase--pad" aria-hidden="true">
      <span className="u-top">
        <span className="u-cap">Objection handling</span>
        <span className="u-cap u-cap--val">78%</span>
      </span>
      <span className="u-meter">
        <span className="u-meter-fill" />
      </span>
      <span className="u-chips">
        {OBJECTIONS.map((label, i) => (
          <span key={label} className="u-chip" style={cell(0, i)}>
            <Icon name="check" />
            {label}
          </span>
        ))}
      </span>
    </div>
  );
}

/** Communication: the CEFR ladder, climbing to B2. */
const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

function LevelArt() {
  return (
    <div className="usecase usecase--pad" aria-hidden="true">
      <span className="u-top">
        <span className="u-cap">CEFR</span>
        <span className="u-cap u-cap--val">B2</span>
      </span>
      <span className="u-levels">
        {LEVELS.map((level, i) => (
          /* Lit up to B2 — a ladder with every rung on says nothing about
             where the learner actually is. */
          <span
            key={level}
            className={`u-level${i <= 3 ? " is-on" : ""}`}
            style={cell(0, i)}
          >
            <span className="u-level-bar" />
            {level}
          </span>
        ))}
      </span>
    </div>
  );
}

/** Fitness: a week of sessions, logged. */
const WEEK = [46, 68, 34, 82, 58, 94, 70];

function TrackArt() {
  return (
    <div className="usecase usecase--pad" aria-hidden="true">
      <span className="u-top">
        <span className="u-cap">This week</span>
        <span className="u-cap u-cap--val">6 / 7</span>
      </span>
      <span className="u-week">
        {WEEK.map((h, i) => (
          <span key={i} className="u-day" style={cell(h, i)}>
            <span className="u-day-bar" />
          </span>
        ))}
      </span>
      <span className="u-foot">
        <span className="u-tick">
          <Icon name="check" />
        </span>
        <span className="u-txt">Squat form checked</span>
      </span>
    </div>
  );
}

/** Reach: the audience a twin puts in front of the same teaching. */
const REACH = [42, 55, 48, 70, 62, 84, 96];

function ReachArt() {
  return (
    <div className="usecase usecase--pad" aria-hidden="true">
      <span className="u-top">
        <span className="u-cap">Reach</span>
        <span className="u-cap u-cap--val">3.1×</span>
      </span>
      <span className="u-week">
        {REACH.map((h, i) => (
          <span key={i} className="u-day" style={cell(h, i)}>
            <span className="u-day-bar" />
          </span>
        ))}
      </span>
      <span className="u-foot">
        <span className="u-faces">
          <span className="u-face" style={cell(0, 0)}>
            <Icon name="face" />
          </span>
          <span className="u-face" style={cell(0, 1)}>
            <Icon name="face" />
          </span>
          <span className="u-face" style={cell(0, 2)}>
            <Icon name="face" />
          </span>
        </span>
        <span className="u-txt">New learners this month</span>
      </span>
    </div>
  );
}

/** One element's width and its place in the stagger. */
function cell(w: number, i: number) {
  return { ["--w" as string]: `${w}%`, ["--i" as string]: i };
}
