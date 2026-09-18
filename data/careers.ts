/**
 * Copy taken from https://www.trainertwin.com/careers (fetched 13 Sep 2026).
 * Do not invent listings — edit this file when the live page changes.
 */

export const CAREERS_APPLY_HREF = "https://forms.gle/5r6Bhf7S3KfBmvNF9";
export const CAREERS_TEAM_HREF = "/invite#team";

export const CAREERS_META = {
  title: "Careers — Join The Club | TrainerTwin",
  description:
    "We're hiring. Come build AI twins for trainers with a small, flat, 0-to-1 team in Chennai.",
};

export const CAREERS_INTRO = {
  heading: "Join The Club",
  lead: "We're eight people building AI twins for trainers.",
  teamLabel: "Meet the team.",
};

export type RoleSection = {
  heading: string;
  items: string[];
};

export type Role = {
  id: string;
  title: string;
  meta: string;
  summary: string;
  sections: RoleSection[];
  note?: string;
};

export const ROLES: Role[] = [
  {
    id: "video-designer",
    title: "Video Designer",
    meta: "0-2 year experience · Chennai · Full-time",
    summary:
      "Make people understand what a TrainerTwin is in thirty seconds, Product films, launch assets, Founding Trainer stories - you will help us do it all.",
    sections: [
      {
        heading: "What you'll do",
        items: [
          "Create motion graphics for short-form social, explainers and long-form video",
          "Sit in on script discussions and turn ideas into visual stories, working directly with the founding team",
          "Use AI video tools to mock up ideas fast, early in a discussion",
          "Build the formats we reuse, so we ship weekly rather than occasionally",
        ],
      },
      {
        heading: "What we're looking for",
        items: [
          "Working knowledge of After Effects, Premiere Pro and Photoshop",
          "A sharp eye for animation, pacing, typography, composition and transitions",
          "You finish things, and you care how they look when they're finished",
          "A reel or portfolio. It matters more than the CV",
        ],
      },
    ],
  },
  {
    id: "gtm-intern",
    title: "GTM Intern",
    meta: "0-2 year experience · Chennai · Full-time",
    summary:
      "We're looking for a GTM Intern to work closely with the Founder and get hands-on exposure to outbound growth at an early-stage AI-native service company for trainers.",
    sections: [
      {
        heading: "What you'll be exposed to",
        items: [
          "Outbound campaign setup and execution",
          "Tools like Clay, Instantly, Heyreach, Salesforce and Claude",
          "Basics of n8n process automation",
          "Pipeline tracking and reporting",
          "Day-to-day GTM decisions alongside the founder",
        ],
      },
      {
        heading: "Good fit if you",
        items: [
          "Are curious about startups and growth or marketing",
          "Enjoy learning new tools and figuring things out",
          "Are comfortable working in a small, flat team",
          "Want real exposure to how a 0-to-1 company builds its GTM engine",
        ],
      },
    ],
    note: "No prior GTM experience required — just interest and willingness to learn.",
  },
];
