import type { Metadata } from "next";
import Link from "next/link";
import { getWithholdingTax } from "@/lib/rates";
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
        <h2>How it&rsquo;s calculated</h2>
        <p>
          Net income = (fee per delivery × number of deliveries) − platform commission −
          business income tax withholding (3.3%) − fixed costs (fuel, supplies, etc.)
        </p>

        <p className="rounded-md bg-blue-50 p-4 text-sm not-prose dark:bg-blue-950/40">
          Commission rates vary by delivery platform (Baemin, Coupang Eats, Yogiyo, etc.) and by
          contract terms, and change often. Instead of hardcoding a specific platform&rsquo;s
          rate, this calculator asks you to <strong>enter the commission rate you&rsquo;ve
          actually confirmed</strong>.
        </p>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          This is a reference-only calculation. This English page is a translation of the
          original Korean tool; it doesn&rsquo;t account for insurance premiums (commercial
          delivery insurance, etc.) or deductions from 4-insurance enrollment.
        </p>
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
            Freelancer & Self-Employed
          </Link>
        </p>
      </section>
    </div>
  );
}
