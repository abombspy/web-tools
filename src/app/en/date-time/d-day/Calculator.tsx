"use client";

import { useState } from "react";
import ResultShareCard from "@/components/ResultShareCard";
import { calculateDDay } from "@/lib/calculators/d-day";

export default function Calculator() {
  const [targetDate, setTargetDate] = useState("");
  const [asOfDate, setAsOfDate] = useState("");

  const target = targetDate ? new Date(targetDate) : null;
  const asOf = asOfDate ? new Date(asOfDate) : null;

  const blockingErrors: string[] = [];
  if (!target || Number.isNaN(target.getTime())) {
    blockingErrors.push("Please enter a target date.");
  }
  if (!asOf || Number.isNaN(asOf.getTime())) {
    blockingErrors.push("Please enter a reference date (today).");
  }

  const result = blockingErrors.length === 0 ? calculateDDay(targetDate, asOfDate) : null;

  return (
    <div className="mt-8 rounded-2xl border-2 border-amber-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          Target date (anniversary, exam, etc.)
          <input
            type="date"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-amber-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
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
        <div className="mt-6 border-t-2 border-amber-100 pt-6 dark:border-white/10">
          <p className="text-sm text-zinc-500">
            {result.isToday ? "Today is the day" : result.isPast ? "Days since" : "Days until"}
          </p>
          <p className="text-3xl font-bold">
            {result.isToday ? "D-DAY" : `D${result.isPast ? "+" : "-"}${Math.abs(result.daysDiff)}`}
          </p>
          <div className="mt-4 flex justify-center">
            <ResultShareCard
              toolName="D-day & Anniversary Calculator"
              headline={result.isToday ? "D-DAY" : `D${result.isPast ? "+" : "-"}${Math.abs(result.daysDiff)}`}
              lines={[`Target date: ${targetDate}`]}
              accentColor="#f59e0b"
            />
          </div>
        </div>
      )}
    </div>
  );
}
