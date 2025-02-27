import { Banknote, ChartSpline, Clock3, Coins } from "lucide-react";

const markets = [
  {
    imgUrl: "https://taya.fi/images/main-logo.png",
    title: "When will monad crypto launch?",
    tag: "Finance",
  },
  {
    imgUrl: "https://taya.fi/images/main-logo.png",
    title: "When will monad crypto launch?",
    tag: "Finance",
  },
  {
    imgUrl: "https://taya.fi/images/main-logo.png",
    title: "When will monad crypto launch?",
    tag: "Finance",
  },
  {
    imgUrl: "https://taya.fi/images/main-logo.png",
    title: "When will monad crypto launch?",
    tag: "Finance",
  },
  {
    imgUrl: "https://taya.fi/images/main-logo.png",
    title: "When will monad crypto launch?",
    tag: "",
  },
  {
    imgUrl: "https://taya.fi/images/main-logo.png",
    title: "When will monad crypto launch?",
    tag: "",
  },
  {
    imgUrl: "https://taya.fi/images/main-logo.png",
    title: "When will monad crypto launch?",
    tag: "",
  },
  {
    imgUrl: "https://taya.fi/images/main-logo.png",
    title: "When will monad crypto launch?",
    tag: "",
  },
  {
    imgUrl: "https://taya.fi/images/main-logo.png",
    title: "When will monad crypto launch?",
    tag: "",
  },
  {
    imgUrl: "https://taya.fi/images/main-logo.png",
    title: "When will monad crypto launch?",
    tag: "",
  },
  {
    imgUrl: "https://taya.fi/images/main-logo.png",
    title: "When will monad crypto launch?",
    tag: "",
  },
];

export default function Home() {
  const trendMarkets = markets.filter((market) => market.tag !== "");

  return (
    <main className="h-full bg-gray-100">
      <div className="container mx-auto flex h-dvh flex-col gap-8 p-6">
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-bold text-gray-900">Trend</h2>
          <div className="grid grid-cols-4 gap-4">
            {trendMarkets.map((market) => (
              <div className="flex flex-col gap-6 rounded-xl bg-white p-4 shadow">
                <div className="flex items-start gap-3">
                  <img
                    src={market.imgUrl}
                    alt="Market Photo"
                    className="size-12 rounded-lg"
                  />
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold text-gray-800">
                      {market.title}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-xs text-gray-700">
                        <Coins className="size-3" />
                        $6k
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-700">
                        <Banknote className="size-3" />
                        $30k
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-700">
                        <ChartSpline className="size-3" />
                        1.5%
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-700">
                        <Clock3 className="size-3" />
                        Jan 01, 2025
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <button
                      type="button"
                      className="rounded-md border border-gray-200 px-3 py-1 text-xs text-gray-500"
                    >
                      Yes 1.00
                    </button>
                    <button
                      type="button"
                      className="rounded-md border border-gray-200 px-3 py-1 text-xs text-gray-500"
                    >
                      No 1.00
                    </button>
                  </span>
                  <span className="rounded-md bg-gray-100 px-3 py-1 text-xs text-gray-600">
                    {market.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-bold text-gray-900">All</h2>
          <div className="grid grid-cols-4 gap-4">
            {markets.map((market) => (
              <div className="flex flex-col gap-6 rounded-xl bg-white p-4 shadow">
                <div className="flex items-start gap-3">
                  <img
                    src={market.imgUrl}
                    alt="Market Photo"
                    className="size-12 rounded-lg"
                  />
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold text-gray-800">
                      {market.title}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-xs text-gray-700">
                        <Coins className="size-3" />
                        $6k
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-700">
                        <Banknote className="size-3" />
                        $30k
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-700">
                        <ChartSpline className="size-3" />
                        1.5%
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-700">
                        <Clock3 className="size-3" />
                        Jan 01, 2025
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <button
                      type="button"
                      className="rounded-md border border-gray-200 px-3 py-1 text-xs text-gray-500"
                    >
                      Yes 1.00
                    </button>
                    <button
                      type="button"
                      className="rounded-md border border-gray-200 px-3 py-1 text-xs text-gray-500"
                    >
                      No 1.00
                    </button>
                  </span>
                  {market.tag && (
                    <span className="rounded-md bg-gray-100 px-3 py-1 text-xs text-gray-600">
                      {market.tag}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
