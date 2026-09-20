// 관공서의 공휴일에 관한 규정 기준 공휴일을 제외한 평일(영업일) 계산.
// plan.md §4.5 "근무일수(영업일) 계산기". 공휴일 데이터는 config/holidays/{year}.json.
export type Holiday = { date: string; name: string };

export type BusinessDaysResult = {
  totalDays: number;
  businessDays: number;
  weekendDays: number;
  holidayDays: number;
};

export function calculateBusinessDays(
  startDate: string,
  endDate: string,
  holidays: Holiday[],
): BusinessDaysResult {
  const holidaySet = new Set(holidays.map((h) => h.date));

  const cursor = new Date(startDate);
  const end = new Date(endDate);

  let totalDays = 0;
  let businessDays = 0;
  let weekendDays = 0;
  let holidayDays = 0;

  while (cursor.getTime() <= end.getTime()) {
    totalDays += 1;
    const dayOfWeek = cursor.getUTCDay(); // 0=일, 6=토
    const dateStr = cursor.toISOString().slice(0, 10);

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      weekendDays += 1;
    } else if (holidaySet.has(dateStr)) {
      holidayDays += 1;
    } else {
      businessDays += 1;
    }

    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  return { totalDays, businessDays, weekendDays, holidayDays };
}
