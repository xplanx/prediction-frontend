import Link from "next/link";
import {
  ChartNoAxesColumnIncreasing,
  ChevronLeft,
  Clock3,
  Share,
} from "lucide-react";
import { Market } from "@/lib";
import TradingViewChart from "./TradingViewChart";

type ChartProps = {
  market: Market;
};

export function Chart({ market }: ChartProps) {
  return (
    <div className="flex flex-1 flex-col rounded-3xl border border-slate-800">
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
        <div className="flex flex-row items-start gap-3 max-[510px]:flex-col">
          <img
            src={market.imgUrl}
            alt={market.title}
            className="h-20 w-auto rounded-xl object-cover"
          />
          <div className="flex h-full flex-col gap-3">
            <h2 className="text-2xl font-semibold text-slate-100 max-[510px]:text-xl">
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
        <div className="flex-1 overflow-hidden rounded-xl">
          <div className="-m-1 h-[420px] md:h-[102%]">
            <TradingViewChart />
          </div>
        </div>
      </div>
    </div>
  );
}
