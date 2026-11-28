"use client";

import { TopNav } from "./TopNav";
import { VideoStage } from "./VideoStage";
import { smoothScrollTo } from "./smoothScrollTo";

const CHECKS = ["No private content needed", "Your IP stays yours"];

function CheckIcon() {
  return (
    <svg aria-hidden="true" width={14} height={14} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8.5l3.2 3L13 4.5" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="hero" id="twin">
      <div className="wrap">
        <TopNav />

        <div className="hero-main">
          <div className="lead">
            <p className="eyebrow">For coaches, trainers and professors</p>
            <h1>Meet your AI twin in 48 hrs.</h1>
            <div className="pitch">
              <p>We build your twin ready from your public courses, videos, books or posts.</p>
              <a
                className="cta"
                href="#build"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo("build");
                }}
              >
                Build my free demo
              </a>
              <ul className="assure">
                {CHECKS.map((label) => (
                  <li key={label}>
                    <CheckIcon />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
            <div className="logos">
              <b>Part of</b>
              <span className="mark">
                <img src="/trainertwin-november/images/logo-microsoft.png" alt="" width={53} height={52} />
                Microsoft for Startups
              </span>
              <i className="bar" aria-hidden="true" />
              <span className="mark">
                <img src="/trainertwin-november/images/logo-aws.png" alt="" width={62} height={38} />
                AWS Activate
              </span>
              <i className="bar" aria-hidden="true" />
              <span className="mark">
                <img src="/trainertwin-november/images/logo-nvidia.png" alt="" width={108} height={72} />
                NVIDIA Inception
              </span>
              <i className="bar" aria-hidden="true" />
              <span className="mark">
                <img className="word" src="/trainertwin-november/images/logo-startupindia.png" alt="Startup India" width={322} height={72} />
              </span>
            </div>
          </div>

          <VideoStage />
        </div>
      </div>
    </section>
  );
}
