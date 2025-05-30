"use client";

import { useMarket, useWallet } from "@/contexts";
import { Market } from "@/lib";
import { Tabs } from "@chakra-ui/react";
import { Progress } from "@chakra-ui/react";
import { ethers, parseUnits } from "ethers";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAccount, useWalletClient } from "wagmi";
import { Spinner } from "../ui";
import addresses from "@/interactions/addresses.json" assert { type: "json" };

type TransactionTabsProps = {
  market: Market;
};

export function TransactionTabs({ market }: TransactionTabsProps) {
  const [buySelectedOption, setBuySelectedOption] = useState<string>("yes");
  const [sellSelectedOption, setSellSelectedOption] = useState<string>("yes");
  const [buyAmount, setBuyAmount] = useState<string>("");
  const [sellAmount, setSellAmount] = useState<string>("");
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { initializeWallet, tokenClient } = useWallet();
  const { initializeMarket, marketClient } = useMarket();
  const [buyIsLoading, setBuyIsLoading] = useState(false);
  const [sellIsLoading, setSellIsLoading] = useState(false);
  const marketId = String(market.id);

  useEffect(() => {
    async function initClient() {
      if (!isConnected || !walletClient || !address) return;

      try {
        if (!tokenClient) {
          await initializeWallet(walletClient);
        }

        if (!marketClient) {
          await initializeMarket(walletClient);
        }
      } catch (error) {
        console.error("Error initializing client:", error);
        return;
      }
    }

    initClient();
  }, [
    isConnected,
    walletClient,
    address,
    initializeWallet,
    tokenClient,
    initializeMarket,
    marketClient,
  ]);

  const handleBuy = async () => {
    try {
      setBuyIsLoading(true);

      if (!buyAmount) {
        toast.error("Please enter the purchase amount!");
        return;
      }

      if (!tokenClient || !marketClient) {
        toast.error("No client found!");
        return;
      }

      const amount = parseUnits(buyAmount, 6);
      const currentAllowance = await tokenClient.allowance(
        address!,
        addresses.BNB_TEST.addresses.predictionMarket,
      );
      const currentAllowanceBN = ethers.toBigInt(currentAllowance);

      if (currentAllowanceBN >= amount) {
        await marketClient.predict(
          marketId,
          ethers.encodeBytes32String(buySelectedOption),
          amount,
        );
      } else {
        await tokenClient.approve(
          addresses.BNB_TEST.addresses.predictionMarket,
          amount,
        );

        await marketClient.predict(
          marketId,
          ethers.encodeBytes32String(buySelectedOption),
          amount,
        );
      }
    } catch (error) {
      toast.error("The purchase transaction failed!");
    } finally {
      setBuyIsLoading(false);
    }
  };

  const handleSell = async () => {
    try {
      setSellIsLoading(true);

      if (!sellAmount) {
        toast.error("Please enter the sales amount!");
        return;
      }

      if (!tokenClient || !marketClient) {
        toast.error("No client found!");
        return;
      }

      await marketClient.requestPayout(
        marketId,
        ethers.encodeBytes32String(sellSelectedOption),
      );
    } catch (error) {
      toast.error("The sale transaction failed!");
    } finally {
      setSellIsLoading(false);
    }
  };

  return (
    <div className="relative h-max w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-900 p-4 md:w-72">
      <Tabs.Root defaultValue="buy" variant="subtle">
        <Tabs.List className="flex items-center gap-4 border-b border-slate-700">
          <Tabs.Trigger
            value="buy"
            className="justify-center rounded-none border-b-2 border-transparent font-medium text-slate-300 transition-all hover:text-slate-100 data-[selected]:border-slate-100 data-[selected]:text-slate-100"
          >
            Buy
          </Tabs.Trigger>
          <Tabs.Trigger
            value="sell"
            className="justify-center rounded-none border-b-2 border-transparent font-medium text-slate-300 transition-all hover:text-slate-100 data-[selected]:border-slate-100 data-[selected]:text-slate-100"
          >
            Sell
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="buy" className="flex flex-col gap-4">
          <Progress.Root
            size="sm"
            defaultValue={market.yes}
            className="flex items-center gap-2"
          >
            <Progress.ValueText className="text-slate-100">
              {market.yes}%
            </Progress.ValueText>
            <Progress.Track className="flex-1 rounded-full bg-gradient-to-r from-[#d7aafc] via-[#e36ae8] to-[#f6469d]">
              <Progress.Range className="bg-gradient-to-l from-[#e9fca3] via-[#3ccc95] to-[#29d0ba]" />
            </Progress.Track>
            <Progress.ValueText className="text-slate-100">
              {market.no}%
            </Progress.ValueText>
          </Progress.Root>
          <span className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setBuySelectedOption("yes")}
              className={`w-1/2 rounded-xl px-3 py-2.5 text-center text-base font-medium transition-all ${buySelectedOption === "yes" ? "bg-green-300/20 text-green-500 hover:bg-green-300/40" : "bg-neutral-300/20 text-neutral-400 hover:bg-neutral-300/40"}`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => setBuySelectedOption("no")}
              className={`w-1/2 rounded-xl px-3 py-2.5 text-center text-base font-medium transition-all ${buySelectedOption === "no" ? "bg-red-300/20 text-red-500 hover:bg-red-300/40" : "bg-neutral-300/20 text-neutral-400 hover:bg-neutral-300/40"}`}
            >
              No
            </button>
          </span>
          <div className="flex flex-col gap-2">
            <span className="flex items-center justify-between text-sm">
              <label htmlFor="betting" className="text-slate-400">
                You’re betting
              </label>
              <span className="flex items-center gap-1">
                <span className="max-w-24 truncate text-slate-100">
                  {buyAmount || 0}
                </span>
                <span>pts</span>
              </span>
            </span>
            <input
              type="number"
              value={buyAmount}
              onChange={(e) => setBuyAmount(e.target.value)}
              name="betting"
              id="betting"
              className="hide-spin-buttons w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-base font-semibold text-slate-300 outline-none transition-all placeholder:text-slate-600 focus:border-slate-700 focus:outline-none"
              placeholder="0.00"
            />
          </div>
          <button
            type="button"
            onClick={handleBuy}
            className="rounded-xl border border-blue-600 bg-blue-700 px-3 py-2.5 text-center text-base font-medium text-slate-100 transition-all hover:bg-blue-800"
          >
            {buyIsLoading ? (
              <Spinner size="24" stroke="3" speed="1.5" color="#f1f5f9" />
            ) : (
              "Buy"
            )}
          </button>
          <ul className="flex flex-col gap-2 text-xs text-slate-400">
            <li className="flex items-center justify-between">
              <span>Price change</span>
              <span className="flex items-center gap-1">
                0.00 pts
                <ArrowRight className="size-3" />
                0.{buySelectedOption === "yes" ? market.yes : market.no} pts
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span>Avg price</span>
              <span>
                0.
                {buyAmount
                  ? buySelectedOption === "yes"
                    ? market.yes
                    : market.no
                  : "00"}{" "}
                pts
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span>Shares</span>
              <span>0</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Pot. profit</span>
              <span className="text-green-500">0 pts (0%)</span>
            </li>
          </ul>
        </Tabs.Content>
        <Tabs.Content value="sell" className="flex flex-col gap-4">
          <Progress.Root
            size="sm"
            defaultValue={market.yes}
            className="flex items-center gap-2"
          >
            <Progress.ValueText className="text-slate-100">
              {market.yes}%
            </Progress.ValueText>
            <Progress.Track className="flex-1 rounded-full bg-gradient-to-r from-[#d7aafc] via-[#e36ae8] to-[#f6469d]">
              <Progress.Range className="bg-gradient-to-l from-[#e9fca3] via-[#3ccc95] to-[#29d0ba]" />
            </Progress.Track>
            <Progress.ValueText className="text-slate-100">
              {market.no}%
            </Progress.ValueText>
          </Progress.Root>
          <span className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSellSelectedOption("yes")}
              className={`w-1/2 rounded-xl px-3 py-2.5 text-center text-base font-medium transition-all ${sellSelectedOption === "yes" ? "bg-green-300/20 text-green-500 hover:bg-green-300/40" : "bg-neutral-300/20 text-neutral-400 hover:bg-neutral-300/40"}`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => setSellSelectedOption("no")}
              className={`w-1/2 rounded-xl px-3 py-2.5 text-center text-base font-medium transition-all ${sellSelectedOption === "no" ? "bg-red-300/20 text-red-500 hover:bg-red-300/40" : "bg-neutral-300/20 text-neutral-400 hover:bg-neutral-300/40"}`}
            >
              No
            </button>
          </span>
          <div className="flex flex-col gap-2">
            <span className="flex items-center justify-between text-sm">
              <label htmlFor="betting" className="text-slate-400">
                You’re selling
              </label>
              <span className="flex items-center gap-1">
                <span className="max-w-24 truncate text-slate-100">
                  {sellAmount || 0}
                </span>
                <span>pts</span>
              </span>
            </span>
            <input
              type="number"
              value={sellAmount}
              onChange={(e) => setSellAmount(e.target.value)}
              name="betting"
              id="betting"
              className="hide-spin-buttons w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-base font-semibold text-slate-300 outline-none transition-all placeholder:text-slate-600 focus:border-slate-700 focus:outline-none"
              placeholder="0.00"
            />
          </div>
          <button
            type="button"
            onClick={handleSell}
            className="rounded-xl border border-blue-600 bg-blue-700 px-3 py-2.5 text-center text-base font-medium text-slate-100 transition-all hover:bg-blue-800"
          >
            {sellIsLoading ? (
              <Spinner size="24" stroke="3" speed="1.5" color="#f1f5f9" />
            ) : (
              "Sell"
            )}
          </button>
          <ul className="flex flex-col gap-2 text-xs text-slate-400">
            <li className="flex items-center justify-between">
              <span>Price change</span>
              <span className="flex items-center gap-1">
                0.00 pts
                <ArrowRight className="size-3" />
                0.{sellSelectedOption === "yes" ? market.yes : market.no} pts
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span>Avg price</span>
              <span>
                0.
                {sellAmount
                  ? sellSelectedOption === "yes"
                    ? market.yes
                    : market.no
                  : "00"}{" "}
                pts
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span>Shares</span>
              <span>0</span>
            </li>
          </ul>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
