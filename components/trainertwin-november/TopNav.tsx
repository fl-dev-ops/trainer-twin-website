"use client";

import { smoothScrollTo } from "./smoothScrollTo";

const LINKS = [
  { id: "partners", label: "Who's exploring" },
  { id: "uses", label: "Use cases" },
  { id: "build", label: "Build your twin" },
  { id: "team", label: "Team" },
];

export function TopNav() {
  return (
    <header className="top">
      <div className="brand">
        <img src="/trainertwin-november/mark.svg" alt="" width={18} height={18} />
        TrainerTwin
      </div>
      <nav aria-label="Sections">
        {LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo(link.id);
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
