export type Line = { tag: "me" | "tw" | "sys" | "db" | "clipref" | "shotln" | "pay"; text: string };

export type UseCase =
  | { kind: "call"; t: string; d: string; on?: "mic" | "clip"; left?: string; title?: string; lines: Line[] }
  | { kind: "roleplay"; t: string; d: string; lines: Line[] }
  | { kind: "embed"; t: string; d: string; lines: Line[] };

/** How coaches use their twins, shown in the product's own interface. Ported verbatim from the prototype's data. */
export const USE_CASES: UseCase[] = [
  {
    kind: "call",
    t: "Course Q&A",
    d: "Learners ask about your course and get answers in your words, any time.",
    on: "mic",
    lines: [
      { tag: "me", text: "Why do you open with a question instead of the pitch?" },
      { tag: "sys", text: "Thinking…" },
      {
        tag: "tw",
        text: "Because people listen better once they’ve said their problem out loud. That’s step one of the method in module 3.",
      },
    ],
  },
  {
    kind: "call",
    t: "After a live class or masterclass",
    d: "Learners clear their doubts that evening, with your recordings and material behind every answer.",
    on: "mic",
    left: "18 min left",
    lines: [
      { tag: "me", text: "From Saturday’s masterclass: what do I do if there’s silence after the price?" },
      { tag: "tw", text: "Let the silence sit, then ask one open question." },
      { tag: "clipref", text: "Masterclass recording · from 42:10" },
    ],
  },
  {
    kind: "roleplay",
    t: "Role-play practice",
    d: "Learners choose a role-play, practise the conversation, then the twin debriefs them using your methodology.",
    lines: [
      { tag: "tw", text: "As your buyer: “Honestly, your price is higher than the other quote.”" },
      { tag: "me", text: "I understand. Can I ask what’s included in theirs?" },
      { tag: "db", text: "Debrief: good question. Next time, acknowledge the concern first, then ask." },
    ],
  },
  {
    kind: "call",
    t: "Deal support",
    d: "Learners share a screenshot of a real conversation with a client or buyer and get their next move.",
    on: "clip",
    left: "16 min left",
    lines: [
      { tag: "shotln", text: "chat-with-client.png" },
      { tag: "me", text: "They went quiet after my proposal. What should I send?" },
      { tag: "tw", text: "Check in on their timeline, not the decision: “When are you hoping to have this in place?”" },
    ],
  },
  {
    kind: "embed",
    t: "A new income stream",
    d: "Embed your twin on your own website. Learners pay as they go, topping up minutes when they need them, and payments come straight to your account.",
    lines: [
      { tag: "pay", text: "30-minute top-up received · paid straight to your account" },
      { tag: "me", text: "Hi! I’ve topped up 30 minutes. Can we practise my pricing conversation?" },
      { tag: "tw", text: "Great, let’s start. I’ll play your buyer." },
    ],
  },
];

export const ROLE_PLAY_CARDS = [
  { title: "Price objection", sub: "The buyer says your quote is too high.", art: "g1", persona: "Buyer", selected: true },
  { title: "Hesitant client", sub: "They like it but keep delaying the decision.", art: "g2", persona: "Buyer", selected: false },
  { title: "Difficult team member", sub: "Give feedback without losing them.", art: "g3", persona: "Team member", selected: false },
] as const;
