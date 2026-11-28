"use client";

import { useEffect, useState } from "react";

type NoteProps = {
  id: string;
  popped: string | null;
  onToggle: (id: string) => void;
  children: React.ReactNode;
};

function Note({ id, popped, onToggle, children }: NoteProps) {
  const isPopped = popped === id;
  return (
    <figure
      className={isPopped ? "note pop" : "note"}
      tabIndex={0}
      role="button"
      aria-pressed={isPopped}
      onClick={(e) => {
        e.stopPropagation();
        onToggle(id);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle(id);
        }
        if (e.key === "Escape" && isPopped) onToggle(id);
      }}
    >
      {children}
    </figure>
  );
}

/** "Touch to pop": a note sits compact, then springs up when tapped; tapping anywhere else closes it. */
export function Testimonials() {
  const [popped, setPopped] = useState<string | null>(null);

  useEffect(() => {
    if (!popped) return;
    const close = () => setPopped(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [popped]);

  function toggle(id: string) {
    setPopped((prev) => (prev === id ? null : id));
  }

  return (
    <div className="wrap told">
      <h3>What they&rsquo;ve told us</h3>
      <div className="notes">
        <Note id="olga" popped={popped} onToggle={toggle}>
          <div className="shot pic-shot">
            <img
              src="/trainertwin-november/images/testimonial-olga-screenshot.jpg"
              alt="WhatsApp message from Olga: I finished 2 sessions. Feels good enough to be honest."
              width={876}
              height={260}
            />
          </div>
          <figcaption>
            <div className="av" aria-hidden="true">
              <img src="/trainertwin-november/images/avatar-olga.jpg" alt="" />
            </div>
            <div>
              <b>Olga Sinenko</b>
              <small>Real-estate sales coach &middot; Dubai, calibrating her twin</small>
            </div>
          </figcaption>
        </Note>

        <Note id="prathosh" popped={popped} onToggle={toggle}>
          <div className="shot pic-shot">
            <div className="wa">
              <p className="wa-msg">
                The analysis is very good.
                <span className="wa-time">5:26 pm</span>
              </p>
            </div>
          </div>
          <figcaption>
            <div className="av" aria-hidden="true">
              <img src="/trainertwin-november/images/avatar-prathosh.jpg" alt="" />
            </div>
            <div>
              <b>Prathosh A P</b>
              <small>Assoc. Prof., IISc / IITD, on our coaching method</small>
            </div>
          </figcaption>
        </Note>

        <Note id="gopal-msg" popped={popped} onToggle={toggle}>
          <div className="shot pic-shot">
            <div className="wa">
              <p className="wa-msg">
                You have created an interesting product&hellip;
                <span className="wa-time">8:22 PM</span>
              </p>
            </div>
          </div>
          <figcaption>
            <div className="av" aria-hidden="true">
              <img src="/trainertwin-november/images/avatar-gopal.jpg" alt="" />
            </div>
            <div>
              <b>Gopal RajGuru</b>
              <small>Sales, leadership &amp; negotiation coach</small>
            </div>
          </figcaption>
        </Note>

        <Note id="learner" popped={popped} onToggle={toggle}>
          <blockquote className="shot said">
            &ldquo;So I usually work with a twin&hellip; just send a screenshot of the chat with the
            buyer, and then the twin is replying what should be next.&rdquo;
          </blockquote>
          <figcaption>
            <div className="av" aria-hidden="true">
              E
            </div>
            <div>
              <b>E.</b>
              <small>Learner using Olga&rsquo;s twin</small>
            </div>
          </figcaption>
        </Note>
      </div>
    </div>
  );
}
