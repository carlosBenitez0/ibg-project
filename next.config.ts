import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  // typescript: {
  //   // ❌ Ignora errores de TypeScript en la build
  //   ignoreBuildErrors: true,
  // },
  // eslint: {
  //   // ❌ Ignora errores del linter en la build
  //   ignoreDuringBuilds: true,
  // },
};

export default nextConfig;
