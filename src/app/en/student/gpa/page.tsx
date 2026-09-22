import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "GPA Calculator",
  description: "Calculate your GPA on Korea's 4.5 (and 4.3-converted) scale from your courses and grades.",
};

export default function GpaPageEn() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">📚 GPA Calculator</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>How it works</h2>
        <p>
          Uses the standard 4.5-point scale common at Korean universities (A+ = 4.5 down to F =
          0.0). For each course, multiply <strong>credits × grade points</strong>, sum them up, and
          divide by total credits — a <strong>credit-weighted average</strong>.
        </p>
        <p>
          The 4.3-scale conversion (sometimes required for grad school or overseas applications) is
          your 4.5-scale GPA multiplied by 4.3/4.5.
        </p>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          Grade point scales (whether A+ is 4.5 or 4.3) and how pass/fail courses are handled can
          differ by school, so check your official transcript for the exact figure.
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
