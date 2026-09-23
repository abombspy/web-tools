import type { Metadata } from "next";
import Link from "next/link";
import content from "@content/tools/en/student/gpa.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import Calculator from "./Calculator";
import ShareButtons from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "GPA Calculator",
  description: "Calculate your GPA on Korea's 4.5 (and 4.3-converted) scale from your courses and grades.",
};

export default function GpaPageEn() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">📚 GPA Calculator</h1>
      <ShareButtons />

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
