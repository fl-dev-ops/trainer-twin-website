/**
 * The page's section list — shared by the header nav and the footer's
 * "Product" column, so the two can never drift apart.
 *
 * Kept in its own plain module rather than exported from SiteHeader.tsx: that
 * file is "use client", and a Server Component (SiteFooter) importing a
 * non-component value out of a client module is not a supported crossing —
 * only the client component itself is handed across the RSC boundary, not its
 * other exports.
 */
export const NAV = [
  { href: "#can-do", label: "Twin capabilities" },
  { href: "#who", label: "Who it’s for" },
  { href: "#build", label: "Build your twin" },
  /* Points at the reused comparison's own id (WhyTrainerTwin.tsx) rather than
     at a "#why" this page never renders. */
  { href: "#how-it-differs", label: "Why TrainerTwin" },
];

/**
 * v3's own list. It is written out rather than filtered from `NAV`: this page
 * has no Generic AI comparison, so the live home's `#how-it-differs` hash
 * would be dead here, and its sections don't line up with the live home's
 * one-for-one. "Why TrainerTwin" points at `#training-dna`
 * (`BuildYourTwinV3`'s "See your training DNA in action") rather than at
 * `CompareTwin`'s `#compare` — the DNA extraction is the differentiator
 * being sold there, and `#compare` is still rendered on the page, just no
 * longer a nav destination. The last item points at `#founders`,
 * `FoundingTrainers`' "Meet people who have shown interest in TrainerTwin"
 * — social proof rather than the build steps.
 * Both the header and the footer's Product column read this.
 */
export const NAV_V3 = [
  { href: "#can-do", label: "Twin capabilities" },
  { href: "#who", label: "Who it’s for" },
  { href: "#training-dna", label: "Why TrainerTwin" },
  { href: "#founders", label: "Early Interest" },
];
