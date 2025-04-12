import { getMarketById } from "@/lib";
import { notFound } from "next/navigation";
import { Chart, TransactionTabs } from "@/components/Id";

type PageProps = Promise<{ id: string }>;

export default async function Page(props: { params: PageProps }) {
  const { id } = await props.params;
  const market = getMarketById(+id);

  if (!market) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-4 p-4 md:flex-row lg:gap-8 lg:p-6">
        <Chart market={market} />
        <TransactionTabs market={market} />
      </div>
    </main>
  );
}
