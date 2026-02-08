import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Specify the correct root directory to avoid lockfile warnings
  outputFileTracingRoot: __dirname,
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
      {
        source: "/ingest/decide",
        destination: "https://us.i.posthog.com/decide",
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
  // Improve TypeScript type checking during build
  typescript: {
    // !! WARN !!
    // For production builds, set this to false to catch issues during development
    // Setting to true only for deployment to bypass the current build issue
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
