import type { Metadata } from "next";
import { NovemberHome } from "@/components/home-nov/NovemberHome";
import { fontNovBody, fontNovDisplay } from "./fonts-nov";

export const metadata: Metadata = {
  title: "TrainerTwin: meet your AI twin in 7 days",
  description:
    "For coaches, trainers and professors. We build a demo of your AI twin from your public courses, videos, books or posts, ready in 7 days.",
};

export default function Home() {
  return <NovemberHome className={`${fontNovDisplay.variable} ${fontNovBody.variable}`} />;
}
