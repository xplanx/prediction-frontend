import { Tabs } from "@chakra-ui/react";

import React from "react";
import MarketCard from "./MarketCard";
import { getAllMarkets } from "@/lib/markets";

export default function MarketsTab() {
  const markets = getAllMarkets();

  const tabs = [
    { label: "All Topics", value: "all" },
    { label: "Crypto", value: "crypto" },
    { label: "Sports", value: "sports" },
    { label: "Culture", value: "culture" },
    { label: "Politics", value: "politics" },
    { label: "Gaming", value: "gaming" },
    { label: "Economy", value: "economy" },
    { label: "AI", value: "ai" },
  ];

  return (
    <Tabs.Root defaultValue="all" variant="subtle" className="flex-1">
      <Tabs.List className="flex items-center gap-4">
        {tabs.map((tab) => (
          <Tabs.Trigger
            className="rounded-full border border-slate-800 px-4 text-slate-300 hover:bg-slate-800 hover:text-slate-100 data-[selected]:bg-slate-800 data-[selected]:text-slate-100"
            value={tab.value}
            key={tab.value}
          >
            {tab.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {tabs.map((tab) => (
        <Tabs.Content className="pt-6" value={tab.value} key={tab.value}>
          <div className="grid grid-cols-3 gap-6">
            {tab.value === "all"
              ? markets.map((market, index) => (
                  <MarketCard market={market} key={index} />
                ))
              : markets
                  .filter((market) => market.tag === tab.label)
                  .map((market, index) => (
                    <MarketCard market={market} key={index} />
                  ))}
          </div>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
