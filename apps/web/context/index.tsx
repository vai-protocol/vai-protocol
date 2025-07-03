"use client";

import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, cookieToInitialState, type Config } from "wagmi";
import { createAppKit } from "@reown/appkit/react";
// Import config, networks, projectId, and wagmiAdapter from your config file
import { config, networks, projectId, wagmiAdapter } from "../config";

const queryClient = new QueryClient();

const metadata = {
  name: "VAI Protocol",
  description: "Decentralized AI Economy Platform",
  url:
    typeof window !== "undefined"
      ? window.location.origin
      : "https://vai-protocol.com",
  icons: ["/favicon.ico"],
};

// Use the single network from config
const defaultNetwork = networks[0];

// Initialize AppKit *outside* the component render cycle
// Add a check for projectId for type safety, although config throws error already.
if (!projectId) {
  console.error("AppKit Initialization Error: Project ID is missing.");
  // Optionally throw an error or render fallback UI
} else {
  createAppKit({
    adapters: [wagmiAdapter],
    // Use non-null assertion `!` as projectId is checked runtime, needed for TypeScript
    projectId: projectId!,
    // Pass the single network from config
    networks: networks,
    defaultNetwork: defaultNetwork,
    metadata,
    // Disable network switching since we only have one network
    enableNetworkSwitch: false,
    features: {
      analytics: true,
      email: false,
      socials: false,
      swaps: false,
      send: false,
    }, // Optional features
  });
}

export default function ContextProvider({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null; // Cookies from server for hydration
}) {
  // Calculate initial state for Wagmi SSR hydration
  const initialState = cookieToInitialState(config as Config, cookies);

  return (
    // Cast config as Config for WagmiProvider
    <WagmiProvider config={config as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
