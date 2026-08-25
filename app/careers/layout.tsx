import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work with us",
  description:
    "We're seven people building AI twins for trainers. Small on purpose, and hiring for roles that don't have a playbook yet.",
};

export default function CareersLayout({ children }: LayoutProps<"/careers">) {
  return children;
}
