import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TrainerTwin — We're building something new",
  description:
    "A team of engineers, designers, and educators building AI twins for trainers. Coming soon.",
};

export default function InviteLayout({ children }: LayoutProps<"/invite">) {
  return children;
}
