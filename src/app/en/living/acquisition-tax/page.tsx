import type { Metadata } from "next";
import Link from "next/link";
import { getAcquisitionTaxRates } from "@/lib/rates";
import content from "@content/tools/en/living/acquisition-tax.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import Calculator from "./Calculator";
import ShareButtons from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "Acquisition Tax Calculator",
  description: "Calculate Korean residential acquisition tax, multi-home/corporate surcharges, and first-time buyer relief.",
};

export default function AcquisitionTaxPageEn() {
  const rates = getAcquisitionTaxRates();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">📜 Acquisition Tax Calculator</h1>
      <ShareButtons />

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        {renderBlocks(asBlocks(content))}
      </section>

      <Calculator rates={rates} />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          More tools:{" "}
          <Link href="/en/living/loan-repayment" className="font-medium text-sky-600 dark:text-sky-400">
            Loan Repayment Calculator
          </Link>{" "}
          ·{" "}
          <Link href="/en/living" className="font-medium text-sky-600 dark:text-sky-400">
            Housing & Bills
          </Link>
        </p>
      </section>
    </div>
  );
}
