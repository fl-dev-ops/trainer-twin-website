export function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <rect x={9} y={3} width={6} height={11} rx={3} />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </svg>
  );
}
export function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor">
      <path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
    </svg>
  );
}
export function ClipIcon() {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M21 12l-8.5 8.5a5 5 0 0 1-7-7L14 5a3.5 3.5 0 0 1 5 5l-8.5 8.5a2 2 0 0 1-3-3L15 8" />
    </svg>
  );
}
export function FlagIcon() {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M5 21V4h11l-2 4 2 4H5" />
    </svg>
  );
}
export function EndIcon() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="currentColor">
      <path d="M3 14c5-5 13-5 18 0l-2.5 2.5-3-1.5v-2.5a10 10 0 0 0-5 0V15l-3 1.5z" />
    </svg>
  );
}
export function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width={12} height={12} fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export function TwinOrb() {
  return (
    <span className="orb" aria-hidden="true">
      <i />
      <i />
      <i />
      <span className="orb-core">
        <img src="/trainertwin-november/mark.svg" alt="" width={40} height={40} />
      </span>
    </span>
  );
}

export function PersonaBadge({ label, cls }: { label: string; cls: string }) {
  return (
    <span className={`pa ${cls}`} aria-hidden="true">
      {label.charAt(0)}
    </span>
  );
}
