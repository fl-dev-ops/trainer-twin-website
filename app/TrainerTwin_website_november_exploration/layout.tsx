import type { Metadata } from "next";
import { explorationFontVariables } from "./fonts";
import "./page.css";
import "./parity.css";

export const metadata: Metadata = {
  title: "TrainerTwin website — November exploration",
  description:
    "Meet your AI twin in 7 days — a coding pass of the November design exploration, ported into real components.",
};

export default function TrainerTwinNovemberExplorationLayout({
  children,
}: LayoutProps<"/TrainerTwin_website_november_exploration">) {
  return (
    // Everything on this route lives under `.tte-page`: see page.css for why.
    <div className={`${explorationFontVariables} tte-page`}>{children}</div>
  );
}
