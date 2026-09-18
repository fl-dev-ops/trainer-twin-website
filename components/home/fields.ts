/**
 * The four fields a twin can be trained for, in one place.
 *
 * Two things render them — the "Who it's for" section and the nav menu that
 * points at it — and they must not be able to disagree about what the fields
 * are called or where they go. The section carries the long sentence, the menu
 * carries the short one; the label and the destination are shared.
 */
export type FieldKey = "tech" | "sales" | "communication" | "fitness";

export type Field = {
  key: FieldKey;
  label: string;
  /** The one line of subtext the nav menu shows under the label. */
  blurb: string;
  /** The sentence the card in "Who it's for" carries. */
  body: string;
  href: string;
  /**
   * Whether `href` is a page that exists. Only the tech trainer's does; the
   * other three are anchors standing in until theirs are built, which is why
   * the menu announces them rather than linking them.
   */
  live?: boolean;
};

export const FIELDS: Field[] = [
  {
    key: "tech",
    label: "Tech trainers",
    blurb: "Code reviews, debugging and system design",
    body: "Mock interviews, code doubts and practice problems, run the way you’d run them.",
    href: "#early-access",
    live: true,
  },
  {
    key: "sales",
    label: "Sales trainers",
    blurb: "Pitch practice, objections and negotiation",
    body: "Your twin plays the difficult customer, so your team can rehearse before the real call.",
    href: "#sales-trainers",
  },
  {
    key: "communication",
    label: "Communication trainers",
    blurb: "Presentations, clarity and delivery",
    body: "Students rehearse a talk and get your feedback on pace, pauses and filler words.",
    href: "#communication-trainers",
  },
  {
    key: "fitness",
    label: "Fitness trainers",
    blurb: "Form, routines and weekly check-ins",
    body: "Form tips and weekly check-ins between sessions, in the words you’d use yourself.",
    href: "#fitness-trainers",
  },
];
