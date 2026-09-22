"use client";

import { useState } from "react";
import {
  calculateMilitaryDischargeDate,
  SERVICE_MONTHS,
  type MilitaryBranch,
} from "@/lib/calculators/military-discharge-date";

const branchLabels: Record<MilitaryBranch, string> = {
  army: "Army / Marine Corps",
  navy: "Navy",
  airforce: "Air Force",
  socialService: "Alternative social service",
};

export default function Calculator() {
  const [enlistmentDate, setEnlistmentDate] = useState("");
  const [branch, setBranch] = useState<MilitaryBranch>("army");
  const [asOfDate, setAsOfDate] = useState("");

  const enlistment = enlistmentDate ? new Date(enlistmentDate) : null;
  const asOf = asOfDate ? new Date(asOfDate) : null;

  const blockingErrors: string[] = [];
  if (!enlistment || Number.isNaN(enlistment.getTime())) {
    blockingErrors.push("Please enter an enlistment date.");
  }
  if (!asOf || Number.isNaN(asOf.getTime())) {
    blockingErrors.push("Please enter a reference date (today).");
  }

  const result =
    blockingErrors.length === 0
      ? calculateMilitaryDischargeDate(enlistmentDate, branch, asOfDate)
      : null;

  return (
    <div className="mt-8 rounded-2xl border-2 border-amber-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          Enlistment date
          <input
            type="date"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-amber-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={enlistmentDate}
            onChange={(e) => setEnlistmentDate(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Branch
          <select
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-amber-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={branch}
            onChange={(e) => setBranch(e.target.value as MilitaryBranch)}
          >
            {Object.entries(branchLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label} ({SERVICE_MONTHS[value as MilitaryBranch]} months)
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm sm:col-span-2">
          Reference date (today)
          <input
            type="date"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-amber-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={asOfDate}
            onChange={(e) => setAsOfDate(e.target.value)}
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
        <div className="mt-6 space-y-3 border-t-2 border-amber-100 pt-6 dark:border-white/10">
          <p className="text-sm text-zinc-500">Discharge date</p>
          <p className="text-3xl font-bold">{result.dischargeDate}</p>
          <ul className="mt-2 space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>
              {result.daysRemaining >= 0
                ? `${result.daysRemaining} days until discharge`
                : `${Math.abs(result.daysRemaining)} days since discharge`}
            </li>
            <li>Service progress: {result.progressPercent}%</li>
          </ul>
          <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
            <div
              className="h-full bg-amber-500 dark:bg-amber-400"
              style={{ width: `${Math.min(result.progressPercent, 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
