"use client";

import { Market } from "@/lib";
import { Tabs } from "@chakra-ui/react";
import { Progress } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

type TransactionTabsProps = {
  market: Market;
};

export function TransactionTabs({ market }: TransactionTabsProps) {
  const [buyAmount, setBuyAmount] = useState<number>(0);
  const [sellAmount, setSellAmount] = useState<number>(0);

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
              className="w-1/2 rounded-xl border border-green-300/40 bg-green-300/20 px-3 py-2.5 text-center text-base font-medium text-green-500 transition-all hover:bg-green-300/40"
            >
              Yes
            </button>
            <button
              type="button"
              className="w-1/2 rounded-xl border border-red-300/40 bg-red-300/20 px-3 py-2.5 text-center text-base font-medium text-red-500 transition-all hover:bg-red-300/40"
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
                  {buyAmount}
                </span>
                <span>pts</span>
              </span>
            </span>
            <input
              type="number"
              value={buyAmount}
              onChange={(e) => setBuyAmount(Number(e.target.value))}
              name="betting"
              id="betting"
              className="hide-spin-buttons w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-base font-semibold text-slate-300 outline-none transition-all placeholder:text-slate-600 focus:border-slate-700 focus:outline-none"
              placeholder="0.00"
            />
          </div>
          <button
            type="button"
            className="rounded-xl border border-blue-600 bg-blue-700 px-3 py-2.5 text-center text-base font-medium text-slate-100 transition-all hover:bg-blue-800"
          >
            Buy
          </button>
          <ul className="flex flex-col gap-2 text-xs text-slate-400">
            <li className="flex items-center justify-between">
              <span>Price change</span>
              <span className="flex items-center gap-1">
                0.00 pts <ArrowRight className="size-3" /> 0.35 pts
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span>Avg price</span>
              <span>0.00 pts</span>
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
              className="w-1/2 rounded-xl border border-green-300/40 bg-green-300/20 px-3 py-2.5 text-center text-base font-medium text-green-500 transition-all hover:bg-green-300/40"
            >
              Yes
            </button>
            <button
              type="button"
              className="w-1/2 rounded-xl border border-red-300/40 bg-red-300/20 px-3 py-2.5 text-center text-base font-medium text-red-500 transition-all hover:bg-red-300/40"
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
                  {sellAmount}
                </span>
                <span>pts</span>
              </span>
            </span>
            <input
              type="number"
              value={sellAmount}
              onChange={(e) => setSellAmount(Number(e.target.value))}
              name="betting"
              id="betting"
              className="hide-spin-buttons w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-base font-semibold text-slate-300 outline-none transition-all placeholder:text-slate-600 focus:border-slate-700 focus:outline-none"
              placeholder="0.00"
            />
          </div>
          <button
            type="button"
            className="rounded-xl border border-blue-600 bg-blue-700 px-3 py-2.5 text-center text-base font-medium text-slate-100 transition-all hover:bg-blue-800"
          >
            Sell
          </button>
          <ul className="flex flex-col gap-2 text-xs text-slate-400">
            <li className="flex items-center justify-between">
              <span>Price change</span>
              <span className="flex items-center gap-1">
                0.00 pts <ArrowRight className="size-3" /> 0.35 pts
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span>Avg price</span>
              <span>0.35 pts</span>
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
