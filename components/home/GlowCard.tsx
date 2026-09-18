import { BorderGlow } from "@/components/BorderGlow";

/**
 * This page's settings for `BorderGlow`, in one place.
 *
 * Eight cards use it — the three mocks in "One twin, three ways to use it" and
 * the five in "Who it's for" — and the only thing that differs between them is
 * which surface they sit on and how round they are. Everything about how the
 * glow behaves is tuned here so the eight cannot drift apart.
 */
export function GlowCard({
  children,
  className,
  innerClassName,
  surface = "dark",
  background,
  radius,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  surface?: "light" | "dark";
  /** Any CSS colour; a token is the point. */
  background: string;
  radius: string;
}) {
  return (
    <BorderGlow
      className={className}
      innerClassName={innerClassName}
      surface={surface}
      backgroundColor={background}
      borderRadius={radius}
      /* Brand orange, lifted to a glow's lightness. The mesh runs from it to a
         warm tint and then to the page's blue, which is the same cool-to-warm
         pairing the headline and the section washes use. */
      glowColor="21 100 62"
      colors={["#ff5a00", "#ffa366", "#8fb6f5"]}
      /* Tighter than the 40px default: these sit in a tight row, and a glow
         that reached further would land on the card beside it. */
      glowRadius={26}
      edgeSensitivity={34}
      coneSpread={24}
      fillOpacity={0.32}
    >
      {children}
    </BorderGlow>
  );
}
