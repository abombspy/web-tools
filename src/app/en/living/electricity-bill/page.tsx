import type { Metadata } from "next";
import Link from "next/link";
import { getElectricityBillRates } from "@/lib/rates";
import content from "@content/tools/en/living/electricity-bill.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import Calculator from "./Calculator";
import ShareButtons from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "Electricity Bill Calculator",
  description: "Estimate a Korean residential electricity bill, including the progressive rate tiers.",
};

export default function ElectricityBillPageEn() {
  const rates = getElectricityBillRates();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">💡 Electricity Bill Calculator</h1>
      <ShareButtons />

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        {renderBlocks(asBlocks(content))}
      </section>

      <Calculator rates={rates} vatRate={rates.vatRate} fundRate={rates.fundRate} />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          More tools:{" "}
          <Link href="/en/living" className="font-medium text-sky-600 dark:text-sky-400">
            Housing & Bills
          </Link>
        </p>
      </section>
    </div>
  );
}
