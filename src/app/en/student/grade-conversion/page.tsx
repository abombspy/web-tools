import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Korean School Grade Converter",
  description: "Convert class rank percentage or CSAT percentile into a grade tier.",
};

export default function GradeConversionPageEn() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">📝 Korean School Grade Converter</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>2026 is a transition year for school grading</h2>
        <p>
          Under the Ministry of Education&rsquo;s 2028 university admissions reform, high school
          internal grades (naesin) are shifting from a <strong>9-tier system</strong> to a{" "}
          <strong>5-tier system</strong>. As of 2026, <strong>3rd-year high schoolers (the last
          9-tier cohort)</strong> and <strong>1st/2nd-year students (on the new 5-tier system)</strong>{" "}
          use different scales — pick the one that matches your grade level.
        </p>
        <ul>
          <li>5-tier cumulative %: Tier 1 = 10% / Tier 2 = 34% / Tier 3 = 66% / Tier 4 = 90% / Tier 5 = 100%</li>
          <li>
            9-tier cumulative % (used for both school grades and the CSAT): Tier 1 = 4% / Tier 2 = 11% /
            Tier 3 = 23% / Tier 4 = 40% / Tier 5 = 60% / Tier 6 = 77% / Tier 7 = 89% / Tier 8 = 96% /
            Tier 9 = 100%
          </li>
        </ul>

        <h2>Calculating class rank percentage</h2>
        <p>
          Rank percentage = rank ÷ total students × 100 — a simple calculation. The actual school
          system (NEIS) applies a separate correction formula for tied ranks, so if there are ties,
          your real transcript may differ slightly from this result.
        </p>

        <h2>Why doesn&rsquo;t this accept a CSAT standard score?</h2>
        <p>
          The CSAT (College Scholastic Ability Test) standard score distribution shifts depending on
          that year&rsquo;s difficulty, so a standard score alone can&rsquo;t tell you the exact
          grade tier. The precise cutoffs are only confirmed by the official announcement from
          Korea&rsquo;s testing authority after scoring, so this calculator only accepts a{" "}
          <strong>percentile you enter directly</strong>.
        </p>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          This result is for reference only. For your exact grade and how it was calculated, check
          your official school transcript or the testing authority&rsquo;s announcement.
        </p>
      </section>

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          More tools:{" "}
          <Link href="/en/student" className="font-medium text-indigo-600 dark:text-indigo-400">
            Student Tools
          </Link>
        </p>
      </section>
    </div>
  );
}
