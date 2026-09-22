"use client";

import { useState } from "react";
import { calculateBusinessDays, type Holiday } from "@/lib/calculators/business-days";

export default function Calculator({ holidays, coveredYear }: { holidays: Holiday[]; coveredYear: number }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;

  const blockingErrors: string[] = [];
  if (!start || Number.isNaN(start.getTime())) {
    blockingErrors.push("Please enter a start date.");
  }
  if (!end || Number.isNaN(end.getTime())) {
    blockingErrors.push("Please enter an end date.");
  }
  if (start && end && !Number.isNaN(start.getTime()) && !Number.isNaN(end.getTime()) && end.getTime() < start.getTime()) {
    blockingErrors.push("The end date is earlier than the start date.");
  }

  const outOfCoverage =
    (start && start.getUTCFullYear() !== coveredYear) || (end && end.getUTCFullYear() !== coveredYear);

  const result = blockingErrors.length === 0 ? calculateBusinessDays(startDate, endDate, holidays) : null;

  return (
    <div className="mt-8 rounded-2xl border-2 border-amber-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          Start date
          <input
            type="date"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-amber-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          End date
          <input
            type="date"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-amber-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
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

      {outOfCoverage && (
        <p className="mt-4 text-sm text-amber-600 dark:text-amber-400">
          This calculator only has holiday data for {coveredYear}. For a range that falls in
          another year, holidays for that year aren&rsquo;t counted — only weekends are excluded.
        </p>
      )}

      {result && (
        <div className="mt-6 space-y-3 border-t-2 border-amber-100 pt-6 dark:border-white/10">
          <p className="text-sm text-zinc-500">Business days</p>
          <p className="text-3xl font-bold">{result.businessDays}</p>
          <ul className="mt-2 space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Total days: {result.totalDays}</li>
            <li>Weekend days: {result.weekendDays}</li>
            <li>Holidays (on weekdays): {result.holidayDays}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
