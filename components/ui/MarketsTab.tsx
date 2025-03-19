import { Tabs } from "@chakra-ui/react";

import React from "react";
import MarketCard from "./MarketCard";
import { getAllMarkets } from "@/lib/markets";

export default function MarketsTab() {
  const markets = getAllMarkets();

  const tabs = [
    { label: "All", value: "all" },
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
      <Tabs.List className="flex flex-wrap items-center gap-2 lg:gap-4">
        {tabs.map((tab) => (
          <Tabs.Trigger
            className="justify-center rounded-full border border-slate-800 px-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-slate-100 data-[selected]:bg-slate-800 data-[selected]:text-slate-100 lg:px-4 lg:text-base"
            value={tab.value}
            key={tab.value}
          >
            {tab.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {tabs.map((tab) => (
        <Tabs.Content className="pt-6" value={tab.value} key={tab.value}>
          <div className="grid grid-cols-2 gap-4 max-[510px]:grid-cols-1 md:grid-cols-3 lg:gap-6">
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
