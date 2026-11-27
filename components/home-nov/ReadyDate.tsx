"use client";

import { useEffect, useState } from "react";
import { formatReady, readyDate } from "./dates";

/**
 * Today + 7 days, in the visitor's time zone. The server renders a neutral phrase,
 * and the browser swaps in the real date right after load, then re-checks every minute
 * (and when the tab comes back into view) so a page left open overnight stays right.
 */
export function ReadyDate() {
  const [text, setText] = useState("in 7 days");

  useEffect(() => {
    const update = () => setText(formatReady(readyDate()));
    update();
    const id = window.setInterval(update, 60_000);
    document.addEventListener("visibilitychange", update);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return <b className="ready-date">{text}</b>;
}
