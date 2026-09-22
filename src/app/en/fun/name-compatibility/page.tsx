import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Name & MBTI Compatibility Test",
  description: "Enter two names or two MBTI types for a just-for-fun compatibility score.",
};

export default function NameCompatibilityPageEn() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">💘 Name & MBTI Compatibility Test</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <p className="rounded-2xl bg-blue-50 p-4 text-sm not-prose dark:bg-blue-950/40">
          This is <strong>purely for fun</strong> and has no scientific basis. It&rsquo;s designed to
          always give the same score for the same name/MBTI pair (regardless of order) — it doesn&rsquo;t
          analyze real compatibility or personality fit.
        </p>
      </section>

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          More tools:{" "}
          <Link href="/en/fun" className="font-medium text-violet-600 dark:text-violet-400">
            Fun & Viral
          </Link>
        </p>
      </section>
    </div>
  );
}
