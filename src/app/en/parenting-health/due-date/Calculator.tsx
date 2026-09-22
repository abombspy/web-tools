"use client";

import { useState } from "react";
import { calculateDueDate } from "@/lib/calculators/due-date";

export default function Calculator() {
  const [lastPeriodDate, setLastPeriodDate] = useState("");
  const [asOfDate, setAsOfDate] = useState("");

  const lmp = lastPeriodDate ? new Date(lastPeriodDate) : null;
  const asOf = asOfDate ? new Date(asOfDate) : null;

  const blockingErrors: string[] = [];
  if (!lmp || Number.isNaN(lmp.getTime())) {
    blockingErrors.push("Please enter the first day of your last period.");
  }
  if (!asOf || Number.isNaN(asOf.getTime())) {
    blockingErrors.push("Please enter a reference date (today).");
  }
  if (lmp && asOf && !Number.isNaN(lmp.getTime()) && !Number.isNaN(asOf.getTime()) && asOf.getTime() < lmp.getTime()) {
    blockingErrors.push("The reference date is earlier than the last period date.");
  }

  const result =
    blockingErrors.length === 0 ? calculateDueDate(lastPeriodDate, asOfDate) : null;

  return (
    <div className="mt-8 rounded-2xl border-2 border-emerald-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          First day of last period
          <input
            type="date"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-emerald-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={lastPeriodDate}
            onChange={(e) => setLastPeriodDate(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Reference date (today)
          <input
            type="date"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-emerald-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
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
        <div className="mt-6 space-y-3 border-t-2 border-emerald-100 pt-6 dark:border-white/10">
          <p className="text-sm text-zinc-500">Estimated due date</p>
          <p className="text-3xl font-bold">{result.dueDate}</p>
          <ul className="mt-2 space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>
              Current gestational age: {result.gestationalWeeks}w {result.gestationalDays}d
            </li>
            <li>
              {result.daysUntilDue >= 0
                ? `${result.daysUntilDue} days until the due date`
                : `${Math.abs(result.daysUntilDue)} days past the due date`}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
