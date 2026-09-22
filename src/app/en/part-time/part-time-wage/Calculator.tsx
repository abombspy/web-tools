"use client";

import { useState } from "react";
import {
  calculatePartTimeWage,
  type PartTimeWageRates,
} from "@/lib/calculators/part-time-wage";

type Props = {
  minimumWage: number;
  rates: PartTimeWageRates;
};

const MAX_MONTHLY_HOURS = 744; // 31 days × 24 hours, a physical upper bound

function useHourField(initial: string) {
  const [value, setValue] = useState(initial);
  const num = Number(value);
  return { value, setValue, num };
}

export default function Calculator({ minimumWage, rates }: Props) {
  const [hourlyWage, setHourlyWage] = useState("10320");
  const base = useHourField("80");
  const overtime = useHourField("0");
  const night = useHourField("0");
  const holidayNormal = useHourField("0");
  const holidayExcess = useHourField("0");
  const [isFivePlusEmployees, setIsFivePlusEmployees] = useState(true);

  const hourlyWageNum = Number(hourlyWage);
  const hourFields = [base, overtime, night, holidayNormal, holidayExcess];
  const totalHours = hourFields.reduce((sum, f) => sum + (Number.isFinite(f.num) ? f.num : 0), 0);

  const blockingErrors: string[] = [];
  if (!Number.isFinite(hourlyWageNum) || hourlyWageNum <= 0) {
    blockingErrors.push("Please enter an hourly wage greater than 0.");
  }
  if (hourFields.some((f) => !Number.isFinite(f.num) || f.num < 0)) {
    blockingErrors.push("Please enter hours as 0 or more.");
  }
  if (totalHours > MAX_MONTHLY_HOURS) {
    blockingErrors.push(`Total monthly hours can't exceed ${MAX_MONTHLY_HOURS} (a full 31 days).`);
  }

  const warnings: string[] = [];
  if (hourlyWageNum > 0 && hourlyWageNum < minimumWage) {
    warnings.push(
      `The hourly wage you entered (₩${hourlyWageNum.toLocaleString()}) is below the minimum wage (₩${minimumWage.toLocaleString()}). The calculation still runs on your input.`,
    );
  }

  const result =
    blockingErrors.length === 0
      ? calculatePartTimeWage(
          {
            hourlyWage: hourlyWageNum,
            baseHours: base.num,
            overtimeHours: overtime.num,
            nightHours: night.num,
            holidayHoursNormal: holidayNormal.num,
            holidayHoursExcess: holidayExcess.num,
            isFivePlusEmployees,
          },
          rates,
        )
      : null;

  return (
    <div className="mt-8 rounded-2xl border-2 border-orange-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          Hourly wage (₩)
          <input
            type="number"
            inputMode="numeric"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={hourlyWage}
            onChange={(e) => setHourlyWage(e.target.value)}
            min={0}
          />
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isFivePlusEmployees}
            onChange={(e) => setIsFivePlusEmployees(e.target.checked)}
          />
          Workplace has 5 or more regular employees
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Base hours (this month&rsquo;s total)
          <input
            type="number"
            inputMode="numeric"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={base.value}
            onChange={(e) => base.setValue(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Overtime hours (this month&rsquo;s total)
          <input
            type="number"
            inputMode="numeric"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={overtime.value}
            onChange={(e) => overtime.setValue(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Night hours (10 PM–6 AM, this month&rsquo;s total)
          <input
            type="number"
            inputMode="numeric"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={night.value}
            onChange={(e) => night.setValue(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Holiday hours — first 8h/day (this month&rsquo;s total)
          <input
            type="number"
            inputMode="numeric"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={holidayNormal.value}
            onChange={(e) => holidayNormal.setValue(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Holiday hours — beyond 8h/day (this month&rsquo;s total)
          <input
            type="number"
            inputMode="numeric"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={holidayExcess.value}
            onChange={(e) => holidayExcess.setValue(e.target.value)}
            min={0}
          />
          <span className="text-xs text-zinc-500">
            Only enter the portion that went past 8 hours in a single day. Example: 10 hours of
            holiday work in one day → 8h in the first field, 2h here.
          </span>
        </label>
      </div>

      {blockingErrors.length > 0 && (
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-red-600 dark:text-red-400">
          {blockingErrors.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}

      {warnings.length > 0 && (
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-amber-600 dark:text-amber-400">
          {warnings.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      )}

      {result && (
        <div className="mt-6 space-y-6 border-t-2 border-orange-100 pt-6 dark:border-white/10">
          <div>
            <p className="text-sm text-zinc-500">Gross pay (before tax)</p>
            <p className="text-3xl font-bold">₩{result.grossPay.toLocaleString()}</p>
            <ul className="mt-2 space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
              <li>Base pay: ₩{result.breakdown.basePay.toLocaleString()}</li>
              {result.breakdown.overtimePay > 0 && (
                <li>Overtime premium: ₩{result.breakdown.overtimePay.toLocaleString()}</li>
              )}
              {result.breakdown.nightPay > 0 && (
                <li>Night premium: ₩{result.breakdown.nightPay.toLocaleString()}</li>
              )}
              {result.breakdown.holidayNormalPay > 0 && (
                <li>Holiday premium (≤8h): ₩{result.breakdown.holidayNormalPay.toLocaleString()}</li>
              )}
              {result.breakdown.holidayExcessPay > 0 && (
                <li>Holiday premium (&gt;8h): ₩{result.breakdown.holidayExcessPay.toLocaleString()}</li>
              )}
            </ul>
          </div>

          <div>
            <p className="text-sm text-zinc-500">
              4-insurance deduction{" "}
              {!result.socialInsuranceApplicable && "(exempt — under 60 hours/month)"}
            </p>
            <p className="text-xl font-semibold">
              -₩{result.socialInsuranceDeduction.total.toLocaleString()}
            </p>
            {result.socialInsuranceApplicable && (
              <ul className="mt-2 space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
                <li>National Pension: ₩{result.socialInsuranceDeduction.nationalPension.toLocaleString()}</li>
                <li>Health Insurance: ₩{result.socialInsuranceDeduction.healthInsurance.toLocaleString()}</li>
                <li>Long-Term Care Insurance: ₩{result.socialInsuranceDeduction.longTermCare.toLocaleString()}</li>
                <li>Employment Insurance: ₩{result.socialInsuranceDeduction.employmentInsurance.toLocaleString()}</li>
              </ul>
            )}
          </div>

          <div>
            {result.netPay !== null ? (
              <>
                <p className="text-sm text-zinc-500">Estimated take-home (₩0 income-tax bracket)</p>
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                  ₩{result.netPay.toLocaleString()}
                </p>
              </>
            ) : (
              <>
                <p className="text-sm text-zinc-500">Amount after 4-insurance deductions</p>
                <p className="text-2xl font-bold">
                  ₩{result.payAfterSocialInsurance.toLocaleString()}
                </p>
                <p className="mt-2 text-sm text-amber-600 dark:text-amber-400">
                  Your monthly pay is above the ₩0 withholding bracket, so income tax and local
                  income tax will be deducted on top of this. For the exact amount, check the
                  National Tax Service Hometax Simplified Tax Withholding Table — this calculator
                  doesn&rsquo;t compute tax for that bracket.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
