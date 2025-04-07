"use client";
import "@rainbow-me/rainbowkit/styles.css";
import { getMonadRpcUrls, getMonadRpcUrlsFallback } from "@/utils/rpc";
import { ClientOnly } from "@chakra-ui/react";
import {
  darkTheme,
  getDefaultConfig,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { defineChain } from "viem";
import { WagmiProvider } from "wagmi";

const MONAD_TESTNET = defineChain({
  id: 10143,
  name: "Monad Testnet",
  network: "monad-testnet",
  nativeCurrency: {
    name: "Monad",
    symbol: "TMON",
    decimals: 18,
  },
  rpcUrls: getMonadRpcUrls(),
  testnet: true,
  contracts: {
    multicall3: {
      address: "0x6cEfcd4DCA776FFaBF6E244616ea573e4d646566",
      blockCreated: 42209,
    },
  },
});

export const WAGMI_CONFIG = getDefaultConfig({
  appName: "Taya DEX",
  projectId: "YOUR_PROJECT_ID",
  chains: [MONAD_TESTNET],
  transports: {
    [MONAD_TESTNET.id]: getMonadRpcUrlsFallback(),
  },
  ssr: true,
});

const QUERY_CLIENT = new QueryClient();

export function WalletProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={WAGMI_CONFIG}>
      <QueryClientProvider client={QUERY_CLIENT}>
        <ClientOnly>
          <RainbowKitProvider theme={darkTheme()} modalSize="compact">
            {children}
          </RainbowKitProvider>
        </ClientOnly>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
