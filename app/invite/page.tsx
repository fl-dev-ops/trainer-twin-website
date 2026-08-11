"use client";

import { useState } from "react";
import { YoutubeIcon } from "@/components/icons/youtube-icon";
import { PartyPopperIcon } from "@/components/icons/popper-icon";
import { PlayIcon } from "@/components/icons/play-icon";

const YOUTUBE_ID = "ArAxbHGoyyw";

const team = [
  {
    name: "Shanmuga (Shyam) Anandaraman",
    role: "CEO, Ex Freshworks",
    image: "https://www.foreverlearning.in/team/shyam-linkedin.jpeg",
    linkedin: "https://in.linkedin.com/in/shyamanandaraman",
  },
  {
    name: "Harini Shekar",
    role: "Co-Founder & AI Director, Ex Paypal",
    image: "https://www.foreverlearning.in/team/harini-linkedin.jpeg",
    linkedin: "https://www.linkedin.com/in/harini-shekar-30414614/",
  },

  {
    name: "Dharshini Jenefer",
    role: "Head of Partnerships",
    image: "https://www.foreverlearning.in/team/dharshini-linkedin.jpeg",
    linkedin: "https://www.linkedin.com/in/dharshini-jenefer-b8445398/",
  },
  {
    name: "Catherine Nivedha",
    role: "Learning Sciences & Pedagogy",
    image: "https://www.foreverlearning.in/team/catherine-linkedin.jpeg",
    linkedin: "https://www.linkedin.com/in/catherine-nivedha-7a27811b0/",
  },
  {
    name: "Bhuvan T",
    role: "Founding Designer, Ex Freshworks",
    image: "https://www.foreverlearning.in/team/bhuvan-linkedin.jpeg",
    linkedin: "https://www.linkedin.com/in/bhuvanui/",
  },
  {
    name: "Surya Umapathy",
    role: "Founding Engineer, Ex Freshworks",
    image: "https://www.foreverlearning.in/team/surya-linkedin.jpeg",
    linkedin: "https://www.linkedin.com/in/suryaumapathy2812/",
  },
  {
    name: "Mohammed Hasan",
    role: "Founding Engineer, Ex Freshworks",
    image: "https://www.foreverlearning.in/team/hasan-linkedin.png",
    linkedin: "https://www.linkedin.com/in/mhasan07/",
  },
];

