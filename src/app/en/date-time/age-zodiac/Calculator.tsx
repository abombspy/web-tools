"use client";

import { useState } from "react";
import content from "@content/tools/en/date-time/age-zodiac.json";
import ResultShareCard from "@/components/ResultShareCard";
import { calculateAgeZodiac } from "@/lib/calculators/age-zodiac";

const { zodiacNames } = content;

export default function Calculator() {
  const [birthDate, setBirthDate] = useState("");
  const [asOfDate, setAsOfDate] = useState("");

  const birth = birthDate ? new Date(birthDate) : null;
  const asOf = asOfDate ? new Date(asOfDate) : null;

  const blockingErrors: string[] = [];
  if (!birth || Number.isNaN(birth.getTime())) {
    blockingErrors.push("Please enter a birth date.");
  }
  if (!asOf || Number.isNaN(asOf.getTime())) {
    blockingErrors.push("Please enter a reference date (today).");
  }
  if (birth && asOf && !Number.isNaN(birth.getTime()) && !Number.isNaN(asOf.getTime()) && asOf.getTime() < birth.getTime()) {
    blockingErrors.push("The reference date is earlier than the birth date.");
  }

  const result = blockingErrors.length === 0 ? calculateAgeZodiac(birthDate, asOfDate) : null;

  return (
    <div className="mt-8 rounded-2xl border-2 border-amber-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          Birth date
          <input
            type="date"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-amber-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
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
        <div className="mt-6 grid grid-cols-3 gap-4 border-t-2 border-amber-100 pt-6 dark:border-white/10">
          <div>
            <p className="text-sm text-zinc-500">Korean age</p>
            <p className="text-2xl font-bold">{result.internationalAge}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">Zodiac animal</p>
            <p className="text-2xl font-bold">{zodiacNames.koreanZodiac[result.koreanZodiac]}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">Star sign</p>
            <p className="text-2xl font-bold">{zodiacNames.westernZodiac[result.westernZodiac]}</p>
          </div>
        </div>
      )}

      {result && (
        <div className="mt-4 flex justify-center">
          <ResultShareCard
            toolName="Korean Age, Zodiac & Star Sign Calculator"
            headline={zodiacNames.koreanZodiac[result.koreanZodiac]}
            lines={[`Korean age: ${result.internationalAge}`, `Star sign: ${zodiacNames.westernZodiac[result.westernZodiac]}`]}
            accentColor="#f59e0b"
          />
        </div>
      )}
    </div>
  );
}
