"use client";

export function InfoButton({
  id,
  open,
  onToggle,
  children,
}: {
  id: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <span className="ib-wrap">
      <button
        type="button"
        className="ib"
        aria-expanded={open}
        aria-controls={id}
        aria-label="Why we ask"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
      >
        i
      </button>
      <p className="ib-tip" id={id} role="tooltip">
        {children}
      </p>
    </span>
  );
}
