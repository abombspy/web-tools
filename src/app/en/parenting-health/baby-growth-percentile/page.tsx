import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Baby Growth Percentile Calculator",
  description: "Calculate your baby's age in months and compare weight/height against reference averages.",
};

export default function BabyGrowthPercentilePageEn() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">📏 Baby Growth Percentile Calculator</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>What this tool does</h2>
        <p>
          Calculates your baby&rsquo;s age in full months from their birth date, and compares the
          weight/height you enter against a <strong>reference average</strong> for that age.
        </p>

        <p className="rounded-2xl bg-blue-50 p-4 text-sm not-prose dark:bg-blue-950/40">
          <strong>This does not calculate a true &ldquo;percentile.&rdquo;</strong> Official WHO growth
          percentiles are computed from large statistical parameter tables (LMS), which can&rsquo;t be
          reliably reproduced here. Instead, we use the midpoint of the commonly-cited
          &ldquo;3rd–97th percentile range&rdquo; as a reference average, and just show how far above
          or below that average your numbers are. Supported range: 0–24 months.
        </p>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          For an accurate growth percentile and developmental assessment, check with a pediatrician
          at a well-baby visit. Don&rsquo;t judge your baby&rsquo;s growth from this result alone.
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
