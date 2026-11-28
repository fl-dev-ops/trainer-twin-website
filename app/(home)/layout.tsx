import { explorationFontVariables } from "./fonts";
import "./page.css";
import "./parity.css";

export default function HomeLayout({
  children,
}: LayoutProps<"/">) {
  return (
    // Everything on this route lives under `.tte-page`: see page.css for why.
    <div className={`${explorationFontVariables} tte-page`}>{children}</div>
  );
}
