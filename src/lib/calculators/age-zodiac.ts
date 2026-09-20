// 만 나이(행정기본법 등 "만 나이 통일법", 2023.6.28 시행) + 띠 + 별자리.
// plan.md §4.5 "만 나이·띠·별자리 계산기".
//
// 스코프 제한(중요): 띠는 전통적으로 음력 설날 또는 입춘을 기준으로 바뀌지만, 정확한 입춘
// 시각까지 반영하려면 매년 다른 절기 날짜를 정밀하게 계산해야 해서 이 계산기는 넣지 않았다.
// 대신 널리 쓰이는 "양력 1월 1일 기준 간이 계산법"을 쓰고, 음력 1~2월 생인 경우 실제
// 사주명리학적 띠와 다를 수 있다는 점을 UI에 명확히 알린다.
import { fullYearsBetween } from "./date-utils";

const ZODIAC_ANIMALS = [
  "쥐",
  "소",
  "호랑이",
  "토끼",
  "용",
  "뱀",
  "말",
  "양",
  "원숭이",
  "닭",
  "개",
  "돼지",
];
const ZODIAC_REFERENCE_YEAR = 2020; // 2020년(경자년) = 쥐띠

type WesternZodiacRange = { name: string; startMonth: number; startDay: number; endMonth: number; endDay: number };

const WESTERN_ZODIAC: WesternZodiacRange[] = [
  { name: "물병자리", startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
  { name: "물고기자리", startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
  { name: "양자리", startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
  { name: "황소자리", startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
  { name: "쌍둥이자리", startMonth: 5, startDay: 21, endMonth: 6, endDay: 21 },
  { name: "게자리", startMonth: 6, startDay: 22, endMonth: 7, endDay: 22 },
  { name: "사자자리", startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
  { name: "처녀자리", startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
  { name: "천칭자리", startMonth: 9, startDay: 23, endMonth: 10, endDay: 22 },
  { name: "전갈자리", startMonth: 10, startDay: 23, endMonth: 11, endDay: 22 },
  { name: "사수자리", startMonth: 11, startDay: 23, endMonth: 12, endDay: 21 },
  { name: "염소자리", startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
];

export function calculateKoreanZodiac(birthYear: number): string {
  const index = (((birthYear - ZODIAC_REFERENCE_YEAR) % 12) + 12) % 12;
  return ZODIAC_ANIMALS[index];
}

export function calculateWesternZodiac(month: number, day: number): string {
  // 염소자리처럼 연말~연초(12월~1월)에 걸치는 구간도 "시작월 이후" 또는 "종료월 이전"
  // 조건만으로 정확히 걸러진다(각 별자리가 정확히 두 개의 달에만 걸치기 때문).
  const match = WESTERN_ZODIAC.find(
    (z) => (month === z.startMonth && day >= z.startDay) || (month === z.endMonth && day <= z.endDay),
  );
  return match?.name ?? "염소자리";
}

export type AgeZodiacResult = {
  internationalAge: number;
  koreanZodiac: string;
  westernZodiac: string;
};

export function calculateAgeZodiac(birthDate: string, asOfDate: string): AgeZodiacResult {
  const birth = new Date(birthDate);
  const asOf = new Date(asOfDate);

  return {
    internationalAge: fullYearsBetween(birth, asOf),
    koreanZodiac: calculateKoreanZodiac(birth.getUTCFullYear()),
    westernZodiac: calculateWesternZodiac(birth.getUTCMonth() + 1, birth.getUTCDate()),
  };
}
