"use client";

import { useState } from "react";
import content from "@content/tools/en/parenting-health/bmi-calorie.json";
import ResultShareCard from "@/components/ResultShareCard";
import {
  calculateBmiCalorie,
  type ActivityLevel,
  type Goal,
  type Sex,
} from "@/lib/calculators/bmi-calorie";

const activityLabels: Record<ActivityLevel, string> = {
  sedentary: "Sedentary (little to no exercise)",
  light: "Light activity (exercise 1–3x/week)",
  moderate: "Moderate activity (exercise 3–5x/week)",
  active: "Active (exercise 6–7x/week)",
  veryActive: "Very active (athlete level)",
};

const goalLabels: Record<Goal, string> = {
  lose: "Lose weight",
  maintain: "Maintain weight",
  gain: "Gain weight",
};

export default function Calculator() {
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState("30");
  const [heightCm, setHeightCm] = useState("170");
  const [weightKg, setWeightKg] = useState("65");
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("light");
  const [goal, setGoal] = useState<Goal>("maintain");

  const ageNum = Number(age);
  const heightNum = Number(heightCm);
  const weightNum = Number(weightKg);

  const blockingErrors: string[] = [];
  if (!Number.isFinite(ageNum) || ageNum <= 0) {
    blockingErrors.push("Please enter an age greater than 0.");
  }
  if (!Number.isFinite(heightNum) || heightNum <= 0) {
    blockingErrors.push("Please enter a height greater than 0.");
  }
  if (!Number.isFinite(weightNum) || weightNum <= 0) {
    blockingErrors.push("Please enter a weight greater than 0.");
  }

  const result =
    blockingErrors.length === 0
      ? calculateBmiCalorie({
          sex,
          age: ageNum,
          heightCm: heightNum,
          weightKg: weightNum,
          activityLevel,
          goal,
        })
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
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Age (years)
          <input
            type="number"
            inputMode="numeric"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-emerald-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Height (cm)
          <input
            type="number"
            inputMode="decimal"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-emerald-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={heightCm}
            onChange={(e) => setHeightCm(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Weight (kg)
          <input
            type="number"
            inputMode="decimal"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-emerald-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm sm:col-span-2">
          Activity level
          <select
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-emerald-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
          >
            {Object.entries(activityLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm sm:col-span-2">
          Goal
          <select
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-emerald-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={goal}
            onChange={(e) => setGoal(e.target.value as Goal)}
          >
            {Object.entries(goalLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
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
        <div className="mt-6 grid grid-cols-1 gap-6 border-t-2 border-emerald-100 pt-6 sm:grid-cols-2 dark:border-white/10">
          <div>
            <p className="text-sm text-zinc-500">BMI</p>
            <p className="text-2xl font-bold">
              {result.bmi}{" "}
              <span className="text-base font-normal">
                ({content.bmiCategories[result.bmiCategory]})
              </span>
            </p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">Calorie target</p>
            <p className="text-2xl font-bold">{result.targetCalories.toLocaleString()}kcal/day</p>
          </div>
          <div className="sm:col-span-2">
            <ul className="space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
              <li>Basal metabolic rate (BMR): {result.bmr.toLocaleString()}kcal</li>
              <li>Total daily energy expenditure (TDEE): {result.tdee.toLocaleString()}kcal</li>
            </ul>
          </div>
          <div className="sm:col-span-2 flex justify-center">
            <ResultShareCard
              toolName="BMI & Calorie Calculator"
              headline={`BMI ${result.bmi}`}
              lines={[
                content.bmiCategories[result.bmiCategory],
                `Target: ${result.targetCalories.toLocaleString()}kcal/day`,
              ]}
              accentColor="#10b981"
            />
          </div>
        </div>
      )}
    </div>
  );
}
