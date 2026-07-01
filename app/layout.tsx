import type { Metadata } from "next";
import { Manrope, Cormorant_Garamond } from "next/font/google";
import "@/app/globals.css";
import { ConsentInit } from "@/components/analytics/ConsentInit";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

const manrope = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mariclaw.rs"),
  icons: { icon: "/favicon/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <ConsentInit />
      </head>
      <body className={`${manrope.variable} ${cormorant.variable} font-sans antialiased`}>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
