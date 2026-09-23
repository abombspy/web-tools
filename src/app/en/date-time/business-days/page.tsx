import type { Metadata } from "next";
import Link from "next/link";
import content from "@content/tools/en/date-time/business-days.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import { getHolidays } from "@/lib/rates";
import Calculator from "./Calculator";
import ShareButtons from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "Business Days Calculator",
  description: "Calculate business days between two dates, excluding weekends and Korean public holidays.",
};

export default function BusinessDaysPageEn() {
  const holidayData = getHolidays();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🗓️ Business Days Calculator</h1>
      <ShareButtons />

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        {renderBlocks(asBlocks(content), { holidayYear: holidayData.year })}
      </section>

      <Calculator holidays={holidayData.holidays} coveredYear={holidayData.year} />

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
