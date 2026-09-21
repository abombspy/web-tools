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
    blockingErrors.push("시작일을 입력해 주세요.");
  }
  if (!end || Number.isNaN(end.getTime())) {
    blockingErrors.push("종료일을 입력해 주세요.");
  }
  if (start && end && !Number.isNaN(start.getTime()) && !Number.isNaN(end.getTime()) && end.getTime() < start.getTime()) {
    blockingErrors.push("종료일이 시작일보다 빠릅니다.");
  }

  const outOfCoverage =
    (start && start.getUTCFullYear() !== coveredYear) || (end && end.getUTCFullYear() !== coveredYear);

  const result = blockingErrors.length === 0 ? calculateBusinessDays(startDate, endDate, holidays) : null;

  return (
    <div className="mt-8 rounded-2xl border-2 border-amber-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          시작일
          <input
            type="date"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-amber-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          종료일
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
          이 계산기는 {coveredYear}년 공휴일 데이터만 가지고 있습니다. 범위가 다른 해로
          넘어가면 그 해의 공휴일은 반영되지 않고 주말만 제외됩니다.
        </p>
      )}

      {result && (
        <div className="mt-6 space-y-3 border-t-2 border-amber-100 pt-6 dark:border-white/10">
          <p className="text-sm text-zinc-500">근무일수(영업일)</p>
          <p className="text-3xl font-bold">{result.businessDays}일</p>
          <ul className="mt-2 space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>전체 일수: {result.totalDays}일</li>
            <li>주말: {result.weekendDays}일</li>
            <li>공휴일(평일 중): {result.holidayDays}일</li>
          </ul>
        </div>
      )}
    </div>
  );
}
