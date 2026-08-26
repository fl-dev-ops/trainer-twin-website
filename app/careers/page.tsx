import { BlocksIcon } from "@/components/icons/blocks-icon";
import { BriefcaseBusinessIcon } from "@/components/icons/briefcase-icon";
import { XIcon } from "@/components/icons/x-icon";
import { YoutubeIcon } from "@/components/icons/youtube-icon";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers — Join The Club",
  description:
    "We're hiring. Come build AI twins for trainers with a small, flat, 0-to-1 team in Chennai.",
};

const APPLY_URL = "https://forms.gle/5r6Bhf7S3KfBmvNF9";

const roles = [
  {
    title: "Video Designer",
    meta: "0-2 year experience · Chennai · Full-time",
    summary:
      "Make people understand what a TrainerTwin is in thirty seconds, Product films, launch assets, Founding Trainer stories - you will help us do it all.",
    willDo: [
      "Create motion graphics for short-form social, explainers and long-form video",
      "Sit in on script discussions and turn ideas into visual stories, working directly with the founding team",
      "Use AI video tools to mock up ideas fast, early in a discussion",
      "Build the formats we reuse, so we ship weekly rather than occasionally",
    ],
    willDoLabel: "What you'll do",
    lookingFor: [
      "Working knowledge of After Effects, Premiere Pro and Photoshop",
      "A sharp eye for animation, pacing, typography, composition and transitions",
      "You finish things, and you care how they look when they're finished",
      "A reel or portfolio. It matters more than the CV",
    ],
    lookingForLabel: "What we're looking for",
  },
  {
    title: "GTM Intern",
    meta: "0-2 year experience · Chennai · Full-time",
    summary:
      "We're looking for a GTM Intern to work closely with the Founder and get hands-on exposure to outbound growth at an early-stage AI-native service company for trainers.",
    willDo: [
      "Outbound campaign setup and execution",
      "Tools like Clay, Instantly, Heyreach, Salesforce and Claude",
      "Basics of n8n process automation",
      "Pipeline tracking and reporting",
      "Day-to-day GTM decisions alongside the founder",
    ],
    willDoLabel: "What you'll be exposed to",
    lookingFor: [
      "Are curious about startups and growth or marketing",
      "Enjoy learning new tools and figuring things out",
      "Are comfortable working in a small, flat team",
      "Want real exposure to how a 0-to-1 company builds its GTM engine",
    ],
    lookingForLabel: "Good fit if you",
    note: "No prior GTM experience required — just interest and willingness to learn.",
  },
];

export default function Careers() {
  return (
    <div className="min-h-screen">
      <article
        style={{
          paddingLeft: "clamp(1.5rem, 1rem + 2vw, 2.5rem)",
          paddingRight: "clamp(1.5rem, 1rem + 2vw, 2.5rem)",
          paddingTop: "clamp(3rem, 2rem + 4vw, 8rem)",
          paddingBottom: "clamp(1rem, 0.5rem + 1.5vw, 2.5rem)",
        }}
      >
        <div className="prose prose-sm mx-auto">
          <div className="flex items-center justify-between gap-4 not-prose! mb-5!">
            <Link href="/" className="flex items-center gap-2.5 no-underline!">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-withname.svg"
                alt="TrainerTwin"
                className="h-7 w-auto"
              />
            </Link>
            <a
              href="/invite"
              className="flex items-center gap-2 rounded-full border border-brand/30 px-4 py-2 text-sm font-semibold text-brand no-underline! transition-colors hover:border-brand/50 hover:bg-brand/10"
            >
              Early Access
              {/*<BlocksIcon size={18} aria-hidden />*/}
            </a>
          </div>

          <h1 className="mb-2!">Join The Club</h1>

          <p>
            We&apos;re eight people building AI twins for trainers.{" "}
            <Link href="/invite#team">Meet the team.</Link>
          </p>
        </div>
      </article>

      {roles.map((role) => (
        <article
          key={role.title}
          className="py-2 md:py-2 mb-8"
          style={{
            paddingLeft: "clamp(1.5rem, 1rem + 2vw, 2.5rem)",
            paddingRight: "clamp(1.5rem, 1rem + 2vw, 2.5rem)",
          }}
        >
          <div className="prose mx-auto">
            <details className="group">
              <summary className="cursor-pointer mb-3 list-none [&::-webkit-details-marker]:hidden">

                <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5 my-4">
                  <div>
                    <h2 className="mt-0!">{role.title}</h2>

                    <p
                      className="caption not-prose!"
                      style={{ marginTop: "-0.75rem" }}
                    >
                      {role.meta}
                    </p>
                  </div>

                  <Link
                    href={APPLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="not-prose! shrink-0 self-center bg-brand text-white! font-semibold text-[15px] py-3 px-6 rounded-xl hover:bg-brand-dark transition-colors no-underline!"
                  >
                    Apply Now
                  </Link>
                </div>

                <p>{role.summary}</p>
                <span className="mt-3 block text-[14px] font-semibold text-brand group-open:hidden">
                  Learn more
                </span>
              </summary>

              <p>
                <strong>{role.willDoLabel}</strong>
              </p>
              <ul>
                {role.willDo.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <p>
                <strong>{role.lookingForLabel}</strong>
              </p>
              <ul>
                {role.lookingFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              {role.note && <p>{role.note}</p>}
            </details>
          </div>
        </article>
      ))}

      {/* Footer */}
      <footer
        className="py-10 mt-16 md:mt-24"
        style={{
          paddingLeft: "clamp(1.5rem, 1rem + 2vw, 2.5rem)",
          paddingRight: "clamp(1.5rem, 1rem + 2vw, 2.5rem)",
          marginTop: "auto",
        }}
      >
        <div className="max-w-170 mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-withname.svg"
              alt="TrainerTwin"
              className="h-7 w-auto"
            />
            <a
              href="/careers"
              className="ml-4 flex items-center gap-1.5 text-[13px] text-muted hover:text-brand transition-colors no-underline!"
            >
              <BriefcaseBusinessIcon size={16} aria-hidden />
              Careers
            </a>
          </div>

          <div className="flex items-center gap-6 text-[13px] text-muted">
            <a
              href="https://www.youtube.com/@TrainerTwin"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 hover:text-brand transition-colors no-underline!"
            >
              <YoutubeIcon size={16} />
              YouTube
            </a>
            <a
              href="https://x.com/trainertwin_ai"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 hover:text-brand transition-colors no-underline!"
            >
              <XIcon size={16} aria-hidden />
              Twitter
            </a>
            <a
              href="https://wa.me/919840717917"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand transition-colors no-underline!"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
