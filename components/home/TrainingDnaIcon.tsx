"use client";

import { useState } from "react";
import PixelTransition from "./PixelTransition";

/**
 * Training DNA card mark: three pixel icons on the same PixelTransition loop
 * as Intelligence / Presence (grid 8, 0.35s step, 2.2s hold).
 */
const ICONS = [
  "/home-v3/training-dna/01.png",
  "/home-v3/training-dna/02.png",
  "/home-v3/training-dna/03.png",
] as const;

function Mark({ src }: { src: string }) {
  return <img src={src} alt="" width={30} height={30} draggable={false} />;
}

export function TrainingDnaIcon() {
  const [index, setIndex] = useState(0);
  const next = (index + 1) % ICONS.length;

  return (
    <span className="hero-v3-icon" aria-hidden="true">
      <PixelTransition
        className="hero-v3-pixel"
        firstContent={<Mark src={ICONS[index]} />}
        secondContent={<Mark src={ICONS[next]} />}
        gridSize={8}
        pixelColor="#fff"
        animationStepDuration={0.35}
        aspectRatio="0"
        autoPlay
        autoPlayInterval={2.2}
        onAutoAdvance={() => setIndex((i) => (i + 1) % ICONS.length)}
      />
    </span>
  );
}
