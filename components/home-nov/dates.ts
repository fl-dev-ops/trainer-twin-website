/**
 * "Ready by" date for the demo: seven days after the day the visitor is on right now,
 * worked out in the visitor's own time zone, and never a weekend. Never compute this on the server or at build time,
 * or it would freeze at the day the site was built.
 */
export function startOfToday(now: Date = new Date()): Date {
  const d = new Date(now);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** The team works Monday to Friday, so a ready date that lands on a weekend moves to the Monday after. */
export function skipWeekend(d: Date): Date {
  const out = new Date(d);
  while (out.getDay() === 0 || out.getDay() === 6) out.setDate(out.getDate() + 1);
  return out;
}

export function readyDate(now: Date = new Date()): Date {
  const d = startOfToday(now);
  d.setDate(d.getDate() + 7);
  return skipWeekend(d);
}

export function formatReady(d: Date): string {
  try {
    return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
  } catch {
    return d.toDateString();
  }
}
