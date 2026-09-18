"use client";

import { useEffect, useRef } from "react";
import { Aurora } from "@/components/Aurora";
import { Card, CardBody, CardTitle } from "@/components/Card";
import { CtaLink } from "./CtaLink";

type Founder = {
  name: string;
  href: string;
  domain: string;
  /** Bhuvan’s note as-is — one or more lines, never invented extras. */
  notes: string[];
  photo: string;
};

const FOUNDERS: Founder[] = [
  {
    name: "Vasanth Bhat",
    href: "https://www.linkedin.com/in/careerwithvasanth/",
    domain: "Career / education",
    notes: ["Requirements still being captured."],
    photo: "/home-v3/founders/vasanth-bhat.png",
  },
  {
    name: "Ranjith Ar",
    href: "https://www.linkedin.com/in/ranjith-ar-41343879/",
    domain: "Speaker / educator",
    notes: [
      "Interested in exploring how my Twin carries my teaching style beyond the textbook and into bite-sized learning.",
    ],
    photo: "/home-v3/founders/ranjith-ar.png",
  },
  {
    name: "Shubham Londhe",
    href: "https://www.linkedin.com/in/shubhamlondhe1996/",
    domain: "Tech trainer",
    notes: [
      "Interested in exploring how my Twin carries my teaching beyond live sessions and keeps learners engaged between classes.",
    ],
    photo: "/home-v3/founders/shubham-londhe.png",
  },
  {
    name: "Suren Saini",
    href: "https://www.linkedin.com/in/surensainisalesandleadershiparchitect/",
    domain: "Sales & leadership",
    notes: [
      "Interested in exploring how my Twin carries my sales framework, coaching style and role plays beyond the workshop.",
    ],
    photo: "/home-v3/founders/suren-saini.png",
  },
  {
    name: "Gamaliel Das",
    href: "https://www.linkedin.com/in/gamaliel-das/",
    domain: "Coach / consultant",
    notes: [
      "Interested in exploring how my Twin carries my expertise into video lessons, without me having to be on camera every time.",
    ],
    photo: "/home-v3/founders/gamaliel-das.png",
  },
  {
    name: "Uwais A A",
    href: "https://www.linkedin.com/in/uwaisaa/",
    domain: "Leadership & Communication trainer",
    notes: [
      "Interested in exploring how my Twin carries my delivery into UPSC practice, role plays and mock interviews.",
    ],
    photo: "/home-v3/founders/uswai_aa.png",
  },
];

/**
 * v3-only: Mixpanel-style looping story cards. Equity invite lives on the last card.
 */
export function FoundingTrainers() {
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const sets = rail.querySelectorAll<HTMLElement>(".found-set");
    const first = sets[0];
    if (!first) return;

    const apply = () => {
      const shift = `-${first.offsetWidth}px`;
      rail.style.setProperty("--found-shift", shift);
      sets.forEach((el) => el.style.setProperty("--found-shift", shift));
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(first);
    return () => ro.disconnect();
  }, []);

  return (
    <section
      className="sec sec--aurora found"
      id="founders"
      aria-labelledby="found-h"
    >
      {/* The same wash that opens "What your twin can do", on the same three
          tokens — the two light sections either side of the dark band read as
          one pair rather than as two unrelated grounds. */}
      <Aurora
        className="sec-aurora"
        colorStops={["--tt-blue-300", "--tt-primary-subtle", "--tt-primary"]}
        blend={0.78}
        amplitude={0.65}
        speed={0.32}
        lightMode
      />
      <div className="wrap">
        <div className="head">
          <h2 id="found-h">Meet people who have shown interest in TrainerTwin</h2>
        </div>
      </div>
      <div className="found-rail" ref={railRef}>
        <div className="found-track">
          <CardSet duplicate={false} />
          <CardSet duplicate />
        </div>
      </div>
    </section>
  );
}

function CardSet({ duplicate }: { duplicate: boolean }) {
  return (
    <ul className="found-set" aria-hidden={duplicate || undefined}>
      {FOUNDERS.map((founder) => (
        <FounderCard
          key={`${founder.name}${duplicate ? "-dup" : ""}`}
          founder={founder}
          duplicate={duplicate}
        />
      ))}
      <OthersCard duplicate={duplicate} />
    </ul>
  );
}

function FounderCard({
  founder,
  duplicate,
}: {
  founder: Founder;
  duplicate: boolean;
}) {
  const label = duplicate ? "" : founder.name;
  return (
    <li>
      <Card className="found-card">
        <CardBody className="found-copycol">
          <CardTitle display className="found-name">
            {founder.name}
          </CardTitle>
          <p className="found-domain">{founder.domain}</p>
          <a
            className="found-in"
            href={founder.href}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={duplicate ? -1 : undefined}
            aria-label={`${founder.name} on LinkedIn`}
          >
            <LinkedInMark />
          </a>
          {founder.notes.map((line) => (
            <p key={line} className="found-copy">
              {line}
            </p>
          ))}
        </CardBody>
        <div className="found-media">
          <img
            className="found-photo"
            src={founder.photo}
            alt={label}
            width={800}
            height={800}
          />
        </div>
      </Card>
    </li>
  );
}

function OthersCard({ duplicate }: { duplicate: boolean }) {
  return (
    <li>
      <Card className="found-card found-card--others">
        <CardBody className="found-copycol found-copycol--others">
          <h3 className="found-others">
            And many more are already exploring what we’re building.
          </h3>
          <CtaLink
            href="#early-access"
            className="hero-v3-cta found-cta"
            tabIndex={duplicate ? -1 : undefined}
          >
            Request a demo
          </CtaLink>
        </CardBody>
      </Card>
    </li>
  );
}

function LinkedInMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="currentColor"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
