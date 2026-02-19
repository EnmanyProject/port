import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const pretendard = localFont({
  src: [
    { path: "../fonts/PretendardVariable.woff2", weight: "100 900" },
  ],
  variable: "--font-pretendard",
  display: "swap",
  fallback: ["Noto Sans KR", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Portfolio | Model",
  description: "Professional Model Portfolio",
  openGraph: {
    title: "Portfolio | Model",
    description: "Professional Model Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${playfair.variable} ${cormorant.variable} ${pretendard.variable} font-body antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
