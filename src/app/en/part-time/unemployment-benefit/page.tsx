import type { Metadata } from "next";
import Link from "next/link";
import { getMinimumWage, getUnemploymentBenefit } from "@/lib/rates";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Unemployment Benefit Estimator",
  description: "Estimate your expected unemployment (job-seeking) benefit amount and payment period.",
};

export default function UnemploymentBenefitPageEn() {
  const rates = getUnemploymentBenefit();
  const minimumWage = getMinimumWage();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🧳 Unemployment Benefit Estimator</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>What does this calculate?</h2>
        <p>
          Estimates job-seeking benefits (&ldquo;unemployment benefits&rdquo;) under the{" "}
          <strong>Employment Insurance Act</strong>. The daily benefit amount = 60% of your
          average daily wage before separation, within an upper and lower bound. The total
          amount = daily benefit × number of payment days.
        </p>

        <p className="rounded-md bg-blue-50 p-4 text-sm not-prose dark:bg-blue-950/40">
          This calculator only computes <strong>the amount you&rsquo;d receive assuming you
          qualify</strong>. Unemployment benefits are, in principle, only available for{" "}
          <strong>involuntary separation</strong> (recommended resignation, contract expiry,
          company circumstances, etc.) — a simple voluntary resignation generally doesn&rsquo;t
          qualify (with some exceptions). Check your eligibility with your local Employment
          Center.
        </p>

        <h2>Upper/lower bounds and payment days</h2>
        <ul>
          <li>
            2026 daily upper bound: <strong>₩{rates.dailyCap.toLocaleString()}</strong>
          </li>
          <li>
            Daily lower bound: minimum wage at separation × 8 hours × 80% ={" "}
            <strong>
              ₩
              {Math.round(
                minimumWage.hourly * rates.dailyFloorFormula.hoursPerDay * rates.dailyFloorFormula.minWageRatio,
              ).toLocaleString()}
            </strong>
          </li>
          <li>
            The number of payment days is set between 120 and 270 days based on your{" "}
            <strong>age at separation</strong> and <strong>employment insurance enrollment
            period</strong> (age 50+ gets a longer period for the same enrollment length).
          </li>
        </ul>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          This is a reference-only mock calculation. This English page is a translation of the
          original Korean tool; the average wage is approximated assuming your last 3 months of
          pay were identical, and the actual payout depends on the Employment Center&rsquo;s
          review and exact average-wage calculation.
        </p>
      </section>

      <Calculator rates={rates} minimumHourlyWage={minimumWage.hourly} />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          More tools:{" "}
          <Link
            href="/en/part-time/resignation-date-comparison"
            className="font-medium text-orange-600 dark:text-orange-400"
          >
            Resignation Date Comparator
          </Link>{" "}
          ·{" "}
          <Link href="/en/part-time" className="font-medium text-orange-600 dark:text-orange-400">
            Work & Pay
          </Link>
        </p>
      </section>
    </div>
  );
}
