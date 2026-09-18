import { PageFooter } from "@/components/home/PageFooter";
import { SiteHeader } from "@/components/home/SiteHeader";
import { CareersTeamPhoto } from "./CareersTeamPhoto";
import { RoleCard } from "./RoleCard";
import { CAREERS_INTRO, CAREERS_TEAM_HREF, ROLES } from "@/data/careers";

/** Same header as /TrainerTwin_home_v3 — its own section links don't exist
    here, so the nav points out instead, same idea as invite_trainer's. */
const CAREERS_NAV = [
  { href: "/", label: "Home" },
  { href: "/invite", label: "Equity program" },
];

export function CareersPage() {
  return (
    <>
      {/* No `mobileMenu`: that collapse panel's CSS lives under
          `.tt-home--v3` only, and this route doesn't carry that scope. Two
          links do not need a hamburger anyway. */}
      <SiteHeader
        nav={CAREERS_NAV}
        ctaLabel="Early Access"
        logoColor="var(--tt-text-primary)"
      />
      <main id="top" className="careers flex-1 bg-canvas">
        <div className="wrap flex flex-col gap-12 py-16 md:gap-16 md:py-24">
          <header className="careers-hero">
            <CareersTeamPhoto />
            <div className="careers-hero-copy">
              <h1 className="font-display text-[44px] leading-[50px] font-semibold tracking-[-0.02em]">
                {CAREERS_INTRO.heading}
              </h1>
              <p className="font-ui text-[16px] leading-[26px]">
                {CAREERS_INTRO.lead}{" "}
                <a
                  href={CAREERS_TEAM_HREF}
                  className="link font-normal"
                >
                  {CAREERS_INTRO.teamLabel}
                </a>
              </p>
            </div>
          </header>

          {ROLES.length === 0 ? (
            <div className="flex flex-col items-start gap-3 rounded-md border border-dashed border-line px-5 py-8">
              <h2 className="font-ui text-[20px] leading-[26px] font-semibold text-ink">
                No open roles right now
              </h2>
              <p className="max-w-[65ch] font-ui text-[16px] leading-[26px] text-ink-secondary">
                Check back here — new roles land on this page when they open.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {ROLES.map((role) => (
                <li key={role.id}>
                  <RoleCard role={role} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <PageFooter hideCta layout="v3" />
    </>
  );
}
