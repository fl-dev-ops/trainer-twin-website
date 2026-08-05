"use client";

import { useState } from "react";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="border-b-2 border-dark">
      <div className="max-w-[1240px] mx-auto px-5 md:px-10 py-16 md:py-[88px] pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-10 lg:gap-[72px] items-start">
        <div>
          <div className="inline-flex items-center gap-[9px] border border-border px-3 py-[7px] mb-6 md:mb-[30px]">
            <span className="w-[7px] h-[7px] bg-brand block" />
            <span className="font-mono text-[11.5px] tracking-[0.09em] uppercase text-muted">
              Early access · 30 founding trainers
            </span>
          </div>

          <h1 className="text-4xl md:text-[60px] leading-[1.05] mb-6">
            Scale your interview coaching—not your working hours.
          </h1>

          <p className="text-base md:text-[18.5px] leading-[1.55] text-body max-w-[560px]">
            Turn your videos, notes and question banks into an AI twin that runs
            mock interviews, code reviews and viva with every learner — in your
            style, at your standard, without you in the room.
          </p>

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="mt-8 md:mt-9 flex flex-col sm:flex-row max-w-[560px] border-2 border-dark"
            >
              <input
                type="email"
                required
                placeholder="Work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 border-0 py-4 px-[18px] text-[15px] bg-white outline-none min-w-0"
              />
              <button
                type="submit"
                className="border-0 bg-brand text-white font-semibold text-[15px] px-6 py-4 sm:py-0 cursor-pointer hover:bg-brand-dark transition-colors"
              >
                Join Early Access
              </button>
            </form>
          ) : (
            <div className="mt-8 md:mt-9 border-2 border-dark p-5 md:p-[22px_24px] max-w-[560px] bg-bg">
              <h3 className="text-[19px] mb-[7px]">You&apos;re on the list.</h3>
              <p className="text-[14.5px] leading-[1.55] text-body">
                We reply within 48 hours with the founding-trainer brief and a
                slot to build your first twin.
              </p>
            </div>
          )}

          {!submitted && (
            <div className="mt-5 md:mt-4 flex items-center gap-4 md:gap-[18px] flex-wrap">
              <a
                href="#demo"
                className="inline-flex items-center gap-[9px] border-[1.5px] border-dark py-[11px] px-4 text-[14px] font-semibold hover:bg-bg transition-colors"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch 90 sec demo
              </a>
              <span className="font-mono text-[12px] text-muted">
                Free through beta · no card
              </span>
            </div>
          )}

          <div className="mt-8 md:mt-11 pt-6 md:pt-[26px] border-t border-border-light flex items-center gap-3.5">
            <div className="flex">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-[34px] h-[34px] border border-border bg-border-light overflow-hidden"
                  style={{ marginLeft: i > 1 ? "-1px" : 0 }}
                />
              ))}
            </div>
            <p className="text-[14px] text-body">
              <strong className="font-bold">240+ trainers</strong> on the
              early-access list
            </p>
          </div>
        </div>

        <div>
          <div className="border-2 border-dark bg-bg">
            <div className="flex items-center justify-between py-3 px-4 border-b border-dark">
              <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-muted">
                Live roleplay · System design
              </span>
              <span className="font-mono text-[11px] text-brand-light">
                REC 12:04
              </span>
            </div>
            <div className="filter grayscale h-[200px] md:h-[300px] border-b border-dark bg-border-light" />
            <div className="p-4 md:p-[18px_16px] grid gap-3">
              <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-muted">
                Your twin asked
              </p>
              <p className="text-[15px] leading-[1.5]">
                &ldquo;You&apos;ve sharded by user id. Walk me through what
                happens to the hot partition when a single tenant grows
                40×.&rdquo;
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-0 border-2 border-dark border-t-0">
            <div className="py-4 md:py-[18px] px-3 md:px-4 border-r border-dark">
              <p className="font-serif font-semibold text-xl md:text-[26px] leading-none">
                1,900
              </p>
              <p className="font-mono text-[10px] md:text-[11px] tracking-[0.06em] uppercase text-muted mt-[6px]">
                Interviews run last month
              </p>
            </div>
            <div className="py-4 md:py-[18px] px-3 md:px-4">
              <p className="font-serif font-semibold text-xl md:text-[26px] leading-none">
                0
              </p>
              <p className="font-mono text-[10px] md:text-[11px] tracking-[0.06em] uppercase text-muted mt-[6px]">
                Hours on the trainer&apos;s calendar
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
