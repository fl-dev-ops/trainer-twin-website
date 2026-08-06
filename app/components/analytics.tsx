"use client";

import { useEffect } from "react";

export default function Analytics() {
  useEffect(() => {
    // Track clicks on CTAs, links, and buttons
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a, button, [data-track]");
      if (!target) return;

      const tagName = target.tagName.toLowerCase();
      const text = (target.textContent || "").trim().slice(0, 50);
      const href = (target as HTMLAnchorElement).href || "";

      window.gtag?.("event", "click", {
        event_category: tagName === "a" ? "link" : "button",
        event_label: text,
        destination_url: href,
      });
    };

    // Track scroll depth
    const thresholds = [25, 50, 75, 90];
    const fired = new Set<number>();

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const percent = Math.round((window.scrollY / scrollHeight) * 100);

      for (const t of thresholds) {
        if (percent >= t && !fired.has(t)) {
          fired.add(t);
          window.gtag?.("event", "scroll", {
            event_category: "scroll_depth",
            event_label: `${t}%`,
            value: t,
          });
        }
      }
    };

    document.addEventListener("click", handleClick);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
}
