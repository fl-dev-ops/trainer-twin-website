"use client";

import { motion, useReducedMotion } from "motion/react";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface BlocksIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  isHovered?: boolean;
}

function BlocksIcon({
  className,
  size = 28,
  isHovered = false,
  ...props
}: BlocksIconProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={cn(className)} {...props}>
      <svg
        fill="none"
        height={size}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
        <motion.path
          animate={
            reducedMotion || !isHovered
              ? { x: 0, y: 0 }
              : { x: [0, -4, 0], y: [0, 4, 0] }
          }
          d="M14 3h7v7h-7z"
          transition={{
            duration: 1.2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      </svg>
    </div>
  );
}

export { BlocksIcon };
