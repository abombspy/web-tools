// Naegele's Rule (네겔레 법칙): 마지막 생리 시작일 + 280일(40주). plan.md §4.4 "출산 예정일 계산기".
// 의학적으로 널리 쓰이는 표준 산식이라 별도 웹 조사가 필요 없다.
import { daysBetween } from "./date-utils";

const PREGNANCY_DAYS = 280;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

export type DueDateResult = {
  dueDate: string;
  gestationalWeeks: number;
  gestationalDays: number;
  daysUntilDue: number;
};

export function calculateDueDate(lastPeriodDate: string, asOfDate: string): DueDateResult {
  const lmp = new Date(lastPeriodDate);
  const asOf = new Date(asOfDate);

  const due = new Date(lmp.getTime() + PREGNANCY_DAYS * MS_PER_DAY);

  const elapsedDays = daysBetween(lmp, asOf);
  const gestationalWeeks = Math.floor(elapsedDays / 7);
  const gestationalDays = elapsedDays % 7;

  const daysUntilDue = daysBetween(asOf, due);

  return {
    dueDate: due.toISOString().slice(0, 10),
    gestationalWeeks,
    gestationalDays,
    daysUntilDue,
  };
}
