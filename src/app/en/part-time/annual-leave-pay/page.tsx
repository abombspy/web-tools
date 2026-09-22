import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Annual Leave Payout Calculator",
  description: "Calculate accrued annual leave days and the payout for unused leave, based on your hire date.",
};

export default function AnnualLeavePayPageEn() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🌴 Annual Leave Payout Calculator</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>How many days of leave do you accrue?</h2>
        <p>
          Under <strong>Article 60 of the Labor Standards Act</strong>, under{" "}
          <strong>1 year</strong> of continuous service earns 1 day per full month of attendance
          (up to 11 days); <strong>1 year or more</strong> (assuming 80%+ attendance) earns 15
          days, plus 1 extra day every 2 years starting from year 3, up to a{" "}
          <strong>maximum of 25 days</strong>.
        </p>

        <h2>How the payout is calculated</h2>
        <p>
          Annual leave payout = (accrued leave − leave already used) × 1 day&rsquo;s ordinary wage
        </p>
        <p>
          1 day&rsquo;s ordinary wage is calculated as <strong>monthly ordinary wage ÷ 209
          hours × 8 hours</strong>. 209 hours is the average monthly scheduled hours for a
          40-hour work week plus 8 hours of paid weekly holiday ((40+8) hours × 52 weeks ÷ 12
          months).
        </p>

        <p className="rounded-md bg-blue-50 p-4 text-sm not-prose dark:bg-blue-950/40">
          This calculator assumes a <strong>full-time, 40-hour-a-week employee</strong>.
          Part-time employees accrue leave on a pro-rated basis by scheduled hours, which this
          calculator doesn&rsquo;t handle.
        </p>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          This is a reference-only mock calculation. This English page is a translation of the
          original Korean tool; actual leave accrual and usage depend on your company&rsquo;s
          work rules and any absences or leave taken — check with your HR team for exact
          figures.
        </p>
      </section>

      <Calculator />

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
