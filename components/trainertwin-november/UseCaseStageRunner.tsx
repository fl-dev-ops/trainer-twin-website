"use client";

import { useEffect, useState } from "react";
import type { Line, UseCase } from "./useCaseData";
import { EmbedPanel, RolePlayPanel, TwCallPanel } from "./UseCaseStages";

/**
 * Renders one use case's demo panel and reveals its example lines one at a
 * time. Remounted (via `key={currentIndex}` in UseCases.tsx) whenever the
 * active case changes, so "start from no lines revealed" falls out of a
 * fresh mount instead of an effect resetting state.
 */
export function UseCaseStageRunner({ useCase }: { useCase: UseCase }) {
  const [revealed, setRevealed] = useState<Line[]>([]);

  useEffect(() => {
    let reduceMotion = false;
    try {
      reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      // ignore
    }
    const timers = useCase.lines.map((line, i) =>
      setTimeout(
        () => {
          setRevealed((prev) => {
            const next = line.tag === "sys" ? prev : prev.filter((l) => l.tag !== "sys");
            return [...next, line];
          });
        },
        reduceMotion ? 0 : 500 + i * 1200
      )
    );
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- a fresh mount per case already pins `useCase`
  }, []);

  return (
    <>
      <p className="uc-desc">{useCase.d}</p>
      {useCase.kind === "call" && <TwCallPanel on={useCase.on} left={useCase.left} title={useCase.title} lines={revealed} />}
      {useCase.kind === "roleplay" && <RolePlayPanel lines={revealed} />}
      {useCase.kind === "embed" && <EmbedPanel lines={revealed} />}
      <span className="uc-note">Example</span>
    </>
  );
}
