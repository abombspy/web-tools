import type { Metadata } from "next";
import Link from "next/link";
import content from "@content/tools/en/part-time/resignation-date-comparison.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Resignation Date Comparator",
  description: "Enter your hire date and monthly wage and compare several planned resignation dates for severance pay and accrued annual leave.",
};

export default function ResignationDateComparisonPageEn() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">📦 Resignation Date Comparator</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        {renderBlocks(asBlocks(content))}
      </section>

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          More tools:{" "}
          <Link href="/en/part-time/weekly-holiday-pay" className="font-medium text-orange-600 dark:text-orange-400">
            Weekly Holiday Pay Calculator
          </Link>{" "}
          ·{" "}
          <Link href="/en/part-time" className="font-medium text-orange-600 dark:text-orange-400">
            Work & Pay
          </Link>
        </p>
      </section>
    </div>
  );
}
