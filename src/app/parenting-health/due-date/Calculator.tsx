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
    blockingErrors.push("마지막 생리 시작일을 입력해 주세요.");
  }
  if (!asOf || Number.isNaN(asOf.getTime())) {
    blockingErrors.push("기준일(오늘 날짜 등)을 입력해 주세요.");
  }
  if (lmp && asOf && !Number.isNaN(lmp.getTime()) && !Number.isNaN(asOf.getTime()) && asOf.getTime() < lmp.getTime()) {
    blockingErrors.push("기준일이 마지막 생리 시작일보다 빠릅니다.");
  }

  const result =
    blockingErrors.length === 0 ? calculateDueDate(lastPeriodDate, asOfDate) : null;

  return (
    <div className="mt-8 rounded-2xl border-2 border-emerald-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          마지막 생리 시작일
          <input
            type="date"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-emerald-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={lastPeriodDate}
            onChange={(e) => setLastPeriodDate(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          기준일 (오늘 날짜)
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
          <p className="text-sm text-zinc-500">출산 예정일</p>
          <p className="text-3xl font-bold">{result.dueDate}</p>
          <ul className="mt-2 space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>
              현재 임신 주수: {result.gestationalWeeks}주 {result.gestationalDays}일
            </li>
            <li>
              {result.daysUntilDue >= 0
                ? `예정일까지 ${result.daysUntilDue}일`
                : `예정일이 ${Math.abs(result.daysUntilDue)}일 지났습니다`}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
