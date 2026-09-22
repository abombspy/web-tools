import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "D-Day Countdown Calculator",
  description: "Calculate the number of days until (or since) a target date.",
};

export default function DDayPageEn() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">📆 D-Day Countdown Calculator</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>How it works</h2>
        <p>
          Calculates the number of days between a target date and a reference date (today).
          Useful for anniversaries, 100-day/200-day milestones, or counting down to an exam.
        </p>
      </section>

      <Calculator />

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
