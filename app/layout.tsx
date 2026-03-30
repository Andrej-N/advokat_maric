import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://mariclaw.rs"),
  icons: { icon: "/favicon/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
