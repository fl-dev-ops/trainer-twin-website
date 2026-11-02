import { LogoSymbol } from "@/components/Logo";
import { Icon, type IconName } from "../icons";

const NODES: Array<{ label: string; icon: IconName }> = [
  { label: "Your presence", icon: "face" },
  { label: "Your intelligence", icon: "doc" },
  { label: "Your training DNA", icon: "chat" },
];

/** Where each of the three wires lands along the 300-wide drawing. */
const X = [50, 150, 250];

/**
 * The comparison's two drawings, with nothing moving: a hub, three things a
 * twin can have, and which of them are wired in. "Most AI twins" is wired to
 * presence alone and the other two sit unplugged; "Your TrainerTwin" is wired
 * to all three. Same layout both sides, so the difference is the only thing
 * that changes between the cards.
 */
export function StaticTwinArt({ variant }: { variant: "presence" | "full" }) {
  const full = variant === "full";

  return (
    <div
      className={full ? "sa sa--full" : "sa sa--presence"}
      role="img"
      aria-label={
        full
          ? "A twin connected to three things: your presence, your intelligence and your training DNA."
          : "A twin connected to your presence only. Your intelligence and your training DNA are not connected."
      }
    >
      <span className="sa-hub">
        {full ? <LogoSymbol size={24} /> : <Icon name="face" />}
      </span>

      <svg
        className="sa-wires"
        viewBox="0 0 300 40"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        {X.map((x, i) => {
          const on = full || i === 0;
          return (
            <path
              key={x}
              d={`M150 0 C150 22, ${x} 18, ${x} 40`}
              className={on ? "sa-wire is-on" : "sa-wire is-off"}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>

      <ul className="sa-row">
        {NODES.map((node, i) => {
          const on = full || i === 0;
          return (
            <li key={node.label} className={on ? "sa-node is-on" : "sa-node is-off"}>
              <span className="sa-node-icon">
                <Icon name={node.icon} />
              </span>
              {node.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
