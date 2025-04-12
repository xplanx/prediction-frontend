import { Market } from "@/lib";
import { Progress } from "@chakra-ui/react";
import { Clock3 } from "lucide-react";
import Link from "next/link";

type MarketCardProps = {
  market: Market;
};

export function MarketCard({ market }: MarketCardProps) {
  return (
    <Link
      href={`/${market.id}`}
      className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-900 p-2 transition-all hover:border-slate-700"
    >
      <img
        src={market.imgUrl}
        alt="Market Photo"
        className="w-full rounded-lg"
      />

      <h3 className="px-2 font-semibold text-slate-100">{market.title}</h3>

      <Progress.Root
        size="sm"
        defaultValue={market.yes}
        className="flex items-center gap-2 px-2"
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

      <span className="my-2 flex items-center gap-3 px-2">
        <button
          type="button"
          className="w-1/2 rounded-xl border border-green-300/40 bg-green-300/20 px-3 py-1.5 text-center text-base font-medium text-green-500 transition-all hover:bg-green-300/40 lg:py-2.5"
        >
          Yes
        </button>
        <button
          type="button"
          className="w-1/2 rounded-xl border border-red-300/40 bg-red-300/20 px-3 py-1.5 text-center text-base font-medium text-red-500 transition-all hover:bg-red-300/40 lg:py-2.5"
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
          {market.timestamp}
        </span>
      </div>
    </Link>
  );
}
