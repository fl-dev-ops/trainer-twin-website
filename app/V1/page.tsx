import type { Metadata } from "next";
import { CompareTwin, type CompareColumn } from "@/components/home/CompareTwin";
import { EarlyAccessSteps } from "@/components/home/EarlyAccessSteps";
import { FoundingTrainers } from "@/components/home/FoundingTrainers";
import { HeroV3 } from "@/components/home/HeroV3";
import { PageFooter } from "@/components/home/PageFooter";
import { SiteHeader } from "@/components/home/SiteHeader";
import { WantToTwin } from "@/components/home/WantToTwin";
import { NAV_V1 } from "@/components/home/nav";
import { FaqV1 } from "@/components/home/v1/FaqV1";
import { ModesV1 } from "@/components/home/v1/ModesV1";
import { SetupSteps } from "@/components/home/v1/SetupSteps";
import { ScrollEffects } from "@/components/landing2/ScrollEffects";
import type { FooterColumn } from "@/components/landing2/SiteFooter";

export const metadata: Metadata = {
  title: "TrainerTwin: turn your course into a conversation",
  description:
    "An AI twin for coaches and trainers. Learners ask questions and practise real conversations, coached in your voice, with your frameworks.",
};

const COMPARE: CompareColumn[] = [
  {
    key: "full",
    title: "Your TrainerTwin",
    icon: "face",
    featured: true,
    rows: [
      {
        ok: true,
        label: "Your presence",
        note: "Your face and your voice, with your pace, tone and pauses.",
      },
      {
        ok: true,
        label: "Your intelligence",
        note: "Your courses, books, notes and sessions, so it answers from what you actually teach.",
      },
      {
        ok: true,
        label: "Your training DNA",
        note: "How you explain, question, coach and debrief.",
      },
    ],
    foot: "Thinks, coaches and debriefs like you.",
  },
  {
    key: "presence",
    title: "Most AI twins",
    icon: "video",
    featured: false,
    rows: [
      { ok: true, label: "Your presence", note: "Face and voice" },
      { ok: false, label: "Your intelligence" },
      { ok: false, label: "Your training DNA" },
    ],
    foot: "Looks and sounds like you.",
  },
];

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: "Product",
    links: NAV_V1.map((item) => ({ label: item.label, href: item.href })),
  },
  {
    heading: "Domains",
    links: [
      { label: "Sales", href: "#modes" },
      { label: "Communication", href: "#modes" },
      { label: "Leadership", href: "#modes" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Careers", href: "/careers" },
      { label: "Equity program", href: "/invite" },
      { label: "Privacy policy", href: "/privacy" },
      {
        label: "LinkedIn",
        href: "https://linkedin.com/company/trainertwin",
      },
    ],
  },
];

export default function V1() {
  return (
    <>
      <SiteHeader nav={NAV_V1} mobileMenu ctaLabel="Request a demo" />
      <main id="top">
        <HeroV3
          eyebrow="AN AI TWIN FOR COACHES AND TRAINERS"
          headline={
            <WantToTwin
              lead="Turn your course into"
              asks={[
                "a conversation.",
                "a practice room.",
                "a coaching session.",
                "a Q&A.",
              ]}
              tail="Coached in your voice."
            />
          }
          lede="Your twin brings the one-way parts of your course to life. Learners ask questions and practise real conversations, coached in your voice, with your frameworks."
          centered
        />
        <CompareTwin
          id="twin"
          light
          columns={COMPARE}
          head={{
            eyebrow: "Our difference",
            title: "What’s a twin?",
            body: "A version of you that your learners, audience and coachees can reach anytime.",
          }}
        />
        <ModesV1 />
        <SetupSteps />
        <FaqV1 />
        <FoundingTrainers />
      </main>
      <PageFooter
        cta={<EarlyAccessSteps />}
        nav={NAV_V1}
        columns={FOOTER_COLUMNS}
        layout="v3"
        title="Turn your course into a conversation"
        points={[
          "Learners ask questions and practise real conversations, in your voice",
          "Our team supports you end to end, with a dedicated platform admin",
          "Founding trainers get a special equity program",
        ]}
        pointsNote="Takes less than 5 mins. We'll follow up with a demo within 24hrs."
      />
      <ScrollEffects />
    </>
  );
}
