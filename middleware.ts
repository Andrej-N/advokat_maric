import createMiddleware from "next-intl/middleware";
import { routing } from "@/lib/i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all pathnames except dashboard, api, _next, and static files
    "/((?!dashboard|api|_next|_vercel|.*\\..*).*)",
  ],
};
