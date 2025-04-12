"use client";

import { ConnectButton as ConnectButtonRainbow } from "@rainbow-me/rainbowkit";
import { ChevronDown } from "lucide-react";

export function ConnectButton() {
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
                    className="!rounded-xl !bg-[#4A41AF] !px-3 !py-2 !font-bold !text-white !transition-all duration-200 hover:scale-[103%] hover:!bg-[#433B9E]"
                  >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    className="!rounded-xl !bg-red-500 !px-3 !py-2 !font-bold !text-white !transition-all duration-200 hover:scale-[103%] hover:!bg-red-600"
                    type="button"
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <div className="!flex !rounded-xl bg-[#1A1B1F] !font-bold !text-white !transition-all duration-200 hover:scale-[103%]">
                  <button
                    onClick={openChainModal}
                    className="!flex !items-center !py-1.5 !pl-2.5 !pr-2"
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div className="!mr-1 !size-3 !overflow-hidden !rounded-full">
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            className="!size-3"
                          />
                        )}
                      </div>
                    )}
                    {account.displayBalance ? ` ${account.displayBalance}` : 0}
                  </button>

                  <button
                    onClick={openAccountModal}
                    className="!flex !items-center !gap-1 !rounded-xl !border-2 !border-[#1A1B1F] !bg-gradient-to-r from-[#ffffff13] to-[#ffffff26] !px-2 !py-1.5"
                    type="button"
                  >
                    {account.displayName}
                    <ChevronDown className="h-4" />
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButtonRainbow.Custom>
  );
}
