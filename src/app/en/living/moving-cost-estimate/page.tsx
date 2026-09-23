import type { Metadata } from "next";
import Link from "next/link";
import { getMovingCostEstimateRates } from "@/lib/rates";
import content from "@content/tools/en/living/moving-cost-estimate.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Moving Cost Estimator",
  description: "Estimate a rough moving-cost range in Korea based on home size, service type, and ladder truck needs.",
};

export default function MovingCostEstimatePageEn() {
  const rates = getMovingCostEstimateRates();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🚚 Moving Cost Estimator</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        {renderBlocks(asBlocks(content))}
      </section>

      <Calculator rates={rates} />

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
