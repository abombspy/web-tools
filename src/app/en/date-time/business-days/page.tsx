import type { Metadata } from "next";
import Link from "next/link";
import { getHolidays } from "@/lib/rates";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Business Days Calculator",
  description: "Calculate business days between two dates, excluding weekends and Korean public holidays.",
};

export default function BusinessDaysPageEn() {
  const holidayData = getHolidays();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🗓️ Business Days Calculator</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>How it works</h2>
        <p>
          Counts weekdays between a start and end date (inclusive), excluding{" "}
          <strong>Saturdays and Sundays</strong> and South Korea&rsquo;s official public holidays.
        </p>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          Holiday data covers {holidayData.year}. Lunar New Year, Chuseok, and substitute holidays
          shift every year, so double-check against the official Ministry of the Interior and
          Safety announcement before relying on this. Labor Day (May 1) isn&rsquo;t an official
          public holiday in Korea, so it isn&rsquo;t counted here.
        </p>
      </section>

      <Calculator holidays={holidayData.holidays} coveredYear={holidayData.year} />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          More tools:{" "}
          <Link href="/en/date-time" className="font-medium text-amber-600 dark:text-amber-400">
            Date & Time
          </Link>
        </p>
      </section>
    </div>
  );
}
