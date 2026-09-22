import type { Metadata } from "next";
import Link from "next/link";
import { getWithholdingTax } from "@/lib/rates";
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
        <h2>Where does 3.3% come from?</h2>
        <p>
          The party paying a freelancer or other business-income earner in Korea must, under the{" "}
          <strong>Income Tax Act</strong>, withhold 3% of the payment as income tax, and under
          the <strong>Local Tax Act</strong>, withhold an additional 10% of that income tax as
          local income tax. In total that&rsquo;s 3% + 0.3% = <strong>3.3%</strong> withheld
          before payment.
        </p>

        <h2>How it&rsquo;s calculated</h2>
        <ul>
          <li>Pre-tax (contract amount) → post-tax: pre-tax × (1 − 0.033)</li>
          <li>Post-tax (actual deposit) → pre-tax: post-tax ÷ (1 − 0.033) (an approximation due to rounding)</li>
        </ul>
        <p>
          Local income tax isn&rsquo;t exactly 0.3% of the pre-tax amount — it&rsquo;s{" "}
          <strong>10% of the income tax amount</strong>, so there can be a small, won-level
          difference. This calculator computes income tax first and then derives local income tax
          as 10% of it, matching the actual withholding method.
        </p>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          This is a reference-only calculation. This English page is a translation of the
          original Korean tool; exceptions (simplified taxpayers, tax-exempt businesses, etc.)
          may result in a different actual withholding amount.
        </p>
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
