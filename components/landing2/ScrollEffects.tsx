"use client";

import { useEffect } from "react";

/**
 * The page's whole motion layer, mounted once.
 *
 * Deliberately attribute-driven rather than a <Reveal> wrapper component: the
 * sections stay Server Components and ship no JavaScript of their own, and a
 * block opts in by declaring `data-reveal` instead of being wrapped in an extra
 * div that would break the grid and flex layouts it sits in.
 *
 *   data-reveal            enter on scroll (opacity + rise)
 *   data-reveal-delay      ms, for staggering siblings
 *   data-reveal-y          px of rise, default 30
 *   data-parallax          speed multiplier, e.g. "0.3"; negative moves against
 *                          the scroll. Written to the independent `translate`
 *                          property rather than `transform`, so a target can
 *                          keep its Tailwind `-translate-x-1/2` or `scale`
 *                          instead of having them overwritten every frame.
 *   data-sticky-header     toggles `is-stuck` past the fold line
 */
export function ScrollEffects() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    // --------------------------------------------------------------- reveal
    const revealTargets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    for (const el of revealTargets) {
      el.classList.add("l-reveal");
      const delay = el.dataset.revealDelay;
      const rise = el.dataset.revealY;
      if (delay) el.style.setProperty("--l-reveal-delay", `${delay}ms`);
      if (rise) el.style.setProperty("--l-reveal-y", `${rise}px`);
    }

    let observer: IntersectionObserver | undefined;

    if (reduced.matches) {
      for (const el of revealTargets) el.classList.add("is-in", "is-done");
    } else {
      observer = new IntersectionObserver(
        (entries, obs) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const el = entry.target as HTMLElement;
            el.classList.add("is-in");
            // Reveals are one-way: scrolling back up must not replay them, so
            // the element is dropped from the observer as soon as it lands.
            obs.unobserve(el);
            el.addEventListener(
              "transitionend",
              () => el.classList.add("is-done"),
              { once: true },
            );
          }
        },
        // Bottom inset means a block commits once it enters the viewport
        { rootMargin: "0px 0px -6% 0px", threshold: 0.05 },
      );

      for (const el of revealTargets) observer.observe(el);
    }

    // ------------------------------------------------------------- parallax
    const parallaxTargets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]"),
    ).map((el) => ({ el, speed: Number(el.dataset.parallax) || 0 }));

    for (const { el } of parallaxTargets) el.classList.add("l-parallax");

    const header = document.querySelector<HTMLElement>("[data-sticky-header]");

    let frame = 0;
    let stuck = false;

    const paint = () => {
      frame = 0;
      const vh = window.innerHeight;

      if (header) {
        const shouldStick = window.scrollY > 8;
        if (shouldStick !== stuck) {
          stuck = shouldStick;
          header.classList.toggle("is-stuck", stuck);
        }
      }

      if (reduced.matches) return;

      for (const { el, speed } of parallaxTargets) {
        const rect = el.getBoundingClientRect();
        // Skip anything well outside the viewport — on a 8780px page most of
        // the parallax targets are off screen on any given frame.
        if (rect.bottom < -vh || rect.top > vh * 2) continue;
        // 0 when the element is centred, +1 when its centre sits one viewport
        // height below the centre line. Multiplying by the viewport keeps the
        // travel proportional on a laptop and on a tall monitor alike.
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        el.style.translate = `0 ${(progress * speed * 100).toFixed(2)}px`;
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
