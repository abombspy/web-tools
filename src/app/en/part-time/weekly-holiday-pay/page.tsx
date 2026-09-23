import type { Metadata } from "next";
import Link from "next/link";
import { getMinimumWage } from "@/lib/rates";
import content from "@content/tools/en/part-time/weekly-holiday-pay.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Weekly Holiday Pay Calculator",
  description: "Enter your hourly wage and weekly hours to calculate weekly holiday pay under Korean labor law.",
};

export default function WeeklyHolidayPayPageEn() {
  const minimumWage = getMinimumWage();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🏖️ Weekly Holiday Pay Calculator</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        {renderBlocks(asBlocks(content))}
      </section>

      <Calculator minimumWage={minimumWage.hourly} />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          More tools:{" "}
          <Link href="/en/part-time" className="font-medium text-orange-600 dark:text-orange-400">
            Work & Pay
          </Link>
        </p>
      </section>
    </div>
  );
}
