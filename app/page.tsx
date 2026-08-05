import type { Metadata } from "next";
import Header from "./components/header";
import Hero from "./components/hero";
import Problem from "./components/problem";
import Differentiation from "./components/differentiation";
import Founding from "./components/founding";
import FAQ from "./components/faq";
import CTA from "./components/cta";
import Footer from "./components/footer";

export const metadata: Metadata = {
  title: "TrainerTwin — AI Interview Coaching at Scale",
  description:
    "Turn your videos, notes and question banks into an AI twin that runs mock interviews, code reviews and viva with every learner — in your style, at your standard, without you in the room.",
};

export default function Home() {
  return (
    <div className="max-w-full">
      <Header />
      <Hero />
      <Problem />
      <Differentiation />
      <Founding />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
