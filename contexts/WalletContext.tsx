"use client";

import { createContext, useContext, ReactNode, useState } from "react";
import { BrowserProvider, JsonRpcSigner } from "ethers";
import { ERC20TokenClient } from "@/interactions/contractModules";
import { WalletClient } from "viem";
import tokenABI from "@/interactions/abi/usdtAbi.json" assert { type: "json" };
import addresses from "@/interactions/addresses.json" assert { type: "json" };

interface WalletContextType {
  provider: BrowserProvider | null;
  signer: JsonRpcSigner | null;
  tokenClient: ERC20TokenClient | null;
  initializeWallet: (walletClient: WalletClient) => Promise<void>;
}

const WalletContext = createContext<WalletContextType>({
  provider: null,
  signer: null,
  tokenClient: null,
  initializeWallet: async () => {},
});

export const WalletContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [tokenClient, setTokenClient] = useState<ERC20TokenClient | null>(null);

  const initializeWallet = async (walletClient: WalletClient) => {
    try {
      const newProvider = new BrowserProvider(walletClient.transport);
      const newSigner = await newProvider.getSigner();
      const newTokenClient = new ERC20TokenClient(
        newSigner,
        tokenABI,
        addresses.BNB_TEST.addresses.usdt,
      );

      setProvider(newProvider);
      setSigner(newSigner);
      setTokenClient(newTokenClient);
    } catch (error) {
      console.error("Failed to initialize wallet:", error);
      setProvider(null);
      setSigner(null);
      setTokenClient(null);
    }
  };

  return (
    <WalletContext.Provider
      value={{ provider, signer, tokenClient, initializeWallet }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
