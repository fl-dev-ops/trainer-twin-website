import type { Line } from "./useCaseData";
import { PlayIcon } from "./useCaseIcons";

/** Renders the lines revealed so far for the active use case (see UseCases.tsx for the reveal timing). */
export function UseCaseLines({ lines }: { lines: Line[] }) {
  return (
    <>
      {lines.map((line, i) => {
        if (line.tag === "clipref") {
          return (
            <p className="ln clipref" key={i}>
              <PlayIcon /> {line.text}
            </p>
          );
        }
        if (line.tag === "shotln") {
          return (
            <p className="ln shotln" key={i}>
              <span className="shot-img">
                <i />
                <i />
                <i />
              </span>
              {line.text}
            </p>
          );
        }
        if (line.tag === "pay") {
          return (
            <p className="ln pay" key={i}>
              {line.text}
            </p>
          );
        }
        if (line.tag === "sys") {
          return (
            <p className="ln sys" key={i} role="status" aria-label={line.text}>
              <span className="dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
            </p>
          );
        }
        return (
          <p className={`ln ${line.tag}`} key={i}>
            {line.text}
          </p>
        );
      })}
    </>
  );
}
