"use client";

export function ChipGroup({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: Set<string>;
  onToggle: (label: string) => void;
}) {
  return (
    <div className="jobs">
      {options.map((label) => (
        <button
          key={label}
          type="button"
          className="job"
          aria-pressed={selected.has(label)}
          onClick={() => onToggle(label)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
