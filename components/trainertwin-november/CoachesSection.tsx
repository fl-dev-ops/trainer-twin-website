import { CoachSpotlight } from "./CoachSpotlight";
import { Testimonials } from "./Testimonials";

export function CoachesSection() {
  return (
    <section className="coaches" id="partners">
      <div className="wrap">
        <h2>Coaches around the world are exploring their twins.</h2>
      </div>
      <div className="wrap">
        <CoachSpotlight />
      </div>
      <Testimonials />
    </section>
  );
}
