export default function CTA() {
  return (
    <section id="cta" className="bg-brand text-white">
      <div className="max-w-[1240px] mx-auto px-5 md:px-10 py-16 md:py-[104px] pb-16 md:pb-[108px] grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-16 items-end">
        <div>
          <h2 className="text-3xl md:text-[60px] leading-[1.04] text-white max-w-[760px] mb-6">
            The best coaching shouldn&apos;t stop when the class ends.
          </h2>
          <p className="text-lg md:text-[19px] leading-[1.5] text-white/88 max-w-[520px]">
            Thirty founding trainers. Free through beta. Your twin built with
            you.
          </p>
          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3.5 flex-wrap">
            <a
              href="#founding"
              className="bg-white text-brand py-[17px] px-6 font-bold text-[15.5px] text-center hover:bg-bg transition-colors"
            >
              Join Early Access
            </a>
            <a
              href="#founding"
              className="border-[1.5px] border-white/70 text-white py-[15.5px] px-6 font-semibold text-[15.5px] text-center hover:bg-white/12 transition-colors"
            >
              Book a Discovery Call
            </a>
          </div>
        </div>

        <div className="border-t-2 border-white/50 pt-6">
          <p className="font-mono text-[11.5px] tracking-[0.08em] uppercase text-white/75 mb-[14px]">
            What happens next
          </p>
          <p className="text-[15px] leading-[1.6] text-white/92">
            1. You send one course or question bank.
            <br />
            2. We build your twin in a week.
            <br />
            3. You run it with ten learners and tell us where it is wrong.
          </p>
        </div>
      </div>
    </section>
  );
}
