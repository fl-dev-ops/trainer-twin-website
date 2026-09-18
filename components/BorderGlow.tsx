"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import "./BorderGlow.css";

/**
 * A card whose border lights up where the pointer approaches it, after the
 * React Bits component of the same name. Ported to TypeScript; the effect and
 * the prop names are upstream's.
 *
 * Two changes, both so it can wrap this project's cards rather than only its
 * own demo:
 *
 *   · `backgroundColor` takes any CSS value, custom properties included, and a
 *     `surface` prop says whether the card is light or dark. Upstream inferred
 *     that from the luminance of a hex, which cannot be done with a token.
 *   · `innerClassName` reaches the element the children sit in, so a card that
 *     needs its own padding or layout does not need a second wrapper.
 *
 * The glow is pointer-driven and decorative: under `prefers-reduced-motion` the
 * layers are not drawn at all (see the stylesheet).
 */
export interface BorderGlowProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  /** How close to the edge the pointer must be before the glow shows, 0-100. */
  edgeSensitivity?: number;
  /** Glow colour as `"H S L"`, e.g. `"40 80 80"`. */
  glowColor?: string;
  /** Any CSS colour value, including `var(--token)`. */
  backgroundColor?: string;
  /**
   * Which way the card reads. Upstream guessed from the hex; a token cannot be
   * read that way, so it is stated. Only changes the resting border and shadow.
   */
  surface?: "light" | "dark";
  borderRadius?: number | string;
  /** How far the outer glow reaches past the card, in px. */
  glowRadius?: number;
  glowIntensity?: number;
  /** Width of the directional cone, as a percentage, 5-45. */
  coneSpread?: number;
  /** Play one sweep on mount. */
  animated?: boolean;
  /** Three hex colours for the mesh border. */
  colors?: [string, string, string];
  fillOpacity?: number;
}

function parseHsl(value: string) {
  const m = value.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!m) return { h: 40, s: 80, l: 80 };
  return { h: +m[1], s: +m[2], l: +m[3] };
}

function glowVars(glowColor: string, intensity: number) {
  const { h, s, l } = parseHsl(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const steps: Array<[string, number]> = [
    ["", 100],
    ["-60", 60],
    ["-50", 50],
    ["-40", 40],
    ["-30", 30],
    ["-20", 20],
    ["-10", 10],
  ];
  const vars: Record<string, string> = {};
  for (const [key, opacity] of steps) {
    vars[`--glow-color${key}`] =
      `hsl(${base} / ${Math.min(opacity * intensity, 100)}%)`;
  }
  return vars;
}

const GRADIENT_POSITIONS = [
  "80% 55%",
  "69% 34%",
  "8% 6%",
  "41% 38%",
  "86% 85%",
  "82% 18%",
  "51% 4%",
];
const GRADIENT_KEYS = [
  "--gradient-one",
  "--gradient-two",
  "--gradient-three",
  "--gradient-four",
  "--gradient-five",
  "--gradient-six",
  "--gradient-seven",
];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function gradientVars(colors: string[]) {
  const vars: Record<string, string> = {};
  for (let i = 0; i < GRADIENT_KEYS.length; i++) {
    const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
    vars[GRADIENT_KEYS[i]] =
      `radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`;
  }
  vars["--gradient-base"] = `linear-gradient(${colors[0]} 0 100%)`;
  return vars;
}

const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
const easeInCubic = (x: number) => x * x * x;

function animateValue({
  start = 0,
  end = 100,
  duration = 1000,
  delay = 0,
  ease = easeOutCubic,
  onUpdate,
  onEnd,
}: {
  start?: number;
  end?: number;
  duration?: number;
  delay?: number;
  ease?: (x: number) => number;
  onUpdate: (v: number) => void;
  onEnd?: () => void;
}) {
  const t0 = performance.now() + delay;
  const tick = () => {
    const t = Math.min((performance.now() - t0) / duration, 1);
    onUpdate(start + (end - start) * ease(t));
    if (t < 1) requestAnimationFrame(tick);
    else onEnd?.();
  };
  setTimeout(() => requestAnimationFrame(tick), delay);
}

export function BorderGlow({
  children,
  className = "",
  innerClassName = "",
  edgeSensitivity = 30,
  glowColor = "40 80 80",
  backgroundColor = "#120F17",
  surface = "dark",
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1,
  coneSpread = 25,
  animated = false,
  colors = ["#c084fc", "#f472b6", "#38bdf8"],
  fillOpacity = 0.5,
}: BorderGlowProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = x - cx;
      const dy = y - cy;

      /* How far out from the centre the pointer is, as a share of the distance
       to the edge it is heading for — 0 in the middle, 1 on the border. */
      const kx = dx !== 0 ? cx / Math.abs(dx) : Infinity;
      const ky = dy !== 0 ? cy / Math.abs(dy) : Infinity;
      const edge = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);

      let angle = 0;
      if (dx !== 0 || dy !== 0) {
        angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        if (angle < 0) angle += 360;
      }

      card.style.setProperty("--edge-proximity", (edge * 100).toFixed(3));
      card.style.setProperty("--cursor-angle", `${angle.toFixed(3)}deg`);
    },
    [],
  );

  useEffect(() => {
    const card = cardRef.current;
    if (!animated || !card) return;
    const angleStart = 110;
    const angleEnd = 465;
    card.classList.add("sweep-active");
    card.style.setProperty("--cursor-angle", `${angleStart}deg`);
    const sweep = (v: number) =>
      card.style.setProperty(
        "--cursor-angle",
        `${(angleEnd - angleStart) * (v / 100) + angleStart}deg`,
      );

    animateValue({
      duration: 500,
      onUpdate: (v) => card.style.setProperty("--edge-proximity", String(v)),
    });
    animateValue({
      ease: easeInCubic,
      duration: 1500,
      end: 50,
      onUpdate: sweep,
    });
    animateValue({
      ease: easeOutCubic,
      delay: 1500,
      duration: 2250,
      start: 50,
      end: 100,
      onUpdate: sweep,
    });
    animateValue({
      ease: easeInCubic,
      delay: 2500,
      duration: 1500,
      start: 100,
      end: 0,
      onUpdate: (v) => card.style.setProperty("--edge-proximity", String(v)),
      onEnd: () => card.classList.remove("sweep-active"),
    });
  }, [animated]);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      className={`border-glow-card${surface === "light" ? " border-glow-card--light" : ""}${className ? ` ${className}` : ""}`}
      style={
        {
          "--card-bg": backgroundColor,
          "--edge-sensitivity": edgeSensitivity,
          "--border-radius":
            typeof borderRadius === "number"
              ? `${borderRadius}px`
              : borderRadius,
          "--glow-padding": `${glowRadius}px`,
          "--cone-spread": coneSpread,
          "--fill-opacity": fillOpacity,
          ...glowVars(glowColor, glowIntensity),
          ...gradientVars(colors),
        } as CSSProperties
      }
    >
      <span className="edge-light" />
      <div
        className={`border-glow-inner${innerClassName ? ` ${innerClassName}` : ""}`}
      >
        {children}
      </div>
    </div>
  );
}

export default BorderGlow;
