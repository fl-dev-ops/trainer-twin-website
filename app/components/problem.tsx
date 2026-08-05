export default function Problem() {
  const todayItems = [
    {
      title: "Manual mock interviews",
      desc: "One hour of yours per learner, per round.",
    },
    {
      title: "Repeating the same Q&A",
      desc: "The same twenty questions, explained again this week.",
    },
    {
      title: "Limited mentoring hours",
      desc: "Coaching stops when the live session ends.",
    },
    {
      title: "Learners waiting",
      desc: "They queue for weeks, then walk into real interviews unpractised.",
    },
    {
      title: "Generic AI tools",
      desc: "They ask nothing like you do, and teach against your curriculum.",
    },
  ];

  const twinItems = [
    {
      title: "The twin conducts the interview",
      desc: "Your questions, your follow-ups, your bar.",
    },
    {
      title: "Everyone practises, unlimited",
      desc: "Any hour, any number of rounds, no scheduling.",
    },
    {
      title: "Feedback tied to the learner",
      desc: "Scored against your rubric, on their own project and gaps.",
    },
    {
      title: "Readiness reported back to you",
      desc: "See who is interview-ready and where the cohort is weak.",
    },
    {
      title: "Coaching that runs 24×7",
      desc: "Your teaching keeps working after the class ends.",
    },
  ];

  return (
    <section id="problem" className="bg-bg border-b-2 border-dark">
      <div className="max-w-[1240px] mx-auto px-5 md:px-10 py-16 md:py-[88px] pb-16 md:pb-24">
        <p className="font-mono text-[11.5px] tracking-[0.14em] uppercase text-muted mb-5 md:mb-[22px]">
          01 — The problem
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[72px] items-end mb-10 md:mb-[52px]">
          <h2 className="text-3xl md:text-[46px] leading-[1.08]">
            Great trainers don&apos;t scale.
          </h2>
          <p className="text-base md:text-[17px] leading-[1.6] text-body">
            Your teaching scales to a thousand learners. Your interview practice
            scales to whoever fits in your calendar. That gap is where placement
            outcomes are lost.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-2 border-dark bg-white">
          <div className="py-8 md:py-9 px-6 md:px-[38px] md:border-r-2 border-dark">
            <div className="flex items-baseline justify-between mb-5 md:mb-[22px]">
              <h3 className="text-xl md:text-[24px]">Today</h3>
              <span className="font-mono text-[10px] md:text-[11px] tracking-[0.07em] uppercase text-muted">
                Manual, one at a time
              </span>
            </div>
            <div className="grid gap-0">
              {todayItems.map((item, i) => (
                <div
                  key={i}
                  className="py-4 border-t border-border-lighter"
                >
                  <p className="font-semibold text-[15.5px] mb-1">
                    {item.title}
                  </p>
                  <p className="text-[14px] leading-[1.5] text-light">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="py-8 md:py-9 px-6 md:px-[38px] bg-white border-t-2 md:border-t-0 border-dark">
            <div className="flex items-baseline justify-between mb-5 md:mb-[22px]">
              <h3 className="text-xl md:text-[24px]">With your AI twin</h3>
              <span className="font-mono text-[10px] md:text-[11px] tracking-[0.07em] uppercase text-brand-light">
                Every learner, every week
              </span>
            </div>
            <div className="grid gap-0">
              {twinItems.map((item, i) => (
                <div
                  key={i}
                  className="py-4 border-t border-border-lighter"
                >
                  <p className="font-semibold text-[15.5px] mb-1">
                    {item.title}
                  </p>
                  <p className="text-[14px] leading-[1.5] text-light">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
