// 날짜만 있는 ISO 문자열("YYYY-MM-DD")은 ECMA-262 스펙상 UTC 자정으로 파싱되므로
// 로컬 타임존에 따라 날짜가 밀리는 문제 없이 안전하게 비교/연산할 수 있다.

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function daysBetween(start: Date, end: Date): number {
  return Math.round((end.getTime() - start.getTime()) / MS_PER_DAY);
}

/** start~end 사이의 "만" 개월 수 (만 나이 계산과 동일한 방식) */
export function fullMonthsBetween(start: Date, end: Date): number {
  let months =
    (end.getUTCFullYear() - start.getUTCFullYear()) * 12 +
    (end.getUTCMonth() - start.getUTCMonth());
  if (end.getUTCDate() < start.getUTCDate()) {
    months -= 1;
  }
  return Math.max(months, 0);
}

/** start~end 사이의 "만" 나이(년) */
export function fullYearsBetween(start: Date, end: Date): number {
  return Math.floor(fullMonthsBetween(start, end) / 12);
}

/**
 * 기준일(end) 이전 3개월의 역일수(달력 일수). 평균임금 산정(퇴직금·실업급여 등)에서
 * "최근 3개월 급여가 동일했다"고 가정하고 1일 평균임금을 역산할 때 쓴다.
 */
export function threeMonthWindowDays(end: Date): number {
  const start = new Date(end);
  start.setUTCMonth(start.getUTCMonth() - 3);
  return daysBetween(start, end);
}

/** 최근 3개월 월급이 monthlyWage로 동일했다고 가정했을 때의 1일 평균임금(반올림) */
export function averageDailyWageFromMonthlyWage(monthlyWage: number, end: Date): number {
  return Math.round((monthlyWage * 3) / threeMonthWindowDays(end));
}
