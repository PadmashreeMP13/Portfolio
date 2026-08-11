import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./../styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", weight: ["500", "700"] });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Padmashree M P | AI/ML Engineer Portfolio", template: "%s · Padmashree M P" },
  description:
    "Portfolio of Padmashree M P, a Computer Science and Engineering student passionate about Artificial Intelligence, Machine Learning, Python, and software development.",
  keywords: ["portfolio", "AI", "ML", "artificial intelligence", "machine learning", "Python", "computer science"],
  openGraph: {
    type: "website",
    title: "Padmashree M P | AI/ML Engineer Portfolio",
    description:
      "Portfolio of Padmashree M P, a Computer Science and Engineering student passionate about Artificial Intelligence, Machine Learning, Python, and software development.",
    url: siteUrl,
    siteName: "Padmashree M P",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Padmashree M P Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Padmashree M P | AI/ML Engineer Portfolio",
    description:
      "Portfolio of Padmashree M P, a Computer Science and Engineering student passionate about Artificial Intelligence, Machine Learning, Python, and software development.",
    images: ["/og-image.svg"],
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans">
        <a href="#main" className="sr-only focus:not-sr-only fixed top-2 left-2 z-[100] bg-black/90 px-3 py-1 rounded border border-cyan text-cyan">
          Skip to main content
        </a>
        <Header />
        <main id="main" className="relative z-10">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
