import "./globals.css";

import { Metadata } from "next";
import { headers } from "next/headers";

import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ReferralHandlerWrapper from "../components/ReferralHandlerWrapper";
import ContextProvider from "../context";

export const metadata: Metadata = {
  title: "VAI Protocol - Value-AI Token Ecosystem",
  description:
    "Decentralized AI data ecosystem powered by Field DAOs, transparent rewards, and community governance. Join Bootstrap Bay campaigns and earn VAI tokens.",
  keywords:
    "VAI, AI token, Field DAO, Bootstrap Bay, Web3 AI, decentralized AI, blockchain",
  openGraph: {
    title: "VAI Protocol - Value-AI Token Ecosystem",
    description:
      "Decentralized AI data ecosystem powered by Field DAOs, transparent rewards, and community governance.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VAI Protocol - Value-AI Token Ecosystem",
    description:
      "Decentralized AI data ecosystem powered by Field DAOs, transparent rewards, and community governance.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = (await headers()).get("cookie");

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <ContextProvider cookies={cookies}>
          <ReferralHandlerWrapper />
          <div className="flex flex-col min-h-screen">
            {/* Navigation */}
            <Navigation />

            {/* Main Content Area */}
            <main className="flex-1">{children}</main>

            {/* Footer */}
            <Footer />
          </div>
        </ContextProvider>
      </body>
    </html>
  );
}
