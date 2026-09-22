"use client";

import { useState } from "react";
import { compareBabyGrowth, type Sex } from "@/lib/calculators/baby-growth-percentile";
import { fullMonthsBetween } from "@/lib/calculators/date-utils";

export default function Calculator() {
  const [sex, setSex] = useState<Sex>("male");
  const [birthDate, setBirthDate] = useState("");
  const [asOfDate, setAsOfDate] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [heightCm, setHeightCm] = useState("");

  const birth = birthDate ? new Date(birthDate) : null;
  const asOf = asOfDate ? new Date(asOfDate) : null;
  const weightNum = weightKg ? Number(weightKg) : null;
  const heightNum = heightCm ? Number(heightCm) : null;

  const blockingErrors: string[] = [];
  if (!birth || Number.isNaN(birth.getTime())) {
    blockingErrors.push("Please enter the baby's date of birth.");
  }
  if (!asOf || Number.isNaN(asOf.getTime())) {
    blockingErrors.push("Please enter a reference date (today).");
  }
  if (birth && asOf && !Number.isNaN(birth.getTime()) && !Number.isNaN(asOf.getTime()) && asOf.getTime() < birth.getTime()) {
    blockingErrors.push("The reference date is earlier than the birth date.");
  }
  if (weightKg && (weightNum === null || !Number.isFinite(weightNum) || weightNum <= 0)) {
    blockingErrors.push("Please enter a weight greater than 0.");
  }
  if (heightCm && (heightNum === null || !Number.isFinite(heightNum) || heightNum <= 0)) {
    blockingErrors.push("Please enter a height greater than 0.");
  }

  const ageMonths = birth && asOf ? fullMonthsBetween(birth, asOf) : null;
  const result =
    ageMonths !== null && blockingErrors.length === 0
      ? compareBabyGrowth(sex, ageMonths, weightNum, heightNum)
      : null;

  return (
    <div className="mt-8 rounded-2xl border-2 border-emerald-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          Sex
          <select
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-emerald-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={sex}
            onChange={(e) => setSex(e.target.value as Sex)}
          >
            <option value="male">Boy</option>
            <option value="female">Girl</option>
          </select>
        </label>
        <div />
        <label className="flex flex-col gap-1 text-sm">
          Baby&rsquo;s date of birth
          <input
            type="date"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-emerald-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Reference date (today)
          <input
            type="date"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-emerald-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={asOfDate}
            onChange={(e) => setAsOfDate(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Current weight (kg, optional)
          <input
            type="number"
            inputMode="decimal"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-emerald-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Current height (cm, optional)
          <input
            type="number"
            inputMode="decimal"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-emerald-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={heightCm}
            onChange={(e) => setHeightCm(e.target.value)}
            min={0}
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
          <p className="text-sm text-zinc-500">{result.ageMonths} months old, vs. reference average</p>
          <ul className="mt-2 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            <li>
              Average weight: about {result.referenceWeightKg}kg
              {result.weightDiffPercent !== null && (
                <span className="ml-2 font-medium text-emerald-600 dark:text-emerald-400">
                  (your value {result.weightDiffPercent > 0 ? "+" : ""}
                  {result.weightDiffPercent}%)
                </span>
              )}
            </li>
            <li>
              Average height: about {result.referenceHeightCm}cm
              {result.heightDiffPercent !== null && (
                <span className="ml-2 font-medium text-emerald-600 dark:text-emerald-400">
                  (your value {result.heightDiffPercent > 0 ? "+" : ""}
                  {result.heightDiffPercent}%)
                </span>
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
