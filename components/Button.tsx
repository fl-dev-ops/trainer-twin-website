import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "./cn";

export type ButtonVariant =
  | "primary"
  | "strong"
  | "secondary"
  | "ghost"
  | "danger";
export type ButtonSize = "sm" | "md" | "lg" | "xl";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Stretch to the container. Use in mobile session controls and modal footers. */
  fullWidth?: boolean;
  /** Icon slot. Decorative only — the label must carry the meaning. */
  leadingIcon?: ReactNode;
  /**
   * Square, icon-only. REQUIRES `aria-label` — without one a screen reader
   * announces "button" and nothing else, which is the most common accessibility
   * failure in a toolbar.
   */
  iconOnly?: boolean;
  /** Unread count, rendered as a pill beside the icon. Omit rather than pass 0. */
  count?: number;
  /**
   * Trailing icon slot. Decorative only. Exists for the marketing CTA's arrow —
   * `Request early access →` — which the landing page was expressing as a literal
   * character inside the label, where a screen reader reads it aloud.
   */
  trailingIcon?: ReactNode;
}

/**
 * `base` sets border WIDTH only. Border colour belongs to the variant — setting
 * it in both places lets Tailwind's generated source order decide the winner
 * rather than the order the classes are written in, which silently drops the
 * outline off `secondary` and `danger`.
 */
const base = cn(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap",
  "font-ui font-semibold rounded-sm border",
  "transition-colors duration-150 ease-standard",
  "disabled:opacity-45 disabled:pointer-events-none",
);

const variants: Record<ButtonVariant, string> = {
  /**
   * White on orange. DELIBERATE BRAND DECISION, signed off 9 Sep 2026.
   *
   * White on #FF5A00 is 3.13:1, which FAILS WCAG AA for normal text. It clears
   * AA only at large sizes (>=18.66px bold or >=24px), so the `lg` size with a
   * bumped label is the compliant one; `sm` and `md` are not. Near-black would
   * have been 6.32:1.
   *
   * This is recorded rather than hidden so nobody "fixes" it back by accident.
   * The axe colour-contrast rule is disabled for this component's stories with
   * the same note — see Button.stories.tsx.
   */
  primary:
    "border-transparent bg-primary text-on-primary hover:bg-primary-hover",

  /**
   * The neutral CTA — BLACK in light theme, WHITE in dark theme.
   *
   * One variant, not two. The fill and label flip with the token layer, so this
   * is always the opposite polarity of its canvas and cannot be shipped
   * invisible; nobody has to remember which colour belongs to which theme.
   * 19.78:1 in both themes — the most legible button in the system, and the
   * only filled one with no accessibility tradeoff attached.
   *
   * Use it for the ordinary, always-on-screen actions. Reserve `primary` for the
   * single directed moment — a dialog's confirm, or Next / Continue / Save.
   * If every row's action were orange, none of them would read as the one.
   */
  strong:
    "border-transparent bg-strong text-on-strong hover:bg-strong-hover",

  /**
   * A soft grey fill, not an outline — the utility button. Toolbars, Help/Docs,
   * notification bells: things that sit together and should not each shout.
   *
   * The fill is `--tt-fill-soft`, NOT `--tt-surface-sunken`. In dark theme sunken
   * is darker than the card a button sits on, so a button using it reads as a hole
   * rather than a control; fill-soft steps away from the surface in whichever
   * direction the theme requires.
   */
  secondary:
    "border-transparent bg-fill-soft text-ink hover:bg-fill-soft-hover",

  ghost:
    "border-transparent bg-transparent text-ink-secondary hover:bg-surface-sunken hover:text-ink",

  /**
   * Destructive is outlined, not filled — two reasons.
   * 1. A filled destructive button has the same visual weight as the primary
   *    action, which is how people delete a trainer's uploaded material by mistake.
   * 2. --tt-danger inverts across themes (#CE2C33 light, #F58F93 dark), so as a
   *    fill it would need a theme-forked label colour. As a border and label it
   *    reads correctly on both grounds with no fork.
   */
  danger:
    "border-danger bg-transparent text-danger hover:bg-danger-subtle",
};

/** Icon-only buttons are square at every size, so a toolbar keeps its rhythm. */
const iconSizes: Record<ButtonSize, string> = {
  sm: "w-8 px-0",
  md: "w-10 px-0",
  lg: "w-[50px] px-0",
  xl: "w-[54px] px-0",
};

/**
 * `xl` is the MARKETING call to action, added 10 Sep 2026.
 *
 * The landing page had hand-rolled the same dark CTA at four different specs —
 * heights 34 / 44 / 48 / 54, radii 8 / 10 / 12, weights 600 and 700 — for what
 * is semantically one button. Three of those map onto sm / md / lg; the fourth
 * did not exist here, so it is added rather than forcing the marketing page to
 * compromise. 16px label, because marketing body copy is 16px (see the type
 * scale) and a CTA should not read smaller than the paragraph above it.
 *
 * Product screens should not reach for this. If an in-app button needs to be
 * 54px tall, the page hierarchy is wrong, not the button.
 */
const sizes: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-[13px]",
  md: "h-10 px-5 text-[14px]",
  lg: "h-[50px] px-6 text-[19px]",
  xl: "h-[54px] px-6 text-[16px]",
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  leadingIcon,
  iconOnly = false,
  count,
  trailingIcon,
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        base,
        variants[variant],
        sizes[size],
        iconOnly && iconSizes[size],
        fullWidth && "w-full",
        className,
      )}
      {...rest}
    >
      {leadingIcon ? (
        <span aria-hidden="true" className="inline-flex shrink-0">
          {leadingIcon}
        </span>
      ) : null}
      {children}
      {trailingIcon ? (
        <span aria-hidden="true" className="inline-flex shrink-0">
          {trailingIcon}
        </span>
      ) : null}
      {typeof count === "number" ? (
        <span
          className={cn(
            "inline-grid h-[18px] min-w-[18px] shrink-0 place-items-center rounded-full px-[5px]",
            "bg-primary text-on-primary font-ui text-[10.5px] font-semibold leading-none tabular-nums",
          )}
        >
          {count}
        </span>
      ) : null}
    </button>
  );
}
