import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./lib/i18n/request.ts");

// Static export is enabled ONLY when building for GitHub Pages (via EXPORT=1 in
// the deploy workflow). Local dev and real production builds skip it so the
// runtime localStorage blog admin works (new slugs that aren't known at build
// time would otherwise 404 under static export).
//
// On the deployed GitHub Pages demo, only the seed blog posts are prerendered.
// New posts created in the admin live only in the author's browser — that's
// acceptable for the demo. Real multi-user persistence comes with the backend
// migration (see project_blog_production.md).
const isExport = process.env.EXPORT === "1";
const basePath = isExport ? "/advokat_maric" : "";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
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
