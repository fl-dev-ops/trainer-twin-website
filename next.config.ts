import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  /* Route segments are case-sensitive; the page lives at app/V1, so the
     lowercase address a person types resolves to it too. */
  async rewrites() {
    return [{ source: "/v1", destination: "/V1" }];
  },
};

export default nextConfig;
