import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Foong Zhi Hin — Software Engineer",
  description: "A software engineer building thoughtful, reliable digital experiences.",
  keywords: ["software engineer", "portfolio", "Next.js", "TypeScript", "Foong Zhi Hin"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="scroll-smooth"><body>{children}</body></html>;
}
