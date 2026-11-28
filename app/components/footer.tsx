export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="max-w-[1240px] mx-auto px-5 md:px-10 py-10 md:py-14 pb-8 md:pb-10 grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1.2fr] gap-8 md:gap-10">
        <div className="col-span-2 md:col-span-1">
          <p className="font-figtree font-bold text-[16px] mb-[14px]">
            TrainerTwin
          </p>
          <p className="text-[14px] leading-[1.6] text-white/65 max-w-[280px]">
            AI roleplay for tech trainers. Built with the trainers who run the
            interviews.
          </p>
        </div>

        <div>
          <p className="font-mono text-[11px] tracking-[0.09em] uppercase text-white/50 mb-[14px]">
            Page
          </p>
          <div className="grid gap-[9px] text-[14px]">
            <a
              href="#problem"
              className="!text-white/85 hover:!text-brand transition-colors"
            >
              The problem
            </a>
            <a
              href="#different"
              className="!text-white/85 hover:!text-brand transition-colors"
            >
              Why we&apos;re different
            </a>
            <a
              href="#founding"
              className="!text-white/85 hover:!text-brand transition-colors"
            >
              Founding Trainers
            </a>
            <a
              href="#faq"
              className="!text-white/85 hover:!text-brand transition-colors"
            >
              FAQ
            </a>
          </div>
        </div>

        <div>
          <p className="font-mono text-[11px] tracking-[0.09em] uppercase text-white/50 mb-[14px]">
            Company
          </p>
          <div className="grid gap-[9px] text-[14px]">
            <a
              href="#cta"
              className="!text-white/85 hover:!text-brand transition-colors"
            >
              About
            </a>
            <a
              href="#cta"
              className="!text-white/85 hover:!text-brand transition-colors"
            >
              Content &amp; IP terms
            </a>
            <a
              href="#cta"
              className="!text-white/85 hover:!text-brand transition-colors"
            >
              Privacy
            </a>
          </div>
        </div>

        <div className="col-span-2 md:col-span-1">
          <p className="font-mono text-[11px] tracking-[0.09em] uppercase text-white/50 mb-[14px]">
            Talk to us
          </p>
          <a
            href="https://wa.me/919840717917"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[15px] !text-white font-semibold hover:!text-brand transition-colors"
          >
            +91 98407 17917
          </a>
          <div className="mt-[18px] flex gap-2.5">
            <a
              href="https://x.com/trainertwin"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[34px] h-[34px] border border-white/30 flex items-center justify-center !text-white/85 hover:border-brand hover:!text-brand transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/company/trainertwin"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[34px] h-[34px] border border-white/30 flex items-center justify-center !text-white/85 hover:border-brand hover:!text-brand transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://youtube.com/@trainertwin"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[34px] h-[34px] border border-white/30 flex items-center justify-center !text-white/85 hover:border-brand hover:!text-brand transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-5 md:px-10 py-5 pb-8 md:pb-10 border-t border-white/18 flex flex-col sm:flex-row justify-between gap-4 sm:gap-6">
        <p className="font-mono text-[11.5px] text-white/50">
          © 2026 TrainerTwin
        </p>
        <p className="font-mono text-[11.5px] text-white/50">
          Early access · 30 founding trainers
        </p>
      </div>
    </footer>
  );
}
