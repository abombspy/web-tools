import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Due Date Calculator",
  description: "Estimate your due date and current gestational age from your last period.",
};

export default function DueDatePageEn() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🤰 Due Date Calculator</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>How it works</h2>
        <p>
          Uses <strong>Naegele&rsquo;s Rule</strong>, the standard method used by obstetricians: add
          280 days (40 weeks) to the first day of your last menstrual period. This assumes a
          regular 28-day cycle, so it&rsquo;s an average-case estimate.
        </p>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          This result is an estimate for reference only. Your actual due date depends on an
          ultrasound-based obstetric assessment, and the margin of error is larger if your cycle
          is irregular. Confirm the exact date with your doctor.
        </p>
      </section>

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          More tools:{" "}
          <Link href="/en/parenting-health" className="font-medium text-emerald-600 dark:text-emerald-400">
            Family & Health
          </Link>
        </p>
      </section>
    </div>
  );
}
