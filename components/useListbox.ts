"use client";

import type { KeyboardEvent } from "react";
import { useEffect, useRef, useState } from "react";

export interface UseListboxOptions {
  /** How many options the list holds. */
  length: number;
  /** Index to land on when the list opens. -1 lands on the first row. */
  selectedIndex: number;
  /** Enter / Space on the focused row. */
  onActivate: (index: number) => void;
  /** Close once a row is taken. True for single select, false for multi. */
  closeOnActivate?: boolean;
}

/**
 * The open/close, focus and keyboard behaviour §8 asks of a dropdown, in one
 * place so the two that use it cannot drift apart.
 *
 * §8 calls this out specifically: "The custom listbox needs ~40 lines of JS and
 * that is part of the spec, not an extra… A trigger with no listbox behind it
 * is a picture of a dropdown." Trigger toggles `aria-expanded`; opening moves
 * focus to the selected option; arrows cycle; Escape and Tab close; Escape
 * returns focus to the trigger; clicking outside closes.
 */
export function useListbox({
  length,
  selectedIndex,
  onActivate,
  closeOnActivate = false,
}: UseListboxOptions) {
  const [open, setOpen] = useState(false);
  /* Which row the arrows are sitting on. Separate from selection because in a
     multi-select they are not the same thing — you move through the list and
     toggle as you go. */
  const [active, setActive] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

  /* Opening lands on the selected row. Done after paint, since the options do
     not exist until `open` renders them. */
  useEffect(() => {
    if (!open) return;
    const start = selectedIndex === -1 ? 0 : selectedIndex;
    setActive(start);
    optionRefs.current[start]?.focus();
    // Only on open: re-running as the selection changes would yank focus back
    // to the selected row every time you tick one.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  /* Closes without stealing the focus the click is already moving. */
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const close = (returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  };

  const onListKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close(true);
      return;
    }
    if (event.key === "Tab") {
      close(false);
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      // Cycles rather than stopping at the ends, per §8.
      const next = (active + step + length) % length;
      setActive(next);
      optionRefs.current[next]?.focus();
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onActivate(active);
      if (closeOnActivate) close(true);
    }
  };

  /** ArrowDown on a closed trigger opens it, the way a native select does. */
  const onTriggerKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowDown" && !open) {
      event.preventDefault();
      setOpen(true);
    }
  };

  return {
    open,
    setOpen,
    active,
    close,
    rootRef,
    triggerRef,
    optionRefs,
    onListKeyDown,
    onTriggerKeyDown,
  };
}
