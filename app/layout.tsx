import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/providers/ScrollSmoothProvider";

const fredoka = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
});



export const metadata: Metadata = {
  title: "Srikar.dev — Developer Portfolio",
  description:
    "Hey, I'm Srikar — a passionate developer crafting clean, intelligent, and impactful web applications using React, Tailwind, and Next.js.",
  keywords: [
    "Srikar",
    "Srikar.dev",
    "Portfolio",
    "React Developer",
    "Full Stack Developer",
    "Next.js",
    "Tailwind CSS",
    "AI Projects",
  ],
  authors: [{ name: "Chinthala Srikar", url: "https://srikar.dev" }],
  creator: "Srikar",
  metadataBase: new URL("https://srikar-roy.dev"),
  openGraph: {
    title: "Srikar.dev — Developer Portfolio",
    description:
      "Explore my projects, skills, and experiments in web development, AI, and open source.",
    url: "https://srikar-roy.dev",
    siteName: "Srikar_roy.dev",
    images: [
      {
        url: "/og-image.png", 
        width: 1200,
        height: 630,
        alt: "Srikar_roy.dev Portfolio Preview",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fredoka.variable} antialiased`}
      >
        <SmoothScrollProvider>
          <div id="smooth-wrapper">
            <div id="smooth-content">
              {children}
            </div>
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
