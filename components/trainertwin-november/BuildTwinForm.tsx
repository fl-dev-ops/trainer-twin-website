"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChipGroup } from "./ChipGroup";
import { InfoButton } from "./InfoButton";
import {
  TIME_ZONES,
  calendarStamp,
  detectTimeZone,
  formatInZone,
  getReadyDate,
  getReadyText,
  getSlotTimes,
  zoneLabel,
} from "./bookingTimes";

const WHO_OPTIONS = ["Learners", "Prospects", "Clients", "Cohort members", "Internal teams"];
const JOB_OPTIONS = ["Ask questions", "Practise a conversation", "Role-play", "Get feedback", "Get support between sessions"];

/** Sends one submission to /api/invite, which forwards it to the team's Google Sheet. */
async function sendLead(payload: Record<string, string>) {
  const res = await fetch("/api/invite", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("send failed");
}

function useChipSet() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  function toggle(label: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  }
  return { selected, toggle };
}

export function BuildTwinForm() {
  const who = useChipSet();
  const jobs = useChipSet();
  const [openTip, setOpenTip] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [timeZone, setTimeZone] = useState(() => detectTimeZone());
  const [pickedSlot, setPickedSlot] = useState<Date | null>(null);
  const [booked, setBooked] = useState<Date | null>(null);
  const [doubtSent, setDoubtSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [booking, setBooking] = useState(false);
  const [sendingDoubt, setSendingDoubt] = useState(false);
  const [formError, setFormError] = useState("");
  const [bookError, setBookError] = useState("");
  const [doubtError, setDoubtError] = useState("");
  const [contactNeeded, setContactNeeded] = useState(false);
  const [doubtNeeded, setDoubtNeeded] = useState(false);
  const leadRef = useRef({ contact: "", link: "" });
  const openedAtRef = useRef(0);
  const doneRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    openedAtRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (!openTip) return;
    const close = () => setOpenTip(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [openTip]);

  const ready = useMemo(() => getReadyDate(), []);
  const readyText = useMemo(() => getReadyText(ready), [ready]);
  const slotTimes = useMemo(() => getSlotTimes(ready), [ready]);

  const days = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Array.from({ length: 8 }, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      const state = i === 0 ? "sent" : i === 7 ? "ready" : "building";
      return { date: d, state };
    });
  }, []);

  function reduceMotion() {
    try {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      return false;
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    const form = e.currentTarget;
    const company = (form.elements.namedItem("company_website") as HTMLInputElement | null)?.value;
    if (company || Date.now() - openedAtRef.current < 3000) return;
    const contactInput = form.elements.namedItem("contact") as HTMLInputElement | null;
    const contact = contactInput?.value.trim() ?? "";
    const link = (form.elements.namedItem("link") as HTMLInputElement | null)?.value.trim() ?? "";
    setFormError("");
    if (!contact) {
      setContactNeeded(true);
      setFormError("Add an email or WhatsApp number so we know where to send your demo.");
      contactInput?.focus();
      return;
    }
    setContactNeeded(false);
    setSending(true);
    try {
      await sendLead({
        contact,
        link,
        audience: [...who.selected].join(", "),
        goals: [...jobs.selected].join(", "),
        source: "home-nov",
      });
    } catch {
      setFormError("We could not send that. Please check your connection and try again.");
      return;
    } finally {
      setSending(false);
    }
    leadRef.current = { contact, link };
    setSubmitted(true);
    requestAnimationFrame(() => {
      doneRef.current?.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth", block: "center" });
    });
  }

  function backToForm() {
    setSubmitted(false);
    setBooked(null);
    setPickedSlot(null);
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth", block: "start" });
    });
  }

  async function book() {
    if (!pickedSlot || booking) return;
    const at = pickedSlot;
    const when = `${formatInZone(at, timeZone, { weekday: "long", day: "numeric", month: "long" })}, ${formatInZone(at, timeZone, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).toUpperCase()}, ${zoneLabel(timeZone)} (${timeZone.split("/").pop()?.replace(/_/g, " ")})`;
    setBookError("");
    setBooking(true);
    try {
      await sendLead({
        contact: leadRef.current.contact,
        link: leadRef.current.link,
        goals: "Demo time chosen",
        slot: at.toISOString(),
        slot_text: when,
        timezone: timeZone,
        source: "home-nov-booking",
      });
      setBooked(at);
    } catch {
      setBookError("We could not save that time. Please try again, or use the box below the form and we will pick a time with you.");
    } finally {
      setBooking(false);
    }
  }

  async function sendDoubt(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sendingDoubt) return;
    const input = e.currentTarget.elements.namedItem("doubt_contact") as HTMLInputElement | null;
    const contact = input?.value.trim();
    setDoubtError("");
    if (!contact) {
      setDoubtNeeded(true);
      input?.focus();
      return;
    }
    setDoubtNeeded(false);
    setSendingDoubt(true);
    try {
      await sendLead({ contact, goals: "Still having doubts, reply within 24 hours", source: "home-nov-doubts" });
      setDoubtSent(true);
    } catch {
      setDoubtError("We could not send that. Please try again.");
    } finally {
      setSendingDoubt(false);
    }
  }

  const bookedWhen = booked
    ? `${formatInZone(booked, timeZone, { weekday: "long", day: "numeric", month: "long" })}, ${formatInZone(booked, timeZone, {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).toUpperCase()}, ${zoneLabel(timeZone)} (${timeZone.split("/").pop()?.replace(/_/g, " ")})`
    : "";

  const calendarHref = booked
    ? (() => {
        const end = new Date(booked.getTime() + 30 * 60000);
        const params = new URLSearchParams({
          action: "TEMPLATE",
          text: "Meet my TrainerTwin",
          dates: `${calendarStamp(booked)}/${calendarStamp(end)}`,
          details: "The TrainerTwin team shows me the demo twin they built from my public content.",
        });
        return `https://calendar.google.com/calendar/render?${params.toString()}`;
      })()
    : "https://calendar.google.com/calendar/render?action=TEMPLATE";

  const readyDayLabel = formatInZone(slotTimes[0], timeZone, { weekday: "short" });

  return (
    <>
    <section className="build" id="build">
      <div className="wrap">
        <div className="build-row">
          <div className="build-lead">
            <h2>What would you want your twin to handle?</h2>
            <p className="build-ready">
              We&rsquo;ll build it and get it to you by <b className="ready-date">{readyText}</b>.
            </p>
          </div>
          <div className="panel">
            {!submitted && (
              <form id="form" ref={formRef} noValidate onSubmit={handleSubmit}>
                <div className="hp" aria-hidden="true">
                  <label htmlFor="tt-company">Leave this empty</label>
                  <input id="tt-company" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="q">
                  <span className="lab-row">
                    <span className="label">Who is your twin for?</span>
                    <InfoButton id="info-1" open={openTip === "info-1"} onToggle={() => setOpenTip((t) => (t === "info-1" ? null : "info-1"))}>
                      We shape your twin&rsquo;s tone and examples around the people it will talk to.
                    </InfoButton>
                  </span>
                  <ChipGroup options={WHO_OPTIONS} selected={who.selected} onToggle={who.toggle} />
                </div>

                <div className="q">
                  <span className="lab-row">
                    <span className="label">What should they be able to do with it?</span>
                    <InfoButton id="info-2" open={openTip === "info-2"} onToggle={() => setOpenTip((t) => (t === "info-2" ? null : "info-2"))}>
                      This tells us what to set up in your demo: answering questions, role-play, feedback or support between sessions.
                    </InfoButton>
                  </span>
                  <ChipGroup options={JOB_OPTIONS} selected={jobs.selected} onToggle={jobs.toggle} />
                </div>

                <div className="q">
                  <span className="lab-row">
                    <label htmlFor="tt-link">To build your twin, where can we find your work?</label>
                    <InfoButton id="info-4" open={openTip === "info-4"} onToggle={() => setOpenTip((t) => (t === "info-4" ? null : "info-4"))}>
                      Your twin learns from what you&rsquo;ve already shared in public, such as your website, LinkedIn, YouTube, podcast or
                      course. For the demo we only use public material, and your IP stays yours.
                    </InfoButton>
                  </span>
                  <input id="tt-link" name="link" type="url" placeholder="Website, LinkedIn, YouTube, podcast or course" />
                </div>

                <div className="q">
                  <span className="lab-row">
                    <span className="label">Where should we send your demo?</span>
                    <InfoButton id="info-5" open={openTip === "info-5"} onToggle={() => setOpenTip((t) => (t === "info-5" ? null : "info-5"))}>
                      We only use these to send you your demo and book your walkthrough. No newsletters, no sharing.
                    </InfoButton>
                  </span>
                  <div className="two">
                    <div>
                      <input
                        id="tt-contact"
                        name="contact"
                        type="text"
                        className={contactNeeded ? "need" : undefined}
                        aria-label="Email or WhatsApp"
                        aria-invalid={contactNeeded || undefined}
                        placeholder="Email or WhatsApp"
                        autoComplete="email"
                        onInput={() => contactNeeded && setContactNeeded(false)}
                      />
                    </div>
                  </div>
                </div>

                <div className="send">
                  <button className="cta" type="submit" disabled={sending}>
                    {sending ? "Sending…" : "Build my free demo"}
                  </button>
                </div>
                {formError && (
                  <p className="form-error" role="alert">
                    {formError}
                  </p>
                )}
                <p className="consent">
                  By sending this, you agree to our{" "}
                  <a href="https://www.trainertwin.com/privacy" target="_blank" rel="noopener noreferrer">
                    privacy policy
                  </a>
                  .
                </p>
              </form>
            )}

            {submitted && (
              <div className="done" ref={doneRef}>
                <button type="button" className="back" onClick={backToForm}>
                  <svg aria-hidden="true" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                  Back to my answers
                </button>
                <div className="done-head">
                  <h3>Your twin is on its way.</h3>
                  <p>
                    It will be ready on <b className="ready-date">{readyText}</b>. Pick a time that day, and we&rsquo;ll show it to you.
                  </p>
                </div>

                <ol className="strip" aria-label="The next 7 days">
                  {days.map(({ date, state }, i) => (
                    <li key={i} className={`day ${state}`} style={{ animationDelay: `${0.06 * i}s` }}>
                      <span className="day-w">{date.toLocaleDateString("en-GB", { weekday: "short" })}</span>
                      <span className="day-d">{date.getDate()}</span>
                      <span className="day-s">{state === "sent" ? "Sent" : state === "ready" ? "Ready" : "Building"}</span>
                    </li>
                  ))}
                </ol>

                {!booked && (
                  <div className="slots-wrap">
                    <div className="slots-head">
                      <p className="slots-label">
                        Times on <b className="ready-date">{readyText}</b>
                      </p>
                      <label className="tz-pick">
                        <span>Time zone</span>
                        <select value={timeZone} onChange={(e) => setTimeZone(e.target.value)}>
                          {!TIME_ZONES.some((z) => z[0] === timeZone) && (
                            <option value={timeZone}>
                              {zoneLabel(timeZone)} ({timeZone.split("/").pop()?.replace(/_/g, " ")})
                            </option>
                          )}
                          {TIME_ZONES.map(([zone, label]) => (
                            <option key={zone} value={zone}>
                              {label} ({zone.split("/").pop()?.replace(/_/g, " ")})
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                    <div className="slots">
                      {slotTimes.map((at) => {
                        const day = formatInZone(at, timeZone, { weekday: "short" });
                        let label = formatInZone(at, timeZone, { hour: "numeric", minute: "2-digit", hour12: true }).toUpperCase();
                        if (day !== readyDayLabel) label += ` (${day})`;
                        const isPicked = pickedSlot?.getTime() === at.getTime();
                        return (
                          <button
                            key={at.toISOString()}
                            type="button"
                            className="slot"
                            aria-pressed={isPicked}
                            onClick={() => setPickedSlot(at)}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                    <button type="button" className="cta book" disabled={!pickedSlot || booking} onClick={book}>
                      {booking ? "Booking…" : "Book this time"}
                    </button>
                    {bookError && (
                      <p className="form-error" role="alert">
                        {bookError}
                      </p>
                    )}
                  </div>
                )}

                {booked && (
                  <div className="booked">
                    <p className="booked-line">
                      Booked: <b>{bookedWhen}</b>. We&rsquo;ll show you your twin then.
                    </p>
                    <button type="button" className="back" onClick={() => setBooked(null)}>
                      <svg aria-hidden="true" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                      Change the time
                    </button>
                    <a className="cal-add" href={calendarHref} target="_blank" rel="noopener noreferrer">
                      <svg aria-hidden="true" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <rect x={3} y={5} width={18} height={16} rx={3} />
                        <path d="M3 10h18M8 3v4M16 3v4M12 13v5M9.5 15.5h5" />
                      </svg>
                      Add it to Google Calendar
                    </a>
                  </div>
                )}

              </div>
            )}
          </div>
        </div>
      </div>
    </section>

    <section className="doubts">
      <div className="wrap">
        <div className="doubt-banner">
          <p>
            <b>Still having doubts?</b> Share your email or WhatsApp. We&rsquo;ll get back within 24 hrs.
          </p>
          {doubtSent ? (
            <p className="doubt-thanks">Thanks. We&rsquo;ll get back within 24 hrs.</p>
          ) : (
            <form className="doubt-send" onSubmit={sendDoubt}>
              <input
                name="doubt_contact"
                type="text"
                className={doubtNeeded ? "need" : undefined}
                aria-label="Email or WhatsApp"
                aria-invalid={doubtNeeded || undefined}
                placeholder="Email or WhatsApp"
                autoComplete="email"
                onInput={() => doubtNeeded && setDoubtNeeded(false)}
              />
              <button className="cta" type="submit" disabled={sendingDoubt}>
                {sendingDoubt ? "Sending…" : "Send"}
              </button>
            </form>
          )}
          {doubtError && (
            <p className="form-error" role="alert">
              {doubtError}
            </p>
          )}
        </div>
      </div>
    </section>
    </>
  );
}

