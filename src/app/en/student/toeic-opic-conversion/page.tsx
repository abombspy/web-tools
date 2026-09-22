import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "TOEIC/OPIc Score Conversion Table",
  description: "Convert between TOEIC and OPIc scores using the official conversion table used in Korean public-sector hiring.",
};

export default function ToeicOpicConversionPageEn() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🗣️ TOEIC/OPIc Score Conversion Table</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>Conversion basis</h2>
        <p>
          Based on the <strong>&ldquo;language proficiency conversion table&rdquo;</strong> commonly
          attached to Korean public institution and public enterprise job postings. Each OPIc level
          maps to a TOEIC score range and an assigned (average) score.
        </p>
        <ul>
          <li>IM1: 470–715 (average 593)</li>
          <li>IM2: 720–815 (average 765)</li>
          <li>IM3: 815–915 (average 860)</li>
          <li>IH: 915–955 (average 935)</li>
          <li>AL: 955–990 (average 980)</li>
        </ul>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          This table doesn&rsquo;t cover below IM1 (IM, IL, NH, etc.), and individual employers may
          use their own conversion table — always check the official criteria in the job posting.
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
