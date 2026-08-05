const features = [
  {
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ec3013"
        strokeWidth="1.6"
        strokeLinecap="square"
      >
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
    title: "Trainer-first personalization",
    desc: "The twin learns your questioning pattern, tone and curriculum from your own uploads. It interviews like you, not like a general model with a job description pasted in.",
  },
  {
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ec3013"
        strokeWidth="1.6"
      >
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
      </svg>
    ),
    title: "550+ hours of interview data",
    desc: "Rubrics and follow-up logic built from 550+ hours of real technical interviews, so the probing goes deeper than a single prompt ever does.",
  },
  {
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ec3013"
        strokeWidth="1.6"
        strokeLinecap="square"
      >
        <path d="M4 5h9M4 12h16M4 19h12" />
        <path d="M17 5l3 0M20 19h0" />
      </svg>
    ),
    title: "Conversation design",
    desc: "Every roleplay follows a designed arc — open, probe, pressure, feedback — instead of drifting the way free-form chat does after two turns.",
  },
  {
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ec3013"
        strokeWidth="1.6"
        strokeLinecap="square"
      >
        <rect x="9" y="3" width="6" height="11" />
        <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
      </svg>
    ),
    title: "Real-time voice",
    desc: "Spoken interviews from a team that has shipped production voice products. Voice clone and video avatar are optional, never required.",
  },
  {
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ec3013"
        strokeWidth="1.6"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" />
      </svg>
    ),
    title: "AI4Bharath partnership",
    desc: "Speech models tuned for Indian accents and code-switching, so learners are understood the way they actually speak in an interview.",
  },
  {
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ec3013"
        strokeWidth="1.6"
        strokeLinecap="square"
      >
        <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: "Content IP protection",
    desc: "Your material trains only your twin. Never pooled with other trainers, never resold, never used to train a shared model.",
  },
];

export default function Differentiation() {
  return (
    <section id="different" className="border-b-2 border-dark">
      <div className="max-w-[1240px] mx-auto px-5 md:px-10 py-16 md:py-[88px] pb-16 md:pb-24">
        <p className="font-mono text-[11.5px] tracking-[0.14em] uppercase text-muted mb-5 md:mb-[22px]">
          02 — Why we&apos;re different
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[72px] items-end mb-10 md:mb-[52px]">
          <h2 className="text-3xl md:text-[46px] leading-[1.08]">
            Not a chatbot. Not another interview bot.
          </h2>
          <p className="text-base md:text-[17px] leading-[1.6] text-body">
            This is your coaching, trained on your material, protected as your
            IP. Six things make that possible.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-t-2 border-l-2 border-dark">
          {features.map((feature, i) => (
            <div
              key={i}
              className="py-8 px-6 md:px-[30px] pb-[34px] border-r-2 border-b-2 border-dark"
            >
              {feature.icon}
              <h3 className="text-[21px] mt-5 mb-[9px]">{feature.title}</h3>
              <p className="text-[14.5px] leading-[1.6] text-muted">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
