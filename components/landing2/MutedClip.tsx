"use client";

import { useEffect, useRef } from "react";

/**
 * A looping clip with no sound. The file it plays carries no audio track at
 * all, so there is nothing to unmute.
 *
 * It is a client component for one reason: React does not always emit `muted`
 * into server-rendered markup, and a video without that attribute is refused
 * autoplay, so the property is set on the element after mount as well. Reduced
 * motion stops it there rather than letting it loop.
 */
export function MutedClip({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.autoplay = false;
      el.pause();
      return;
    }
    void el.play().catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  );
}
