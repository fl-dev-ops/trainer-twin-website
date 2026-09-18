"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import "./PixelTransition.css";

function PixelTransition({
  firstContent,
  secondContent,
  gridSize = 7,
  pixelColor = "currentColor",
  animationStepDuration = 0.3,
  once = false,
  aspectRatio = "100%",
  className = "",
  style = {},
  /** When set, skip hover/click and loop first→second on a timer. */
  autoPlay = false,
  /** Seconds between automatic reveals. */
  autoPlayInterval = 2.2,
  /** After a reveal settles, hide the active layer without reversing. */
  onAutoAdvance,
}) {
  const containerRef = useRef(null);
  const pixelGridRef = useRef(null);
  const activeRef = useRef(null);
  const delayedCallRef = useRef(null);
  const settleCallRef = useRef(null);
  const animatePixelsRef = useRef(null);
  const onAutoAdvanceRef = useRef(onAutoAdvance);

  const [isActive, setIsActive] = useState(false);

  onAutoAdvanceRef.current = onAutoAdvance;

  useEffect(() => {
    const pixelGridEl = pixelGridRef.current;
    if (!pixelGridEl) return;

    pixelGridEl.innerHTML = "";

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const pixel = document.createElement("div");
        pixel.classList.add("pixelated-image-card__pixel");
        pixel.style.backgroundColor = pixelColor;

        const size = 100 / gridSize;
        pixel.style.width = `${size}%`;
        pixel.style.height = `${size}%`;
        pixel.style.left = `${col * size}%`;
        pixel.style.top = `${row * size}%`;
        pixelGridEl.appendChild(pixel);
      }
    }
  }, [gridSize, pixelColor]);

  const animatePixels = (activate) => {
    setIsActive(activate);

    const pixelGridEl = pixelGridRef.current;
    const activeEl = activeRef.current;
    if (!pixelGridEl || !activeEl) return;

    const pixels = pixelGridEl.querySelectorAll(".pixelated-image-card__pixel");
    if (!pixels.length) return;

    gsap.killTweensOf(pixels);
    if (delayedCallRef.current) {
      delayedCallRef.current.kill();
    }

    gsap.set(pixels, { display: "none" });

    const totalPixels = pixels.length;
    const staggerDuration = animationStepDuration / totalPixels;

    gsap.to(pixels, {
      display: "block",
      duration: 0,
      stagger: {
        each: staggerDuration,
        from: "random",
      },
    });

    delayedCallRef.current = gsap.delayedCall(animationStepDuration, () => {
      activeEl.style.display = activate ? "block" : "none";
      activeEl.style.pointerEvents = activate ? "none" : "";
    });

    gsap.to(pixels, {
      display: "none",
      duration: 0,
      delay: animationStepDuration,
      stagger: {
        each: staggerDuration,
        from: "random",
      },
    });
  };

  animatePixelsRef.current = animatePixels;

  useEffect(() => {
    if (!autoPlay) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let holdTimer;

    const settleMs = animationStepDuration * 2 * 1000;
    const holdMs = autoPlayInterval * 1000;

    const cycle = () => {
      holdTimer = window.setTimeout(() => {
        if (cancelled) return;
        animatePixelsRef.current?.(true);
        settleCallRef.current?.kill();
        settleCallRef.current = gsap.delayedCall(settleMs / 1000, () => {
          if (cancelled) return;
          if (activeRef.current) {
            activeRef.current.style.display = "none";
          }
          setIsActive(false);
          onAutoAdvanceRef.current?.();
          cycle();
        });
      }, holdMs);
    };

    cycle();

    return () => {
      cancelled = true;
      window.clearTimeout(holdTimer);
      settleCallRef.current?.kill();
      delayedCallRef.current?.kill();
    };
  }, [autoPlay, autoPlayInterval, animationStepDuration]);

  const handleEnter = () => {
    if (!isActive) animatePixels(true);
  };
  const handleLeave = () => {
    if (isActive && !once) animatePixels(false);
  };
  const handleClick = () => {
    if (!isActive) animatePixels(true);
    else if (isActive && !once) animatePixels(false);
  };

  const isTouchDevice =
    typeof window !== "undefined" &&
    ("ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches);

  const interactive = !autoPlay;

  return (
    <div
      ref={containerRef}
      className={`pixelated-image-card ${className}`}
      style={style}
      onMouseEnter={interactive && !isTouchDevice ? handleEnter : undefined}
      onMouseLeave={interactive && !isTouchDevice ? handleLeave : undefined}
      onClick={interactive && isTouchDevice ? handleClick : undefined}
      onFocus={interactive && !isTouchDevice ? handleEnter : undefined}
      onBlur={interactive && !isTouchDevice ? handleLeave : undefined}
      tabIndex={interactive ? 0 : undefined}
    >
      <div style={{ paddingTop: aspectRatio }} />
      <div className="pixelated-image-card__default" aria-hidden={isActive}>
        {firstContent}
      </div>
      <div
        className="pixelated-image-card__active"
        ref={activeRef}
        aria-hidden={!isActive}
      >
        {secondContent}
      </div>
      <div className="pixelated-image-card__pixels" ref={pixelGridRef} />
    </div>
  );
}

export default PixelTransition;
