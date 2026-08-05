export default function Footer() {
  return (
    <footer className="bg-dark text-bg">
      <div className="max-w-[1240px] mx-auto px-5 md:px-10 py-10 md:py-14 pb-8 md:pb-10 grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1.2fr] gap-8 md:gap-10">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-[11px] mb-[14px]">
            <div className="w-6 h-6 bg-brand flex items-center justify-center text-white font-figtree font-extrabold text-[12px] leading-none">
              T
            </div>
            <span className="font-figtree font-bold text-[16px] leading-none">
              TrainerTwin
            </span>
          </div>
          <p className="text-[14px] leading-[1.6] text-bg/65 max-w-[280px]">
            AI roleplay for tech trainers. Built with the trainers who run the
            interviews.
          </p>
        </div>

        <div>
          <p className="font-mono text-[11px] tracking-[0.09em] uppercase text-bg/50 mb-[14px]">
            Page
          </p>
          <div className="grid gap-[9px] text-[14px]">
            <a
              href="#problem"
              className="text-bg/85 hover:text-brand transition-colors"
            >
              The problem
            </a>
            <a
              href="#different"
              className="text-bg/85 hover:text-brand transition-colors"
            >
              Why we&apos;re different
            </a>
            <a
              href="#founding"
              className="text-bg/85 hover:text-brand transition-colors"
            >
              Founding Trainers
            </a>
            <a
              href="#faq"
              className="text-bg/85 hover:text-brand transition-colors"
            >
              FAQ
            </a>
          </div>
        </div>

        <div>
          <p className="font-mono text-[11px] tracking-[0.09em] uppercase text-bg/50 mb-[14px]">
            Company
          </p>
          <div className="grid gap-[9px] text-[14px]">
            <a
              href="#cta"
              className="text-bg/85 hover:text-brand transition-colors"
            >
              About
            </a>
            <a
              href="#cta"
              className="text-bg/85 hover:text-brand transition-colors"
            >
              Content &amp; IP terms
            </a>
            <a
              href="#cta"
              className="text-bg/85 hover:text-brand transition-colors"
            >
              Privacy
            </a>
          </div>
        </div>

        <div className="col-span-2 md:col-span-1">
          <p className="font-mono text-[11px] tracking-[0.09em] uppercase text-bg/50 mb-[14px]">
            Talk to us
          </p>
          <a
            href="mailto:hello@trainertwin.ai"
            className="text-[15px] text-white font-semibold hover:text-brand transition-colors"
          >
            hello@trainertwin.ai
          </a>
          <div className="mt-[18px] flex gap-2.5">
            {["X", "in", "yt"].map((social) => (
              <a
                key={social}
                href="#cta"
                className="w-[34px] h-[34px] border border-bg/30 flex items-center justify-center text-[12px] text-bg/85 hover:border-brand hover:text-brand transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-5 md:px-10 py-5 pb-8 md:pb-10 border-t border-bg/18 flex flex-col sm:flex-row justify-between gap-4 sm:gap-6">
        <p className="font-mono text-[11.5px] text-bg/50">
          © 2026 TrainerTwin
        </p>
        <p className="font-mono text-[11.5px] text-bg/50">
          Early access · 30 founding trainers
        </p>
      </div>
    </footer>
  );
}
