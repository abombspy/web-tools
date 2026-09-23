"use client";

import { useState } from "react";
import content from "@content/tools/en/part-time/weekly-holiday-pay.json";
import { calculateWeeklyHolidayPay } from "@/lib/calculators/weekly-holiday-pay";

export default function Calculator({ minimumWage }: { minimumWage: number }) {
  const [hourlyWage, setHourlyWage] = useState("10320");
  const [scheduledWeeklyHours, setScheduledWeeklyHours] = useState("20");
  const [fullAttendance, setFullAttendance] = useState(true);

  const hourlyWageNum = Number(hourlyWage);
  const scheduledWeeklyHoursNum = Number(scheduledWeeklyHours);

  const blockingErrors: string[] = [];
  if (!Number.isFinite(hourlyWageNum) || hourlyWageNum <= 0) {
    blockingErrors.push("Please enter an hourly wage greater than 0.");
  }
  if (!Number.isFinite(scheduledWeeklyHoursNum) || scheduledWeeklyHoursNum <= 0) {
    blockingErrors.push("Please enter scheduled weekly hours greater than 0.");
  } else if (scheduledWeeklyHoursNum > 168) {
    blockingErrors.push("Scheduled weekly hours can't exceed 168 (a full week).");
  }

  const warnings: string[] = [];
  if (hourlyWageNum > 0 && hourlyWageNum < minimumWage) {
    warnings.push(
      `The hourly wage you entered (₩${hourlyWageNum.toLocaleString()}) is below the minimum wage (₩${minimumWage.toLocaleString()}). The calculation still runs on your input, but this may violate the Minimum Wage Act.`,
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
    <div className="mt-8 rounded-2xl border-2 border-orange-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          Hourly wage (₩)
          <input
            type="number"
            inputMode="numeric"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={hourlyWage}
            onChange={(e) => setHourlyWage(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Scheduled weekly hours
          <input
            type="number"
            inputMode="numeric"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={scheduledWeeklyHours}
            onChange={(e) => setScheduledWeeklyHours(e.target.value)}
            min={0}
          />
          <span className="text-xs text-zinc-500">
            The hours set in your labor contract — not how much you actually worked.
          </span>
        </label>
        <label className="flex items-center gap-2 text-sm sm:col-span-2">
          <input
            type="checkbox"
            checked={fullAttendance}
            onChange={(e) => setFullAttendance(e.target.checked)}
          />
          I attended all of my scheduled working days this week with no absences (late/early
          leave doesn&rsquo;t count)
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
        <div className="mt-6 border-t-2 border-orange-100 pt-6 dark:border-white/10">
          {result.eligible ? (
            <>
              <p className="text-sm text-zinc-500">Result</p>
              <p className="text-3xl font-bold">₩{result.pay.toLocaleString()}</p>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                (scheduled hours {result.cappedHours}h ÷ 40) × 8 × ₩
                {hourlyWageNum.toLocaleString()} = ₩{result.pay.toLocaleString()}
                {scheduledWeeklyHoursNum > 40 && " (40-hour cap applied)"}
              </p>
            </>
          ) : (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {content.reasons[result.reasonCode]} (₩0)
            </p>
          )}
        </div>
      )}
    </div>
  );
}
