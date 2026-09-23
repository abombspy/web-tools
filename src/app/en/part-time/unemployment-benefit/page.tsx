import type { Metadata } from "next";
import Link from "next/link";
import content from "@content/tools/en/part-time/unemployment-benefit.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import { getMinimumWage, getUnemploymentBenefit } from "@/lib/rates";
import Calculator from "./Calculator";
import ShareButtons from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "Unemployment Benefit Estimator",
  description: "Estimate your expected unemployment (job-seeking) benefit amount and payment period.",
};

export default function UnemploymentBenefitPageEn() {
  const rates = getUnemploymentBenefit();
  const minimumWage = getMinimumWage();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🧳 Unemployment Benefit Estimator</h1>
      <ShareButtons />

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        {renderBlocks(asBlocks(content), {
          dailyCapLine: `₩${rates.dailyCap.toLocaleString()}`,
          dailyFloorLine: `₩${Math.round(
            minimumWage.hourly * rates.dailyFloorFormula.hoursPerDay * rates.dailyFloorFormula.minWageRatio,
          ).toLocaleString()}`,
        })}
      </section>

      <Calculator rates={rates} minimumHourlyWage={minimumWage.hourly} />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          More tools:{" "}
          <Link
            href="/en/part-time/resignation-date-comparison"
            className="font-medium text-orange-600 dark:text-orange-400"
          >
            Resignation Date Comparator
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
