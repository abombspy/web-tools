import type { Metadata } from "next";
import Link from "next/link";
import content from "@content/tools/ko/part-time/part-time-wage.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import {
  getIncomeTaxWithholding,
  getMinimumWage,
  getOvertimePremium,
  getSocialInsurance,
} from "@/lib/rates";
import Calculator from "./Calculator";
import ShareButtons from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "알바 월급 계산기",
  description: "시급과 이번 달 근무시간을 입력하면 야간·연장·휴일수당과 4대보험 공제까지 반영한 예상 급여를 계산합니다.",
};

export default function PartTimeWagePage() {
  const minimumWage = getMinimumWage();
  const overtimePremium = getOvertimePremium();
  const socialInsurance = getSocialInsurance();
  const incomeTaxWithholding = getIncomeTaxWithholding();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">💰 알바 월급 계산기</h1>
      <ShareButtons />

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        {renderBlocks(asBlocks(content), {
          monthlyHoursThresholdLine: `${socialInsurance.monthlyHoursExemptionThreshold}시간 미만`,
          nationalPensionRate: `${(socialInsurance.nationalPension.employeeRate * 100).toFixed(2)}%`,
          healthInsuranceRate: `${(socialInsurance.healthInsurance.employeeRate * 100).toFixed(3)}%`,
          longTermCareRate: `${(socialInsurance.healthInsurance.longTermCareRateOfHealthPremium * 100).toFixed(2)}%`,
          employmentInsuranceRate: `${(socialInsurance.employmentInsurance.employeeRate * 100).toFixed(1)}%`,
          incomeTaxThresholdLine: `${incomeTaxWithholding.singleHouseholdZeroTaxMonthlyThreshold.toLocaleString()}원 미만`,
        })}
      </section>

      <Calculator
        minimumWage={minimumWage.hourly}
        rates={{ overtimePremium, socialInsurance, incomeTaxWithholding }}
      />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 계산기:{" "}
          <Link href="/part-time/weekly-holiday-pay" className="font-medium text-orange-600 dark:text-orange-400">
            주휴수당 계산기
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
