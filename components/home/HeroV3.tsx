import { CursorGrid } from "@/components/CursorGrid";
import { CtaLink } from "./CtaLink";
import { HeroV3Pills } from "./HeroV3Pills";
import { ShinyText } from "./ShinyText";
import { WantToTwin } from "./WantToTwin";

/**
 * Figma node 717:9911 — the v3 hero only. Original home routes keep `Hero`.
 */
export function HeroV3() {
  return (
    <section className="hero hero--v3">
      <div className="hero-v3-wash" aria-hidden="true" />
      <div className="hero-v3-corners" aria-hidden="true" />
      <div className="hero-v3-cursor" aria-hidden="true">
        <CursorGrid
          cellSize={48}
          radius={150}
          color="#fe5900"
          falloff="smooth"
          maxOpacity={0.45}
          fillOpacity={0.12}
          lineWidth={1.1}
          cellRadius={3}
          holdTime={140}
          fadeDuration={1500}
          pulseSpeed={520}
          gridOpacity={0}
          gridColor="#e7ebf1"
        />
      </div>
      <div className="hero-v3-inner">
        <div className="hero-v3-col hero-v3-col--copy">
          <div className="hero-v3-copy">
            <p className="hero-v3-eyebrow">
              <ShinyText
                text="AI TWIN FOR EVERY EXPERT"
                color="#d4c08a"
                shineColor="#ffffff"
                direction="right"
              />
            </p>
            <div className="hero-v3-titleblock">
              <WantToTwin />
              <p className="hero-v3-lede">
                TrainerTwin turns your knowledge and persona into a version of you
                that your people can reach whenever they need. It talks like you,
                teaches like you and thinks like you.
              </p>
            </div>
          </div>

          <CtaLink href="#early-access" className="hero-v3-cta">
            Request a demo
          </CtaLink>

          <div className="hero-v3-trust">
            <p>Part of Microsoft for Startups &amp; AWS Activate</p>
            <div className="hero-v3-backers">
              <span className="hero-v3-backer">
                <img
                  src="/home-v3/microsoft.png"
                  alt=""
                  width={24}
                  height={24}
                />
                Microsoft for Startups
              </span>
              <span className="hero-v3-pipe" aria-hidden="true">
                |
              </span>
              <span className="hero-v3-backer">
                <img src="/home-v3/aws.png" alt="" width={28} height={28} />
                AWS activate
              </span>
            </div>
          </div>
        </div>

        <div className="hero-v3-col hero-v3-col--pills">
          <HeroV3Pills />
        </div>
      </div>
    </section>
  );
}
