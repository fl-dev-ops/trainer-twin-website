import type { Metadata } from "next";
import { InviteTrainerPage } from "@/components/home/InviteTrainerPage";

export const metadata: Metadata = {
  title: "Equity program — Become a Founding Trainer | TrainerTwin",
  description:
    "Increase your reach and preserve your training style. Join TrainerTwin's founding trainer program — equity participation for early-adopter trainers who want to shape trainer-led AI learning.",
};

export default function InviteTrainerRoute() {
  return <InviteTrainerPage />;
}
