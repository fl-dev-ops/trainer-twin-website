import { homeFontVariables } from "@/app/TrainerTwin_home_v3/fonts";
import "@/app/TrainerTwin_home_v3/home.css";
import "./v1.css";

export default function V1Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-theme="light"
      className={`${homeFontVariables} tt-home tt-home--v3 flex-1`}
    >
      {children}
    </div>
  );
}
