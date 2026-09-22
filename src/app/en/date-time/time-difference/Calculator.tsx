"use client";

import { useState } from "react";
import { calculateTimeDifference } from "@/lib/calculators/time-difference";

// 도시 라벨만 영문으로 병행 유지(timeZone IANA 식별자는 그대로 재사용, 계산 로직도
// calculateTimeDifference를 그대로 씀).
type City = { label: string; timeZone: string };

const CITIES: City[] = [
  { label: "Seoul", timeZone: "Asia/Seoul" },
  { label: "Tokyo", timeZone: "Asia/Tokyo" },
  { label: "Beijing", timeZone: "Asia/Shanghai" },
  { label: "Taipei", timeZone: "Asia/Taipei" },
  { label: "Bangkok", timeZone: "Asia/Bangkok" },
  { label: "Singapore", timeZone: "Asia/Singapore" },
  { label: "Jakarta", timeZone: "Asia/Jakarta" },
  { label: "Delhi", timeZone: "Asia/Kolkata" },
  { label: "Dubai", timeZone: "Asia/Dubai" },
  { label: "Istanbul", timeZone: "Europe/Istanbul" },
  { label: "Moscow", timeZone: "Europe/Moscow" },
  { label: "London", timeZone: "Europe/London" },
  { label: "Paris", timeZone: "Europe/Paris" },
  { label: "Berlin", timeZone: "Europe/Berlin" },
  { label: "New York", timeZone: "America/New_York" },
  { label: "Chicago", timeZone: "America/Chicago" },
  { label: "Denver", timeZone: "America/Denver" },
  { label: "Los Angeles", timeZone: "America/Los_Angeles" },
  { label: "Vancouver", timeZone: "America/Vancouver" },
  { label: "Sao Paulo", timeZone: "America/Sao_Paulo" },
  { label: "Sydney", timeZone: "Australia/Sydney" },
  { label: "Auckland", timeZone: "Pacific/Auckland" },
  { label: "Honolulu", timeZone: "Pacific/Honolulu" },
];

function formatUtcOffset(minutes: number): string {
  const sign = minutes >= 0 ? "+" : "-";
  const abs = Math.abs(minutes);
  const hours = Math.floor(abs / 60);
  const mins = abs % 60;
  return `UTC${sign}${hours}${mins > 0 ? `:${mins.toString().padStart(2, "0")}` : ""}`;
}

export default function Calculator() {
  const [city1, setCity1] = useState(CITIES[0].timeZone);
  const [city2, setCity2] = useState(CITIES.find((c) => c.label === "New York")!.timeZone);
  const [date, setDate] = useState("");

  const atDate = date ? new Date(`${date}T00:00:00Z`) : null;

  const blockingErrors: string[] = [];
  if (!atDate || Number.isNaN(atDate.getTime())) {
    blockingErrors.push("Please enter a reference date (DST depends on the date).");
  }

  const result = blockingErrors.length === 0 && atDate ? calculateTimeDifference(city1, city2, atDate) : null;

  const city1Label = CITIES.find((c) => c.timeZone === city1)?.label ?? city1;
  const city2Label = CITIES.find((c) => c.timeZone === city2)?.label ?? city2;

  return (
    <div className="mt-8 rounded-2xl border-2 border-amber-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-sm">
          City 1 (reference)
          <select
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-amber-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
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
          City 2 (comparison)
          <select
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-amber-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
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
          Reference date
          <input
            type="date"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-amber-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
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
        <div className="mt-6 space-y-3 border-t-2 border-amber-100 pt-6 dark:border-white/10">
          <p className="text-sm text-zinc-500">
            Time difference for {city2Label}, relative to {city1Label}
          </p>
          <p className="text-3xl font-bold">
            {result.hoursDiff === 0
              ? "No time difference"
              : `${city2Label} is ${Math.abs(result.hoursDiff)} hours ${result.hoursDiff > 0 ? "ahead" : "behind"}`}
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
