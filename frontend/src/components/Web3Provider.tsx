"use client";

import React from "react";
import { WagmiConfig, createConfig } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

import {
  scrollSepolia,
  sepolia,
  bscTestnet,
  baseSepoliaTestnet,
  greenfieldTestnet,
} from "@/lib/customChains";

const config = createConfig(
  getDefaultConfig({
    appName: "BlockFeedback",
    chains: [
      sepolia,
      scrollSepolia,
      bscTestnet,
      baseSepoliaTestnet,
      greenfieldTestnet,
    ],
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  }),
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
};
