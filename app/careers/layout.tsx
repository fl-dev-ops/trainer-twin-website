import type { Metadata } from "next";
import { homeFontVariables } from "@/app/TrainerTwin_home/fonts";
import "@/app/TrainerTwin_home/home.css";
import "./careers.css";
import { CAREERS_META } from "@/data/careers";

export const metadata: Metadata = {
  title: CAREERS_META.title,
  description: CAREERS_META.description,
};

export default function CareersLayout({ children }: LayoutProps<"/careers">) {
  return (
    <div
      data-theme="light"
      className={`${homeFontVariables} tt-home flex min-h-full flex-1 flex-col bg-canvas`}
    >
      {children}
    </div>
  );
}
