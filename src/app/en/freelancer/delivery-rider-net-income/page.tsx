import type { Metadata } from "next";
import Link from "next/link";
import { getWithholdingTax } from "@/lib/rates";
import content from "@content/tools/en/freelancer/delivery-rider-net-income.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Delivery Rider Net Income Calculator",
  description: "Estimate your monthly net income from delivery fees, platform commission, fuel costs, and tax.",
};

export default function DeliveryRiderNetIncomePageEn() {
  const withholdingRates = getWithholdingTax();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🛵 Delivery Rider Net Income Calculator</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        {renderBlocks(asBlocks(content))}
      </section>

      <Calculator withholdingRates={withholdingRates} />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          More tools:{" "}
          <Link
            href="/en/freelancer/withholding-tax-3-3"
            className="font-medium text-rose-600 dark:text-rose-400"
          >
            3.3% Withholding Tax Calculator
          </Link>{" "}
          ·{" "}
          <Link href="/en/freelancer" className="font-medium text-rose-600 dark:text-rose-400">
            Freelance & Tax
          </Link>
        </p>
      </section>
    </div>
  );
}
