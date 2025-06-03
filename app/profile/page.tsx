"use client";

import {
  ConnectButton,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui";
import { createListCollection, Tabs } from "@chakra-ui/react";
import { Check, Copy, Search } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";

export default function Page() {
  const { address } = useAccount();
  let userAddress = address || "0x0000000000000000000000000000000000000000";

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(userAddress);
      toast.success("Copied address to clipboard");
    } catch (error) {
      toast.error("Copy address to clipboard failed!");
    }
  };

  const Categories = createListCollection({
    items: [
      { label: "All Categories", value: "all" },
      { label: "Trending", value: "trending" },
      { label: "New", value: "new" },
      { label: "Featured", value: "featured" },
      { label: "Closed", value: "closed" },
    ],
  });

  const filters = createListCollection({
    items: [
      { label: "Newest", value: "newest" },
      { label: "Oldest", value: "oldest" },
    ],
  });

  return (
    <main className="min-h-screen bg-slate-950">
      <div className="mx-auto flex h-full max-w-7xl flex-col gap-8 p-4 lg:p-6">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between gap-2 max-[375px]:relative">
            <h1 className="text-xl font-bold text-slate-100">Profile</h1>
            <span className="max-[375px]:absolute max-[375px]:bottom-[-72px]">
              <ConnectButton />
            </span>
          </div>
          <div className="flex flex-col items-start gap-6">
            <div className="flex w-full items-center justify-between rounded-3xl border border-slate-800 bg-slate-900 px-6 py-4">
              <Image
                src="/placeholder.png"
                alt="profile avatar"
                width={96}
                height={96}
                className="rounded-full border border-slate-800"
              />
              <button
                type="button"
                title="address"
                className="borer flex w-3/5 items-center justify-end gap-4 rounded-xl border border-slate-800 p-4 text-slate-100 transition-all hover:bg-slate-800"
                onClick={handleCopyAddress}
              >
                <span className="mr-auto font-medium text-slate-500">
                  Account
                </span>
                <h2 className="truncate text-lg font-semibold tracking-wider">
                  {userAddress}
                </h2>
                <Copy className="size-4" />
              </button>
            </div>

            <div className="w-full overflow-hidden rounded-3xl border border-slate-800 text-slate-100">
              <div className="flex items-center gap-6 bg-slate-900 px-6 py-4 text-right">
                <div className="flex w-1/4 items-center gap-4">
                  <Image src="/dollar.svg" alt="" width={40} height={40} />
                  <span className="text-xl font-semibold">USDC</span>
                </div>
                <div className="flex w-1/4 flex-col gap-1">
                  <span className="font-medium text-slate-500">Available</span>
                  <span className="font-bold">$0</span>
                </div>
                <div className="flex w-1/4 flex-col gap-1">
                  <span className="font-medium text-slate-500">Portfolio</span>
                  <span className="font-bold">$0</span>
                </div>
                <div className="flex w-1/4 flex-col gap-1">
                  <span className="font-medium text-slate-500">
                    Profit/loss
                  </span>
                  <span className="font-bold">$0</span>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-slate-800 px-6 py-4">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold">Get USDC on Abstract</span>
                  <span className="text-sm font-medium text-slate-500">
                    USDC is a fully collateralized US dollar stablecoin.
                  </span>
                </div>
                <div className="flex items-center">
                  <button
                    type="button"
                    title="deposit"
                    className="w-28 rounded-l-xl bg-blue-700 px-4 py-2 transition-all hover:bg-blue-800"
                    onClick={() => {}}
                  >
                    deposit
                  </button>
                  <span className="h-10 w-px bg-blue-800"></span>
                  <button
                    type="button"
                    title="withdraw"
                    className="w-28 rounded-r-xl bg-blue-700 px-4 py-2 transition-all hover:bg-blue-800"
                    onClick={() => {}}
                  >
                    withdraw
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full rounded-3xl border border-slate-800 px-6 py-4">
              <Tabs.Root defaultValue="referral-points" variant="subtle">
                <Tabs.List className="flex items-center gap-4 border-b border-slate-800">
                  <Tabs.Trigger
                    value="current-predictions"
                    className="justify-center rounded-none border-b-2 border-transparent font-medium text-slate-300 transition-all hover:text-slate-100 data-[selected]:border-blue-700 data-[selected]:text-slate-100"
                  >
                    Current Predictions
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="past-predictions"
                    className="justify-center rounded-none border-b-2 border-transparent font-medium text-slate-300 transition-all hover:text-slate-100 data-[selected]:border-blue-700 data-[selected]:text-slate-100"
                  >
                    Past Predictions
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="referral-points"
                    className="justify-center rounded-none border-b-2 border-transparent font-medium text-slate-300 transition-all hover:text-slate-100 data-[selected]:border-blue-700 data-[selected]:text-slate-100"
                  >
                    Referral Points
                  </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content
                  value="current-predictions"
                  className="flex flex-col gap-4"
                >
                  <div className="grid grid-cols-6 gap-6 border-b border-slate-800 pb-4">
                    <div className="relative col-span-3">
                      <Search className="absolute left-3 top-3.5 size-5 text-slate-500" />
                      <input
                        type="search"
                        name="Current Predictions Search"
                        id="current-predictions-search"
                        placeholder="Search Positions"
                        className="w-full rounded-xl border border-slate-800 bg-transparent py-3.5 pl-10 pr-3 text-sm font-medium leading-none text-slate-100 outline-none placeholder:text-slate-700 focus:border-slate-700"
                      />
                    </div>
                    <div className="col-span-2">
                      <SelectRoot
                        size="md"
                        variant="subtle"
                        collection={Categories}
                        defaultValue={["all"]}
                        className="flex h-12 justify-center rounded-xl border border-slate-800"
                      >
                        <SelectTrigger>
                          <span className="w-full px-4 font-medium text-slate-500">
                            <SelectValueText />
                          </span>
                        </SelectTrigger>
                        <SelectContent className="flex flex-col gap-0.5 rounded-xl bg-slate-800 text-slate-100">
                          {Categories.items.map((category) => (
                            <SelectItem
                              item={category}
                              key={category.value}
                              className="rounded hover:bg-slate-900 data-[state=checked]:bg-slate-900"
                            >
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </SelectRoot>
                    </div>
                    <div>
                      <SelectRoot
                        size="md"
                        variant="subtle"
                        collection={filters}
                        defaultValue={["newest"]}
                        className="flex h-12 justify-center rounded-xl border border-slate-800"
                      >
                        <SelectTrigger>
                          <span className="w-full px-4 font-medium text-slate-500">
                            <SelectValueText />
                          </span>
                        </SelectTrigger>
                        <SelectContent className="flex flex-col gap-0.5 rounded-xl bg-slate-800 text-slate-100">
                          {filters.items.map((filter) => (
                            <SelectItem
                              item={filter}
                              key={filter.value}
                              className="rounded hover:bg-slate-900 data-[state=checked]:bg-slate-900"
                            >
                              {filter.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </SelectRoot>
                    </div>
                  </div>
                  <div className="flex items-center border-b border-slate-800 pb-4 text-sm font-medium text-slate-500">
                    <span className="w-4/12">Market</span>
                    <span className="w-3/12">Outcome</span>
                    <span className="w-1/12">Bet</span>
                    <span className="w-2/12">Current value</span>
                    <span className="w-1/12">PNL</span>
                    <span className="w-1/12">Action</span>
                  </div>
                  <div className="flex items-center justify-center p-4">
                    <p className="text-center font-semibold text-slate-500">
                      No markets found. Try changing the filters.
                    </p>
                  </div>
                </Tabs.Content>
                <Tabs.Content
                  value="past-predictions"
                  className="flex flex-col gap-4"
                >
                  <div className="grid grid-cols-6 gap-6 border-b border-slate-800 pb-4">
                    <div className="relative col-span-3">
                      <Search className="absolute left-3 top-3.5 size-5 text-slate-500" />
                      <input
                        type="search"
                        name="Past Predictions Search"
                        id="past-predictions-search"
                        placeholder="Search Positions"
                        className="w-full rounded-xl border border-slate-800 bg-transparent py-3.5 pl-10 pr-3 text-sm font-medium leading-none text-slate-100 outline-none placeholder:text-slate-700 focus:border-slate-700"
                      />
                    </div>
                    <div className="col-span-2">
                      <SelectRoot
                        size="md"
                        variant="subtle"
                        collection={Categories}
                        defaultValue={["all"]}
                        className="flex h-12 justify-center rounded-xl border border-slate-800"
                      >
                        <SelectTrigger>
                          <span className="w-full px-4 font-medium text-slate-500">
                            <SelectValueText />
                          </span>
                        </SelectTrigger>
                        <SelectContent className="flex flex-col gap-0.5 rounded-xl bg-slate-800 text-slate-100">
                          {Categories.items.map((category) => (
                            <SelectItem
                              item={category}
                              key={category.value}
                              className="rounded hover:bg-slate-900 data-[state=checked]:bg-slate-900"
                            >
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </SelectRoot>
                    </div>
                    <div>
                      <SelectRoot
                        size="md"
                        variant="subtle"
                        collection={filters}
                        defaultValue={["newest"]}
                        className="flex h-12 justify-center rounded-xl border border-slate-800"
                      >
                        <SelectTrigger>
                          <span className="w-full px-4 font-medium text-slate-500">
                            <SelectValueText />
                          </span>
                        </SelectTrigger>
                        <SelectContent className="flex flex-col gap-0.5 rounded-xl bg-slate-800 text-slate-100">
                          {filters.items.map((filter) => (
                            <SelectItem
                              item={filter}
                              key={filter.value}
                              className="rounded hover:bg-slate-900 data-[state=checked]:bg-slate-900"
                            >
                              {filter.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </SelectRoot>
                    </div>
                  </div>
                  <div className="flex items-center border-b border-slate-800 pb-4 text-sm font-medium text-slate-500">
                    <span className="w-4/12">Market</span>
                    <span className="w-3/12">Outcome</span>
                    <span className="w-1/12">Bet</span>
                    <span className="w-2/12">Current value</span>
                    <span className="w-1/12">PNL</span>
                    <span className="w-1/12">Action</span>
                  </div>
                  <div className="flex items-center justify-center p-4">
                    <p className="text-center font-semibold text-slate-500">
                      No markets found. Try changing the filters.
                    </p>
                  </div>
                </Tabs.Content>
                <Tabs.Content
                  value="referral-points"
                  className="flex flex-col gap-4 text-slate-100"
                >
                  <div className="flex w-full flex-col gap-6 rounded-3xl border border-slate-800 bg-[url(/pixel-pattern.svg)] bg-cover bg-[position:240px_center] p-6">
                    <div className="flex flex-col gap-0.5">
                      <h4 className="text-2xl font-semibold">Share to Earn</h4>
                      <p className="text-sm text-slate-500">
                        Click the Share to Earn button on any market and share
                        to start earning points
                      </p>
                    </div>
                    <ul className="flex flex-col gap-4">
                      <li className="flex items-start gap-2.5">
                        <span className="mt-[3px] grid size-5 place-items-center rounded-full bg-blue-700">
                          <Check className="ml-px mt-px size-3.5 text-slate-100" />
                        </span>
                        <div className="flex flex-col gap-0.5">
                          <p className="font-medium">
                            Referral for New Signups
                          </p>
                          <p className="text-sm text-slate-500">
                            Earn 1,000 points per new user (with a daily cap of
                            10 users).
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="mt-[3px] grid size-5 place-items-center rounded-full bg-blue-700">
                          <Check className="ml-px mt-px size-3.5 text-slate-100" />
                        </span>
                        <div className="flex flex-col gap-0.5">
                          <p className="font-medium">
                            Points Market Volume via Referral
                          </p>
                          <p className="text-sm text-slate-500">
                            Earn 10% of the referred user’s buy volume in
                            points.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="mt-[3px] grid size-5 place-items-center rounded-full bg-blue-700">
                          <Check className="ml-px mt-px size-3.5 text-slate-100" />
                        </span>
                        <div className="flex flex-col gap-0.5">
                          <p className="font-medium">
                            USDC Market Volume via Referral
                          </p>
                          <p className="text-sm text-slate-500">
                            Earn 100% of the referred user’s USDC buy volume
                            multiplied by 100, in points.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="flex w-full flex-col gap-4 rounded-3xl border border-slate-800 px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-slate-500">
                        Total Referral Points
                      </span>
                      <h4 className="text-3xl font-semibold">0 pts</h4>
                      <span className="mt-0.5 text-xs text-slate-500">
                        Past 30 days
                      </span>
                    </div>
                    <div className="h-36 w-full"></div>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <h4 className="text-xl font-semibold">
                      Weekly Referral Points
                    </h4>
                    <ul className="flex items-center gap-4">
                      <li className="flex w-full flex-col gap-1 rounded-2xl border border-slate-700 bg-slate-700/20 p-6">
                        <p className="text-sm text-slate-500">
                          New Signups Referral
                        </p>
                        <span className="text-2xl font-semibold">0</span>
                      </li>
                      <li className="flex w-full flex-col gap-1 rounded-2xl border border-slate-700 bg-slate-700/20 p-6">
                        <p className="text-sm text-slate-500">
                          Points Markets Referral
                        </p>
                        <span className="text-2xl font-semibold">0</span>
                      </li>
                      <li className="flex w-full flex-col gap-1 rounded-2xl border border-slate-700 bg-slate-700/20 p-6">
                        <p className="text-sm text-slate-500">
                          USDC Markets Referral
                        </p>
                        <span className="text-2xl font-semibold">0</span>
                      </li>
                    </ul>
                  </div>
                </Tabs.Content>
              </Tabs.Root>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
