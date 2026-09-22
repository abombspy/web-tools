import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Korean Age & Zodiac Calculator",
  description: "Calculate Korean international age, zodiac animal, and Western star sign from a birth date.",
};

export default function AgeZodiacPageEn() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🐉 Korean Age & Zodiac Calculator</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>Korean age</h2>
        <p>
          Since South Korea&rsquo;s <strong>&ldquo;international age&rdquo; unification law</strong> took
          effect on June 28, 2023, official age counting works the same way as most of the world:
          you turn a year older on your birthday, not on New Year&rsquo;s Day.
        </p>

        <h2>Zodiac animal — a note on the method</h2>
        <p>
          This calculator uses the common <strong>simplified method based on the solar calendar
          (January 1st)</strong>. Traditionally, the zodiac year changes on the <strong>Lunar New Year
          (or the Ipchun solar term)</strong>, so if you were born in January or early February, your
          traditional zodiac animal <strong>may differ</strong> from this result. For the precise
          traditional zodiac, check your birthday against a lunar calendar converter.
        </p>

        <h2>Star sign</h2>
        <p>Matches your birth date (month/day) to the standard Western zodiac date ranges.</p>
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
