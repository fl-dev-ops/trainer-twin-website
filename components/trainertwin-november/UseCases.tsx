"use client";

import { useEffect, useRef, useState } from "react";
import { USE_CASES } from "./useCaseData";
import { UseCaseStageRunner } from "./UseCaseStageRunner";
import { USE_CASE_TAB_ICONS } from "./useCaseTabIcons";
import { smoothScrollTo } from "./smoothScrollTo";

/** A list on the left, an example conversation on the right — rotates on its own, pauses after a click. */
export function UseCases() {
  const [current, setCurrent] = useState(0);
  const pausedRef = useRef(false);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      if (pausedRef.current) return;
      setCurrent((prev) => (prev + 1) % USE_CASES.length);
    }, 3750);
    return () => clearInterval(id);
  }, []);

  useEffect(() => () => clearTimeout(pauseTimeoutRef.current), []);

  useEffect(() => {
    const list = listRef.current;
    const activeBtn = list?.children[current] as HTMLElement | undefined;
    if (!list || !activeBtn) return;
    if (list.scrollWidth > list.clientWidth) {
      let reduceMotion = false;
      try {
        reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      } catch {
        // ignore
      }
      list.scrollTo({ left: activeBtn.offsetLeft - list.offsetLeft - 8, behavior: reduceMotion ? "auto" : "smooth" });
    }
  }, [current]);

  function select(i: number) {
    pausedRef.current = true;
    clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, 15000);
    setCurrent(i);
  }

  const active = USE_CASES[current];

  return (
    <section className="uses" id="uses">
      <div className="wrap">
        <h2>What coaches are exploring with their twins</h2>
        <p className="uses-sub">
          These are the ways coaches, trainers and professors are exploring their twins with us.
        </p>
        <div className="usecase">
          <div className="uc-list" ref={listRef} role="tablist" aria-label="Ways coaches use their twins">
            {USE_CASES.map((useCase, i) => {
              const Icon = USE_CASE_TAB_ICONS[i];
              return (
                <button
                  key={useCase.t}
                  type="button"
                  className="uc-item"
                  role="tab"
                  aria-selected={i === current}
                  onClick={() => select(i)}
                >
                  <span className="uc-item-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <span className="uc-item-body">
                    <b>{useCase.t}</b>
                    <span>{useCase.d}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <div className="uc-stage" aria-live="polite">
            <UseCaseStageRunner key={current} useCase={active} />
          </div>
        </div>
        <div className="uses-cta">
          <p>Have a different idea for your twin? We&rsquo;d be happy to explore it with you.</p>
          <a
            className="cta"
            href="#build"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo("build");
            }}
          >
            Tell us in the form below
          </a>
        </div>
      </div>
    </section>
  );
}
