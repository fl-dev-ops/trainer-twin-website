import type { Line } from "./useCaseData";
import { ROLE_PLAY_CARDS } from "./useCaseData";
import { ChatIcon, ClipIcon, EndIcon, FlagIcon, MicIcon, PersonaBadge, TwinOrb } from "./useCaseIcons";
import { UseCaseLines } from "./UseCaseLines";

export function TwCallPanel({
  on,
  left,
  title,
  lines,
}: {
  on?: "mic" | "clip";
  left?: string;
  title?: string;
  lines: Line[];
}) {
  return (
    <div className="tw-call">
      <div className="tw-top">
        <span className="tw-brand">
          <img src="/trainertwin-november/mark.svg" alt="" width={16} height={16} />
          TrainerTwin
        </span>
        <span className="tw-pill">{left || "20 min left"}</span>
      </div>
      {title && <div className="tw-title">{title}</div>}
      <div className="tw-tile">
        <TwinOrb />
        <span className="tw-tag">Your twin</span>
      </div>
      <div className="tw-lines">
        <UseCaseLines lines={lines} />
      </div>
      <div className="tw-ctrl">
        <span className={on === "mic" ? "on" : undefined}>
          <MicIcon />
        </span>
        <span>
          <ChatIcon />
        </span>
        <span className={on === "clip" ? "on" : undefined}>
          <ClipIcon />
        </span>
        <span>
          <FlagIcon />
        </span>
        <span className="end">
          <EndIcon />
        </span>
      </div>
    </div>
  );
}

export function RolePlayPanel({ lines }: { lines: Line[] }) {
  return (
    <div className="rp">
      <div className="rp-head">Choose a role-play</div>
      <div className="rp-grid">
        {ROLE_PLAY_CARDS.map((card, i) => (
          <div className={`rp-card ${card.art}${card.selected ? " sel" : ""}`} key={card.title}>
            <div className="rp-art">
              <span className="rp-persona">
                <PersonaBadge label={card.persona} cls={`p${i}`} />
                <span>
                  <b>Persona</b>
                  <small>{card.persona}</small>
                </span>
              </span>
            </div>
            <b>{card.title}</b>
            <small>{card.sub}</small>
          </div>
        ))}
      </div>
      <div className="tw-lines rp-lines">
        <UseCaseLines lines={lines} />
      </div>
    </div>
  );
}

export function EmbedPanel({ lines }: { lines: Line[] }) {
  return (
    <div className="emb">
      <div className="emb-bar">
        <i />
        <i />
        <i />
        <span>yourwebsite.com/practice</span>
      </div>
      <div className="emb-page">
        <div className="emb-copy">
          <b>Practise with my twin</b>
          <small>Ask questions and role-play any time, in my voice and style.</small>
          <div className="emb-price">
            Pay as you go <span>&middot; top up any time</span>
          </div>
          <span className="emb-btn">Top up 30 minutes</span>
        </div>
        <div className="emb-widget">
          <TwinOrb />
          <span className="tw-tag">Your twin</span>
        </div>
      </div>
      <div className="tw-lines emb-lines">
        <UseCaseLines lines={lines} />
      </div>
    </div>
  );
}
