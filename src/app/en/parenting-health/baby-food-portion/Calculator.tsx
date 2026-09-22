"use client";

import { useState } from "react";
import { fullMonthsBetween } from "@/lib/calculators/date-utils";

// 한국어판(baby-food-portion.ts)과 별개로 영문 단계 데이터를 둔다(월령 구간·수치는
// 동일, 문구만 번역).
type BabyFoodStage = {
  name: string;
  minMonth: number;
  maxMonth: number;
  mealsPerDay: string;
  portionPerMealG: string;
  dailyTotalG: string;
  description: string;
};

const BABY_FOOD_STAGES: BabyFoodStage[] = [
  { name: "Early stage", minMonth: 4, maxMonth: 6, mealsPerDay: "1x/day", portionPerMealG: "5–80ml", dailyTotalG: "5–80ml", description: "Starting with thin porridge to practice swallowing" },
  { name: "Mid stage", minMonth: 7, maxMonth: 8, mealsPerDay: "2x/day", portionPerMealG: "50–100g", dailyTotalG: "100–200g", description: "Thicker texture, practicing mashed food" },
  { name: "Late stage", minMonth: 9, maxMonth: 11, mealsPerDay: "3x/day", portionPerMealG: "90–120g", dailyTotalG: "270–360g", description: "Introducing chunkier food to practice chewing" },
  { name: "Final stage", minMonth: 12, maxMonth: 15, mealsPerDay: "3x/day + snacks", portionPerMealG: "100–130g", dailyTotalG: "300–400g", description: "Soft rice and gentle side dishes, closer to toddler food" },
];

function findBabyFoodStageEn(ageMonths: number): BabyFoodStage {
  const stage = BABY_FOOD_STAGES.find((s) => ageMonths >= s.minMonth && ageMonths <= s.maxMonth);
  if (stage) return stage;
  if (ageMonths < BABY_FOOD_STAGES[0].minMonth) return BABY_FOOD_STAGES[0];
  return BABY_FOOD_STAGES[BABY_FOOD_STAGES.length - 1];
}

export default function Calculator() {
  const [birthDate, setBirthDate] = useState("");
  const [asOfDate, setAsOfDate] = useState("");

  const birth = birthDate ? new Date(birthDate) : null;
  const asOf = asOfDate ? new Date(asOfDate) : null;

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

  const ageMonths = birth && asOf ? fullMonthsBetween(birth, asOf) : null;
  const stage = ageMonths !== null && blockingErrors.length === 0 ? findBabyFoodStageEn(ageMonths) : null;

  return (
    <div className="mt-8 rounded-2xl border-2 border-emerald-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
      </div>

      {blockingErrors.length > 0 && (
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-red-600 dark:text-red-400">
          {blockingErrors.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}

      {stage && ageMonths !== null && (
        <div className="mt-6 space-y-3 border-t-2 border-emerald-100 pt-6 dark:border-white/10">
          <p className="text-sm text-zinc-500">{ageMonths} months old → this stage</p>
          <p className="text-3xl font-bold">{stage.name}</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{stage.description}</p>
          <ul className="mt-2 space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Meals per day: {stage.mealsPerDay}</li>
            <li>Portion per meal: {stage.portionPerMealG}</li>
            <li>Daily total: {stage.dailyTotalG}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
