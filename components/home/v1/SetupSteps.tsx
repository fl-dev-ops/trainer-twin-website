import { Card, CardBody, CardTitle } from "@/components/Card";
import { Icon, type IconName } from "../icons";

const STEPS: Array<{
  title: string;
  copy: string;
  icon: IconName;
}> = [
  {
    title: "Add your material",
    copy: "Courses, books, frameworks and a few of your sessions.",
    icon: "doc",
  },
  {
    title: "Meet your twin",
    copy: "Your voice, your avatar, your coaching style.",
    icon: "face",
  },
  {
    title: "Calibrate it",
    copy: "Check the guardrails, and make sure it looks, sounds and thinks like you.",
    icon: "check",
  },
  {
    title: "Share with your learners",
    copy: "At the end of a module, a course or a book.",
    icon: "play",
  },
  {
    title: "Lean on our team",
    copy: "End-to-end support, so your time goes into growing your practice.",
    icon: "chat",
  },
];

/** /V1's "Set up once. Share it anywhere." — five numbered steps. */
export function SetupSteps() {
  return (
    <section
      id="how"
      className="sec sec--sunken v1-how"
      aria-labelledby="how-h"
    >
      <div className="wrap">
        <div className="head" data-reveal>
          <span className="eyebrow">How it works</span>
          <h2 id="how-h">
            Set up once.
            <br />
            Share it anywhere.
          </h2>
        </div>

        <ol className="v1-steps" data-reveal data-reveal-delay="100">
          {STEPS.map((step, i) => (
            <li key={step.title}>
              <Card className="v1-step">
                <CardBody className="v1-step-body">
                  <span className="v1-step-top">
                    <span className="v1-step-num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="v1-step-icon" aria-hidden="true">
                      <Icon name={step.icon} />
                    </span>
                  </span>
                  <CardTitle>{step.title}</CardTitle>
                  <p>{step.copy}</p>
                </CardBody>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
