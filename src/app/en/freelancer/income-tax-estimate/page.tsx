import type { Metadata } from "next";
import Link from "next/link";
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
        <h2>How it&rsquo;s calculated</h2>
        <p>
          Business income is your annual revenue minus a deemed necessary-expense amount (based
          on your industry&rsquo;s expense ratio), then a basic deduction of ₩1.5M is subtracted
          to get your taxable base, to which Korea&rsquo;s{" "}
          <strong>progressive comprehensive income tax rates (6–45%, 8 brackets)</strong> apply.
        </p>
        <p>
          Calculated tax = taxable base × rate − progressive deduction. If your annual revenue is{" "}
          <strong>under</strong> ₩{rates.simplifiedRateThreshold.toLocaleString()}, the{" "}
          <strong>simplified expense ratio</strong> applies; above that, the{" "}
          <strong>standard expense ratio</strong> applies (the simplified ratio is much higher,
          which lowers your tax).
        </p>

        <p className="rounded-md bg-blue-50 p-4 text-sm not-prose dark:bg-blue-950/40">
          This calculator only supports the <strong>top 5 industries</strong> (solo content
          creator/YouTuber, writer/translator, tutor/instructor, quick-service/delivery rider,
          IT freelancer/other self-employed). For industries not on this list, look up your own
          industry code&rsquo;s expense ratio on the National Tax Service&rsquo;s Hometax site
          and enter it directly.
        </p>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          The National Tax Service publishes industry expense ratios around April each year (for
          the prior year). The rates in this calculator are reference values gathered from
          several tax-reference sources, with different base years per industry (2019–2024). For
          exact figures, check the National Tax Service Hometax &ldquo;Standard/Simplified
          Expense Ratio Lookup.&rdquo; This English page is a translation of the original Korean
          tool; it also only applies your own basic deduction (₩1.5M) and doesn&rsquo;t include
          dependent deductions, tax credits, or health-insurance-premium deductions — it&rsquo;s
          a simplified estimate.
        </p>
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
