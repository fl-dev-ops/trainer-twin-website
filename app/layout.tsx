import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { Suspense } from "react";
import Analytics from "./components/analytics";
import PostHogPageView from "./components/posthog-pageview";
import "./globals.css";

// Fonts are self-hosted (app/fonts, latin subset from Google Fonts): next/font/google
// breaks the build whenever Google serves extensionless /l/font?kit= URLs
// (vercel/next.js#99114).
const figtree = localFont({
  variable: "--font-figtree",
  src: "./fonts/figtree-latin.woff2",
  weight: "300 900",
});

const notoSerif = localFont({
  variable: "--font-noto-serif",
  // One variable file declared at the three weights the Google config used, so
  // heavier weights still cap at 600 as before.
  src: [
    { path: "./fonts/noto-serif-latin.woff2", weight: "300" },
    { path: "./fonts/noto-serif-latin.woff2", weight: "400" },
    { path: "./fonts/noto-serif-latin.woff2", weight: "600" },
  ],
  adjustFontFallback: "Times New Roman",
});

const jetbrainsMono = localFont({
  variable: "--tt-font-mono",
  src: "./fonts/jetbrains-mono-latin.woff2",
  weight: "100 800",
  display: "swap",
});

// Also expose Figtree and Noto Serif under the tt-* token names
// so the new design-system components resolve their font variables
const figtreeForTokens = localFont({
  variable: "--tt-font-ui",
  src: "./fonts/figtree-latin.woff2",
  weight: "300 900",
  display: "swap",
});

const notoSerifForTokens = localFont({
  variable: "--tt-font-display",
  // One variable file declared at the three weights the Google config used, so
  // heavier weights still cap at 600 as before.
  src: [
    { path: "./fonts/noto-serif-latin.woff2", weight: "300" },
    { path: "./fonts/noto-serif-latin.woff2", weight: "400" },
    { path: "./fonts/noto-serif-latin.woff2", weight: "600" },
  ],
  adjustFontFallback: "Times New Roman",
  display: "swap",
});

const siteUrl = "https://www.trainertwin.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TrainerTwin - your AI twin for every learner",
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
    title: "TrainerTwin - your AI twin for every learner",
    description:
      "Turn your training materials into an AI twin that coaches every learner — in your style, at your standard.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "TrainerTwin — a trainer’s AI twin that scales their reach and 1:1 impact",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TrainerTwin - your AI twin for every learner",
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
      data-theme="light"
      className={`${figtree.variable} ${notoSerif.variable} ${jetbrainsMono.variable} ${figtreeForTokens.variable} ${notoSerifForTokens.variable} h-full antialiased scroll-smooth`}
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
        <Suspense fallback={null}>
          <PostHogPageView />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
