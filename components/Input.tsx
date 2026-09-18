import type { InputHTMLAttributes, ReactNode } from "react";
import { useId } from "react";
import { cn } from "./cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  /** Helper text under the field. Replaced by `error` when the field is invalid. */
  hint?: ReactNode;
  /** Sets the invalid state and replaces the hint. Say what to do, not just what broke. */
  error?: string;
  /** Hide the label visually but keep it for assistive tech. Use sparingly. */
  labelHidden?: boolean;
}

/**
 * Text field — the first form control in the system.
 *
 * The border is `--tt-border-form` (0.5px) in `--tt-border-field` (neutral-300).
 * On a 2x display 0.5px renders as a true one-device-pixel rule; on 1x, browsers
 * round up rather than dropping it, so the boundary never disappears.
 *
 * The resting border is 1.79:1 and does NOT meet the 3:1 that WCAG 1.4.11 asks of
 * an interactive boundary — a deliberate decision (9 Sep 2026), since #857C6B is
 * the only step in this ramp that passes. Hover and focus firm the border to
 * --tt-border-interactive so the control is unambiguous the moment it is used.
 */
export function Input({
  label,
  hint,
  error,
  labelHidden = false,
  className,
  id,
  ...rest
}: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = error || hint ? `${inputId}-desc` : undefined;

  return (
    <div className="flex w-full flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className={cn(
          "font-ui text-[13px] font-semibold text-ink",
          labelHidden && "sr-only",
        )}
      >
        {label}
      </label>

      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(
          "h-10 w-full rounded-sm bg-surface px-3",
          "font-ui text-[14px] text-ink",
          // 0.5px hairline — the form border width
          "border-[length:var(--tt-border-form)] border-solid",
          // Light at rest, firm on interaction. --tt-border-field is 1.79:1 and
          // does not meet WCAG 1.4.11 on its own; hover/focus carry the affordance.
          error
            ? "border-danger"
            : "border-line-field hover:border-line-interactive focus:border-line-interactive",
          "placeholder:text-ink-muted",
          "transition-colors duration-150 ease-standard",
          "disabled:opacity-45 disabled:cursor-not-allowed",
          className,
        )}
        {...rest}
      />

      {error ? (
        <p id={describedBy} className="font-ui text-[12px] text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={describedBy} className="font-ui text-[12px] text-ink-tertiary">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
