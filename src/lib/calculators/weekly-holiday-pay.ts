// 근로기준법 제55조·시행령 제30조 (plan.md §4.1 "주휴수당 계산기")
// 주 소정근로시간 15시간 이상 + 해당 주 소정근로일 개근 시,
// (소정근로시간 ÷ 40, 40시간 상한) × 8 × 시급

export type WeeklyHolidayPayInput = {
  hourlyWage: number;
  scheduledWeeklyHours: number;
  fullAttendance: boolean;
};

export type WeeklyHolidayPayResult =
  | { eligible: false; reason: string; pay: 0 }
  | { eligible: true; pay: number; cappedHours: number };

export function calculateWeeklyHolidayPay({
  hourlyWage,
  scheduledWeeklyHours,
  fullAttendance,
}: WeeklyHolidayPayInput): WeeklyHolidayPayResult {
  if (scheduledWeeklyHours < 15) {
    return {
      eligible: false,
      reason: "주 소정근로시간이 15시간 미만이라 주휴수당 발생 조건을 충족하지 않습니다.",
      pay: 0,
    };
  }
  if (!fullAttendance) {
    return {
      eligible: false,
      reason: "해당 주 소정근로일에 결근이 있어 주휴수당이 발생하지 않습니다.",
      pay: 0,
    };
  }

  const cappedHours = Math.min(scheduledWeeklyHours, 40);
  const pay = Math.round((cappedHours / 40) * 8 * hourlyWage);
  return { eligible: true, pay, cappedHours };
}
