import { homeFontVariables } from "@/app/TrainerTwin_home_v3/fonts";
import "@/app/TrainerTwin_home_v3/home.css";
import { fontV1 } from "./fonts";
import "./v1.css";

export default function V1Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-theme="light"
      className={`${homeFontVariables} ${fontV1.variable} tt-home tt-home--v3 tt-v1 flex-1`}
    >
      {children}
    </div>
  );
}
