import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Alcohol Detox Time Estimator",
  description: "Estimate blood alcohol concentration and time to sober up using the Widmark formula.",
};

export default function AlcoholDetoxTimePageEn() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🍺 Alcohol Detox Time Estimator</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>How it works</h2>
        <p>
          Uses the <strong>Widmark formula</strong>, widely used in forensic and clinical medicine.
        </p>
        <ul>
          <li>Pure alcohol (g) = volume (mL) × ABV (%) × 0.8 (alcohol density)</li>
          <li>Initial blood alcohol concentration (BAC, %) = alcohol grams ÷ (body weight (g) × Widmark factor) × 100</li>
          <li>Time to sober up (hours) = initial BAC ÷ elimination rate per hour (about 0.015%pt)</li>
        </ul>
        <p>
          The Widmark factor accounts for differences in body water distribution: 0.7 for men and
          0.6 for women (so women reach a higher BAC at the same weight and drink amount).
        </p>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          This is a <strong>rough estimate only</strong>. Actual alcohol metabolism varies a lot by
          individual — body composition, liver function, whether you ate, medications, and more.
          Don&rsquo;t use this result to decide whether it&rsquo;s safe to drive.
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
