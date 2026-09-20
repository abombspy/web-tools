"use client";

import { useState } from "react";
import {
  calculatePartTimeWage,
  type PartTimeWageRates,
} from "@/lib/calculators/part-time-wage";

type Props = {
  minimumWage: number;
  rates: PartTimeWageRates;
};

const MAX_MONTHLY_HOURS = 744; // 31일 × 24시간, 물리적 상한

function useHourField(initial: string) {
  const [value, setValue] = useState(initial);
  const num = Number(value);
  return { value, setValue, num };
}

export default function Calculator({ minimumWage, rates }: Props) {
  const [hourlyWage, setHourlyWage] = useState("10320");
  const base = useHourField("80");
  const overtime = useHourField("0");
  const night = useHourField("0");
  const holidayNormal = useHourField("0");
  const holidayExcess = useHourField("0");
  const [isFivePlusEmployees, setIsFivePlusEmployees] = useState(true);

  const hourlyWageNum = Number(hourlyWage);
  const hourFields = [base, overtime, night, holidayNormal, holidayExcess];
  const totalHours = hourFields.reduce((sum, f) => sum + (Number.isFinite(f.num) ? f.num : 0), 0);

  const blockingErrors: string[] = [];
  if (!Number.isFinite(hourlyWageNum) || hourlyWageNum <= 0) {
    blockingErrors.push("시급은 0보다 큰 숫자로 입력해 주세요.");
  }
  if (hourFields.some((f) => !Number.isFinite(f.num) || f.num < 0)) {
    blockingErrors.push("근무시간은 0 이상의 숫자로 입력해 주세요.");
  }
  if (totalHours > MAX_MONTHLY_HOURS) {
    blockingErrors.push(`한 달 총 근무시간은 ${MAX_MONTHLY_HOURS}시간(31일 전체)을 넘을 수 없습니다.`);
  }

  const warnings: string[] = [];
  if (hourlyWageNum > 0 && hourlyWageNum < minimumWage) {
    warnings.push(
      `입력한 시급(${hourlyWageNum.toLocaleString()}원)이 최저시급(${minimumWage.toLocaleString()}원)보다 낮습니다. 계산은 입력값 기준으로 진행됩니다.`,
    );
  }

  const result =
    blockingErrors.length === 0
      ? calculatePartTimeWage(
          {
            hourlyWage: hourlyWageNum,
            baseHours: base.num,
            overtimeHours: overtime.num,
            nightHours: night.num,
            holidayHoursNormal: holidayNormal.num,
            holidayHoursExcess: holidayExcess.num,
            isFivePlusEmployees,
          },
          rates,
        )
      : null;

  return (
    <div className="mt-8 rounded-lg border border-black/10 p-6 dark:border-white/10">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          시급 (원)
          <input
            type="number"
            inputMode="numeric"
            className="rounded border border-black/20 px-3 py-2 dark:border-white/20 dark:bg-transparent"
            value={hourlyWage}
            onChange={(e) => setHourlyWage(e.target.value)}
            min={0}
          />
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isFivePlusEmployees}
            onChange={(e) => setIsFivePlusEmployees(e.target.checked)}
          />
          상시근로자 5인 이상 사업장이다
        </label>

        <label className="flex flex-col gap-1 text-sm">
          기본 근무시간 (이번 달 합계, 시간)
          <input
            type="number"
            inputMode="numeric"
            className="rounded border border-black/20 px-3 py-2 dark:border-white/20 dark:bg-transparent"
            value={base.value}
            onChange={(e) => base.setValue(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          연장 근무시간 (이번 달 합계, 시간)
          <input
            type="number"
            inputMode="numeric"
            className="rounded border border-black/20 px-3 py-2 dark:border-white/20 dark:bg-transparent"
            value={overtime.value}
            onChange={(e) => overtime.setValue(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          야간 근무시간 (22~06시, 이번 달 합계)
          <input
            type="number"
            inputMode="numeric"
            className="rounded border border-black/20 px-3 py-2 dark:border-white/20 dark:bg-transparent"
            value={night.value}
            onChange={(e) => night.setValue(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          휴일 근무시간 - 하루 8시간 이내분 (이번 달 합계)
          <input
            type="number"
            inputMode="numeric"
            className="rounded border border-black/20 px-3 py-2 dark:border-white/20 dark:bg-transparent"
            value={holidayNormal.value}
            onChange={(e) => holidayNormal.setValue(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          휴일 근무시간 - 하루 8시간 초과분 (이번 달 합계)
          <input
            type="number"
            inputMode="numeric"
            className="rounded border border-black/20 px-3 py-2 dark:border-white/20 dark:bg-transparent"
            value={holidayExcess.value}
            onChange={(e) => holidayExcess.setValue(e.target.value)}
            min={0}
          />
          <span className="text-xs text-zinc-500">
            같은 날 8시간을 넘겨 일한 분량만 여기에 적어주세요. 예: 하루 10시간 휴일근무 →
            8시간 이내분 8시간, 초과분 2시간으로 나눠 입력합니다.
          </span>
        </label>
      </div>

      {blockingErrors.length > 0 && (
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-red-600 dark:text-red-400">
          {blockingErrors.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}

      {warnings.length > 0 && (
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-amber-600 dark:text-amber-400">
          {warnings.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      )}

      {result && (
        <div className="mt-6 space-y-6 border-t border-black/10 pt-6 dark:border-white/10">
          <div>
            <p className="text-sm text-zinc-500">세전 총지급액</p>
            <p className="text-3xl font-bold">{result.grossPay.toLocaleString()}원</p>
            <ul className="mt-2 space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
              <li>기본급: {result.breakdown.basePay.toLocaleString()}원</li>
              {result.breakdown.overtimePay > 0 && (
                <li>연장근로수당: {result.breakdown.overtimePay.toLocaleString()}원</li>
              )}
              {result.breakdown.nightPay > 0 && (
                <li>야간근로수당: {result.breakdown.nightPay.toLocaleString()}원</li>
              )}
              {result.breakdown.holidayNormalPay > 0 && (
                <li>휴일근로수당(8h 이내): {result.breakdown.holidayNormalPay.toLocaleString()}원</li>
              )}
              {result.breakdown.holidayExcessPay > 0 && (
                <li>휴일근로수당(8h 초과): {result.breakdown.holidayExcessPay.toLocaleString()}원</li>
              )}
            </ul>
          </div>

          <div>
            <p className="text-sm text-zinc-500">
              4대보험 공제 {!result.socialInsuranceApplicable && "(월 60시간 미만이라 적용 제외)"}
            </p>
            <p className="text-xl font-semibold">
              -{result.socialInsuranceDeduction.total.toLocaleString()}원
            </p>
            {result.socialInsuranceApplicable && (
              <ul className="mt-2 space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
                <li>국민연금: {result.socialInsuranceDeduction.nationalPension.toLocaleString()}원</li>
                <li>건강보험: {result.socialInsuranceDeduction.healthInsurance.toLocaleString()}원</li>
                <li>장기요양보험: {result.socialInsuranceDeduction.longTermCare.toLocaleString()}원</li>
                <li>고용보험: {result.socialInsuranceDeduction.employmentInsurance.toLocaleString()}원</li>
              </ul>
            )}
          </div>

          <div>
            {result.netPay !== null ? (
              <>
                <p className="text-sm text-zinc-500">예상 실수령액 (소득세 0원 구간)</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {result.netPay.toLocaleString()}원
                </p>
              </>
            ) : (
              <>
                <p className="text-sm text-zinc-500">4대보험 공제 후 금액</p>
                <p className="text-2xl font-bold">
                  {result.payAfterSocialInsurance.toLocaleString()}원
                </p>
                <p className="mt-2 text-sm text-amber-600 dark:text-amber-400">
                  월급여가 원천징수세액 0원 구간을 넘어서, 여기에 근로소득세·지방소득세가 추가로
                  공제됩니다. 정확한 금액은 국세청 홈택스의 근로소득 간이세액표(조견표)를
                  확인해 주세요. 이 계산기는 해당 구간의 세액을 계산하지 않습니다.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
