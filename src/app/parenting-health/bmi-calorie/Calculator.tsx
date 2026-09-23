"use client";

import { useState } from "react";
import content from "@content/tools/ko/parenting-health/bmi-calorie.json";
import {
  calculateBmiCalorie,
  type ActivityLevel,
  type Goal,
  type Sex,
} from "@/lib/calculators/bmi-calorie";

const activityLabels: Record<ActivityLevel, string> = {
  sedentary: "거의 운동 안 함(좌식 생활)",
  light: "가벼운 활동(주 1~3회 운동)",
  moderate: "보통 활동(주 3~5회 운동)",
  active: "활동적(주 6~7회 운동)",
  veryActive: "매우 활동적(운동선수 수준)",
};

const goalLabels: Record<Goal, string> = {
  lose: "체중 감량",
  maintain: "체중 유지",
  gain: "체중 증량",
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
    blockingErrors.push("나이는 0보다 큰 숫자로 입력해 주세요.");
  }
  if (!Number.isFinite(heightNum) || heightNum <= 0) {
    blockingErrors.push("키는 0보다 큰 숫자로 입력해 주세요.");
  }
  if (!Number.isFinite(weightNum) || weightNum <= 0) {
    blockingErrors.push("체중은 0보다 큰 숫자로 입력해 주세요.");
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
          성별
          <select
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-emerald-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={sex}
            onChange={(e) => setSex(e.target.value as Sex)}
          >
            <option value="male">남성</option>
            <option value="female">여성</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          나이 (세)
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
          키 (cm)
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
          체중 (kg)
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
          활동 수준
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
          목표
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
            <p className="text-sm text-zinc-500">BMI (체질량지수)</p>
            <p className="text-2xl font-bold">
              {result.bmi}{" "}
              <span className="text-base font-normal">({content.bmiCategories[result.bmiCategory]})</span>
            </p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">목표 칼로리</p>
            <p className="text-2xl font-bold">{result.targetCalories.toLocaleString()}kcal/일</p>
          </div>
          <div className="sm:col-span-2">
            <ul className="space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
              <li>기초대사량(BMR): {result.bmr.toLocaleString()}kcal</li>
              <li>활동대사량(TDEE): {result.tdee.toLocaleString()}kcal</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
