import Header from "./components/header";
import Hero from "./components/hero";
import Problem from "./components/problem";
import Differentiation from "./components/differentiation";
import Founding from "./components/founding";
import FAQ from "./components/faq";
import CTA from "./components/cta";
import Footer from "./components/footer";

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
