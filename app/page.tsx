import { ConnectButton, FilterMarkets, MarketsTab } from "@/components/ui";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      <div className="mx-auto flex h-full max-w-7xl flex-col gap-8 p-4 lg:p-6">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between gap-2 max-[375px]:relative">
            <h2 className="text-xl font-bold text-slate-100">
              Prediction Market
            </h2>
            <span className="max-[375px]:absolute max-[375px]:bottom-[-72px]">
              <ConnectButton />
            </span>
          </div>
          <div className="relative flex flex-col-reverse items-start gap-4 md:flex-row md:gap-10">
            <MarketsTab />
            <FilterMarkets />
          </div>
        </div>
      </div>
    </main>
  );
}
