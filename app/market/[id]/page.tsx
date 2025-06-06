'use client';

import { notFound } from "next/navigation";
import { Chart, TransactionTabs } from "@/components/Id";
import { useQuery } from "@apollo/client";
import { GET_PREDICTION_DETAILS } from "@/lib/queries";
import { Prediction } from "@/lib/types";
import { mapPredictionToMarket } from "@/lib/mappers";
import { Market } from "@/lib/markets";
import { use } from "react";

type PageParams = {
  id: string;
};

export default function Page({ params }: { params: Promise<PageParams> }) {
  const resolvedParams = use(params);
  const { data, loading, error } = useQuery<{ predictions: Prediction }>(GET_PREDICTION_DETAILS, {
    variables: {
      id: resolvedParams.id,
    },
  });

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950">
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-4 p-4 md:flex-row lg:gap-8 lg:p-6">
          <div>Loading...</div>
        </div>
      </main>
    );
  }

  if (error || !data?.predictions) {
    notFound();
  }

  const market: Market = mapPredictionToMarket(data.predictions);

  return (
    <main className="min-h-screen bg-slate-950">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-4 p-4 md:flex-row lg:gap-8 lg:p-6">
        <Chart market={market} />
        <TransactionTabs market={market} />
      </div>
    </main>
  );
}
