"use client";

import { useState } from "react";
import { calculateWeeklyHolidayPay } from "@/lib/calculators/weekly-holiday-pay";

export default function Calculator({ minimumWage }: { minimumWage: number }) {
  const [hourlyWage, setHourlyWage] = useState("10320");
  const [scheduledWeeklyHours, setScheduledWeeklyHours] = useState("20");
  const [fullAttendance, setFullAttendance] = useState(true);

  const hourlyWageNum = Number(hourlyWage);
  const scheduledWeeklyHoursNum = Number(scheduledWeeklyHours);

  // 계산 자체를 막아야 하는 에러(숫자가 아니거나 0 이하이거나 물리적으로 불가능한 값)
  const blockingErrors: string[] = [];
  if (!Number.isFinite(hourlyWageNum) || hourlyWageNum <= 0) {
    blockingErrors.push("시급은 0보다 큰 숫자로 입력해 주세요.");
  }
  if (!Number.isFinite(scheduledWeeklyHoursNum) || scheduledWeeklyHoursNum <= 0) {
    blockingErrors.push("주 소정근로시간은 0보다 큰 숫자로 입력해 주세요.");
  } else if (scheduledWeeklyHoursNum > 168) {
    blockingErrors.push("주 소정근로시간은 168시간(일주일 전체)을 넘을 수 없습니다.");
  }

  // 계산은 진행하되 참고용으로 함께 보여줄 경고(최저시급 미만 등)
  const warnings: string[] = [];
  if (hourlyWageNum > 0 && hourlyWageNum < minimumWage) {
    warnings.push(
      `입력한 시급(${hourlyWageNum.toLocaleString()}원)이 최저시급(${minimumWage.toLocaleString()}원)보다 낮습니다. 계산은 입력값 기준으로 진행되지만, 실제로는 최저임금법 위반일 수 있습니다.`,
    );
  }

  const result =
    blockingErrors.length === 0
      ? calculateWeeklyHolidayPay({
          hourlyWage: hourlyWageNum,
          scheduledWeeklyHours: scheduledWeeklyHoursNum,
          fullAttendance,
        })
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
        <label className="flex flex-col gap-1 text-sm">
          주 소정근로시간 (시간)
          <input
            type="number"
            inputMode="numeric"
            className="rounded border border-black/20 px-3 py-2 dark:border-white/20 dark:bg-transparent"
            value={scheduledWeeklyHours}
            onChange={(e) => setScheduledWeeklyHours(e.target.value)}
            min={0}
          />
          <span className="text-xs text-zinc-500">
            근로계약서상 정해진(약정된) 시간입니다. 실제로 더 일하거나 덜 일한 시간이 아닙니다.
          </span>
        </label>
        <label className="flex items-center gap-2 text-sm sm:col-span-2">
          <input
            type="checkbox"
            checked={fullAttendance}
            onChange={(e) => setFullAttendance(e.target.checked)}
          />
          해당 주의 소정근로일에 결근 없이 모두 출근했습니다 (지각·조퇴는 무관)
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
          {warnings.map((warning) => (
            <li key={warning}>{warning}</li>
          ))}
        </ul>
      )}

      {result && (
        <div className="mt-6 border-t border-black/10 pt-6 dark:border-white/10">
          {result.eligible ? (
            <>
              <p className="text-sm text-zinc-500">계산 결과</p>
              <p className="text-3xl font-bold">{result.pay.toLocaleString()}원</p>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                (소정근로시간 {result.cappedHours}시간 ÷ 40) × 8 × 시급{" "}
                {hourlyWageNum.toLocaleString()}원 = {result.pay.toLocaleString()}원
                {scheduledWeeklyHoursNum > 40 && " (40시간 상한 적용)"}
              </p>
            </>
          ) : (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{result.reason} (0원)</p>
          )}
        </div>
      )}
    </div>
  );
}
