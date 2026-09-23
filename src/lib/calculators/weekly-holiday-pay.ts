// 근로기준법 제55조·시행령 제30조 (plan.md §4.1 "주휴수당 계산기")
// 주 소정근로시간 15시간 이상 + 해당 주 소정근로일 개근 시,
// (소정근로시간 ÷ 40, 40시간 상한) × 8 × 시급

export type WeeklyHolidayPayInput = {
  hourlyWage: number;
  scheduledWeeklyHours: number;
  fullAttendance: boolean;
};

// 코드로 반환하고, 화면 문구는 content/tools/{ko,en}/part-time/weekly-holiday-pay.json의
// reasons에서 코드로 조회한다(KO/EN 공통 메커니즘).
export type WeeklyHolidayPayIneligibleReason = "under_15_hours" | "absence";

export type WeeklyHolidayPayResult =
  | { eligible: false; reasonCode: WeeklyHolidayPayIneligibleReason; pay: 0 }
  | { eligible: true; pay: number; cappedHours: number };

export function calculateWeeklyHolidayPay({
  hourlyWage,
  scheduledWeeklyHours,
  fullAttendance,
}: WeeklyHolidayPayInput): WeeklyHolidayPayResult {
  if (scheduledWeeklyHours < 15) {
    return {
      eligible: false,
      reasonCode: "under_15_hours",
      pay: 0,
    };
  }
  if (!fullAttendance) {
    return {
      eligible: false,
      reasonCode: "absence",
      pay: 0,
    };
  }

  const cappedHours = Math.min(scheduledWeeklyHours, 40);
  const pay = Math.round((cappedHours / 40) * 8 * hourlyWage);
  return { eligible: true, pay, cappedHours };
}
