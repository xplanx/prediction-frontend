import { getMarketById } from "@/lib/markets";
import { notFound } from "next/navigation";
import { Tabs } from "@chakra-ui/react";
import { Progress } from "@chakra-ui/react";
import {
  ArrowRight,
  ChartNoAxesColumnIncreasing,
  ChevronLeft,
  Clock3,
  Share,
} from "lucide-react";
import Link from "next/link";
import TradingViewChart from "@/components/ui/TradingViewChart";

type PageProps = Promise<{ id: string }>;

export default async function Page(props: { params: PageProps }) {
  const { id } = await props.params;
  const market = getMarketById(+id);

  if (!market) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950">
      <div className="mx-auto flex min-h-screen max-w-7xl gap-8 p-6">
        <div className="flex w-3/4 flex-col rounded-3xl border border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-medium text-slate-300 transition-all hover:text-slate-100"
            >
              <ChevronLeft className="size-4" />
              Markets
            </Link>
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg bg-slate-100 px-2.5 py-1 font-medium text-slate-900 transition-all hover:bg-slate-300"
            >
              Share
              <Share className="size-4" />
            </button>
          </div>
          <div className="flex flex-1 flex-col gap-6 p-4">
            <div className="flex items-start gap-3">
              <img
                src={market.imgUrl}
                alt={market.title}
                className="h-20 w-auto rounded-xl object-cover"
              />
              <div className="flex h-full flex-col gap-3">
                <h2 className="text-2xl font-semibold text-slate-100">
                  {market.title}
                </h2>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-2 border-r border-slate-800 pr-3 text-sm font-medium text-slate-500">
                    <ChartNoAxesColumnIncreasing className="size-4" />
                    {market.pts}m pts
                  </span>
                  <span className="flex items-center gap-2 text-sm font-medium text-slate-500">
                    <Clock3 className="size-4" />
                    {market.timestamp}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="-m-1 h-[102%]">
                <TradingViewChart />
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-max w-1/4 overflow-hidden rounded-xl border border-slate-800 bg-slate-900 p-4">
          <Tabs.Root defaultValue="buy" variant="subtle">
            <Tabs.List className="flex items-center gap-4 border-b border-slate-700">
              <Tabs.Trigger
                value="buy"
                className="justify-center rounded-none border-b-2 border-transparent text-slate-300 transition-all hover:text-slate-100 data-[selected]:border-slate-100 data-[selected]:text-slate-100"
              >
                Buy
              </Tabs.Trigger>
              <Tabs.Trigger
                value="sell"
                className="justify-center rounded-none border-b-2 border-transparent text-slate-300 transition-all hover:text-slate-100 data-[selected]:border-slate-100 data-[selected]:text-slate-100"
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
                  <span className="text-slate-100">0 pts</span>
                </span>
                <input
                  type="number"
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
                  <span className="text-slate-100">0 pts</span>
                </span>
                <input
                  type="number"
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
      </div>
    </main>
  );
}
