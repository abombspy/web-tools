import type { Metadata } from "next";
import Link from "next/link";
import content from "@content/tools/en/freelancer/income-tax-estimate.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import { getComprehensiveIncomeTax, getExpenseRatesByIndustry } from "@/lib/rates";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Income Tax Estimator (Freelancer, Simplified)",
  description: "Estimate freelance/business income tax using industry-standard expense ratios.",
};

export default function IncomeTaxEstimatePageEn() {
  const rates = getComprehensiveIncomeTax();
  const industries = getExpenseRatesByIndustry();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">📊 Income Tax Estimator (Freelancer, Simplified)</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        {renderBlocks(asBlocks(content), {
          simplifiedRateThreshold: rates.simplifiedRateThreshold.toLocaleString(),
        })}
      </section>

      <Calculator rates={rates} industries={industries} />

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
