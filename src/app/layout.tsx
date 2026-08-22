import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import "./globals.css";

// next/font downloads and self-hosts these at build time: no runtime request
// to Google, no layout shift, and they resolve correctly under a base path.
const display = Sora({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
  variable: "--font-display-next",
});

const ui = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-ui-next",
});

export const metadata: Metadata = {
  title: "Foong Zhi Hin — Software Engineer",
  description: "Do you want to know me? A story-driven portfolio by Foong Zhi Hin, a software engineer in Kuala Lumpur.",
  keywords: ["software engineer", "portfolio", "Next.js", "TypeScript", "Foong Zhi Hin"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${ui.variable}`}>
      <body>{children}</body>
    </html>
  );
}
