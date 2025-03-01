import FilterMarkets from "../components/ui/FilterMarkets";
import MarketsTab from "../components/ui/MarketsTab";

const markets = [
  {
    imgUrl: "https://i.postimg.cc/QtF1N8xV/IMG-1067.jpg",
    title: "Will monad crypto launch?",
    tag: "Crypto",
  },
  {
    imgUrl: "https://i.postimg.cc/QtF1N8xV/IMG-1067.jpg",
    title: "Will monad crypto launch?",
    tag: "Crypto",
  },
  {
    imgUrl: "https://i.postimg.cc/QtF1N8xV/IMG-1067.jpg",
    title: "Will monad crypto launch?",
    tag: "Crypto",
  },
  {
    imgUrl: "https://i.postimg.cc/QtF1N8xV/IMG-1067.jpg",
    title: "Will monad crypto launch?",
    tag: "Sports",
  },
  {
    imgUrl: "https://i.postimg.cc/QtF1N8xV/IMG-1067.jpg",
    title: "Will monad crypto launch?",
    tag: "Sports",
  },
  {
    imgUrl: "https://i.postimg.cc/QtF1N8xV/IMG-1067.jpg",
    title: "Will monad crypto launch?",
    tag: "Sports",
  },
  {
    imgUrl: "https://i.postimg.cc/QtF1N8xV/IMG-1067.jpg",
    title: "Will monad crypto launch?",
    tag: "Culture",
  },
  {
    imgUrl: "https://i.postimg.cc/QtF1N8xV/IMG-1067.jpg",
    title: "Will monad crypto launch?",
    tag: "Culture",
  },
  {
    imgUrl: "https://i.postimg.cc/QtF1N8xV/IMG-1067.jpg",
    title: "Will monad crypto launch?",
    tag: "Culture",
  },
  {
    imgUrl: "https://i.postimg.cc/QtF1N8xV/IMG-1067.jpg",
    title: "Will monad crypto launch?",
    tag: "Politics",
  },
  {
    imgUrl: "https://i.postimg.cc/QtF1N8xV/IMG-1067.jpg",
    title: "Will monad crypto launch?",
    tag: "Politics",
  },
  {
    imgUrl: "https://i.postimg.cc/QtF1N8xV/IMG-1067.jpg",
    title: "Will monad crypto launch?",
    tag: "Politics",
  },
  {
    imgUrl: "https://i.postimg.cc/QtF1N8xV/IMG-1067.jpg",
    title: "Will monad crypto launch?",
    tag: "Gaming",
  },
  {
    imgUrl: "https://i.postimg.cc/QtF1N8xV/IMG-1067.jpg",
    title: "Will monad crypto launch?",
    tag: "Gaming",
  },
  {
    imgUrl: "https://i.postimg.cc/QtF1N8xV/IMG-1067.jpg",
    title: "Will monad crypto launch?",
    tag: "Gaming",
  },
  {
    imgUrl: "https://i.postimg.cc/QtF1N8xV/IMG-1067.jpg",
    title: "Will monad crypto launch?",
    tag: "Economy",
  },
  {
    imgUrl: "https://i.postimg.cc/QtF1N8xV/IMG-1067.jpg",
    title: "Will monad crypto launch?",
    tag: "Economy",
  },
  {
    imgUrl: "https://i.postimg.cc/QtF1N8xV/IMG-1067.jpg",
    title: "Will monad crypto launch?",
    tag: "Economy",
  },
  {
    imgUrl: "https://i.postimg.cc/QtF1N8xV/IMG-1067.jpg",
    title: "Will monad crypto launch?",
    tag: "AI",
  },
  {
    imgUrl: "https://i.postimg.cc/QtF1N8xV/IMG-1067.jpg",
    title: "Will monad crypto launch?",
    tag: "AI",
  },
  {
    imgUrl: "https://i.postimg.cc/QtF1N8xV/IMG-1067.jpg",
    title: "Will monad crypto launch?",
    tag: "AI",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      <div className="mx-auto flex h-full max-w-7xl flex-col gap-8 p-6">
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-bold text-slate-100">
            Prediction Market
          </h2>
          <div className="relative flex items-start gap-10">
            <MarketsTab markets={markets} />
            <FilterMarkets />
          </div>
        </div>
      </div>
    </main>
  );
}
