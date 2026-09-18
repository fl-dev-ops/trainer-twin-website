import { homeFontVariables } from "@/app/TrainerTwin_home_v3/fonts";
import "@/app/TrainerTwin_home_v3/home.css";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      data-theme="light"
      className={`${homeFontVariables} tt-home tt-home--v3 flex-1`}
    >
      {children}
    </div>
  );
}
