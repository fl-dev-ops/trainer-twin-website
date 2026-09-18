"use client";

import { useState } from "react";
import PixelTransition from "./PixelTransition";

/**
 * Intelligence card mark: the six Figma pixel icons, cycling from Notion.
 * PixelTransition (React Bits) does the mosaic swap; a timer advances the pair.
 */
const ICONS = [
  "/home-v3/intelligence/02-notion.png",
  "/home-v3/intelligence/03-grid.png",
  "/home-v3/intelligence/04-sparkles.png",
  "/home-v3/intelligence/05-chat.png",
  "/home-v3/intelligence/06-play.png",
  "/home-v3/intelligence/01-doc.png",
] as const;

function Mark({ src }: { src: string }) {
  return <img src={src} alt="" width={30} height={30} draggable={false} />;
}

export function IntelligenceIcon() {
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
