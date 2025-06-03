"use client";

import { ConnectButton as ConnectButtonRainbow } from "@rainbow-me/rainbowkit";
import { ChevronDown } from "lucide-react";
import { useAccount, useWalletClient } from "wagmi";
import { useEffect, useState } from "react";
import { formatUnits } from "ethers";
import { useWallet } from "@/contexts";
import Image from "next/image";
import Link from "next/link";

export function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [balance, setBalance] = useState<string>("0.0");
  const { initializeWallet, tokenClient } = useWallet();

  useEffect(() => {
    async function initTokenClient() {
      if (!isConnected || !walletClient || !address) return;

      try {
        if (!tokenClient) {
          await initializeWallet(walletClient);
        }

        if (tokenClient) {
          const balance = await tokenClient.balanceOf(address);
          const decimals = await tokenClient.decimals();
          const formattedBalance = formatUnits(balance, decimals);
          setBalance(formattedBalance);
        }
      } catch (error) {
        console.error("Error initializing token client:", error);
        setBalance("0.0");
      }
    }

    initTokenClient();
  }, [isConnected, walletClient, address, initializeWallet, tokenClient]);

  return (
    <ConnectButtonRainbow.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="rounded-xl bg-blue-700 px-3 py-2 font-bold text-slate-100 transition-all duration-200 hover:bg-blue-800"
                  >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    className="rounded-xl bg-red-700 px-3 py-2 font-bold text-slate-100 transition-all duration-200 hover:bg-red-800"
                    type="button"
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <div className="flex items-center gap-4">
                  <div className="flex rounded-xl bg-slate-900 font-bold text-slate-100 transition-all duration-200 hover:scale-105">
                    <button
                      onClick={openChainModal}
                      className="flex items-center gap-1.5 py-1.5 pl-2.5 pr-2"
                      type="button"
                    >
                      <img
                        src="https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
                        alt=""
                        className="mt-px size-3.5"
                      />
                      {balance}
                    </button>

                    <button
                      onClick={openAccountModal}
                      className="flex items-center gap-1 rounded-xl border-2 border-slate-900 bg-gradient-to-r from-slate-100/10 to-slate-100/20 py-1.5 pl-2.5 pr-1"
                      type="button"
                    >
                      {account.displayName}
                      <ChevronDown className="h-4" />
                    </button>
                  </div>
                  <Link href="/profile" passHref>
                    <Image
                      src="/placeholder.png"
                      alt="profile"
                      height={38}
                      width={38}
                      className="rounded-full transition-all duration-200 hover:scale-110"
                    />
                  </Link>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButtonRainbow.Custom>
  );
}
