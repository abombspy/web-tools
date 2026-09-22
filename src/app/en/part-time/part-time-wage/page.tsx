import type { Metadata } from "next";
import Link from "next/link";
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
        <h2>What does this calculate?</h2>
        <p>
          Enter your hourly wage and this month&rsquo;s hours (base, overtime, night, holiday) to
          get your gross pay including the premiums required by{" "}
          <strong>Article 56 of the Labor Standards Act</strong>, then the amount after National
          Pension, Health Insurance, and Employment Insurance (the &ldquo;4 insurances&rdquo;)
          deductions.
        </p>
        <p className="rounded-md bg-blue-50 p-4 text-sm not-prose dark:bg-blue-950/40">
          This calculator <strong>does not include weekly holiday pay.</strong> Calculate that
          separately with the{" "}
          <Link href="/en/part-time/weekly-holiday-pay">Weekly Holiday Pay Calculator</Link> and
          add it on top.
        </p>

        <h2>Premiums (overtime, night, holiday)</h2>
        <ul>
          <li>Overtime, night work (10 PM–6 AM), and the first 8 hours of holiday work: +50% of ordinary wage</li>
          <li>Holiday work beyond 8 hours in a day: +100% of ordinary wage</li>
          <li>
            <strong>These premium rules don&rsquo;t apply to workplaces with fewer than 5
            regular employees</strong> (Enforcement Decree of the Labor Standards Act, Schedule
            1). Since many small workplaces — convenience stores, cafes — fall into this
            category, this calculator asks for workplace size and reflects it.
          </li>
        </ul>

        <h2>4-insurance deductions</h2>
        <p>
          Part-time employees whose scheduled monthly hours are under{" "}
          <strong>{socialInsurance.monthlyHoursExemptionThreshold} hours</strong> are, in
          principle, exempt from National Pension, Health Insurance, and Employment Insurance
          (Industrial Accident Insurance applies regardless, fully employer-paid). There are
          additional exceptions — working 8+ days a month, earning ₩2.2M+ monthly, or 3+ months
          of continuous work — that this calculator doesn&rsquo;t account for, so check with the
          National Pension Service or National Health Insurance Service if your case is
          borderline.
        </p>
        <p>
          When applicable, the employee&rsquo;s share is National Pension{" "}
          {(socialInsurance.nationalPension.employeeRate * 100).toFixed(2)}%, Health Insurance{" "}
          {(socialInsurance.healthInsurance.employeeRate * 100).toFixed(3)}% + Long-Term Care
          Insurance ({(socialInsurance.healthInsurance.longTermCareRateOfHealthPremium * 100).toFixed(2)}%
          of the health premium), and Employment Insurance{" "}
          {(socialInsurance.employmentInsurance.employeeRate * 100).toFixed(1)}%.
        </p>

        <h2>Income tax withholding</h2>
        <p>
          If your monthly pay is under{" "}
          <strong>₩{incomeTaxWithholding.singleHouseholdZeroTaxMonthlyThreshold.toLocaleString()}</strong>{" "}
          (single filer, no dependents), withheld income tax is ₩0. Above that, the exact amount
          follows the National Tax Service&rsquo;s <strong>Simplified Tax Withholding
          Table</strong>, a large table that varies by pay level and number of dependents — this
          calculator doesn&rsquo;t compute that exact tax and only shows the amount after
          4-insurance deductions.
        </p>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          This is a reference-only mock calculation. This English page is a translation of the
          original Korean tool; your actual pay depends on your labor contract, your company&rsquo;s
          pay rules, and the exact tax owed.
        </p>
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
