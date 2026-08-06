import type { Metadata } from "next";
import { Figtree, Noto_Serif } from "next/font/google";
import Script from "next/script";
import Analytics from "./components/analytics";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
});

const siteUrl = "https://www.trainertwin.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TrainerTwin — AI Interview Coaching",
    template: "%s | TrainerTwin",
  },
  description:
    "Turn your training materials into an AI twin that coaches every learner — in your style, at your standard.",
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
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "TrainerTwin",
    title: "TrainerTwin — AI Interview Coaching",
    description:
      "Turn your training materials into an AI twin that coaches every learner — in your style, at your standard.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "TrainerTwin — AI Interview Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TrainerTwin — AI Interview Coaching",
    description:
      "Turn your training materials into an AI twin that coaches every learner — in your style, at your standard.",
    images: [`${siteUrl}/og-image.png`],
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
    icon: ["/favicon.ico", "/favicon.svg"],
  },
  other: {
    "theme-color": "#ec3013",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TrainerTwin",
    url: siteUrl,
    description:
      "Turn your training materials into an AI twin that coaches every learner.",
  };

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TrainerTwin",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description:
      "AI roleplay for tech trainers. Built with the trainers who run the interviews.",
    sameAs: [
      "https://x.com/trainertwin",
      "https://linkedin.com/company/trainertwin",
      "https://youtube.com/@trainertwin",
    ],
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "TrainerTwin",
    description:
      "AI twin that runs mock interviews, code reviews and viva — in your style.",
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

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "TrainerTwin — AI Interview Coaching",
    url: siteUrl,
    description:
      "Turn your training materials into an AI twin that coaches every learner.",
    publisher: {
      "@type": "Organization",
      name: "TrainerTwin",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
  };

  return (
    <html
      lang="en"
      className={`${figtree.variable} ${notoSerif.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Z53K4ZF1QJ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Z53K4ZF1QJ');
          `}
        </Script>
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <Analytics />
        {children}
      </body>
    </html>
  );
}
