import { Metadata } from "next";

export const metadata: Metadata = {
  title: "VAI Protocol Whitepaper - Technical Documentation",
  description:
    "Comprehensive technical documentation of the VAI Protocol ecosystem, including Field DAOs, Bootstrap Bay campaigns, tokenomics, and smart contract architecture.",
  keywords: [
    "VAI Protocol",
    "whitepaper",
    "Field DAO",
    "Bootstrap Bay",
    "AI token",
    "Web3 AI",
    "decentralized AI",
    "blockchain",
    "smart contracts",
    "tokenomics",
  ].join(", "),
  openGraph: {
    title: "VAI Protocol Whitepaper - Technical Documentation",
    description:
      "Comprehensive technical documentation of the VAI Protocol ecosystem, including Field DAOs, Bootstrap Bay campaigns, and smart contract architecture.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "VAI Protocol Whitepaper - Technical Documentation",
    description:
      "Comprehensive technical documentation of the VAI Protocol ecosystem, including Field DAOs, Bootstrap Bay campaigns, and smart contract architecture.",
  },
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
