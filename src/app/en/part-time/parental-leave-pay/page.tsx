import type { Metadata } from "next";
import Link from "next/link";
import { getParentalLeavePay } from "@/lib/rates";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Parental Leave Pay Calculator",
  description: "Estimate your monthly parental leave pay and total payout by number of months.",
};

export default function ParentalLeavePayPageEn() {
  const rates = getParentalLeavePay();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🍼 Parental Leave Pay Calculator</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>What does this calculate?</h2>
        <p>
          Calculates your monthly parental leave pay during a period of parental leave. The 2026
          tiered rates and caps are as follows.
        </p>
        <ul>
          {rates.tiers.map((tier, idx) => {
            const prevMax = idx === 0 ? 0 : rates.tiers[idx - 1].maxMonth;
            return (
              <li key={tier.maxMonth}>
                Months {prevMax + 1}–{tier.maxMonth}: {Math.round(tier.rate * 100)}% of ordinary
                wage (cap ₩{tier.cap.toLocaleString()})
              </li>
            );
          })}
          <li>Floor: ₩{rates.floor.toLocaleString()}/month</li>
        </ul>
        <p>
          Since January 2025, the &ldquo;deferred payment&rdquo; system (25% held back and paid 6
          months after returning to work) has been abolished, so you now receive{" "}
          <strong>the full amount every month</strong> right away.
        </p>

        <p className="rounded-md bg-blue-50 p-4 text-sm not-prose dark:bg-blue-950/40">
          This calculator doesn&rsquo;t cover the special <strong>&ldquo;6+6 Parental Leave
          Program&rdquo;</strong> (a separate scheme with progressively higher caps) that applies
          when both parents take parental leave together.
        </p>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          This is a reference-only mock calculation. This English page is a translation of the
          original Korean tool; the actual payout depends on the Employment Center&rsquo;s review
          and how your ordinary wage is calculated.
        </p>
      </section>

      <Calculator rates={rates} />

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
