import { MicrosoftMark, AwsMark } from "./backerMarks";

/**
 * The trust line under the hero's call to action.
 *
 * Drawn for paper, unlike the "Backed by global technology leaders" band
 * further down the page — that one sits on night and uses each brand's white
 * wordmark; this one is on the copy side, so the marks take their published
 * colour variants and the labels take page ink.
 */
export function HeroBackers() {
  return (
    <div className="hero-backers">
      <p>Trusted &amp; Backed by global technology leaders</p>
      <div className="backer-row">
        <span className="backer">
          <MicrosoftMark />
          Microsoft for Startups
        </span>
        <span className="backer-sep" aria-hidden="true" />
        <span className="backer">
          <AwsMark />
          AWS Activate
        </span>
      </div>
    </div>
  );
}
