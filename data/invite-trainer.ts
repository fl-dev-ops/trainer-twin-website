/**
 * Copy for /TrainerTwin_home_v3/invite_trainer, taken from
 * https://www.trainertwin.com/invite — wording kept as on that page.
 */

export const INVITE_HERO = {
  eyebrow: "Equity program",
  title: "Become a Founding Trainer",
  lead: "Turn your expertise into an AI TrainerTwin — and own a part of what we build together.",
  experiencesIntro:
    "TrainerTwin captures how you teach, what you know and how you work with learners to create an AI learning experience shaped by you.",
  experiences: [
    "Learn with your TrainerTwin shaped by your teaching approach,",
    "Practice with your TrainerTwin through guided exercises, adaptive challenges",
    "Get assessed with your TrainerTwin using your rubrics and feedback principles.",
  ],
  /** Sits under the CTA, in italic — the equity mention isn't a promise, so
      it reads as a footnote rather than as part of the pitch above it. */
  disclaimer: "Equity participation subject to mutually agreed terms.",
} as const;

export const INVITE_LAYERS = {
  eyebrow: "How it works",
  title: "Your Training. Your Twin.",
  lead: "Your TrainerTwin is built around three things that make your training yours.",
  items: [
    {
      title: "Knowledge",
      body: "Your expertise, frameworks, examples and domain knowledge.",
    },
    {
      title: "Presence",
      body: "Your voice, personality, communication style and way of connecting.",
    },
    {
      title: "Training DNA",
      body: "How you explain, guide, challenge and give feedback.",
    },
  ],
} as const;

export const INVITE_TEAM = {
  eyebrow: "People",
  title: "The team.",
  lead: "Ex-Freshworks Director of Product. Ex-PayPal AI Director. Second-time founders. We've shipped products at scale, built AI systems, and spent years understanding how people learn.",
  members: [
    {
      name: "Shanmuga (Shyam) Anandaraman",
      role: "CEO, Ex Freshworks",
      photo: "/invite/team/shyam.jpeg",
    },
    {
      name: "Harini Shekar",
      role: "Co-Founder & AI Director, Ex Paypal",
      photo: "/invite/team/harini.jpeg",
    },
    {
      name: "Dharshini Jenefer",
      role: "Head of Partnerships",
      photo: "/invite/team/dharshini.jpeg",
    },
    {
      name: "Catherine Nivedha",
      role: "Learning Sciences & Pedagogy",
      photo: "/invite/team/catherine.jpeg",
    },
    {
      name: "Bhuvan T",
      role: "Founding Designer, Ex Freshworks",
      photo: "/invite/team/bhuvan.jpeg",
    },
    {
      name: "Surya Umapathy",
      role: "Founding Engineer, Ex Freshworks",
      photo: "/invite/team/surya.jpeg",
    },
    {
      name: "Mohammed Hasan",
      role: "Founding Engineer, Ex Freshworks",
      photo: "/invite/team/hasan.png",
    },
  ],
} as const;

export const INVITE_FOUNDING = {
  eyebrow: "The Equity Programme",
  title: "Build With Us. Grow With Us. Own With Us.",
  lead: "We’re inviting a small group of trainers to become early design partners and help shape TrainerTwin before wider release.",
  cardsIntro: "As a Founding Trainer, you will:",
  cards: [
    { title: "Co-build", body: "Work directly with our team." },
    { title: "Test", body: "Use your Twin with real learners." },
    { title: "Shape", body: "Influence the product and experience." },
    {
      title: "Own",
      body: "Receive equity participation, subject to mutually agreed terms.",
    },
  ],
  note: {
    title: "Starting with Tech Trainers",
    body: "We’re also exploring Fitness, Sales, Coaching and other training domains.",
  },
} as const;
