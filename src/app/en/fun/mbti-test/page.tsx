import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "MBTI Personality Test",
  description: "Answer 28 quick questions to get a reference personality type and a short description.",
};

export default function MbtiTestPageEn() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🔮 MBTI Personality Test</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <p>
          For each of 28 questions, pick whichever answer feels closer to you. Based on which side
          you pick more often across four axes — Extraversion/Introversion (E/I), Sensing/Intuition
          (S/N), Thinking/Feeling (T/F), and Judging/Perceiving (J/P) — we&rsquo;ll show you a
          personality type.
        </p>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          This isn&rsquo;t an official MBTI (Myers-Briggs Type Indicator) assessment — it&rsquo;s a{" "}
          <strong>reference-only personality quiz</strong> inspired by the same concept. It hasn&rsquo;t
          been validated as a psychological instrument, so please take it just for fun. For an
          official assessment, use a certified provider.
        </p>
      </section>

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          More tools:{" "}
          <Link href="/en/fun/name-compatibility" className="font-medium text-violet-600 dark:text-violet-400">
            MBTI Compatibility Test
          </Link>{" "}
          ·{" "}
          <Link href="/en/fun" className="font-medium text-violet-600 dark:text-violet-400">
            Fun & Viral
          </Link>
        </p>
      </section>
    </div>
  );
}
