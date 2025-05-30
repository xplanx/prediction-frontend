"use client";

import { createContext, useContext, useState } from "react";
import { BrowserProvider, JsonRpcSigner } from "ethers";
import { PredictionMarketClient } from "@/interactions/contractModules";
import { WalletClient } from "viem";
import marketAbi from "@/interactions/abi/predictionMarketAbi.json" assert { type: "json" };
import addresses from "@/interactions/addresses.json" assert { type: "json" };

interface MarketContextType {
  provider: BrowserProvider | null;
  signer: JsonRpcSigner | null;
  marketClient: PredictionMarketClient | null;
  initializeMarket: (walletClient: WalletClient) => Promise<void>;
}

const MarketContext = createContext<MarketContextType>({
  provider: null,
  signer: null,
  marketClient: null,
  initializeMarket: async () => {},
});

export function MarketProvider({ children }: { children: React.ReactNode }) {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [marketClient, setMarketClient] =
    useState<PredictionMarketClient | null>(null);

  const initializeMarket = async (walletClient: WalletClient) => {
    try {
      const newProvider = new BrowserProvider(walletClient.transport);
      const newSigner = await newProvider.getSigner();
      const newMarketClient = new PredictionMarketClient(
        addresses.BNB_TEST.addresses.predictionMarket,
        marketAbi,
        newSigner,
      );

      setProvider(newProvider);
      setSigner(newSigner);
      setMarketClient(newMarketClient);
    } catch (error) {
      console.error("Failed to initialize prediction market client:", error);
      setProvider(null);
      setSigner(null);
      setMarketClient(null);
    }
  };

  return (
    <MarketContext.Provider
      value={{
        provider,
        signer,
        marketClient,
        initializeMarket,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
}

export const useMarket = () => {
  const context = useContext(MarketContext);
  if (!context) {
    throw new Error("useMarket must be used within a MarketProvider");
  }
  return context;
};
