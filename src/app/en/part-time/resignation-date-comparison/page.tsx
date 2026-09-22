import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Resignation Date Comparator",
  description: "Enter your hire date and monthly wage and compare several planned resignation dates for severance pay and accrued annual leave.",
};

export default function ResignationDateComparisonPageEn() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">📦 Resignation Date Comparator</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>What does this calculate?</h2>
        <p>
          Moving your last day by even a few days can significantly change your{" "}
          <strong>severance pay</strong> or <strong>accrued annual leave</strong>. Whether you
          reach <strong>one full year</strong> of service in particular determines whether
          severance pay is owed at all. Enter your hire date and wage, then compare several
          planned resignation dates side by side.
        </p>

        <h2>How severance pay is calculated</h2>
        <p>
          Under <strong>Article 8 of the Employee Retirement Benefit Security Act</strong>,
          severance pay = average daily wage × 30 days × (continuous service days ÷ 365). If
          continuous service is <strong>under 1 year (365 days)</strong>, no severance pay is
          owed — 364 days of work doesn&rsquo;t qualify.
        </p>
        <p>
          The average wage is, in principle, total wages paid over the 3 months before
          resignation divided by the calendar days in those 3 months. This calculator{" "}
          <strong>assumes your monthly wage was the same for the last 3 months</strong> and
          approximates using the wage you enter. It doesn&rsquo;t account for irregular payments
          like bonuses or unused-leave payouts, so it may differ from your actual average wage.
        </p>

        <h2>Accrued annual leave days</h2>
        <p>
          Under Article 60 of the Labor Standards Act, under 1 year of service earns 1 day per
          full month of attendance (up to 11 days); 1 year or more earns 15 days, plus 1 extra
          day every 2 years from year 3 onward (up to 25 days). This calculator only shows
          accrued days — to convert unused leave into a payout amount, use the{" "}
          <span className="italic">Annual Leave Payout Calculator</span>.
        </p>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          This is a reference-only mock calculation. This English page is a translation of the
          original Korean tool; your actual average wage and service period depend on your pay
          history, absences, and leave taken — check with your HR team or a licensed labor
          attorney (nomusa) for exact figures.
        </p>
      </section>

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          More tools:{" "}
          <Link href="/en/part-time/weekly-holiday-pay" className="font-medium text-orange-600 dark:text-orange-400">
            Weekly Holiday Pay Calculator
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
