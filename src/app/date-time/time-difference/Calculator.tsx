"use client";

import { useState } from "react";
import { CITIES } from "@/lib/calculators/city-timezones";
import { calculateTimeDifference } from "@/lib/calculators/time-difference";

function formatUtcOffset(minutes: number): string {
  const sign = minutes >= 0 ? "+" : "-";
  const abs = Math.abs(minutes);
  const hours = Math.floor(abs / 60);
  const mins = abs % 60;
  return `UTC${sign}${hours}${mins > 0 ? `:${mins.toString().padStart(2, "0")}` : ""}`;
}

export default function Calculator() {
  const [city1, setCity1] = useState(CITIES[0].timeZone);
  const [city2, setCity2] = useState(CITIES.find((c) => c.label === "뉴욕")!.timeZone);
  const [date, setDate] = useState("");

  const atDate = date ? new Date(`${date}T00:00:00Z`) : null;

  const blockingErrors: string[] = [];
  if (!atDate || Number.isNaN(atDate.getTime())) {
    blockingErrors.push("기준 날짜를 입력해 주세요(서머타임 적용 여부가 날짜에 따라 달라집니다).");
  }

  const result = blockingErrors.length === 0 && atDate ? calculateTimeDifference(city1, city2, atDate) : null;

  const city1Label = CITIES.find((c) => c.timeZone === city1)?.label ?? city1;
  const city2Label = CITIES.find((c) => c.timeZone === city2)?.label ?? city2;

  return (
    <div className="mt-8 rounded-2xl border-2 border-orange-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-sm">
          도시 1 (기준)
          <select
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={city1}
            onChange={(e) => setCity1(e.target.value)}
          >
            {CITIES.map((c) => (
              <option key={c.timeZone} value={c.timeZone}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          도시 2 (비교 대상)
          <select
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={city2}
            onChange={(e) => setCity2(e.target.value)}
          >
            {CITIES.map((c) => (
              <option key={c.timeZone} value={c.timeZone}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          기준 날짜
          <input
            type="date"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
        <div className="mt-6 space-y-3 border-t-2 border-orange-100 pt-6 dark:border-white/10">
          <p className="text-sm text-zinc-500">
            {city1Label} 기준 {city2Label}의 시차
          </p>
          <p className="text-3xl font-bold">
            {result.hoursDiff === 0
              ? "시차 없음"
              : `${city2Label}가 ${Math.abs(result.hoursDiff)}시간 ${result.hoursDiff > 0 ? "빠름" : "느림"}`}
          </p>
          <ul className="mt-2 space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>{city1Label}: {formatUtcOffset(result.city1UtcOffsetMinutes)}</li>
            <li>{city2Label}: {formatUtcOffset(result.city2UtcOffsetMinutes)}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
