import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./lib/i18n/request.ts");

// Static export is enabled ONLY when building for GitHub Pages (EXPORT=1).
// The production deployment target is Vercel, where API routes and server
// components run normally.
const isExport = process.env.EXPORT === "1";
const basePath = isExport ? "/advokat_maric" : "";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: isExport,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  ...(isExport && {
    output: "export",
    basePath,
  }),
};

export default withNextIntl(nextConfig);
