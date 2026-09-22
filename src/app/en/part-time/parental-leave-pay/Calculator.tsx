"use client";

import { useState } from "react";
import {
  calculateParentalLeavePay,
  type ParentalLeavePayRates,
} from "@/lib/calculators/parental-leave-pay";

const MAX_MONTHS = 12;

export default function Calculator({ rates }: { rates: ParentalLeavePayRates }) {
  const [monthlyWage, setMonthlyWage] = useState("3000000");
  const [durationMonths, setDurationMonths] = useState("12");

  const monthlyWageNum = Number(monthlyWage);
  const durationMonthsNum = Number(durationMonths);

  const blockingErrors: string[] = [];
  if (!Number.isFinite(monthlyWageNum) || monthlyWageNum <= 0) {
    blockingErrors.push("Please enter a monthly ordinary wage greater than 0.");
  }
  if (
    !Number.isInteger(durationMonthsNum) ||
    durationMonthsNum <= 0 ||
    durationMonthsNum > MAX_MONTHS
  ) {
    blockingErrors.push(`Please enter a whole number of months between 1 and ${MAX_MONTHS}.`);
  }

  const result =
    blockingErrors.length === 0
      ? calculateParentalLeavePay(
          { monthlyWage: monthlyWageNum, durationMonths: durationMonthsNum },
          rates,
        )
      : null;

  return (
    <div className="mt-8 rounded-2xl border-2 border-orange-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
          Months of parental leave taken (1–12)
          <input
            type="number"
            inputMode="numeric"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={durationMonths}
            onChange={(e) => setDurationMonths(e.target.value)}
            min={1}
            max={MAX_MONTHS}
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

      {result && (
        <div className="mt-6 border-t-2 border-orange-100 pt-6 dark:border-white/10">
          <p className="text-sm text-zinc-500">Total estimated payout</p>
          <p className="text-3xl font-bold">₩{result.total.toLocaleString()}</p>

          <table className="mt-4 w-full text-left text-sm">
            <thead>
              <tr className="border-b border-black/10 text-zinc-500 dark:border-white/10">
                <th className="py-1 pr-2">Month</th>
                <th className="py-1 pr-2">Rate</th>
                <th className="py-1">Monthly payout</th>
              </tr>
            </thead>
            <tbody>
              {result.monthly.map((m) => (
                <tr key={m.month} className="border-b border-black/5 dark:border-white/5">
                  <td className="py-1 pr-2">Month {m.month}</td>
                  <td className="py-1 pr-2">{Math.round(m.rate * 100)}%</td>
                  <td className="py-1">₩{m.pay.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
