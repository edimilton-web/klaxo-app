import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.64"],
  // Hides the on-screen dev badge, which sits fixed at the bottom-left and
  // reads as a layout bug when reviewing designs. Build and runtime errors
  // are still surfaced in the overlay and the terminal.
  devIndicators: false,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "klaxo.app" }],
        destination: "https://www.klaxo.app/:path*",
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.brandfetch.io",
      },
    ],
  },
};

export default nextConfig;
