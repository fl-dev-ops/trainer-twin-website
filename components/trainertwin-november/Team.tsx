"use client";

import FlexCarousel, { type FlexCarouselItem } from "./FlexCarousel";

type Member = {
  name: string;
  role: string;
  cred: string;
  photo: string;
  linkedin?: string;
};

const MEMBERS: Member[] = [
  {
    name: "Shanmuga Anandaraman",
    role: "Co-founder & CEO",
    cred: "Ex-Director of Product, Freshworks",
    photo: "/trainertwin-november/images/team-shanmuga.jpg",
    linkedin: "https://www.linkedin.com/in/shyamanandaraman/",
  },
  {
    name: "Harini Shekar",
    role: "Co-founder & CTO",
    cred: "Ex-AI Director, PayPal",
    photo: "/trainertwin-november/images/team-harini.jpg",
    linkedin: "https://www.linkedin.com/in/harini-shekar/",
  },
  {
    name: "Dharshini Jenefer",
    role: "Partnerships",
    cred: "MA Education, Azim Premji University",
    photo: "/trainertwin-november/images/team-dharshini.jpg",
    linkedin: "https://www.linkedin.com/in/dharshini-jenefer-b8445398/",
  },
  {
    name: "Catherine Nivedha",
    role: "Growth and Product",
    cred: "British Council coach, 9 years",
    photo: "/trainertwin-november/images/team-catherine.jpg",
    linkedin: "https://www.linkedin.com/in/catherine-nivedha-7a27811b0/",
  },
  {
    name: "Lalith Kumar",
    role: "GTM Engineer",
    cred: "Ex-co-founder, Cliency",
    photo: "/trainertwin-november/images/team-lalith.jpg",
    linkedin: "https://www.linkedin.com/in/lalithlogs/",
  },
  {
    name: "Surya Umapathy",
    role: "Founding AI Engineer",
    cred: "Ex-Freshworks",
    photo: "/trainertwin-november/images/team-surya.jpg",
    linkedin: "https://www.linkedin.com/in/suryaumapathy2812/",
  },
  {
    name: "Bhuvan T",
    role: "Founding Designer",
    cred: "Ex-Freshworks",
    photo: "/trainertwin-november/images/team-bhuvan.jpg",
    linkedin: "https://www.linkedin.com/in/bhuvanui/",
  },
  {
    name: "Sandhya Shanmuga Sundaram",
    role: "Admin & HR",
    cred: "Ex-Siemens (US) · Ex-Amazon (India)",
    photo: "/trainertwin-november/images/team-sandhya.jpg",
  },
];

const SLIDES: FlexCarouselItem[] = MEMBERS.map((m) => ({
  src: m.photo,
  alt: m.name,
  title: m.name,
  subtitle: m.cred ? `${m.role} · ${m.cred}` : m.role,
  href: m.linkedin,
}));

/**
 * The team, shown as a WebGL "liquid glass" carousel (React Bits'
 * FlexCarousel): the row bends and splits around an invisible lens as it
 * scrolls, the centred person's name and role shown above. Clicking the
 * centred card opens that person's LinkedIn.
 */
export function Team() {
  return (
    <section className="team" id="team">
      <div className="wrap">
        <h2>The team behind TrainerTwin.</h2>
        <p className="crew-sub">Co-founders, and the team building it with them.</p>
        <div className="crew-stage">
          <FlexCarousel
            items={SLIDES}
            preset="liquid"
            intro="deal"
            cardHeight={0.48}
            gap={10}
            squeeze={0.2}
            focusOnClick={false}
            captureWheel={false}
            captions
            fit="portrait"
            radius={28}
            autoplay
            interval={4}
            onSelect={(index) => {
              const member = MEMBERS[index];
              if (member?.linkedin) window.open(member.linkedin, "_blank", "noopener,noreferrer");
            }}
          />
        </div>
      </div>
    </section>
  );
}
