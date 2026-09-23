import type { Metadata } from "next";
import Link from "next/link";
import content from "@content/tools/en/part-time/part-time-wage.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import {
  getIncomeTaxWithholding,
  getMinimumWage,
  getOvertimePremium,
  getSocialInsurance,
} from "@/lib/rates";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Part-Time Wage Calculator",
  description: "Enter your hourly wage and this month's hours to estimate gross pay with overtime/night/holiday premiums and 4-insurance deductions.",
};

export default function PartTimeWagePageEn() {
  const minimumWage = getMinimumWage();
  const overtimePremium = getOvertimePremium();
  const socialInsurance = getSocialInsurance();
  const incomeTaxWithholding = getIncomeTaxWithholding();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">💰 Part-Time Wage Calculator</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        {renderBlocks(asBlocks(content), {
          monthlyHoursThreshold: `${socialInsurance.monthlyHoursExemptionThreshold} hours`,
          nationalPensionRate: `${(socialInsurance.nationalPension.employeeRate * 100).toFixed(2)}%`,
          healthInsuranceRate: `${(socialInsurance.healthInsurance.employeeRate * 100).toFixed(3)}%`,
          longTermCareRate: `${(socialInsurance.healthInsurance.longTermCareRateOfHealthPremium * 100).toFixed(2)}%`,
          employmentInsuranceRate: `${(socialInsurance.employmentInsurance.employeeRate * 100).toFixed(1)}%`,
          incomeTaxThreshold: `₩${incomeTaxWithholding.singleHouseholdZeroTaxMonthlyThreshold.toLocaleString()}`,
        })}
      </section>

      <Calculator
        minimumWage={minimumWage.hourly}
        rates={{ overtimePremium, socialInsurance, incomeTaxWithholding }}
      />

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
