import posthog from "posthog-js";

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  capture_pageview: false, // captured per-route in PostHogPageView
  capture_performance: { web_vitals: true },
  persistence: "localStorage+cookie",
});
