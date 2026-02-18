import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   outputFileTracingIncludes: {
     "/app/api/daily-email/route": [
      "./public/fonts/*",
      "./public/images/*"
    ],
    },
};

export default nextConfig;
