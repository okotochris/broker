import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Broka - Instant Crypto Trading & Secure Wallet",
  description:
    "Broka is your all-in-one crypto trading platform. Trade Bitcoin, Ethereum, USDT, and more instantly, manage your portfolio, and deposit safely with secure wallets. Experience fast, reliable, and user-friendly cryptocurrency trading.",
  keywords: [
    "crypto trading",
    "cryptocurrency exchange",
    "bitcoin trading",
    "ethereum wallet",
    "crypto portfolio",
    "buy crypto",
    "sell crypto",
    "secure crypto deposits",
  ],
  openGraph: {
    title: "Broka - Instant Crypto Trading & Secure Wallet",
    description:
      "Trade crypto instantly and securely with Broka. Manage Bitcoin, Ethereum, USDT, and other cryptocurrencies with ease and safety.",
    url: "https://yourdomain.com",
    siteName: "Broka",
    images: [
      {
        url: "/og-image.png", // Replace with your social preview image
        width: 1200,
        height: 630,
        alt: "Broka Crypto Trading Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Broka - Instant Crypto Trading & Secure Wallet",
    description:
      "Trade crypto instantly and securely with Broka. Manage Bitcoin, Ethereum, USDT, and other cryptocurrencies with ease.",
    images: ["/og-image.png"], // Replace with your social preview image
    creator: "@YourTwitterHandle",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}