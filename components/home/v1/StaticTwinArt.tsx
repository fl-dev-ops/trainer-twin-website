import { Icon } from "../icons";

const QUESTION = "How do I handle a price objection?";

/**
 * The comparison's two drawings, still. They show what each twin does with the
 * same learner question instead of listing what it has — the list under the
 * card already does that. "Most AI twins" looks and sounds right and answers
 * with something anyone could say; "Your TrainerTwin" answers the way the
 * trainer would and says where it came from.
 */
export function StaticTwinArt({ variant }: { variant: "presence" | "full" }) {
  const full = variant === "full";

  return (
    <div
      className={full ? "sa sa--full" : "sa sa--presence"}
      role="img"
      aria-label={
        full
          ? `A learner asks "${QUESTION}". The twin answers in the trainer's own approach and cites the lesson it came from.`
          : `A learner asks "${QUESTION}". The twin answers with generic advice and cites nothing.`
      }
    >
      <p className="sa-q">{QUESTION}</p>

      <div className="sa-a">
        <span className="sa-avatar">
          <Icon name="face" />
        </span>

        <div className="sa-bubble">
          <p>
            {full
              ? "Don’t defend the price yet. Ask what they’re comparing it against first."
              : "Great question! Stay confident and keep practising."}
          </p>
          <span className="sa-source">
            <Icon name={full ? "doc" : "x"} />
            {full ? "From your notes, Lesson 6" : "No source"}
          </span>
        </div>
      </div>
    </div>
  );
}
