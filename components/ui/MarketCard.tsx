import { Banknote, ChartSpline, Clock3, Coins } from "lucide-react";
import Link from "next/link";

type MarketCardProps = {
  market: {
    imgUrl: string;
    title: string;
    tag: string;
  };
};

export default function MarketCard({ market }: MarketCardProps) {
  return (
    <Link
      href="/"
      className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-900 p-2"
    >
      <img
        src={market.imgUrl}
        alt="Market Photo"
        className="w-full rounded-lg"
      />

      <h3 className="px-2 font-semibold text-slate-100">{market.title}</h3>

      <span className="my-2 flex items-center gap-3 px-2">
        <button
          type="button"
          className="w-1/2 rounded-xl border border-green-300/40 bg-green-300/20 px-3 py-2.5 text-center text-base font-medium text-green-50 hover:bg-green-300/40"
        >
          Yes
        </button>
        <button
          type="button"
          className="w-1/2 rounded-xl border border-red-300/40 bg-red-300/20 px-3 py-2.5 text-center text-base font-medium text-red-50 hover:bg-red-300/40"
        >
          No
        </button>
      </span>

      <div className="mx-2 flex items-center justify-between border-t border-slate-800 pt-2">
        <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-slate-400">
          {market.tag}
        </span>
        <span className="flex items-center gap-1 text-xs text-slate-500">
          <Clock3 className="size-3" />
          Jan 01, 2025
        </span>
      </div>
    </Link>
  );
}
