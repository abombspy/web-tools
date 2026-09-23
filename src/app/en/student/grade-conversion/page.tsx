import type { Metadata } from "next";
import Link from "next/link";
import content from "@content/tools/en/student/grade-conversion.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
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
        {renderBlocks(asBlocks(content))}
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
