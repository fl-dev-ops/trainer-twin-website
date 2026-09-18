import type { ReactNode } from "react";
import {
  DEFAULT_COLUMNS,
  SiteFooter,
  type FooterLink,
} from "@/components/landing2/SiteFooter";
import { FIELDS } from "./fields";
import { NAV } from "./nav";
import "@/app/TrainerTwin_home_2/landing.css";

/**
 * The footer, reused from landing2 — the invite CTA and its form, the link
 * grid, the status pill and the oversized wordmark.
 *
 * It arrives carrying `id="early-access"` and the invite form itself, which is
 * what this page's separate EarlyAccess section used to be. Both cannot hold
 * that id, and two invitations on one page is one too many, so the section went
 * and every `#early-access` link on the page now lands on the form rather than
 * on a block that pointed at one.
 *
 * The columns are this page's, not the footer's defaults: Product is the nav's
 * own four sections and Services the four fields, both read from the modules
 * that already define them rather than retyped here. One footer under two
 * pages can only work if each passes its own — the defaults point at the Tech
 * Trainer page's sections, which do not exist on this one.
 *
 * `.tt-landing` supplies the `--l-*` vocabulary it is written in — the footer
 * line colour, the live dot, and the footer's own type face.
 */
const shared = (heading: string): FooterLink[] =>
  DEFAULT_COLUMNS.find((column) => column.heading === heading)?.links ?? [];

const COLUMNS = [
  {
    heading: "Product",
    links: NAV.map((item) => ({ label: item.label, href: item.href })),
  },
  {
    heading: "Services",
    links: FIELDS.map((field) => ({
      label: field.label,
      href: field.href,
      live: field.live ?? false,
    })),
  },
  {
    heading: "Resources",
    links: [
      ...shared("Resources"),
      { label: "Careers", href: "/careers" },
    ],
  },
  { heading: "Legals", links: shared("Legals") },
];

export function PageFooter({
  cta,
  hideCta,
  nav = NAV,
  eyebrow,
  title,
  body,
  points,
  pointsNote,
  layout = "default",
}: {
  cta?: ReactNode;
  /** See `SiteFooter` — drops the intro-copy-plus-form row entirely. */
  hideCta?: boolean;
  nav?: typeof NAV;
  /** Overrides the footer's own intro copy. See `SiteFooter`. */
  eyebrow?: string;
  title?: ReactNode;
  body?: ReactNode;
  points?: string[];
  pointsNote?: string;
  layout?: "default" | "v3";
} = {}) {
  const columns = [
    {
      heading: "Product",
      links: nav.map((item) => ({ label: item.label, href: item.href })),
    },
    COLUMNS[1],
    COLUMNS[2],
    /* v3 drops Legals — none of its four links (Cookies, Terms, Privacy,
       Data sourcing) go anywhere yet, and a column of dead links reads worse
       than three real ones. `_v1` and the live home keep it. */
    ...(layout === "v3" ? [] : [COLUMNS[3]]),
  ];
  return (
    <div className="tt-landing">
      <SiteFooter
        columns={columns}
        cta={cta}
        hideCta={hideCta}
        eyebrow={eyebrow}
        title={title}
        body={body}
        points={points}
        pointsNote={pointsNote}
        layout={layout}
      />
    </div>
  );
}
