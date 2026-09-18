import type { CSSProperties } from "react";
import { cn } from "./cn";

/**
 * The Siri-style orb: five conic gradients rotating against each other behind
 * a blur, after the component of the same name — same look, same knobs.
 *
 * Two things are done differently from the version that was handed over.
 *
 * The upstream keeps its CSS in `<style jsx>`, which makes every orb a client
 * component and pulls the styled-jsx runtime in behind it. Nothing here reads a
 * value per frame — it is one keyframe on a registered custom property — so the
 * rules live in landing.css beside the page's other loops and this renders on
 * the server, the same trade ShinyText and CursorGrid already make.
 *
 * And `size` is any CSS length rather than a px string. Upstream derives blur
 * and contrast with `parseInt(size)`, which silently yields NaN for anything
 * that is not px; the illustration this was built for sizes everything in
 * `calc(n * var(--l-u))`, so blur is derived in CSS instead and follows the
 * stage as it scales.
 */
export interface SiriOrbProps {
  /** Any CSS length. Drives the blur too, at 8% of it. */
  size?: string;
  className?: string;
  colors?: {
    /** Upstream declares this and never reads it; here it replaces the soft
        core behind the gradients. */
    bg?: string;
    c1?: string;
    c2?: string;
    c3?: string;
  };
  /** One full rotation, in seconds. */
  animationDuration?: number;
  /** Overrides the 8%-of-size default. */
  blur?: string;
  /** Upstream's formula only rises above 1.8 past a 600px orb. */
  contrast?: number;
}

export function SiriOrb({
  size = "192px",
  className,
  colors,
  animationDuration = 20,
  blur,
  contrast,
}: SiriOrbProps) {
  return (
    <div
      className={cn("l-orb", className)}
      style={
        {
          width: size,
          height: size,
          "--l-orb-size": size,
          "--l-orb-seconds": `${animationDuration}s`,
          ...(colors?.bg ? { "--l-orb-bg": colors.bg } : null),
          ...(colors?.c1 ? { "--l-orb-c1": colors.c1 } : null),
          ...(colors?.c2 ? { "--l-orb-c2": colors.c2 } : null),
          ...(colors?.c3 ? { "--l-orb-c3": colors.c3 } : null),
          ...(blur ? { "--l-orb-blur": blur } : null),
          ...(contrast ? { "--l-orb-contrast": contrast } : null),
        } as CSSProperties
      }
    />
  );
}

export default SiriOrb;
