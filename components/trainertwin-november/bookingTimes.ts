export const TIME_ZONES: [string, string][] = [
  ["Asia/Kolkata", "India"],
  ["Asia/Dubai", "UAE"],
  ["Asia/Singapore", "Singapore"],
  ["Europe/London", "UK"],
  ["Europe/Dublin", "Ireland"],
  ["Europe/Stockholm", "Sweden"],
  ["Europe/Rome", "Italy"],
  ["Europe/Zurich", "Switzerland"],
  ["America/New_York", "US Eastern"],
  ["America/Chicago", "US Central"],
  ["America/Los_Angeles", "US Pacific"],
  ["America/Toronto", "Canada Eastern"],
  ["America/Vancouver", "Canada Pacific"],
  ["Australia/Sydney", "Australia Eastern"],
  ["Australia/Perth", "Australia Western"],
];

const TZ_ALIAS: Record<string, string> = {
  "Asia/Calcutta": "Asia/Kolkata",
  "Asia/Saigon": "Asia/Ho_Chi_Minh",
  "Europe/Kiev": "Europe/Kyiv",
};

export function detectTimeZone(): string {
  try {
    const mine = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return TZ_ALIAS[mine] ?? mine;
  } catch {
    return "Asia/Kolkata";
  }
}

export function zoneLabel(zone: string): string {
  const known = TIME_ZONES.find((z) => z[0] === zone);
  return known ? known[1] : zone.split("/").pop()?.replace(/_/g, " ") ?? zone;
}

export function formatInZone(d: Date, zone: string, options: Intl.DateTimeFormatOptions): string {
  try {
    return d.toLocaleString("en-GB", { ...options, timeZone: zone });
  } catch {
    return d.toLocaleString("en-GB", options);
  }
}

/** 7 days from today — only that day can be booked. */
export function getReadyDate(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const ready = new Date(today);
  ready.setDate(ready.getDate() + 7);
  return ready;
}

export function getReadyText(ready: Date): string {
  try {
    return ready.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
  } catch {
    return ready.toDateString();
  }
}

/** Example times, set in India time (the team's hours), shown in whichever time zone the visitor picks. */
export function getSlotTimes(ready: Date): Date[] {
  const istSlots: [number, number][] = [
    [13, 30],
    [15, 30],
    [18, 0],
    [20, 0],
  ];
  return istSlots.map(
    (hm) => new Date(Date.UTC(ready.getFullYear(), ready.getMonth(), ready.getDate(), hm[0], hm[1]) - 330 * 60000)
  );
}

export function calendarStamp(d: Date): string {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}
