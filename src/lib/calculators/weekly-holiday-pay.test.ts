import { describe, expect, it } from "vitest";
import { calculateWeeklyHolidayPay } from "./weekly-holiday-pay";

// 경계값 케이스는 .docs/verification-checklist.md의 "주휴수당 계산기" 항목과 일치시킨다.
describe("calculateWeeklyHolidayPay", () => {
  it("주 15시간 미만이면 지급 대상이 아니다", () => {
    const result = calculateWeeklyHolidayPay({
      hourlyWage: 10320,
      scheduledWeeklyHours: 14,
      fullAttendance: true,
    });
    expect(result.eligible).toBe(false);
    expect(result.pay).toBe(0);
  });

  it("결근이 있으면 지급 대상이 아니다", () => {
    const result = calculateWeeklyHolidayPay({
      hourlyWage: 10320,
      scheduledWeeklyHours: 20,
      fullAttendance: false,
    });
    expect(result.eligible).toBe(false);
    expect(result.pay).toBe(0);
  });

  it("주 40시간 초과분은 8시간으로 고정된다", () => {
    const result = calculateWeeklyHolidayPay({
      hourlyWage: 10000,
      scheduledWeeklyHours: 52,
      fullAttendance: true,
    });
    expect(result.eligible).toBe(true);
    if (result.eligible) {
      expect(result.cappedHours).toBe(40);
      expect(result.pay).toBe(80000); // 8h * 10000원
    }
  });

  it("정상 케이스: 주 20시간 근무 시 절반(4시간)만큼 지급된다", () => {
    const result = calculateWeeklyHolidayPay({
      hourlyWage: 10320,
      scheduledWeeklyHours: 20,
      fullAttendance: true,
    });
    expect(result.eligible).toBe(true);
    if (result.eligible) {
      expect(result.cappedHours).toBe(20);
      expect(result.pay).toBe(41280); // (20/40)*8*10320
    }
  });

  it("정확히 15시간이면 지급 대상이다 (경계값)", () => {
    const result = calculateWeeklyHolidayPay({
      hourlyWage: 10320,
      scheduledWeeklyHours: 15,
      fullAttendance: true,
    });
    expect(result.eligible).toBe(true);
  });
});
