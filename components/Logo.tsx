import { cn } from "./cn";

/**
 * The TrainerTwin mark.
 *
 * Geometry is a 3x3 grid of 147-unit cells on a 441 viewBox, corners and
 * fillets at r=20, cells filled:
 *
 *     # # #
 *     . # .
 *     # . #
 *
 * Authored parametrically rather than traced, so it stays crisp at 20px and
 * takes its colour from the token layer instead of being baked in.
 */
const SYMBOL_PATH =
  "M20 0L421 0A20 20 0 0 1 441 20L441 127A20 20 0 0 1 421 147L314 147A20 20 0 0 0 294 167L294 274A20 20 0 0 0 314 294L421 294A20 20 0 0 1 441 314L441 421A20 20 0 0 1 421 441L314 441A20 20 0 0 1 294 421L294 314A20 20 0 0 0 274 294L167 294A20 20 0 0 0 147 314L147 421A20 20 0 0 1 127 441L20 441A20 20 0 0 1 0 421L0 314A20 20 0 0 1 20 294L127 294A20 20 0 0 0 147 274L147 167A20 20 0 0 0 127 147L20 147A20 20 0 0 1 0 127L0 20A20 20 0 0 1 20 0Z";

export interface LogoSymbolProps {
  /** Rendered size in px. Below 20 the mark's counters start to close up. */
  size?: number;
  className?: string;
  /** Give it a label only when the mark stands alone as the product's name. */
  title?: string;
}

/**
 * Mark only. Inherits `currentColor`, so it reverses correctly on photography
 * and trainer cover art without a second asset.
 */
export function LogoSymbol({ size = 24, className, title }: LogoSymbolProps) {
  return (
    <svg
      viewBox="0 0 441 441"
      width={size}
      height={size}
      fill="currentColor"
      className={cn("shrink-0", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <path d={SYMBOL_PATH} />
    </svg>
  );
}

export interface LogoProps {
  /** Drives the whole lockup — the mark and the wordmark scale together. */
  size?: number;
  /** Mark only, no wordmark. Use below 104px, where the wordmark stops being legible. */
  symbolOnly?: boolean;
  className?: string;
  /** Inline override for the default `text-primary` — set where a page needs
      the lockup off-brand-colour (e.g. plain ink on a header). Wins over the
      class regardless of Tailwind's utility ordering, since it's inline. */
  color?: string;
}

/**
 * The full lockup. Mark and wordmark are locked to one `size` so they can never
 * drift out of proportion — the most common way a lockup gets broken in practice.
 *
 * Colour comes from `currentColor` on both halves. On canvas that is
 * --tt-primary in both themes; over imagery, set the colour to --tt-canvas.
 */
export function Logo({ size = 28, symbolOnly = false, className, color }: LogoProps) {
  if (symbolOnly) {
    return (
      <LogoSymbol
        size={size}
        className={className}
        title="TrainerTwin"
      />
    );
  }

  return (
    <span
      className={cn("inline-flex items-center text-primary", className)}
      style={{ gap: size * 0.3, ...(color ? { color } : null) }}
    >
      <LogoSymbol size={size} />
      <span
        className="font-ui font-semibold leading-none"
        style={{ fontSize: size * 1.16, letterSpacing: "-0.022em" }}
      >
        TrainerTwin
      </span>
    </span>
  );
}
