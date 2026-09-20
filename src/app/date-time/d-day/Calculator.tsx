"use client";

import { useState } from "react";
import { calculateDDay } from "@/lib/calculators/d-day";

export default function Calculator() {
  const [targetDate, setTargetDate] = useState("");
  const [asOfDate, setAsOfDate] = useState("");

  const target = targetDate ? new Date(targetDate) : null;
  const asOf = asOfDate ? new Date(asOfDate) : null;

  const blockingErrors: string[] = [];
  if (!target || Number.isNaN(target.getTime())) {
    blockingErrors.push("목표 날짜(기념일 등)를 입력해 주세요.");
  }
  if (!asOf || Number.isNaN(asOf.getTime())) {
    blockingErrors.push("기준일(오늘 날짜)을 입력해 주세요.");
  }

  const result = blockingErrors.length === 0 ? calculateDDay(targetDate, asOfDate) : null;

  return (
    <div className="mt-8 rounded-lg border border-black/10 p-6 dark:border-white/10">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          목표 날짜 (기념일, 시험일 등)
          <input
            type="date"
            className="rounded border border-black/20 px-3 py-2 dark:border-white/20 dark:bg-transparent"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          기준일 (오늘 날짜)
          <input
            type="date"
            className="rounded border border-black/20 px-3 py-2 dark:border-white/20 dark:bg-transparent"
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
        <div className="mt-6 border-t border-black/10 pt-6 dark:border-white/10">
          <p className="text-sm text-zinc-500">
            {result.isToday ? "오늘이 바로 그 날입니다" : result.isPast ? "지난 지" : "앞으로"}
          </p>
          <p className="text-3xl font-bold">
            {result.isToday ? "D-DAY" : `D${result.isPast ? "+" : "-"}${Math.abs(result.daysDiff)}`}
          </p>
        </div>
      )}
    </div>
  );
}
