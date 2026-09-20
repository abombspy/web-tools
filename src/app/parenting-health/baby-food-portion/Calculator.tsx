"use client";

import { useState } from "react";
import { findBabyFoodStage } from "@/lib/calculators/baby-food-portion";
import { fullMonthsBetween } from "@/lib/calculators/date-utils";

export default function Calculator() {
  const [birthDate, setBirthDate] = useState("");
  const [asOfDate, setAsOfDate] = useState("");

  const birth = birthDate ? new Date(birthDate) : null;
  const asOf = asOfDate ? new Date(asOfDate) : null;

  const blockingErrors: string[] = [];
  if (!birth || Number.isNaN(birth.getTime())) {
    blockingErrors.push("아기 생년월일을 입력해 주세요.");
  }
  if (!asOf || Number.isNaN(asOf.getTime())) {
    blockingErrors.push("기준일(오늘 날짜)을 입력해 주세요.");
  }
  if (birth && asOf && !Number.isNaN(birth.getTime()) && !Number.isNaN(asOf.getTime()) && asOf.getTime() < birth.getTime()) {
    blockingErrors.push("기준일이 생년월일보다 빠릅니다.");
  }

  const ageMonths = birth && asOf ? fullMonthsBetween(birth, asOf) : null;
  const stage = ageMonths !== null && blockingErrors.length === 0 ? findBabyFoodStage(ageMonths) : null;

  return (
    <div className="mt-8 rounded-lg border border-black/10 p-6 dark:border-white/10">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          아기 생년월일
          <input
            type="date"
            className="rounded border border-black/20 px-3 py-2 dark:border-white/20 dark:bg-transparent"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
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

      {stage && ageMonths !== null && (
        <div className="mt-6 space-y-3 border-t border-black/10 pt-6 dark:border-white/10">
          <p className="text-sm text-zinc-500">현재 {ageMonths}개월 → 해당 단계</p>
          <p className="text-3xl font-bold">{stage.name}</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{stage.description}</p>
          <ul className="mt-2 space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>하루 급여 횟수: {stage.mealsPerDay}</li>
            <li>1회 급여량: {stage.portionPerMealG}</li>
            <li>하루 총량: {stage.dailyTotalG}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
