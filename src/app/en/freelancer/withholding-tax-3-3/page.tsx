import type { Metadata } from "next";
import Link from "next/link";
import { getWithholdingTax } from "@/lib/rates";
import content from "@content/tools/en/freelancer/withholding-tax-3-3.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "3.3% Withholding Tax Calculator",
  description: "Convert freelance/business income between pre-tax and post-tax amounts using Korea's 3.3% withholding rate.",
};

export default function WithholdingTax33PageEn() {
  const rates = getWithholdingTax();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🧾 3.3% Withholding Tax Calculator</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        {renderBlocks(asBlocks(content))}
      </section>

      <Calculator rates={rates} />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          More tools:{" "}
          <Link href="/en/freelancer/vat" className="font-medium text-rose-600 dark:text-rose-400">
            VAT Calculator
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
