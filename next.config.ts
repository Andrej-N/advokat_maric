import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./lib/i18n/request.ts");

// NOTE: `output: "export"` and `basePath` were removed for the MVP localStorage blog.
// Static export requires all dynamic slugs at build time, which conflicts with posts
// created at runtime in the browser. When going to real production (Vercel + DB),
// this config is fine as-is. If GitHub Pages deploy is ever needed again, re-enable
// both — but only after migrating the blog off localStorage to a real backend.
const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
