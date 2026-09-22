"use client";

import { useState } from "react";
import { calculateAnnualLeavePay } from "@/lib/calculators/annual-leave-pay";

export default function Calculator() {
  const [hireDate, setHireDate] = useState("");
  const [asOfDate, setAsOfDate] = useState("");
  const [monthlyWage, setMonthlyWage] = useState("2500000");
  const [usedDays, setUsedDays] = useState("0");

  const monthlyWageNum = Number(monthlyWage);
  const usedDaysNum = Number(usedDays);
  const hire = hireDate ? new Date(hireDate) : null;
  const asOf = asOfDate ? new Date(asOfDate) : null;

  const blockingErrors: string[] = [];
  if (!hire || Number.isNaN(hire.getTime())) {
    blockingErrors.push("Please enter your hire date.");
  }
  if (!asOf || Number.isNaN(asOf.getTime())) {
    blockingErrors.push("Please enter the as-of date (when you're settling leave).");
  }
  if (hire && asOf && !Number.isNaN(hire.getTime()) && !Number.isNaN(asOf.getTime()) && asOf.getTime() < hire.getTime()) {
    blockingErrors.push("The as-of date is before your hire date.");
  }
  if (!Number.isFinite(monthlyWageNum) || monthlyWageNum <= 0) {
    blockingErrors.push("Please enter a monthly ordinary wage greater than 0.");
  }
  if (!Number.isFinite(usedDaysNum) || usedDaysNum < 0) {
    blockingErrors.push("Please enter days already used as 0 or more.");
  }

  const result =
    blockingErrors.length === 0
      ? calculateAnnualLeavePay({
          hireDate,
          asOfDate,
          monthlyWage: monthlyWageNum,
          usedDays: usedDaysNum,
        })
      : null;

  const usedMoreThanAccrued = result !== null && usedDaysNum > result.accruedDays;

  return (
    <div className="mt-8 rounded-2xl border-2 border-orange-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          Hire date
          <input
            type="date"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={hireDate}
            onChange={(e) => setHireDate(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          As-of date (settlement date)
          <input
            type="date"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={asOfDate}
            onChange={(e) => setAsOfDate(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Monthly ordinary wage (before tax, ₩)
          <input
            type="number"
            inputMode="numeric"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={monthlyWage}
            onChange={(e) => setMonthlyWage(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Days of leave already used
          <input
            type="number"
            inputMode="decimal"
            step="0.5"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={usedDays}
            onChange={(e) => setUsedDays(e.target.value)}
            min={0}
          />
        </label>
      </div>

      {blockingErrors.length > 0 && (
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-red-600 dark:text-red-400">
          {blockingErrors.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}

      {usedMoreThanAccrued && (
        <p className="mt-4 text-sm text-amber-600 dark:text-amber-400">
          The days used you entered ({usedDaysNum}) are more than the accrued days (
          {result?.accruedDays}), so unused leave was calculated as 0 days.
        </p>
      )}

      {result && (
        <div className="mt-6 space-y-3 border-t-2 border-orange-100 pt-6 dark:border-white/10">
          <p className="text-sm text-zinc-500">Estimated annual leave payout</p>
          <p className="text-3xl font-bold">₩{result.annualLeavePay.toLocaleString()}</p>
          <ul className="mt-2 space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Accrued leave: {result.accruedDays} days</li>
            <li>Unused leave: {result.unusedDays} days</li>
            <li>1 day&rsquo;s ordinary wage: ₩{result.dailyWage.toLocaleString()}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
