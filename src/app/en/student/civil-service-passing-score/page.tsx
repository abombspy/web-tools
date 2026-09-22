import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Civil Service Exam Score Comparison",
  description: "Compare your expected score against past passing cutoffs you've researched.",
};

export default function CivilServicePassingScorePageEn() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🏛️ Civil Service Exam Score Comparison</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>Why a &ldquo;comparison tool,&rdquo; not a &ldquo;predictor&rdquo;?</h2>
        <p>
          Searching for the &ldquo;expected cutoff&rdquo; of an exam that hasn&rsquo;t happened yet
          only turns up <strong>guesses</strong> from prep academies and blogs. Official cutoff
          statistics for Korea&rsquo;s civil service exams are only published after the exam by the
          Ministry of Personnel Management, so baking an unsupported number into this calculator
          and presenting it as a &ldquo;prediction&rdquo; could give false confidence.
        </p>
        <p>
          Instead, this tool doesn&rsquo;t supply any cutoff numbers itself. Enter{" "}
          <strong>past cutoffs you&rsquo;ve researched yourself</strong> (from official government
          announcements), and it compares your expected score against the average, highest, and
          lowest of what you entered.
        </p>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          Cutoffs vary a lot year to year depending on exam difficulty, number of applicants, and
          hiring quotas. A simple comparison to past data doesn&rsquo;t guarantee a future outcome.
        </p>
      </section>

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          More tools:{" "}
          <Link href="/en/student" className="font-medium text-indigo-600 dark:text-indigo-400">
            Student
          </Link>
        </p>
      </section>
    </div>
  );
}
