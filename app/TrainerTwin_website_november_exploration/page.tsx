import { BuildTwinForm } from "@/components/trainertwin-november/BuildTwinForm";
import { CoachesSection } from "@/components/trainertwin-november/CoachesSection";
import { Hero } from "@/components/trainertwin-november/Hero";
import { PageZoomEffect } from "@/components/trainertwin-november/PageZoomEffect";
import { Team } from "@/components/trainertwin-november/Team";
import { UseCases } from "@/components/trainertwin-november/UseCases";
import { SiteFooter, Vision } from "@/components/trainertwin-november/VisionAndFooter";

/**
 * TrainerTwin website — November exploration.
 *
 * Ported from a standalone prototype (see the artifact comment thread this
 * page was requested from) into real components: the same look and the same
 * client-side interactions — coach spotlight, use-case demos, the build-your-
 * twin stepper, the scroll-pinned video widget — none of it wired to a real
 * backend yet. See page.css for why every selector is scoped under
 * `.tte-page` rather than written flat.
 */
export default function TrainerTwinNovemberExplorationPage() {
  return (
    <>
      <PageZoomEffect />
      <Hero />
      <CoachesSection />
      <UseCases />
      <BuildTwinForm />
      <Team />
      <Vision />
      <SiteFooter />
    </>
  );
}
