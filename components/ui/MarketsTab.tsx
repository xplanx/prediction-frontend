"use client"

import { Tabs } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MarketCard } from "./MarketCard";
import { useQuery } from "@apollo/client";
import { GET_PREDICTIONS } from "@/lib/queries";
import { useInView } from "react-intersection-observer";
import { Prediction, PredictionsResponse } from "@/lib/types";

const ITEMS_PER_PAGE = 12;

export function MarketsTab() {
  const [selectedTab, setSelectedTab] = useState("all");
  const { ref, inView } = useInView();

  const { data, loading, error, fetchMore } = useQuery<PredictionsResponse>(GET_PREDICTIONS, {
    variables: {
      limit: ITEMS_PER_PAGE,
      after: null,
      orderBy: "createdAt",
      orderDirection: "DESC",
    },
    ssr: false,
  });

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    if (inView && data?.predictionss?.pageInfo?.hasNextPage && !isLoadingMore) {
      setIsLoadingMore(true);
      fetchMore({
        variables: {
          after: data.predictionss.pageInfo.endCursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            predictionss: {
              ...fetchMoreResult.predictionss,
              items: [...prev.predictionss.items, ...fetchMoreResult.predictionss.items],
            },
          };
        },
      }).finally(() => {
        setIsLoadingMore(false);
      });
    }
  }, [inView, data, fetchMore, isLoadingMore]);

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

  const markets = data?.predictionss?.items || [];

  return (
    <Tabs.Root 
      defaultValue="all" 
      variant="subtle" 
      className="flex-1"
      onValueChange={(value) => setSelectedTab(value.value)}
    >
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
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error loading markets: {error.message}</div>
            ) : (
              <>
                {tab.value === "all"
                  ? markets.map((market: Prediction) => (
                      <MarketCard market={market} key={market.id} />
                    ))
                  : markets
                      .filter((market: Prediction) => market.tag === tab.label)
                      .map((market: Prediction) => (
                        <MarketCard market={market} key={market.id} />
                      ))}
                {data?.predictionss?.pageInfo?.hasNextPage && (
                  <div ref={ref} className="col-span-full flex justify-center py-4">
                    {isLoadingMore ? (
                      <div className="text-slate-400">Loading more...</div>
                    ) : (
                      <div className="h-10" />
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
