"use client";

import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b-2 border-dark">
      <div className="max-w-[1240px] mx-auto px-5 md:px-10 h-[72px] flex items-center justify-between gap-8">
        <a href="/" className="flex items-center gap-[11px]">
          <div className="w-[26px] h-[26px] bg-brand flex items-center justify-center text-white font-figtree font-extrabold text-[13px] leading-none">
            T
          </div>
          <span className="font-figtree font-bold text-[17px] leading-none tracking-tight">
            TrainerTwin
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-[34px] text-[14.5px] font-medium">
          <a href="#problem" className="hover:text-brand transition-colors">
            The problem
          </a>
          <a href="#different" className="hover:text-brand transition-colors">
            Why we&apos;re different
          </a>
          <a href="#founding" className="hover:text-brand transition-colors">
            Founding Trainers
          </a>
          <a href="#faq" className="hover:text-brand transition-colors">
            FAQ
          </a>
          <a
            href="#founding"
            className="bg-brand text-white py-[11px] px-[18px] font-bold text-[14.5px] hover:bg-brand-dark transition-colors"
          >
            Join Early Access
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
          aria-label="Toggle menu"
        >
          <span
            className={`w-5 h-0.5 bg-dark transition-transform ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`}
          />
          <span
            className={`w-5 h-0.5 bg-dark transition-opacity ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`w-5 h-0.5 bg-dark transition-transform ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden border-t border-border-light px-5 py-6 grid gap-4 text-[15px] font-medium">
          <a
            href="#problem"
            onClick={() => setMenuOpen(false)}
            className="hover:text-brand transition-colors"
          >
            The problem
          </a>
          <a
            href="#different"
            onClick={() => setMenuOpen(false)}
            className="hover:text-brand transition-colors"
          >
            Why we&apos;re different
          </a>
          <a
            href="#founding"
            onClick={() => setMenuOpen(false)}
            className="hover:text-brand transition-colors"
          >
            Founding Trainers
          </a>
          <a
            href="#faq"
            onClick={() => setMenuOpen(false)}
            className="hover:text-brand transition-colors"
          >
            FAQ
          </a>
          <a
            href="#founding"
            onClick={() => setMenuOpen(false)}
            className="bg-brand text-white py-[11px] px-[18px] font-bold text-[14.5px] text-center hover:bg-brand-dark transition-colors"
          >
            Join Early Access
          </a>
        </nav>
      )}
    </header>
  );
}
