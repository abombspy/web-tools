"use client";

import { useState } from "react";
import { calculateAgeZodiac } from "@/lib/calculators/age-zodiac";

export default function Calculator() {
  const [birthDate, setBirthDate] = useState("");
  const [asOfDate, setAsOfDate] = useState("");

  const birth = birthDate ? new Date(birthDate) : null;
  const asOf = asOfDate ? new Date(asOfDate) : null;

  const blockingErrors: string[] = [];
  if (!birth || Number.isNaN(birth.getTime())) {
    blockingErrors.push("생년월일을 입력해 주세요.");
  }
  if (!asOf || Number.isNaN(asOf.getTime())) {
    blockingErrors.push("기준일(오늘 날짜)을 입력해 주세요.");
  }
  if (birth && asOf && !Number.isNaN(birth.getTime()) && !Number.isNaN(asOf.getTime()) && asOf.getTime() < birth.getTime()) {
    blockingErrors.push("기준일이 생년월일보다 빠릅니다.");
  }

  const result = blockingErrors.length === 0 ? calculateAgeZodiac(birthDate, asOfDate) : null;

  return (
    <div className="mt-8 rounded-2xl border-2 border-amber-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          생년월일
          <input
            type="date"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-amber-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          기준일 (오늘 날짜)
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
        <div className="mt-6 grid grid-cols-3 gap-4 border-t-2 border-amber-100 pt-6 dark:border-white/10">
          <div>
            <p className="text-sm text-zinc-500">만 나이</p>
            <p className="text-2xl font-bold">{result.internationalAge}세</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">띠</p>
            <p className="text-2xl font-bold">{result.koreanZodiac}띠</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">별자리</p>
            <p className="text-2xl font-bold">{result.westernZodiac}</p>
          </div>
        </div>
      )}
    </div>
  );
}
