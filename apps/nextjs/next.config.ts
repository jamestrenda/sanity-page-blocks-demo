import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/sanity", "@repo/ui", "@repo/utils"],
  // experimental: {
  //   reactCompiler: true,
  //   // ppr: true,
  //   // inlineCss: true,
  // },
  images: {
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
