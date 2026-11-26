"use client";

import { useEffect, useRef } from "react";
import { Markup } from "./Markup";
import { initNovemberHome } from "./behaviors";

/**
 * The November homepage. The markup is static; behaviours.ts attaches the interactive parts
 * after mount and undoes them on unmount. `className` carries the font variables from the page.
 */
export function NovemberHome({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    return initNovemberHome(root);
  }, []);

  return (
    <div ref={ref} className={`tt26 ${className}`.trim()}>
      <Markup />
    </div>
  );
}
