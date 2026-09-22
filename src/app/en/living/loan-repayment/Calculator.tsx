"use client";

import { useState } from "react";
import { calculateLoanRepayment } from "@/lib/calculators/loan-repayment";

export default function Calculator() {
  const [principal, setPrincipal] = useState("100000000");
  const [annualRatePercent, setAnnualRatePercent] = useState("4.5");
  const [years, setYears] = useState("30");

  const principalNum = Number(principal);
  const annualRateNum = Number(annualRatePercent);
  const yearsNum = Number(years);
  const monthsNum = Math.round(yearsNum * 12);

  const blockingErrors: string[] = [];
  if (!Number.isFinite(principalNum) || principalNum <= 0) {
    blockingErrors.push("Please enter a loan amount greater than 0.");
  }
  if (!Number.isFinite(annualRateNum) || annualRateNum < 0) {
    blockingErrors.push("Please enter an annual rate of 0 or more.");
  }
  if (!Number.isFinite(yearsNum) || yearsNum <= 0 || monthsNum > 600) {
    blockingErrors.push("Please enter a loan term between 0 and 50 years (600 months).");
  }

  const result =
    blockingErrors.length === 0
      ? calculateLoanRepayment({
          principal: principalNum,
          annualRatePercent: annualRateNum,
          months: monthsNum,
        })
      : null;

  return (
    <div className="mt-8 rounded-2xl border-2 border-sky-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-sm">
          Loan amount
          <input
            type="number"
            inputMode="numeric"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-sky-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Annual interest rate (%)
          <input
            type="number"
            inputMode="decimal"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-sky-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={annualRatePercent}
            onChange={(e) => setAnnualRatePercent(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Loan term (years)
          <input
            type="number"
            inputMode="decimal"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-sky-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={years}
            onChange={(e) => setYears(e.target.value)}
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

      {result && (
        <div className="mt-6 grid grid-cols-1 gap-6 border-t-2 border-sky-100 pt-6 sm:grid-cols-2 dark:border-white/10">
          <div>
            <p className="text-sm font-semibold">Equal payment</p>
            <p className="mt-1 text-xs text-zinc-500">Same total payment every month</p>
            <p className="mt-2 text-2xl font-bold">
              ₩{result.equalPayment.schedule[0].payment.toLocaleString()}
              <span className="text-sm font-normal text-zinc-500"> /month</span>
            </p>
            <ul className="mt-2 space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
              <li>Total repaid: ₩{result.equalPayment.totalPayment.toLocaleString()}</li>
              <li>Total interest: ₩{result.equalPayment.totalInterest.toLocaleString()}</li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold">Equal principal</p>
            <p className="mt-1 text-xs text-zinc-500">Same principal each month, interest decreases</p>
            <p className="mt-2 text-2xl font-bold">
              ₩{result.equalPrincipal.schedule[0].payment.toLocaleString()}
              <span className="text-sm font-normal text-zinc-500"> /month (first month)</span>
            </p>
            <ul className="mt-2 space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                Last month: ₩{result.equalPrincipal.schedule.at(-1)?.payment.toLocaleString()}
              </li>
              <li>Total repaid: ₩{result.equalPrincipal.totalPayment.toLocaleString()}</li>
              <li>Total interest: ₩{result.equalPrincipal.totalInterest.toLocaleString()}</li>
            </ul>
          </div>
          <p className="text-sm text-zinc-600 sm:col-span-2 dark:text-zinc-400">
            Equal principal saves ₩
            {(result.equalPayment.totalInterest - result.equalPrincipal.totalInterest).toLocaleString()}{" "}
            in total interest, but the first payment (₩
            {result.equalPrincipal.schedule[0].payment.toLocaleString()}) is higher than with equal
            payment.
          </p>
        </div>
      )}
    </div>
  );
}
