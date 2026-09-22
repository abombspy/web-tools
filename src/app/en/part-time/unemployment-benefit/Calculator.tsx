"use client";

import { useState } from "react";
import {
  calculateUnemploymentBenefit,
  type UnemploymentBenefitRates,
} from "@/lib/calculators/unemployment-benefit";

type Props = {
  rates: UnemploymentBenefitRates;
  minimumHourlyWage: number;
};

export default function Calculator({ rates, minimumHourlyWage }: Props) {
  const [birthDate, setBirthDate] = useState("");
  const [separationDate, setSeparationDate] = useState("");
  const [insuredYears, setInsuredYears] = useState("2");
  const [monthlyWage, setMonthlyWage] = useState("2500000");

  const insuredYearsNum = Number(insuredYears);
  const monthlyWageNum = Number(monthlyWage);
  const birth = birthDate ? new Date(birthDate) : null;
  const separation = separationDate ? new Date(separationDate) : null;

  const blockingErrors: string[] = [];
  if (!birth || Number.isNaN(birth.getTime())) {
    blockingErrors.push("Please enter your date of birth.");
  }
  if (!separation || Number.isNaN(separation.getTime())) {
    blockingErrors.push("Please enter your separation date.");
  }
  if (birth && separation && !Number.isNaN(birth.getTime()) && !Number.isNaN(separation.getTime()) && separation.getTime() < birth.getTime()) {
    blockingErrors.push("Separation date is before your date of birth.");
  }
  if (!Number.isFinite(insuredYearsNum) || insuredYearsNum < 0) {
    blockingErrors.push("Please enter an employment insurance enrollment period of 0 or more.");
  }
  if (!Number.isFinite(monthlyWageNum) || monthlyWageNum <= 0) {
    blockingErrors.push("Please enter a monthly wage greater than 0.");
  }

  const result =
    blockingErrors.length === 0
      ? calculateUnemploymentBenefit(
          { birthDate, separationDate, insuredYears: insuredYearsNum, monthlyWage: monthlyWageNum },
          rates,
          minimumHourlyWage,
        )
      : null;

  return (
    <div className="mt-8 rounded-2xl border-2 border-orange-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          Date of birth
          <input
            type="date"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Separation date (day after your last working day)
          <input
            type="date"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={separationDate}
            onChange={(e) => setSeparationDate(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Employment insurance enrollment period (years)
          <input
            type="number"
            inputMode="decimal"
            step="0.1"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={insuredYears}
            onChange={(e) => setInsuredYears(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Monthly wage before separation (before tax, assumes last 3 months identical)
          <input
            type="number"
            inputMode="numeric"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={monthlyWage}
            onChange={(e) => setMonthlyWage(e.target.value)}
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
        <div className="mt-6 space-y-3 border-t-2 border-orange-100 pt-6 dark:border-white/10">
          <p className="text-sm text-zinc-500">Estimated total benefit (assuming you qualify)</p>
          <p className="text-3xl font-bold">₩{result.totalBenefit.toLocaleString()}</p>
          <ul className="mt-2 space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Age at separation (international age): {result.age}</li>
            <li>Average daily wage: ₩{result.averageDailyWage.toLocaleString()}</li>
            <li>
              Daily benefit: ₩{result.dailyBenefit.toLocaleString()}
              {result.dailyBenefit === result.dailyFloor && " (lower bound applied)"}
              {result.dailyBenefit === rates.dailyCap && " (upper bound applied)"}
            </li>
            <li>Payment days: {result.paymentDays}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
