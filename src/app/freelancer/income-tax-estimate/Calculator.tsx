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

export default function Calculator({ rates, industries }: Props) {
  const [annualRevenue, setAnnualRevenue] = useState("30000000");
  const [industryCode, setIndustryCode] = useState(industries[0]?.code ?? "custom");
  const [customExpenseRate, setCustomExpenseRate] = useState("30");

  const annualRevenueNum = Number(annualRevenue);
  const customExpenseRateNum = Number(customExpenseRate) / 100;
  const isCustom = industryCode === "custom";

  const blockingErrors: string[] = [];
  if (!Number.isFinite(annualRevenueNum) || annualRevenueNum < 0) {
    blockingErrors.push("연 매출(수입)은 0 이상의 숫자로 입력해 주세요.");
  }
  if (isCustom && (!Number.isFinite(customExpenseRateNum) || customExpenseRateNum < 0 || customExpenseRateNum > 1)) {
    blockingErrors.push("직접 입력한 경비율은 0~100 사이의 숫자로 입력해 주세요.");
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
    <div className="mt-8 rounded-lg border border-black/10 p-6 dark:border-white/10">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          연 매출(수입금액, 세전)
          <input
            type="number"
            inputMode="numeric"
            className="rounded border border-black/20 px-3 py-2 dark:border-white/20 dark:bg-transparent"
            value={annualRevenue}
            onChange={(e) => setAnnualRevenue(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          업종
          <select
            className="rounded border border-black/20 px-3 py-2 dark:border-white/20 dark:bg-transparent"
            value={industryCode}
            onChange={(e) => setIndustryCode(e.target.value)}
          >
            {industries.map((i) => (
              <option key={i.code} value={i.code}>
                {i.name}
              </option>
            ))}
            <option value="custom">목록에 없음 (직접 경비율 입력)</option>
          </select>
        </label>
        {isCustom && (
          <label className="flex flex-col gap-1 text-sm sm:col-span-2">
            직접 입력할 경비율 (%)
            <input
              type="number"
              inputMode="decimal"
              className="rounded border border-black/20 px-3 py-2 dark:border-white/20 dark:bg-transparent"
              value={customExpenseRate}
              onChange={(e) => setCustomExpenseRate(e.target.value)}
              min={0}
              max={100}
            />
            <span className="text-xs text-zinc-500">
              국세청 홈택스 &ldquo;기준(단순)경비율 조회&rdquo;에서 본인 업종코드로 확인한 값을
              입력하세요.
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
        <div className="mt-6 space-y-3 border-t border-black/10 pt-6 dark:border-white/10">
          <p className="text-sm text-zinc-500">예상 산출세액 (지방소득세 별도)</p>
          <p className="text-3xl font-bold">{result.calculatedTax.toLocaleString()}원</p>
          <ul className="mt-2 space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>
              적용 경비율:{" "}
              {result.appliedExpenseRateType === "simplified"
                ? "단순경비율"
                : result.appliedExpenseRateType === "standard"
                  ? "기준경비율"
                  : "직접 입력"}{" "}
              {(result.appliedExpenseRate * 100).toFixed(1)}%
            </li>
            <li>필요경비: {result.expenseAmount.toLocaleString()}원</li>
            <li>사업소득금액: {result.businessIncome.toLocaleString()}원</li>
            <li>과세표준: {result.taxBase.toLocaleString()}원 (기본공제 150만원 차감)</li>
          </ul>
        </div>
      )}
    </div>
  );
}
