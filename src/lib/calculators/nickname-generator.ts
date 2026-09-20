// 형용사+명사 조합 닉네임 생성. plan.md §4.8 "닉네임 생성기".
import { pickRandom } from "./random-picker";

export const ADJECTIVES = [
  "용감한", "조용한", "반짝이는", "느긋한", "엉뚱한", "씩씩한", "포근한", "산뜻한",
  "재빠른", "든든한", "말랑한", "새침한", "쾌활한", "은은한", "당당한", "귀여운",
];

export const NOUNS = [
  "고양이", "호랑이", "감자", "여우", "펭귄", "너구리", "다람쥐", "고래",
  "코알라", "부엉이", "수달", "사슴", "토끼", "판다", "라쿤", "물개",
];

export function generateNickname(): string {
  return `${pickRandom(ADJECTIVES)} ${pickRandom(NOUNS)}`;
}
