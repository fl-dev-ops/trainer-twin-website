/** One icon per use case, shown before its title in the tab list with a light-grey circular background. */

export function QaIcon() {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7v.5" />
      <circle cx={12} cy={17} r={0.6} fill="currentColor" stroke="none" />
      <circle cx={12} cy={12} r={9} />
    </svg>
  );
}

export function MasterclassIcon() {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x={9} y={3} width={6} height={11} rx={3} />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </svg>
  );
}

export function RolePlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx={8} cy={8} r={3} />
      <path d="M2.5 20c0-3.3 2.5-6 5.5-6s5.5 2.7 5.5 6" />
      <circle cx={17} cy={7} r={2.3} />
      <path d="M14.5 13.3c2.6.3 4.7 2.6 4.9 5.7" />
    </svg>
  );
}

export function DealSupportIcon() {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12l-8.5 8.5a5 5 0 0 1-7-7L14 5a3.5 3.5 0 0 1 5 5l-8.5 8.5a2 2 0 0 1-3-3L15 8" />
    </svg>
  );
}

export function IncomeIcon() {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx={12} cy={12} r={9} />
      <path d="M12 7v10M9.5 9.3c0-1.3 1.1-2.3 2.5-2.3s2.5.9 2.5 2c0 2.3-5 1.7-5 4 0 1.1 1.1 2 2.5 2s2.5-1 2.5-2.3" />
    </svg>
  );
}

export const USE_CASE_TAB_ICONS = [QaIcon, MasterclassIcon, RolePlayIcon, DealSupportIcon, IncomeIcon];
