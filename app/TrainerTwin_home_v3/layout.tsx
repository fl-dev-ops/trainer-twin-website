import type { Metadata } from "next";
import { homeFontVariables } from "./fonts";
import "./home.css";

export const metadata: Metadata = {
  title:
    "TrainerTwin: build a twin of you your learners & followers can reach anytime",
  description:
    "TrainerTwin turns your knowledge and persona into a version of you your learners & followers can reach whenever they need: an interactive twin, explainer videos and promo clips.",
};

export default function TrainerTwinHomeV3Layout({
  children,
}: LayoutProps<"/TrainerTwin_home_v3">) {
  return (
    <div
      data-theme="light"
      className={`${homeFontVariables} tt-home tt-home--v3 flex-1`}
    >
      {children}
    </div>
  );
}
