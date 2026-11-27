import "./home-nov.css";

/** The homepage brings its own header, footer and styles (home-nov.css, scoped under .tt26). */
export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex-1">{children}</div>;
}
