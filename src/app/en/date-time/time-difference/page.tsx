import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Time Zone Difference Calculator",
  description: "Calculate the time difference between two cities, including daylight saving time.",
};

export default function TimeDifferencePageEn() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🌐 Time Zone Difference Calculator</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>How it works</h2>
        <p>
          Looks up each city&rsquo;s UTC offset using standard time zone data and calculates the
          difference. Some regions (the US, Europe, and others) observe{" "}
          <strong>daylight saving time (DST)</strong> in summer, which changes the offset — so you
          need to pick a reference date.
        </p>
        <p>
          For example, the Seoul–New York time difference is 14 hours in winter, but drops to 13
          hours during US daylight saving time.
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
