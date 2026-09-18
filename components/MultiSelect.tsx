"use client";

import type { ReactNode } from "react";
import { useId } from "react";
import { cn } from "./cn";
import { useListbox } from "./useListbox";

export interface MultiSelectOption {
  value: string;
  label: string;
}

export interface MultiSelectProps {
  label: string;
  options: readonly MultiSelectOption[];
  value: readonly string[];
  onChange: (next: string[]) => void;
  /** Shown in the field while nothing is picked. */
  placeholder?: string;
  /** Helper text under the field. Replaced by `error` when invalid. */
  hint?: ReactNode;
  /** Sets the invalid state and replaces the hint. Say what to do, not what broke. */
  error?: string;
  /** Emits a hidden input per selected value, so a real form submit carries them. */
  name?: string;
  /** Cap on how many can be picked. At the cap the rest stop being selectable. */
  max?: number;
}

/**
 * Multi-select — §8 of the design system, which specifies it but had no
 * component behind it until now.
 *
 * Chips live inside the field and each one is removable on its own. The field
 * WRAPS rather than scrolling: §8 is explicit that it "grows to fit and never
 * scrolls horizontally", because a chip you cannot see is a value you will
 * forget you set.
 *
 * The listbox is custom rather than a native `<select multiple>`. Native
 * multiple-select needs modifier-clicks to add a second value, which almost
 * nobody discovers, and its open menu is drawn by the OS and ignores every
 * token in the system. §8's dropdown note calls the keyboard handling here
 * "part of the spec, not an extra" — a trigger with no listbox behind it is a
 * picture of a dropdown.
 *
 * Chips are one interactive element and the trigger is another, so they are
 * siblings inside the field rather than nested: a button inside a button is
 * invalid, and a screen reader cannot address the inner one. The trigger takes
 * the leftover width, which keeps the "click the empty part of the field to
 * open it" target without wrapping the chips in it.
 */
export function MultiSelect({
  label,
  options,
  value,
  onChange,
  placeholder = "Select…",
  hint,
  error,
  name,
  max,
}: MultiSelectProps) {
  const id = useId();
  const listId = `${id}-list`;
  const labelId = `${id}-label`;
  const describedBy = error || hint ? `${id}-desc` : undefined;

  const selected = options.filter((option) => value.includes(option.value));
  const atCap = max !== undefined && value.length >= max;

  const toggle = (optionValue: string) => {
    const has = value.includes(optionValue);
    /* At the cap the unpicked options go quiet rather than silently swallowing
       the click. They stay focusable so the list can still be read through —
       `aria-disabled`, not `disabled`. */
    if (!has && atCap) return;
    onChange(
      has
        ? value.filter((entry) => entry !== optionValue)
        : [...value, optionValue],
    );
  };

  // Opens on the first already-selected row, per §8, same as `Select`.
  const firstSelected = options.findIndex((option) => value.includes(option.value));

  const {
    open,
    setOpen,
    rootRef,
    triggerRef,
    optionRefs,
    onListKeyDown,
    onTriggerKeyDown,
  } = useListbox({
    length: options.length,
    selectedIndex: firstSelected,
    onActivate: (index) => toggle(options[index].value),
    // Stays open: picking one value is not "done" in a multi-select.
    closeOnActivate: false,
  });

  return (
    <div className="flex w-full flex-col gap-1.5" ref={rootRef}>
      <span
        id={labelId}
        className="font-ui text-[13px] font-semibold text-ink"
      >
        {label}
      </span>

      <div className="relative">
        <div
          className={cn(
            "tt-lb-field",
            "flex w-full flex-wrap items-center gap-1.5 rounded-sm bg-surface",
            // Matches the text field: 40px at rest, but min-height so the field
            // grows down as chips wrap instead of clipping them.
            "min-h-10 px-2 py-1.5",
            "border-[length:var(--tt-border-form)] border-solid",
            "transition-colors duration-150 ease-standard",
            error
              ? "border-danger"
              : "border-line-field hover:border-line-interactive focus-within:border-line-interactive",
          )}
        >
          {selected.map((option) => (
            <span
              key={option.value}
              className={cn(
                "tt-ms-chip",
                "inline-flex items-center gap-1 rounded-sm bg-fill-soft",
                "py-0.5 pr-0.5 pl-2 font-ui text-[13px] text-ink",
              )}
            >
              {option.label}
              <button
                type="button"
                aria-label={`Remove ${option.label}`}
                onClick={() => toggle(option.value)}
                className={cn(
                  "tt-ms-chip-x",
                  "grid size-5 place-items-center rounded-sm text-ink-tertiary",
                  "transition-colors duration-150 ease-standard",
                  "hover:bg-fill-soft-hover hover:text-ink",
                  "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-focus",
                )}
              >
                <svg
                  viewBox="0 0 16 16"
                  className="size-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              </button>
            </span>
          ))}

          <button
            ref={triggerRef}
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={listId}
            aria-labelledby={labelId}
            aria-describedby={describedBy}
            onClick={() => setOpen((current) => !current)}
            onKeyDown={onTriggerKeyDown}
            className={cn(
              "tt-ms-trigger",
              // Takes the leftover width so the empty part of the field opens it.
              "flex min-w-24 flex-1 items-center justify-between gap-2",
              "h-7 px-1 font-ui text-[14px] text-left",
              "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-focus",
              selected.length ? "text-ink" : "text-ink-muted",
            )}
          >
            {selected.length ? "" : placeholder}
            <svg
              viewBox="0 0 16 16"
              className="ml-auto size-4 shrink-0 text-ink-tertiary"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 6l4 4 4-4" />
            </svg>
          </button>
        </div>

        <ul
          id={listId}
          role="listbox"
          aria-multiselectable="true"
          aria-labelledby={labelId}
          hidden={!open}
          onKeyDown={onListKeyDown}
          className={cn(
            "tt-lb-list",
            "absolute z-20 mt-1 max-h-64 w-full overflow-y-auto",
            "rounded-sm border-[length:var(--tt-border-form)] border-solid border-line-field",
            "bg-surface-raised py-1 shadow-e2",
          )}
        >
          {options.map((option, index) => {
            const isSelected = value.includes(option.value);
            const isBlocked = !isSelected && atCap;
            return (
              <li
                key={option.value}
                ref={(node) => {
                  optionRefs.current[index] = node;
                }}
                role="option"
                aria-selected={isSelected}
                aria-disabled={isBlocked || undefined}
                tabIndex={-1}
                onClick={() => toggle(option.value)}
                className={cn(
                  "tt-lb-option",
                  "flex items-center gap-2 px-3 py-2",
                  "font-ui text-[14px] text-ink outline-none",
                  isSelected && "bg-fill-soft",
                  isBlocked
                    ? "cursor-not-allowed opacity-45"
                    : "cursor-pointer hover:bg-fill-soft focus-visible:bg-fill-soft",
                  "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-focus",
                )}
              >
                <svg
                  viewBox="0 0 16 16"
                  className={cn(
                    "size-4 shrink-0 text-primary",
                    !isSelected && "invisible",
                  )}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3.5 8.5l3 3 6-7" />
                </svg>
                {option.label}
              </li>
            );
          })}
        </ul>
      </div>

      {name
        ? value.map((entry) => (
            <input key={entry} type="hidden" name={name} value={entry} />
          ))
        : null}

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
