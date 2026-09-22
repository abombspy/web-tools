import type { Metadata } from "next";
import Link from "next/link";
import { getVat } from "@/lib/rates";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "VAT Calculator",
  description: "Convert between the supply price and the total amount (VAT included).",
};

export default function VatPageEn() {
  const rates = getVat();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🧮 VAT Calculator</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>How it&rsquo;s calculated</h2>
        <p>
          Under the <strong>Value-Added Tax Act</strong>, the VAT rate for general taxpayers is{" "}
          <strong>10%</strong>.
        </p>
        <ul>
          <li>Supply price → total amount: supply price × 1.1</li>
          <li>Total amount → supply price: total amount ÷ 1.1 (rounded if not evenly divisible)</li>
        </ul>
        <p>
          Use this when you want to split a &ldquo;VAT included&rdquo; total on a receipt or
          invoice into the supply price and VAT, or to add VAT onto a supply price to get the
          final billed amount.
        </p>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          This calculator uses the general taxpayer rate (10%). Simplified taxpayers have
          different rates by business type, so results may differ.
        </p>
      </section>

      <Calculator rates={rates} />

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
            Freelancer & Self-Employed
          </Link>
        </p>
      </section>
    </div>
  );
}
