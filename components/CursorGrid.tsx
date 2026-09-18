"use client";

import { useEffect, useRef } from "react";
import { cn } from "./cn";

/**
 * A lattice that lights up under the cursor, after the React Bits component of
 * the same name. Canvas, one alpha per cell, and the frame loop stops itself
 * once every cell has faded — so an idle page costs nothing.
 *
 * Two changes from upstream, both needed to use it as a background rather than
 * as a foreground panel:
 *
 *   · It listens on the window, not on its own container. Behind the page's
 *     content, a container listener never sees the pointer — every move over
 *     the copy or the button would be swallowed by the layer above it.
 *     `toLocal` already works off the canvas rect, so the coordinates map
 *     without further change.
 *   · A move outside the canvas (plus one radius of slack) is ignored rather
 *     than waking the loop, or every pointer move anywhere on an 8780px page
 *     would start a frame just to find nothing lit.
 *
 * Honours prefers-reduced-motion by never attaching at all, leaving a blank
 * canvas behind the content.
 */
type Falloff = "linear" | "smooth" | "sharp";

const FALLOFF_CURVES: Record<Falloff, (t: number) => number> = {
  linear: (t) => t,
  smooth: (t) => t * t * (3 - 2 * t),
  sharp: (t) => t * t * t,
};

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const v =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const num = parseInt(v.slice(0, 6), 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

export interface CursorGridProps {
  cellSize?: number;
  color?: string;
  radius?: number;
  falloff?: Falloff;
  holdTime?: number;
  fadeDuration?: number;
  lineWidth?: number;
  maxOpacity?: number;
  fillOpacity?: number;
  gridOpacity?: number;
  /**
   * Colour of the resting lattice. Defaults to `color`, which is right when
   * the grid is the glow at low alpha — but a lattice that is on all the time
   * usually wants to be neutral while the glow stays brand.
   */
  gridColor?: string;
  cellRadius?: number;
  clickPulse?: boolean;
  pulseSpeed?: number;
  className?: string;
}

export function CursorGrid({
  cellSize = 70,
  color = "#D946EF",
  radius = 140,
  falloff = "smooth",
  holdTime = 400,
  fadeDuration = 800,
  lineWidth = 1.2,
  maxOpacity = 1,
  fillOpacity = 0,
  gridOpacity = 0,
  /* Empty rather than undefined: the props mirror is `Required<…>`, and an
     empty string reads as "fall back to `color`" just as well. */
  gridColor = "",
  cellRadius = 0,
  clickPulse = true,
  pulseSpeed = 600,
  className = "",
}: CursorGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const propsRef = useRef<Required<Omit<CursorGridProps, "className">>>({
    cellSize,
    color,
    radius,
    falloff,
    holdTime,
    fadeDuration,
    lineWidth,
    maxOpacity,
    fillOpacity,
    gridOpacity,
    gridColor,
    cellRadius,
    clickPulse,
    pulseSpeed,
  });

  /* Upstream writes this during render; React forbids touching a ref there, so
     it syncs after each one instead. The frame loop only ever reads it
     asynchronously, and `useRef` above seeds it with the same values, so the
     first frame is already correct. */
  useEffect(() => {
    propsRef.current = {
      cellSize,
      color,
      radius,
      falloff,
      holdTime,
      fadeDuration,
      lineWidth,
      maxOpacity,
      fillOpacity,
      gridOpacity,
      gridColor,
      cellRadius,
      clickPulse,
      pulseSpeed,
    };
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let cols = 0;
    let rows = 0;
    let offX = 0;
    let offY = 0;
    let alphas = new Float32Array(0);
    let touched = new Float64Array(0);
    let w = 0;
    let h = 0;
    const pulses: Array<{ x: number; y: number; t0: number }> = [];
    let raf = 0;
    let running = false;
    let lastFrame = 0;

    const rebuild = () => {
      const p = propsRef.current;
      w = container.offsetWidth;
      h = container.offsetHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / p.cellSize) + 1;
      rows = Math.ceil(h / p.cellSize) + 1;
      // Centred, so the edge cells crop evenly on both sides.
      offX = (w - cols * p.cellSize) / 2;
      offY = (h - rows * p.cellSize) / 2;
      alphas = new Float32Array(cols * rows);
      touched = new Float64Array(cols * rows);
    };

    const cellCenter = (i: number): [number, number] => {
      const p = propsRef.current;
      return [
        offX + (i % cols) * p.cellSize + p.cellSize / 2,
        offY + Math.floor(i / cols) * p.cellSize + p.cellSize / 2,
      ];
    };

    const energize = (x: number, y: number, boost?: number) => {
      const p = propsRef.current;
      const r = Math.max(p.radius, 1);
      const ease = FALLOFF_CURVES[p.falloff] ?? FALLOFF_CURVES.linear;
      const now = performance.now();
      const minCol = Math.max(0, Math.floor((x - r - offX) / p.cellSize));
      const maxCol = Math.min(
        cols - 1,
        Math.floor((x + r - offX) / p.cellSize),
      );
      const minRow = Math.max(0, Math.floor((y - r - offY) / p.cellSize));
      const maxRow = Math.min(
        rows - 1,
        Math.floor((y + r - offY) / p.cellSize),
      );
      for (let cRow = minRow; cRow <= maxRow; cRow++) {
        for (let cCol = minCol; cCol <= maxCol; cCol++) {
          const i = cRow * cols + cCol;
          const [cx, cy] = cellCenter(i);
          const dist = Math.hypot(cx - x, cy - y);
          if (dist > r) continue;
          const level = ease(1 - dist / r) * p.maxOpacity * (boost ?? 1);
          if (level > alphas[i]) {
            alphas[i] = level;
            touched[i] = now;
          } else if (level > 0) {
            touched[i] = now;
          }
        }
      }
    };

    const draw = (now: number) => {
      const p = propsRef.current;
      const dt = Math.min(now - lastFrame, 50);
      lastFrame = now;
      ctx.clearRect(0, 0, w, h);
      const [cr, cg, cb] = hexToRgb(p.color);

      if (p.gridOpacity > 0) {
        const [gr, gg, gb] = p.gridColor ? hexToRgb(p.gridColor) : [cr, cg, cb];
        ctx.strokeStyle = `rgba(${gr}, ${gg}, ${gb}, ${p.gridOpacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let cCol = 0; cCol <= cols; cCol++) {
          const x = Math.round(offX + cCol * p.cellSize) + 0.5;
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
        }
        for (let cRow = 0; cRow <= rows; cRow++) {
          const y = Math.round(offY + cRow * p.cellSize) + 0.5;
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
        }
        ctx.stroke();
      }

      for (let pi = pulses.length - 1; pi >= 0; pi--) {
        const pulse = pulses[pi];
        const age = (now - pulse.t0) / 1000;
        const ringR = age * p.pulseSpeed;
        if (ringR > Math.hypot(w, h)) {
          pulses.splice(pi, 1);
          continue;
        }
        const band = p.cellSize;
        const minCol = Math.max(
          0,
          Math.floor((pulse.x - ringR - band - offX) / p.cellSize),
        );
        const maxCol = Math.min(
          cols - 1,
          Math.floor((pulse.x + ringR + band - offX) / p.cellSize),
        );
        const minRow = Math.max(
          0,
          Math.floor((pulse.y - ringR - band - offY) / p.cellSize),
        );
        const maxRow = Math.min(
          rows - 1,
          Math.floor((pulse.y + ringR + band - offY) / p.cellSize),
        );
        for (let cRow = minRow; cRow <= maxRow; cRow++) {
          for (let cCol = minCol; cCol <= maxCol; cCol++) {
            const i = cRow * cols + cCol;
            const [cx, cy] = cellCenter(i);
            const dist = Math.hypot(cx - pulse.x, cy - pulse.y);
            if (Math.abs(dist - ringR) < band / 2 && p.maxOpacity > alphas[i]) {
              alphas[i] = p.maxOpacity;
              touched[i] = now;
            }
          }
        }
      }

      let anyVisible = pulses.length > 0;
      const fadeStep = dt / Math.max(p.fadeDuration, 16);
      const half = p.cellSize / 2;

      for (let i = 0; i < alphas.length; i++) {
        let a = alphas[i];
        if (a <= 0) continue;
        if (now - touched[i] > p.holdTime) {
          a = Math.max(0, a - fadeStep);
          alphas[i] = a;
          if (a <= 0) continue;
        }
        anyVisible = true;

        const [cx, cy] = cellCenter(i);
        const gradient = ctx.createRadialGradient(
          cx,
          cy,
          half * 0.1,
          cx,
          cy,
          p.cellSize,
        );
        gradient.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, ${a})`);
        gradient.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);

        const x = cx - half + 0.5;
        const y = cy - half + 0.5;
        const s = p.cellSize - 1;

        ctx.beginPath();
        if (p.cellRadius > 0) {
          ctx.roundRect(x, y, s, s, p.cellRadius);
        } else {
          ctx.rect(x, y, s, s);
        }
        if (p.fillOpacity > 0) {
          ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${a * p.fillOpacity})`;
          ctx.fill();
        }
        ctx.strokeStyle = gradient;
        ctx.lineWidth = p.lineWidth;
        ctx.stroke();
      }

      if (anyVisible) {
        raf = requestAnimationFrame(draw);
      } else {
        running = false;
        if (propsRef.current.gridOpacity <= 0) ctx.clearRect(0, 0, w, h);
      }
    };

    const wake = () => {
      if (running) return;
      running = true;
      lastFrame = performance.now();
      raf = requestAnimationFrame(draw);
    };

    /** Null when the pointer is far enough away that nothing could light. */
    const toLocal = (e: PointerEvent): [number, number] | null => {
      const rect = canvas.getBoundingClientRect();
      const slack = propsRef.current.radius;
      if (
        e.clientX < rect.left - slack ||
        e.clientX > rect.right + slack ||
        e.clientY < rect.top - slack ||
        e.clientY > rect.bottom + slack
      ) {
        return null;
      }
      return [e.clientX - rect.left, e.clientY - rect.top];
    };

    const onPointerMove = (e: PointerEvent) => {
      const at = toLocal(e);
      if (!at) return;
      energize(at[0], at[1]);
      wake();
    };

    const onPointerDown = (e: PointerEvent) => {
      if (!propsRef.current.clickPulse) return;
      const at = toLocal(e);
      if (!at) return;
      pulses.push({ x: at[0], y: at[1], t0: performance.now() });
      wake();
    };

    const ro = new ResizeObserver(() => {
      rebuild();
      wake();
    });
    ro.observe(container);
    rebuild();

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerdown", onPointerDown);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [cellSize]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none relative h-full w-full overflow-hidden",
        className,
      )}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
