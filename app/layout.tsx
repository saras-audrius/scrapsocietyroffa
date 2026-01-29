import type { Metadata } from "next";
import { Special_Elite, Karla } from "next/font/google";
import "./globals.css";
import { SplashOverlay } from "@/components/splash/SplashOverlay";

const specialElite = Special_Elite({
  weight: "400",
  variable: "--font-special-elite",
  subsets: ["latin"],
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scrap Society Rotterdam | Your Local Craft Club",
  description: "Join Rotterdam's coziest craft community! Collage workshops, zine making, junk journaling, and more. Bring your scraps, make art, meet friends.",
  keywords: ["craft club", "Rotterdam", "collage", "zine making", "junk journaling", "workshops", "scrapbooking"],
  openGraph: {
    title: "Scrap Society Rotterdam",
    description: "Your local craft club - collage workshops, zine making & junk journaling",
    type: "website",
    locale: "nl_NL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body className={`${specialElite.variable} ${karla.variable} antialiased`} suppressHydrationWarning>
        <SplashOverlay />
        {children}
      </body>
    </html>
  );
}
