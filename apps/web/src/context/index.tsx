// context/index.tsx
"use client";

import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, cookieToInitialState, type Config } from "wagmi";
import { createAppKit } from "@reown/appkit/react";
import { config, networks, projectId, wagmiAdapter } from "@/config";
import { bsc } from "@reown/appkit/networks";

const queryClient = new QueryClient();

const metadata = {
  name: "VAI Protocol",
  description: "VAI Protocol - Decentralized Investment Platform",
  url:
    typeof window !== "undefined"
      ? window.location.origin
      : "https://vai-protocol.com",
  icons: ["https://vai-protocol.com/favicon.ico"],
};

// Initialize AppKit outside the component render cycle
if (!projectId) {
  console.error("AppKit Initialization Error: Project ID is missing.");
} else {
  createAppKit({
    adapters: [wagmiAdapter],
    projectId: projectId!,
    networks: networks,
    defaultNetwork: bsc, // Default to BSC for VAI Protocol
    metadata,
    features: {
      analytics: true,
      onramp: true,
      swaps: true,
    },
  });
}

export default function ContextProvider({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(config as Config, cookies);

  return (
    <WagmiProvider config={config as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
