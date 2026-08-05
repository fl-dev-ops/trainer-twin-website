"use client";

import { useState } from "react";

const benefits = [
  {
    num: "01",
    title: "Priority access",
    desc: "First cohort onboarded — weeks, not quarters.",
  },
  {
    num: "02",
    title: "Free through beta",
    desc: "Full platform, unlimited learner sessions, no card.",
  },
  {
    num: "03",
    title: "Dedicated support",
    desc: "A named person builds your first twin with you and tunes it on real sessions.",
  },
  {
    num: "04",
    title: "Influence the roadmap",
    desc: "Your workflows decide what we build next. You are in the design calls.",
  },
  {
    num: "05",
    title: "Lifetime founding benefits",
    desc: "Founding pricing and cohort limits locked for as long as you stay.",
  },
];

export default function Founding() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="founding" className="bg-bg border-b-2 border-dark">
      <div className="max-w-[1240px] mx-auto px-5 md:px-10 py-16 md:py-[88px] pb-16 md:pb-24">
        <p className="font-mono text-[11.5px] tracking-[0.14em] uppercase text-muted mb-5 md:mb-[22px]">
          03 — Founding Trainers Program
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-start">
          <div>
            <h2 className="text-3xl md:text-[46px] leading-[1.08] mb-4 md:mb-[18px]">
              Become a Founding Trainer.
            </h2>
            <p className="text-base md:text-[17px] leading-[1.6] text-body max-w-[520px] mb-8 md:mb-[34px]">
              We are building this with thirty trainers, not for them. Founding
              trainers get their twin built with us — and keep founding terms
              for good.
            </p>
            <div className="border-t-2 border-dark">
              {benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="py-5 border-b border-border-light grid grid-cols-[34px_1fr] gap-4 items-start"
                >
                  <span className="font-mono text-[12px] text-brand-light pt-[3px]">
                    {benefit.num}
                  </span>
                  <div>
                    <p className="font-bold text-[16px] mb-1">{benefit.title}</p>
                    <p className="text-[14.5px] leading-[1.55] text-muted">
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              ))}
              <div className="border-b-2 border-dark" />
            </div>
          </div>

          <div className="border-2 border-dark bg-white p-6 md:p-8">
            <div className="flex items-baseline justify-between mb-[6px]">
              <h3 className="text-xl md:text-[22px]">Reserve your spot</h3>
              <span className="font-mono text-[10px] md:text-[11px] tracking-[0.06em] uppercase text-brand-light">
                18 of 30 left
              </span>
            </div>
            <p className="text-[14px] leading-[1.55] text-light mb-6">
              Three fields. We reply within 48 hours with the founding brief.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="grid gap-[14px]">
                <label className="grid gap-[7px]">
                  <span className="font-mono text-[11px] tracking-[0.07em] uppercase text-muted">
                    Name
                  </span>
                  <input
                    required
                    className="border-[1.5px] border-border py-[13px] px-[14px] text-[15px] bg-white outline-none focus:border-dark transition-colors"
                  />
                </label>
                <label className="grid gap-[7px]">
                  <span className="font-mono text-[11px] tracking-[0.07em] uppercase text-muted">
                    Work email
                  </span>
                  <input
                    type="email"
                    required
                    className="border-[1.5px] border-border py-[13px] px-[14px] text-[15px] bg-white outline-none focus:border-dark transition-colors"
                  />
                </label>
                <label className="grid gap-[7px]">
                  <span className="font-mono text-[11px] tracking-[0.07em] uppercase text-muted">
                    I train
                  </span>
                  <select
                    required
                    className="border-[1.5px] border-border py-[13px] px-[14px] text-[15px] bg-white outline-none focus:border-dark transition-colors"
                  >
                    <option value="">Select one</option>
                    <option>Independent tech trainer</option>
                    <option>Coding bootcamp</option>
                    <option>Placement academy</option>
                    <option>YouTube / course educator</option>
                    <option>Corporate L&amp;D</option>
                  </select>
                </label>
                <button
                  type="submit"
                  className="border-0 bg-brand text-white font-semibold text-[15.5px] py-4 px-5 text-left cursor-pointer mt-[6px] hover:bg-brand-dark transition-colors"
                >
                  Reserve Your Spot
                </button>
                <p className="font-mono text-[11.5px] leading-[1.5] text-muted">
                  No spam. Your material stays yours.
                </p>
              </form>
            ) : (
              <div className="border-t-2 border-dark pt-6">
                <h3 className="text-[19px] mb-2">Spot reserved.</h3>
                <p className="text-[14.5px] leading-[1.55] text-muted">
                  Check your inbox — the founding brief and a link to book your
                  build session are on the way.
                </p>
              </div>
            )}

            <div className="mt-[26px] pt-[22px] border-t border-border-light">
              <p className="text-[13.5px] text-light mb-3">
                Running a bootcamp or placement academy?
              </p>
              <a
                href="#cta"
                className="block border-[1.5px] border-dark py-[13px] px-4 font-semibold text-[14.5px] hover:bg-bg transition-colors text-center"
              >
                Book a discovery call
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
