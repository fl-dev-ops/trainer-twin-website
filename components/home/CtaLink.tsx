import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/components/cn";

/**
 * The system `Button`'s `strong` variant, as an anchor.
 *
 * Every call to action on this page navigates — to a section, or to the product
 * landing — and `Button` is button-only by design (§8): an anchor rendered as a
 * <button> loses middle-click, "open in new tab" and the browser's own
 * understanding that it is navigation. So the classes are written out here
 * rather than the element being lied about, the same way the two
 * /TrainerTwin_home* routes solve it.
 *
 * The three sizes are the system's own, verbatim — 32px for the header, 40px
 * for an in-page CTA, and the 54px `xl` that was added to the scale for the
 * marketing hero.
 */
const SIZES = {
  sm: "h-8 px-3 text-[16px]",
  md: "h-10 px-5 text-[14px]",
  xl: "h-[54px] px-6 text-[16px]",
} as const;

export function CtaLink({
  size = "xl",
  className,
  children,
  ...rest
}: { size?: keyof typeof SIZES } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(
        "font-ui inline-flex items-center justify-center gap-2 rounded-sm border border-transparent font-semibold whitespace-nowrap no-underline",
        "bg-strong text-on-strong hover:bg-strong-hover transition-colors duration-150 ease-standard",
        SIZES[size],
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  );
}
