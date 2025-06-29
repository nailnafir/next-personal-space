import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["http://192.168.1.5:3000"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zewamvqqbsifkaplcpbh.supabase.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.microlink.io",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
