import FilterMarkets from "../components/ui/FilterMarkets";
import MarketsTab from "../components/ui/MarketsTab";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      <div className="mx-auto flex h-full max-w-7xl flex-col gap-8 p-6">
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-bold text-slate-100">
            Prediction Market
          </h2>
          <div className="relative flex items-start gap-10">
            <MarketsTab />
            <FilterMarkets />
          </div>
        </div>
      </div>
    </main>
  );
}
