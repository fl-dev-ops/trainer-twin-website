/**
 * "Ready by" date for the demo: seven days after the day the visitor is on right now,
 * worked out in the visitor's own time zone. Never compute this on the server or at build time,
 * or it would freeze at the day the site was built.
 */
export function startOfToday(now: Date = new Date()): Date {
  const d = new Date(now);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function readyDate(now: Date = new Date()): Date {
  const d = startOfToday(now);
  d.setDate(d.getDate() + 7);
  return d;
}

export function formatReady(d: Date): string {
  try {
    return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
  } catch {
    return d.toDateString();
  }
}
