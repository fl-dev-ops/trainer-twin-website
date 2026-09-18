import type { HTMLAttributes } from "react";
import { cn } from "./cn";

/**
 * `flat` was renamed to `default` on 10 Sep 2026 when the default gained
 * elevation — a variant called "flat" that casts a shadow is a lie in the API.
 */
export type CardVariant = "default" | "raised" | "interactive";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

/**
 * The default container. Almost every product screen is cards in a grid.
 *
 * Padding lives on the sections, never on the Card itself — that way a card can
 * hold a full-bleed image or a table flush to its edges without fighting a
 * padding it did not ask for. `overflow-hidden` is what makes the radius clip
 * that content correctly.
 *
 * Radius is `--tt-radius-md` (12), one step above the 8 used by controls inside
 * it, per the rule that a nested element takes the step below its container.
 */
export function Card({
  variant = "default",
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-md bg-surface",
        "border border-line",
        // Every card carries elevation-1 so it reads as an object sitting on the
        // canvas rather than a region drawn on it. In dark theme elevation-1 is a
        // hairline of light, not a shadow — shadows are invisible on near-black.
        variant === "raised" ? "shadow-e2" : "shadow-e1",
        // Hover is carried by elevation alone. No border highlight, and no surface
        // shift either — a card that lifts should not also look recessed.
        variant === "interactive" &&
          "cursor-pointer transition-shadow duration-150 ease-standard hover:shadow-e2",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

/** Title row. Separated by a hairline so the card reads as structured, not stacked. */
export function CardHeader({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-3 border-b border-line px-5 py-4",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function CardBody({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex-1 px-5 py-5", className)} {...rest}>
      {children}
    </div>
  );
}

/**
 * Action row. Sunken so it reads as a base the card rests on, and right-aligned
 * because the confirming action belongs closest to the thumb and the eye's exit.
 */
export function CardFooter({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-2 border-t border-line bg-surface-sunken px-5 py-3",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Renders the serif display face. Titles only, and only above 20px. */
  display?: boolean;
}

export function CardTitle({
  display = false,
  className,
  children,
  ...rest
}: CardTitleProps) {
  return (
    <h3
      className={cn(
        display
          ? "font-display text-[20px] font-semibold leading-tight"
          : "font-ui text-[15px] font-semibold leading-tight",
        "text-ink",
        className,
      )}
      {...rest}
    >
      {children}
    </h3>
  );
}
