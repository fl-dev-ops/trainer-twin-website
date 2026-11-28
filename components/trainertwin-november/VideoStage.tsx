"use client";

import { useEffect, useRef, useState } from "react";
import TiltedCard from "./TiltedCard";

const MINI_WIDTH = 170;
const MINI_MARGIN = 20;

function CoverArt() {
  return (
    <>
      <span className="cover-brand">
        <img src="/trainertwin-november/mark.svg" alt="" width={20} height={20} />
        TrainerTwin
      </span>
      <span className="cover-big-play" aria-hidden="true">
        <svg viewBox="0 0 24 24" width={34} height={34}>
          <path d="M8 5v14l11-7z" fill="currentColor" />
        </svg>
      </span>
      <span className="cover-title">See how TrainerTwin works</span>
      <span className="cover-chapters">
        <span>Build</span>
        <i />
        <span>Calibrate</span>
        <i />
        <span>Deploy</span>
        <i />
        <span>Real coaches</span>
      </span>
      <span className="cover-len">2 min</span>
    </>
  );
}

/**
 * The hero's video card. Once the hero scrolls about half out of view, this
 * exact card (not a copy) eases into a small widget pinned to the bottom-right
 * corner — a FLIP transition: capture its current rect, switch to
 * `position:fixed` at that rect with no transition, then animate to the
 * target rect — and reverses the same way scrolling back up. Clicking it,
 * large or mini, opens a popup with the video at a bigger size.
 *
 * `.stage` plays an entrance animation on `transform` (`animation: rise ...
 * both`), and a transform animation — even one finished and held by
 * `fill-mode: both` — makes its element a containing block for
 * `position:fixed` descendants, which would otherwise position this card
 * relative to `.stage` instead of the viewport. Once that entrance animation
 * actually finishes, its `animation` is cleared (`stage.style.animation =
 * "none"`) so `.stage` stops being a containing block and `position:fixed`
 * resolves against the real viewport, the way a pinned widget needs to.
 *
 * There is no real video file behind this yet (same limitation as the
 * prototype it was ported from): the popup shows the same cover art rather
 * than actual playback. The mechanism is ready for whenever a real `.mp4`
 * is added.
 */
export function VideoStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const soloRef = useRef<HTMLElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const coverButtonRef = useRef<HTMLButtonElement>(null);
  const pinnedRef = useRef(false);
  const readyRef = useRef(false);
  const [isPinned, setIsPinned] = useState(false);
  const [spacerSize, setSpacerSize] = useState<{ width: number; height: number } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    const solo = soloRef.current;
    const spacer = spacerRef.current;
    const hero = document.getElementById("twin");
    if (!stage || !solo || !spacer || !hero) return;

    let reduceMotion = false;
    try {
      reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      // ignore
    }

    const miniRect = () => {
      const h = (MINI_WIDTH * 4) / 3;
      return {
        top: window.innerHeight - h - MINI_MARGIN,
        left: window.innerWidth - MINI_WIDTH - MINI_MARGIN,
        width: MINI_WIDTH,
        height: h,
      };
    };
    const applyRect = (el: HTMLElement, r: { top: number; left: number; width: number; height: number }) => {
      el.style.top = `${r.top}px`;
      el.style.left = `${r.left}px`;
      el.style.width = `${r.width}px`;
      el.style.height = `${r.height}px`;
    };

    const pin = () => {
      if (pinnedRef.current || !readyRef.current) return;
      pinnedRef.current = true;
      const r = solo.getBoundingClientRect();
      setSpacerSize({ width: r.width, height: r.height });
      setIsPinned(true);
      applyRect(solo, { top: r.top, left: r.left, width: r.width, height: r.height });
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          applyRect(solo, miniRect());
        });
      });
    };
    const unpin = () => {
      if (!pinnedRef.current) return;
      const r = spacer.getBoundingClientRect();
      applyRect(solo, { top: r.top, left: r.left, width: r.width, height: r.height });
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        solo.removeEventListener("transitionend", finish);
        pinnedRef.current = false;
        setIsPinned(false);
        setSpacerSize(null);
        solo.style.top = solo.style.left = solo.style.width = solo.style.height = "";
      };
      if (reduceMotion) finish();
      else {
        solo.addEventListener("transitionend", finish);
        setTimeout(finish, 750);
      }
    };
    const checkScroll = () => {
      const shouldPin = hero.getBoundingClientRect().bottom < window.innerHeight * 0.5;
      if (shouldPin) pin();
      else unpin();
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        checkScroll();
      });
    };
    const onResize = () => {
      if (pinnedRef.current) applyRect(solo, miniRect());
    };
    const onStageAnimationEnd = (e: AnimationEvent) => {
      if (e.target !== stage) return;
      stage.style.animation = "none";
      readyRef.current = true;
      setIntroDone(true);
      checkScroll();
    };

    // Reduced motion never plays the entrance animation at all, so `animationend`
    // would never fire — mark ready immediately in that case.
    if (reduceMotion) {
      stage.style.animation = "none";
      readyRef.current = true;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reduced motion never fires animationend, so this is the one-time substitute for that event
      setIntroDone(true);
    } else {
      stage.addEventListener("animationend", onStageAnimationEnd);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      stage.removeEventListener("animationend", onStageAnimationEnd);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setModalOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [modalOpen]);

  function closeModal() {
    setModalOpen(false);
    coverButtonRef.current?.focus();
  }

  return (
    <div className="stage" ref={stageRef}>
      <figure ref={soloRef} className={isPinned ? "solo is-pinned" : "solo"}>
        <div className="screen has-video">
          <TiltedCard
            containerWidth="100%"
            containerHeight="100%"
            imageWidth="100%"
            imageHeight="100%"
            radius={22}
            // `.stage` plays its own transform-animated entrance; a 3D (perspective +
            // preserve-3d) descendant mounted while an ancestor is mid-transform-animation
            // can render sheared in Chromium, so the tilt only turns on once that settles.
            perspective={introDone ? 800 : 100000}
            rotateAmplitude={introDone && !isPinned ? 7 : 0}
            scaleOnHover={introDone && !isPinned ? 1.015 : 1}
            glare={introDone && !isPinned ? 0.25 : 0}
            shadow={introDone && !isPinned ? 0.3 : 0}
            showTooltip={false}
            intro={false}
          >
            <video id="tt-video" preload="metadata" width={1280} height={720} />
            <button
              ref={coverButtonRef}
              type="button"
              className="cover warm"
              aria-label="See how TrainerTwin works, 2 minutes"
              onClick={() => setModalOpen(true)}
            >
              <CoverArt />
            </button>
          </TiltedCard>
        </div>
      </figure>
      <div
        ref={spacerRef}
        className="solo-spacer"
        hidden={!spacerSize}
        style={spacerSize ? { width: spacerSize.width, height: spacerSize.height } : undefined}
      />

      {modalOpen && (
        <div className="video-modal">
          <div className="video-modal-backdrop" onClick={closeModal} />
          <div
            className="video-modal-panel"
            role="dialog"
            aria-modal="true"
            aria-label="See how TrainerTwin works"
          >
            <button
              ref={closeButtonRef}
              type="button"
              className="video-modal-close"
              aria-label="Close video"
              onClick={closeModal}
            >
              <svg aria-hidden="true" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
            <div className="screen has-video">
              <video id="tt-video-modal" preload="metadata" width={1280} height={720} />
              <span className="cover warm" aria-hidden="true" style={{ position: "absolute", cursor: "default" }}>
                <CoverArt />
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