export default function ComingSoon() {
  const [submitted, setSubmitted] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [youtubeHovered, setYoutubeHovered] = useState(false);
  const [videoHovered, setVideoHovered] = useState(false);

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
        <div className="prose mx-auto">
          <div className="flex items-center gap-2.5 not-prose! mb-5!">
            <svg
              width="28"
              height="20"
              viewBox="0 0 61 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M31 15H46V31H31V46H0V0H31V15ZM61 46H46V31H61V46ZM61 15H46V0H61V15Z"
                fill="#EC3013"
              />
            </svg>
            <span className="font-figtree font-bold text-[20px] text-brand!">
              TrainerTwin
            </span>
          </div>
          <h1>Increase Your Reach. Preserve Your Training Style</h1>

          <p className="">
            TrainerTwin is built on a patent-pending approach to modelling a
            trainer’s instructional method, domain expertise and learner
            context. Together, we can create an AI TrainerTwin that reflects how
            you train while keeping your IP intact.
          </p>

          <p className="">
            Your TrainerTwin can support learners across three connected
            experiences:
          </p>

          <ul>
            <li>
              <strong>Learn with your TrainerTwin</strong> shaped by your
              teaching approach,
            </li>
            <li>
              <strong> Practice with your TrainerTwin</strong> through guided
              exercises, adaptive challenges
            </li>
            <li>
              <strong>Get assessed with your TrainerTwin</strong> using your
              rubrics and feedback principles.
            </li>
          </ul>

          <div className="mx-auto not-prose" style={{ maxWidth: 680 }}>
            <div
              className="relative w-full overflow-hidden rounded-2xl bg-muted/20 group cursor-pointer"
              style={{ aspectRatio: "16 / 9" }}
              onClick={() => setVideoPlaying(true)}
              onMouseEnter={() => setVideoHovered(true)}
              onMouseLeave={() => setVideoHovered(false)}
            >
              {!videoPlaying ? (
                <>
                  <img
                    src="/youtube_thumbnail.webp"
                    alt="TrainerTwin video thumbnail"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-start justify-end bg-black/2 transition-colors group-hover:bg-black/10">
                    <div className="w-12 h-12 rounded-full bg-brand/80  flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 group-hover:bg-brand/90 mr-4 mt-4">
                      <PlayIcon size={16} className="text-white" isHovered={videoHovered} />
                    </div>
                  </div>
                </>
              ) : (
                <iframe
                  src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1`}
                  title="TrainerTwin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              )}
            </div>
          </div>
        </div>
      </article>

      {/* The 4 Intelligence Layers */}
      <article
        className="py-2 md:py-2"
        style={{
          paddingLeft: "clamp(1.5rem, 1rem + 2vw, 2.5rem)",
          paddingRight: "clamp(1.5rem, 1rem + 2vw, 2.5rem)",
        }}
      >
        <div className="prose mx-auto">
          <h2>Built on Four Intelligence Layers</h2>

          <p>
            Your training is defined by your judgement, expertise and the way
            you help each learner move forward. TrainerTwin brings these
            elements together to create a learning experience that reflects how
            you teach - not just what you teach
          </p>

          <ul>
            <li>
              <strong>Instructional Policy Model</strong> - trainer-specific
              teaching and decision patterns
            </li>
            <li>
              <strong>Domain Knowledge and Competency Model</strong> subject
              knowledge, examples and evaluation standards
            </li>
            <li>
              <strong>Learner State and Personalisation Model</strong> goals,
              history, proficiency and evolving needs
            </li>
            <li>
              <strong>Multimodal Interaction Layer</strong> voice, video,
              avatar, facial expressions and trainer-specific communication
              behavior
            </li>
          </ul>
        </div>
      </article>

      {/* The Data Protection by Design */}
      <article
        className="py-2 md:py-2"
        style={{
          paddingLeft: "clamp(1.5rem, 1rem + 2vw, 2.5rem)",
          paddingRight: "clamp(1.5rem, 1rem + 2vw, 2.5rem)",
        }}
      >
        <div className="prose mx-auto">
          <h2>Data Protection by Design</h2>

          <p>
            Trainer and learner data is handled with privacy, security and
            purpose limitation at its core. We collect and use data only to
            create, personalize and improve the TrainerTwin experience with
            appropriate access controls and retention practices. Trainers and
            learners remain informed about how their data is used.
          </p>
        </div>
      </article>

      {/* The You evolve. So does your Twin */}
      <article
        className="py-2 md:py-2"
        style={{
          paddingLeft: "clamp(1.5rem, 1rem + 2vw, 2.5rem)",
          paddingRight: "clamp(1.5rem, 1rem + 2vw, 2.5rem)",
        }}
      >
        <div className="prose mx-auto">
          <h2>You evolve. So does your Twin.</h2>

          <p>
            You don’t stop learning and growing as a trainer. Your teaching
            methods, insights and standards evolve too. Your TrainerTwin can
            evolve with you, so your learners continue to benefit with your
            latest and sharpest thinking. Update and refine as your expertise
            grows. Think Delphi, for Trainers. Think HeyGen, for Trainers. But
            built pedagogy-first: not just a digital representation of you, but
            an AI learning experience shaped by the way you teach.
          </p>
        </div>
      </article>

      {/* The Team */}
      <article
        className="py-2 md:py-2"
        style={{
          paddingLeft: "clamp(1.5rem, 1rem + 2vw, 2.5rem)",
          paddingRight: "clamp(1.5rem, 1rem + 2vw, 2.5rem)",
        }}
      >
        <div className="prose mx-auto">
          <h2>The team.</h2>

          <p>
            Ex-Freshworks Director of Product. Ex-PayPal AI Director.
            Second-time founders. We&apos;ve shipped products at scale, built AI
            systems, and spent years understanding how people learn.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 not-prose my-10 gap-y-8 md:gap-5">
            {team.map((member, i) => (
              <a
                key={i}
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group block no-underline text-dark"
              >
                <div className="aspect-square rounded-2xl bg-muted/20 overflow-hidden mb-1">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <p className="text-[13px] font-semibold no-underline mb-1!">
                  {member.name}
                </p>
                <p className="text-[11px] text-muted no-underline">
                  {member.role}
                </p>
              </a>
            ))}
          </div>
        </div>
      </article>

      {/* The Invitation */}
      <article
        className="py-2 md:py-2"
        style={{
          paddingLeft: "clamp(1.5rem, 1rem + 2vw, 2.5rem)",
          paddingRight: "clamp(1.5rem, 1rem + 2vw, 2.5rem)",
        }}
      >
        <div className="prose mx-auto">
          <h2>Become a Founding Trainer</h2>

          <p>
            Inspired by the 2-sigma challenge – the idea that personalised
            tutoring can significantly improve learning outcomes – we believe AI
            can help make personalised guidance accessible to more learners
          </p>

          <p>
            We want to explore this possibility with early-adopter trainers who
            believe in the vision and want to help shape it. Eligible founding
            trainers receive equity participation, subject to mutually agreed
            terms.
          </p>

          <p>
            Today we are starting with Tech Trainers. If this resonates with you
            as a fitness coach, sales coach or trainer in any other domain,
            reach out to us. The domain may change but the opportunity to extend
            your teaching remains the same
          </p>

          <ul>
            <li>Work closely with our team as a design partner</li>
            <li>Co-build and test TrainerTwin with your learners</li>
            <li>Shape the product before its wider release</li>
            <li>
              Receive <strong>equity participation</strong>, subject to mutually
              agreed terms
            </li>
          </ul>

          <p>
            If this resonates with you - and you want to help define what
            trainer-led AI learning should be -{" "}
            <strong>we&apos;d love to talk.</strong>
          </p>

          {!submitted ? (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const formData = new FormData(form);
                formData.append(
                  "access_key",
                  "cb8bf68e-3efb-45eb-bd22-97a17b6f7b6c",
                );
                const res = await fetch("https://api.web3forms.com/submit", {
                  method: "POST",
                  body: formData,
                });
                const data = await res.json();
                if (data.success) setSubmitted(true);
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 not-prose"
            >
              <input
                type="text"
                name="contact"
                required
                placeholder="Phone or Email"
                className="col-span-1 w-full border-0 bg-muted/20 rounded-xl py-3 px-4 text-[15px] outline-none focus:ring-2 focus:ring-brand/30 transition-all"
              />
              <input
                type="text"
                name="link"
                required
                placeholder="LinkedIn or Website"
                className="col-span-1 w-full border-0 bg-muted/20 rounded-xl py-3 px-4 text-[15px] outline-none focus:ring-2 focus:ring-brand/30 transition-all"
              />
              <button
                type="submit"
                className="w-full col-span-1 md:col-span-2 bg-brand text-white! font-semibold text-[15px] py-3.5 rounded-xl hover:bg-brand-dark transition-colors"
              >
                Submit
              </button>
            </form>
          ) : (
            <div className="not-prose mt-8 p-5 bg-brand/10 rounded-2xl w-full flex items-center gap-3">
              <PartyPopperIcon size={24} autoPlay className="text-brand" />
              <p className="text-[15px] text-dark">
                Got it. We&apos;ll be in touch.
              </p>
            </div>
          )}
        </div>
      </article>

      {/* Footer */}
      <footer
        className="py-10"
        style={{
          paddingLeft: "clamp(1.5rem, 1rem + 2vw, 2.5rem)",
          paddingRight: "clamp(1.5rem, 1rem + 2vw, 2.5rem)",
        }}
      >
        <div className="max-w-170 mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex items-center gap-2.5">
            <svg
              width="20"
              height="15"
              viewBox="0 0 61 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M31 15H46V31H31V46H0V0H31V15ZM61 46H46V31H61V46ZM61 15H46V0H61V15Z"
                fill="#EC3013"
              />
            </svg>
            <span className="font-figtree font-bold text-[16px]">
              TrainerTwin
            </span>
          </div>

          <div className="flex items-center gap-6 text-[13px] text-muted">
            <a
              href="https://www.youtube.com/@TrainerTwin"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 hover:text-brand transition-colors"
              onMouseEnter={() => setYoutubeHovered(true)}
              onMouseLeave={() => setYoutubeHovered(false)}
            >
              <YoutubeIcon size={16} isHovered={youtubeHovered} />
              YouTube
            </a>
            <a
              href="https://wa.me/919840717917"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
