"use client";

import { useState } from "react";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      <article className="px-6 md:px-10 pt-32 pb-10 md:pt-32">
        <div className="prose mx-auto">
          <div className="flex items-center gap-2.5 not-prose! mb-5!">
            <svg width="24" height="18" viewBox="0 0 61 46" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M31 15H46V31H31V46H0V0H31V15ZM61 46H46V31H61V46ZM61 15H46V0H61V15Z" fill="#EC3013"/>
            </svg>
            <span className="font-figtree font-bold text-[14px] text-brand!">TrainerTwin</span>
          </div>
          <h1>Inviting Technical Trainers</h1>

          <p className="lead">
            Who are unable to offer sufficient mocks and 1:1s owing to time constraints
            or maxed out batch sizes
          </p>

          <p className="lead">
            We&apos;re building a patent pending TrainerTwin for you.
            {/*Your
            questions, your probing style, your way of coaching - available to
            every learner, at any hour, without you having to be there.*/}
            {" "} We want to collaborate with you to scale what is irreplaceable - the probe style,
            the pushback, the decision and more.
          </p>

          <p>
            <strong>
              <em> We&apos;re inviting founding trainers</em>
            </strong>{" "}
            to build this with us and get this free for life. Be the frontrunner
            in this exciting space. Lead the shift.
          </p>
        </div>
      </article>

      {/* The Team */}
      <article className="px-6 md:px-10 py-2 md:py-2">
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
      <article className="px-6 md:px-10 py-2 md:py-2">
        <div className="prose mx-auto">
          <h2>The Invitation</h2>

          <p>
            We&apos;re in discovery and build phase - stealth mode right now.
            We&apos;re looking for <strong>credible tech trainers</strong> who
            understand this pain firsthand to join us as Founding Trainers.
          </p>

          <p>What that means:</p>

          <ul>
            <li>Work closely with our team as design partners</li>
            <li>Co-build and test the solution with your own learners</li>
            <li>Shape the product before anyone else sees it</li>
            <li>
              Get <strong>free access for life</strong>
            </li>
          </ul>

          <p>
            If this sounds like something you&apos;ve been waiting for,
            we&apos;d love to talk.
          </p>

          {!submitted ? (
            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              onSubmit={() => setSubmitted(true)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 not-prose"
            >
              <input type="hidden" name="access_key" value="cb8bf68e-3efb-45eb-bd22-97a17b6f7b6c" />
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
            <div className="not-prose mt-8 p-5 bg-brand/10 rounded-2xl w-full">
              <p className="text-[15px] text-dark">
                Got it. We&apos;ll be in touch.
              </p>
            </div>
          )}
        </div>
      </article>

      {/* Footer */}
      <footer className="px-6 md:px-10 py-10">
        <div className="max-w-170 mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex items-center gap-2.5">
            <svg width="20" height="15" viewBox="0 0 61 46" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M31 15H46V31H31V46H0V0H31V15ZM61 46H46V31H61V46ZM61 15H46V0H61V15Z" fill="#EC3013"/>
            </svg>
            <span className="font-figtree font-bold text-[16px]">
              TrainerTwin
            </span>
          </div>

          <div className="flex items-center gap-6 text-[13px] text-muted">
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
