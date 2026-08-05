import type { Metadata } from "next";
import { Figtree, Noto_Serif } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
});

const siteUrl = "https://trainertwin.ai";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TrainerTwin — AI Interview Coaching at Scale",
    template: "%s | TrainerTwin",
  },
  description:
    "Turn your videos, notes and question banks into an AI twin that runs mock interviews, code reviews and viva with every learner — in your style, at your standard, without you in the room.",
  keywords: [
    "AI interview coaching",
    "mock interviews",
    "tech trainer",
    "coding bootcamp",
    "placement academy",
    "AI roleplay",
    "interview preparation",
    "trainer twin",
  ],
  authors: [{ name: "TrainerTwin" }],
  creator: "TrainerTwin",
  publisher: "TrainerTwin",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "TrainerTwin",
    title: "TrainerTwin — AI Interview Coaching at Scale",
    description:
      "Turn your videos, notes and question banks into an AI twin that runs mock interviews, code reviews and viva with every learner — in your style, at your standard, without you in the room.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TrainerTwin — AI Interview Coaching at Scale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TrainerTwin — AI Interview Coaching at Scale",
    description:
      "Turn your videos, notes and question banks into an AI twin that runs mock interviews, code reviews and viva with every learner.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TrainerTwin",
    url: siteUrl,
    description:
      "Turn your videos, notes and question banks into an AI twin that runs mock interviews, code reviews and viva with every learner.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TrainerTwin",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description:
      "AI roleplay for tech trainers. Built with the trainers who run the interviews.",
    sameAs: [],
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "TrainerTwin",
    description:
      "AI twin that runs mock interviews, code reviews and viva with every learner — in your style, at your standard.",
    brand: {
      "@type": "Brand",
      name: "TrainerTwin",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/PreOrder",
      description: "Free through beta for founding trainers",
    },
  };

  return (
    <html
      lang="en"
      className={`${figtree.variable} ${notoSerif.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
