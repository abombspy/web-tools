import type { Metadata } from "next";
import Link from "next/link";
import content from "@content/tools/ko/part-time/unemployment-benefit.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import { getMinimumWage, getUnemploymentBenefit } from "@/lib/rates";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "실업급여 모의 계산기",
  description: "예상 구직급여(실업급여) 수령액과 지급 기간을 계산합니다.",
};

export default function UnemploymentBenefitPage() {
  const rates = getUnemploymentBenefit();
  const minimumWage = getMinimumWage();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🧳 실업급여 모의 계산기</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        {renderBlocks(asBlocks(content), {
          dailyCapLine: `${rates.dailyCap.toLocaleString()}원`,
          dailyFloorLine: `${Math.round(
            minimumWage.hourly * rates.dailyFloorFormula.hoursPerDay * rates.dailyFloorFormula.minWageRatio,
          ).toLocaleString()}원`,
        })}
      </section>

      <Calculator rates={rates} minimumHourlyWage={minimumWage.hourly} />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 계산기:{" "}
          <Link
            href="/part-time/resignation-date-comparison"
            className="font-medium text-orange-600 dark:text-orange-400"
          >
            퇴사 시점 비교 계산기
          </Link>{" "}
          ·{" "}
          <Link href="/part-time" className="font-medium text-orange-600 dark:text-orange-400">
            알바·직장인 계산기 모음
          </Link>
        </p>
      </section>
    </div>
  );
}
