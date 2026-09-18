import { homeFontVariables } from "@/app/TrainerTwin_home_v3/fonts";
import "@/app/TrainerTwin_home_v3/home.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Equity program — Become a Founding Trainer | TrainerTwin",
  description:
    "Increase your reach and preserve your training style. Join TrainerTwin's founding trainer program — equity participation for early-adopter trainers who want to shape trainer-led AI learning.",
};

export default function InviteLayout({
  children,
}: LayoutProps<"/invite">) {
  return (
    <div
      data-theme="light"
      className={`${homeFontVariables} tt-home tt-home--v3 flex-1`}
    >
      {children}
    </div>
  );
}
