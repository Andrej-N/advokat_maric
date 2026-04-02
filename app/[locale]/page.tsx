import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { ServicesGrid } from "@/components/sections/ServicesGrid";

import { BlogPreview } from "@/components/sections/BlogPreview";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { ContactInfo } from "@/components/sections/ContactInfo";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <AboutPreview />
      <ServicesGrid />
      <BlogPreview />
      <GoogleReviews />
      <ContactInfo />
    </>
  );
}
