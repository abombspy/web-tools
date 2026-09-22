"use client";

import { useState } from "react";
import {
  calculateComprehensiveIncomeTax,
  type ComprehensiveIncomeTaxRates,
  type IndustryExpenseRate,
} from "@/lib/calculators/comprehensive-income-tax";

type Props = {
  rates: ComprehensiveIncomeTaxRates;
  industries: IndustryExpenseRate[];
};

const INDUSTRY_NAME_EN: Record<string, string> = {
  "940306": "Solo content creator (YouTuber, etc.)",
  "940100": "Writer / author / translator",
  "940903": "Tutor / private instructor",
  "940918": "Quick-service / delivery rider",
  "940909": "IT freelancer / programmer / other self-employed",
};

export default function Calculator({ rates, industries }: Props) {
  const [annualRevenue, setAnnualRevenue] = useState("30000000");
  const [industryCode, setIndustryCode] = useState(industries[0]?.code ?? "custom");
  const [customExpenseRate, setCustomExpenseRate] = useState("30");

  const annualRevenueNum = Number(annualRevenue);
  const customExpenseRateNum = Number(customExpenseRate) / 100;
  const isCustom = industryCode === "custom";

  const blockingErrors: string[] = [];
  if (!Number.isFinite(annualRevenueNum) || annualRevenueNum < 0) {
    blockingErrors.push("Please enter annual revenue of 0 or more.");
  }
  if (isCustom && (!Number.isFinite(customExpenseRateNum) || customExpenseRateNum < 0 || customExpenseRateNum > 1)) {
    blockingErrors.push("Please enter a custom expense ratio between 0 and 100.");
  }

  const result =
    blockingErrors.length === 0
      ? calculateComprehensiveIncomeTax(
          {
            annualRevenue: annualRevenueNum,
            industryCode,
            customExpenseRate: isCustom ? customExpenseRateNum : undefined,
          },
          rates,
          industries,
        )
      : null;

  return (
    <div className="mt-8 rounded-2xl border-2 border-rose-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          Annual revenue (before tax)
          <input
            type="number"
            inputMode="numeric"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-rose-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={annualRevenue}
            onChange={(e) => setAnnualRevenue(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Industry
          <select
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-rose-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={industryCode}
            onChange={(e) => setIndustryCode(e.target.value)}
          >
            {industries.map((i) => (
              <option key={i.code} value={i.code}>
                {INDUSTRY_NAME_EN[i.code] ?? i.name}
              </option>
            ))}
            <option value="custom">Not listed (enter expense ratio manually)</option>
          </select>
        </label>
        {isCustom && (
          <label className="flex flex-col gap-1 text-sm sm:col-span-2">
            Custom expense ratio (%)
            <input
              type="number"
              inputMode="decimal"
              className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-rose-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
              value={customExpenseRate}
              onChange={(e) => setCustomExpenseRate(e.target.value)}
              min={0}
              max={100}
            />
            <span className="text-xs text-zinc-500">
              Look up your industry code&rsquo;s ratio on the National Tax Service Hometax
              &ldquo;Standard/Simplified Expense Ratio Lookup&rdquo; and enter it here.
            </span>
          </label>
        )}
      </div>

      {blockingErrors.length > 0 && (
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-red-600 dark:text-red-400">
          {blockingErrors.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}

      {result && (
        <div className="mt-6 space-y-3 border-t-2 border-rose-100 pt-6 dark:border-white/10">
          <p className="text-sm text-zinc-500">Estimated calculated tax (local income tax separate)</p>
          <p className="text-3xl font-bold">₩{result.calculatedTax.toLocaleString()}</p>
          <ul className="mt-2 space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>
              Expense ratio applied:{" "}
              {result.appliedExpenseRateType === "simplified"
                ? "Simplified"
                : result.appliedExpenseRateType === "standard"
                  ? "Standard"
                  : "Custom"}{" "}
              {(result.appliedExpenseRate * 100).toFixed(1)}%
            </li>
            <li>Necessary expenses: ₩{result.expenseAmount.toLocaleString()}</li>
            <li>Business income: ₩{result.businessIncome.toLocaleString()}</li>
            <li>Taxable base: ₩{result.taxBase.toLocaleString()} (basic deduction ₩1.5M applied)</li>
          </ul>
        </div>
      )}
    </div>
  );
}
