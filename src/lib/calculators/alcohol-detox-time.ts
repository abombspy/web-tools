// 위드마크(Widmark) 공식 기반 혈중알코올농도(BAC) 추정. plan.md §4.4 "음주 후 해독 시간
// 추정기". 개인차(체질, 공복 여부, 간 기능 등)가 매우 커서 참고용 추정에 그친다(UI에 명시).
export type Sex = "male" | "female";

// 위드마크 계수(r): 성별에 따른 체내 알코올 분포율. 알코올 대사 속도(β): 시간당 BAC 감소율.
const WIDMARK_FACTOR: Record<Sex, number> = { male: 0.7, female: 0.6 };
const METABOLISM_RATE_PER_HOUR = 0.015; // %p/시간
const ALCOHOL_DENSITY = 0.8; // g/mL

export type AlcoholDetoxTimeInput = {
  sex: Sex;
  weightKg: number;
  volumeMl: number;
  abvPercent: number;
};

export type AlcoholDetoxTimeResult = {
  alcoholGrams: number;
  initialBac: number;
  hoursToSober: number;
};

export function calculateAlcoholDetoxTime(input: AlcoholDetoxTimeInput): AlcoholDetoxTimeResult {
  const alcoholGrams = input.volumeMl * (input.abvPercent / 100) * ALCOHOL_DENSITY;

  // 위드마크 공식은 체중을 g 단위로 쓴다(kg × 1000). 이걸 빼먹으면 BAC가 1000배로 부풀려진다.
  const weightGrams = input.weightKg * 1000;
  const initialBac = (alcoholGrams / (weightGrams * WIDMARK_FACTOR[input.sex])) * 100;
  const hoursToSober = initialBac / METABOLISM_RATE_PER_HOUR;

  return {
    alcoholGrams: Math.round(alcoholGrams * 10) / 10,
    initialBac: Math.round(initialBac * 1000) / 1000,
    hoursToSober: Math.round(hoursToSober * 10) / 10,
  };
}
