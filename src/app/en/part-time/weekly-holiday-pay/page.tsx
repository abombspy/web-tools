import type { Metadata } from "next";
import Link from "next/link";
import { getMinimumWage } from "@/lib/rates";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Weekly Holiday Pay Calculator",
  description: "Enter your hourly wage and weekly hours to calculate weekly holiday pay under Korean labor law.",
};

export default function WeeklyHolidayPayPageEn() {
  const minimumWage = getMinimumWage();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🏖️ Weekly Holiday Pay Calculator</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>What is weekly holiday pay?</h2>
        <p>
          Under <strong>Article 55 of the Labor Standards Act and Article 30 of its Enforcement
          Decree</strong>, an employer must give an employee who has worked all of their
          scheduled working days in a week at least one paid day off per week (the &ldquo;weekly
          holiday&rdquo;). The wage paid for that day is weekly holiday pay (&ldquo;jujusudang&rdquo;).
        </p>
        <h2>Eligibility</h2>
        <ul>
          <li>
            Your scheduled weekly working hours must be <strong>15 hours or more</strong>.
            (Strictly this is measured as a 4-week average, but if your hours are the same every
            week, judging by a single week is fine. If your hours vary a lot week to week, this
            calculator&rsquo;s result may not match reality.)
          </li>
          <li>
            You must have <strong>worked all of your scheduled days</strong> that week with no
            absences. (Being late or leaving early doesn&rsquo;t matter, but an absence means no
            pay for that week.)
          </li>
        </ul>
        <h2>How it&rsquo;s calculated</h2>
        <p>
          Weekly holiday pay = (weekly <strong>scheduled hours</strong> ÷ 40, capped at 40) × 8 ×
          hourly wage
        </p>
        <p>
          &ldquo;Scheduled hours&rdquo; means the hours set in your labor contract, not the hours
          you actually worked more or less. Even if your contract is for more than 40 hours a
          week, only up to 8 hours (the maximum) counts toward this calculation.
        </p>
        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          This is a reference-only mock calculation. This English page is a translation of the
          original Korean tool; actual eligibility and amounts depend on your labor contract and
          workplace, and don&rsquo;t replace an official check with the Ministry of Employment
          and Labor or a licensed labor attorney (nomusa).
        </p>
      </section>

      <Calculator minimumWage={minimumWage.hourly} />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          More tools:{" "}
          <Link href="/en/part-time" className="font-medium text-orange-600 dark:text-orange-400">
            Part-Time & Employee
          </Link>
        </p>
      </section>
    </div>
  );
}
