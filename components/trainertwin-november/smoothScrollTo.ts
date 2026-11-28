export function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  let reduceMotion = false;
  try {
    reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    // ignore
  }
  el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
}
