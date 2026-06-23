import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.64"],
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
