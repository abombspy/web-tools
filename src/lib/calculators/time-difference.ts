// IANA 타임존 데이터(Intl API 내장)를 이용한 시차 계산. plan.md §4.5 "시차 계산기".
// 오프셋을 직접 하드코딩하지 않고 런타임의 타임존 데이터베이스를 그대로 써서, 서머타임(DST)
// 적용 여부까지 날짜에 맞게 정확히 반영한다.

export function getUtcOffsetMinutes(timeZone: string, atDate: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(atDate);

  const map: Record<string, string> = {};
  for (const part of parts) {
    map[part.type] = part.value;
  }

  // 자정을 24시로 표기하는 로케일 처리(hour "24" -> 0)
  const hour = Number(map.hour) % 24;

  const asUtcMillis = Date.UTC(
    Number(map.year),
    Number(map.month) - 1,
    Number(map.day),
    hour,
    Number(map.minute),
    Number(map.second),
  );

  return Math.round((asUtcMillis - atDate.getTime()) / 60000);
}

export type TimeDifferenceResult = {
  city1UtcOffsetMinutes: number;
  city2UtcOffsetMinutes: number;
  hoursDiff: number;
};

export function calculateTimeDifference(
  timeZone1: string,
  timeZone2: string,
  atDate: Date,
): TimeDifferenceResult {
  const city1UtcOffsetMinutes = getUtcOffsetMinutes(timeZone1, atDate);
  const city2UtcOffsetMinutes = getUtcOffsetMinutes(timeZone2, atDate);

  return {
    city1UtcOffsetMinutes,
    city2UtcOffsetMinutes,
    hoursDiff: (city2UtcOffsetMinutes - city1UtcOffsetMinutes) / 60,
  };
}
