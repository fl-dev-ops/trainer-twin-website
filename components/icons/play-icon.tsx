"use client";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import {
  LazyMotion,
  domMin,
  m,
  useAnimation,
  useReducedMotion,
} from "motion/react";
import {
  forwardRef,
  useImperativeHandle,
  useEffect,
  type HTMLAttributes,
} from "react";

export interface PlayIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PlayIconProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  | "color"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
> {
  size?: number;
  duration?: number;
  isAnimated?: boolean;
  isHovered?: boolean;
  color?: string;
}

const iconVariants: Variants = {
  normal: {
    scale: 1,
  },
  animate: {
    scale: [1, 0.92, 1],
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const playVariants: Variants = {
  normal: {
    x: 0,
    scale: 1,
    pathLength: 1,
    opacity: 1,
  },
  animate: {
    x: [0, 1.5, 0],
    scale: [1, 1.12, 1],
    pathLength: [0.6, 1],
    opacity: [0.6, 1],
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const PlayIcon = forwardRef<PlayIconHandle, PlayIconProps>(
  ({ className, size = 24, isHovered, color, ...props }, ref) => {
    const controls = useAnimation();
    const reduced = useReducedMotion();

    useImperativeHandle(ref, () => ({
      startAnimation: () =>
        reduced ? controls.start("normal") : controls.start("animate"),
      stopAnimation: () => controls.start("normal"),
    }));

    useEffect(() => {
      if (isHovered === undefined) return;
      controls.start(isHovered ? "animate" : "normal");
    }, [isHovered, controls]);

    return (
      <LazyMotion features={domMin} strict>
        <m.div
          className={cn("inline-flex items-center justify-center", className)}
          {...props}
          style={{ color, ...props.style }}
        >
          <m.svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={controls}
            initial="normal"
            variants={iconVariants}
          >
            <m.path
              d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"
              initial="normal"
              animate={controls}
              variants={playVariants}
            />
          </m.svg>
        </m.div>
      </LazyMotion>
    );
  },
);

PlayIcon.displayName = "PlayIcon";

export { PlayIcon };
