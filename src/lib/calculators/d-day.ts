// 순수 날짜 차이 계산. plan.md §4.5 "D-day / 기념일 계산기".
import { daysBetween } from "./date-utils";

export type DDayResult = {
  daysDiff: number;
  isPast: boolean;
  isToday: boolean;
};

export function calculateDDay(targetDate: string, asOfDate: string): DDayResult {
  const target = new Date(targetDate);
  const asOf = new Date(asOfDate);

  const daysDiff = daysBetween(asOf, target);

  return { daysDiff, isPast: daysDiff < 0, isToday: daysDiff === 0 };
}
