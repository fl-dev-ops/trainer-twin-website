import type { Metadata } from "next";
import { Figtree, Noto_Serif } from "next/font/google";
import "../globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TrainerTwin — We're building something new",
  description:
    "A team of engineers, designers, and educators building AI twins for trainers. Coming soon.",
};

export default function ComingSoonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${notoSerif.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
