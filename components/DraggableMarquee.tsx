"use client";

import {
  useEffect,
  useMemo,
  useRef,
  type Key,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

if (typeof window !== "undefined") gsap.registerPlugin(Draggable);

type DraggableMarqueeProps<T> = {
  items: readonly T[];
  renderItem: (item: T, index: number, duplicate: boolean) => ReactNode;
  getItemKey: (item: T, index: number) => Key;
  durationSeconds: number;
  repeatCount?: number;
  className?: string;
  trackClassName?: string;
  itemClassName?: string;
  pauseOnHover?: boolean;
  label?: string;
  throwMultiplier?: number;
  throwFriction?: number;
  maxThrowVelocity?: number;
};

export function DraggableMarquee<T>({
  items,
  renderItem,
  getItemKey,
  durationSeconds,
  repeatCount = 3,
  className = "",
  trackClassName = "",
  itemClassName = "",
  pauseOnHover = false,
  label = "Scrolling content. Drag or use the left and right arrow keys.",
  throwMultiplier = 2.8,
  throwFriction = 0.975,
  maxThrowVelocity = 60,
}: DraggableMarqueeProps<T>) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const dragRef = useRef<Draggable | null>(null);

  const repeatedItems = useMemo(
    () => Array.from({ length: repeatCount }, () => items).flat(),
    [items, repeatCount],
  );

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track || !items.length) return;

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      let singleSetWidth = 0;
      let x = 0;
      let throwVelocity = 0;
      let isDragging = false;
      let isPointerOver = false;
      let hasFocus = false;
      let isVisible = true;
      let lastDragX = 0;
      let lastDragTime = 0;
      let resizeFrame = 0;
      let wrap = (value: number) => value;

      const setX = gsap.quickSetter(track, "x", "px");
      const getGap = () => {
        const styles = window.getComputedStyle(track);
        return parseFloat(styles.columnGap || styles.gap || "0");
      };

      const measure = () => {
        const firstSet = Array.from(track.children).slice(0, items.length);
        if (!firstSet.length) return;

        const previousWidth = singleSetWidth;
        const previousProgress = previousWidth
          ? gsap.utils.wrap(0, 1, -x / previousWidth)
          : 0;
        singleSetWidth =
          firstSet.reduce(
            (total, child) => total + child.getBoundingClientRect().width,
            0,
          ) + getGap() * firstSet.length;
        wrap = gsap.utils.wrap(-singleSetWidth, 0);
        x = wrap(-singleSetWidth * previousProgress);
        setX(x);
      };

      const scheduleMeasure = () => {
        cancelAnimationFrame(resizeFrame);
        resizeFrame = requestAnimationFrame(measure);
      };

      const update = (_time: number, deltaTime: number) => {
        if (!isVisible || document.hidden || isDragging) return;

        const frameRatio = deltaTime / (1000 / 60);
        if (!(pauseOnHover && (isPointerOver || hasFocus))) {
          x -= (singleSetWidth / durationSeconds / 60) * frameRatio;
        }
        x += throwVelocity * frameRatio;
        throwVelocity *= Math.pow(throwFriction, frameRatio);
        if (Math.abs(throwVelocity) < 0.01) throwVelocity = 0;

        x = wrap(x);
        setX(x);
      };

      measure();
      dragRef.current = Draggable.create(track, {
        type: "x",
        allowContextMenu: true,
        dragClickables: true,
        onPress() {
          isDragging = true;
          throwVelocity = 0;
          this.x = x;
          lastDragX = this.x;
          lastDragTime = performance.now();
        },
        onDrag() {
          const now = performance.now();
          const elapsed = now - lastDragTime;
          const delta = this.x - lastDragX;
          x = wrap(this.x);
          setX(x);
          this.x = x;

          if (elapsed > 0) {
            throwVelocity = gsap.utils.clamp(
              -maxThrowVelocity,
              maxThrowVelocity,
              (delta / elapsed) * 36.67 * throwMultiplier,
            );
          }
          lastDragX = this.x;
          lastDragTime = now;
        },
        onRelease() {
          isDragging = false;
        },
      })[0];

      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        throwVelocity = 0;
        x = wrap(
          x + (event.key === "ArrowLeft" ? 1 : -1) * root.clientWidth * 0.35,
        );
        setX(x);
      };
      const onPointerEnter = () => (isPointerOver = true);
      const onPointerLeave = () => (isPointerOver = false);
      const onFocusIn = () => (hasFocus = true);
      const onFocusOut = () => (hasFocus = false);

      root.addEventListener("keydown", onKeyDown);
      root.addEventListener("mouseenter", onPointerEnter);
      root.addEventListener("mouseleave", onPointerLeave);
      root.addEventListener("focusin", onFocusIn);
      root.addEventListener("focusout", onFocusOut);
      window.addEventListener("resize", scheduleMeasure);

      const resizeObserver = new ResizeObserver(scheduleMeasure);
      resizeObserver.observe(track);
      Array.from(track.children)
        .slice(0, items.length)
        .forEach((child) => resizeObserver.observe(child));

      const intersectionObserver = new IntersectionObserver(
        ([entry]) => (isVisible = entry.isIntersecting),
      );
      intersectionObserver.observe(root);
      gsap.ticker.add(update);

      return () => {
        root.removeEventListener("keydown", onKeyDown);
        root.removeEventListener("mouseenter", onPointerEnter);
        root.removeEventListener("mouseleave", onPointerLeave);
        root.removeEventListener("focusin", onFocusIn);
        root.removeEventListener("focusout", onFocusOut);
        window.removeEventListener("resize", scheduleMeasure);
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        gsap.ticker.remove(update);
        cancelAnimationFrame(resizeFrame);
        dragRef.current?.kill();
        dragRef.current = null;
      };
    }, root);

    return () => media.revert();
  }, [
    durationSeconds,
    items,
    maxThrowVelocity,
    pauseOnHover,
    repeatCount,
    throwFriction,
    throwMultiplier,
  ]);

  if (!items.length) return null;

  return (
    <div
      ref={rootRef}
      tabIndex={0}
      role="region"
      aria-label={label}
      className={`obsidian-draggable-marquee ${className}`.trim()}
    >
      <ul ref={trackRef} className={trackClassName}>
        {repeatedItems.map((item, index) => {
          const itemIndex = index % items.length;
          const duplicate = index >= items.length;
          return (
            <li
              key={`${String(getItemKey(item, itemIndex))}-${index}`}
              className={itemClassName}
              aria-hidden={duplicate || undefined}
              data-marquee-copy={duplicate ? "duplicate" : "original"}
            >
              {renderItem(item, itemIndex, duplicate)}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
