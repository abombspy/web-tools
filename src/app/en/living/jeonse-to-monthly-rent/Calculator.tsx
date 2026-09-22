"use client";

import { useState } from "react";
import { calculateJeonseToMonthlyRent } from "@/lib/calculators/jeonse-to-monthly-rent";

export default function Calculator() {
  const [jeonseDeposit, setJeonseDeposit] = useState("300000000");
  const [newDeposit, setNewDeposit] = useState("100000000");
  const [baseRatePercent, setBaseRatePercent] = useState("2.75");
  const [appliedRatePercent, setAppliedRatePercent] = useState("4.75");

  const jeonseDepositNum = Number(jeonseDeposit);
  const newDepositNum = Number(newDeposit);
  const baseRateNum = Number(baseRatePercent);
  const appliedRateNum = Number(appliedRatePercent);

  const blockingErrors: string[] = [];
  if (!Number.isFinite(jeonseDepositNum) || jeonseDepositNum < 0) {
    blockingErrors.push("Please enter a jeonse deposit of 0 or more.");
  }
  if (!Number.isFinite(newDepositNum) || newDepositNum < 0) {
    blockingErrors.push("Please enter a post-conversion deposit of 0 or more.");
  }
  if (newDepositNum > jeonseDepositNum) {
    blockingErrors.push("The post-conversion deposit can't be larger than the original jeonse deposit.");
  }
  if (!Number.isFinite(baseRateNum) || baseRateNum < 0) {
    blockingErrors.push("Please enter a base rate of 0 or more.");
  }
  if (!Number.isFinite(appliedRateNum) || appliedRateNum < 0) {
    blockingErrors.push("Please enter an applied conversion rate of 0 or more.");
  }

  const result =
    blockingErrors.length === 0
      ? calculateJeonseToMonthlyRent({
          jeonseDeposit: jeonseDepositNum,
          newDeposit: newDepositNum,
          baseRatePercent: baseRateNum,
          appliedRatePercent: appliedRateNum,
        })
      : null;

  return (
    <div className="mt-8 rounded-2xl border-2 border-sky-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          Original jeonse deposit (₩)
          <input
            type="number"
            inputMode="numeric"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-sky-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={jeonseDeposit}
            onChange={(e) => setJeonseDeposit(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Deposit after conversion (₩)
          <input
            type="number"
            inputMode="numeric"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-sky-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={newDeposit}
            onChange={(e) => setNewDeposit(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Bank of Korea base rate (%)
          <input
            type="number"
            inputMode="decimal"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-sky-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={baseRatePercent}
            onChange={(e) => setBaseRatePercent(e.target.value)}
            min={0}
          />
          <span className="text-xs text-zinc-500">
            Check the current rate on the Bank of Korea website (it changes periodically).
          </span>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Actual conversion rate to apply (%)
          <input
            type="number"
            inputMode="decimal"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-sky-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={appliedRatePercent}
            onChange={(e) => setAppliedRatePercent(e.target.value)}
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
        <div className="mt-6 space-y-3 border-t-2 border-sky-100 pt-6 dark:border-white/10">
          <p className="text-sm text-zinc-500">Monthly rent at the applied rate</p>
          <p className="text-3xl font-bold">₩{result.appliedMonthlyRent.toLocaleString()}</p>
          <ul className="mt-2 space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Converted amount: ₩{result.convertedAmount.toLocaleString()}</li>
            <li>
              Legal max conversion rate: {result.legalMaxRatePercent}%/yr (legal max monthly
              rent: ₩{result.legalMaxMonthlyRent.toLocaleString()})
            </li>
          </ul>
          {result.exceedsLegalMax && (
            <p className="text-sm font-medium text-red-600 dark:text-red-400">
              The applied conversion rate you entered ({appliedRateNum}%) exceeds the legal
              maximum ({result.legalMaxRatePercent}%). The tenant can demand the excess back.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
