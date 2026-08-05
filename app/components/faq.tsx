"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How is this different from ChatGPT?",
    a: "ChatGPT does not know your curriculum, your bar or your follow-up style, and it never reports back to you. Your twin is trained on your own material, interviews against your rubric, and returns learner readiness to your dashboard.",
  },
  {
    q: "What exactly is an AI roleplay?",
    a: "A structured, spoken or typed session your learner runs with your twin: a technical interview, a code walkthrough, a viva, a resume review. It opens, probes, pressures, then scores and explains — the way you would.",
  },
  {
    q: "What can I upload?",
    a: "YouTube videos, PDFs, PPTs, GitHub repositories, notes, documentation and your existing interview question banks. Anything that carries how you teach and how you question.",
  },
  {
    q: "Who owns my content?",
    a: "You do. Your uploads train only your twin. They are never pooled with other trainers, never resold, and never used to train a shared model. You can export or delete everything at any time.",
  },
  {
    q: "Can I use voice only, and skip the avatar?",
    a: "Yes. Voice-only is the default. Voice clone and video avatar are separate opt-ins, and you can turn either off without changing how the roleplay works.",
  },
  {
    q: "Can I customize the conversations and rubrics?",
    a: "Yes. You set the question flow, the difficulty ladder, how hard the twin pushes, and the rubric it scores against. Edit any of it after you see the first sessions.",
  },
  {
    q: "Does it work with Kajabi, Circle or my LMS?",
    a: "Roleplays are shareable links you can embed in Kajabi, Circle, Teachable or your own LMS. Deeper integrations are being built with the founding cohort, in the order they ask for them.",
  },
  {
    q: "How much will it cost after beta?",
    a: "Founding trainers stay on founding pricing for good. Public pricing will be per active learner, with a flat tier for bootcamps and academies — we will publish it before beta ends.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <section id="faq" className="border-b-2 border-dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
      />
      <div className="max-w-[1240px] mx-auto px-5 md:px-10 py-16 md:py-[88px] pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-[0.72fr_1.28fr] gap-10 lg:gap-[72px] items-start">
        <div>
          <p className="font-mono text-[11.5px] tracking-[0.14em] uppercase text-muted mb-5 md:mb-[22px]">
            04 — Questions
          </p>
          <h2 className="text-3xl md:text-[42px] leading-[1.08] mb-4">
            Before you hand over your material.
          </h2>
          <p className="text-base md:text-[16px] leading-[1.6] text-body">
            Anything not answered here, ask on the discovery call — we would
            rather over-explain the IP terms than under-explain them.
          </p>
        </div>

        <div className="border-t-2 border-dark">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-border-light">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full border-0 bg-none py-5 md:py-[22px] px-1 flex items-center justify-between gap-6 text-left cursor-pointer hover:text-brand transition-colors"
              >
                <span className="font-semibold text-base md:text-[16.5px]">
                  {faq.q}
                </span>
                <span className="font-mono text-lg md:text-[18px] text-brand flex-none">
                  {openIndex === i ? "–" : "+"}
                </span>
              </button>
              {openIndex === i && (
                <p className="pb-6 pl-1 pr-0 md:pr-16 text-[15px] leading-[1.65] text-muted">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
