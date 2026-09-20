// 이유식 단계별 급여 가이드(초기·중기·후기·완료기). plan.md §4.4 "이유식 단계별 양 계산기".
// 정부 공식 수치표가 아닌 소아과·육아 정보 자료를 교차 검색해 얻은 일반적인 권장 범위이며,
// 아기마다 발달 속도가 달라 범위가 넓다(스코프 제한, UI에 명시).

export type BabyFoodStage = {
  name: string;
  minMonth: number;
  maxMonth: number;
  mealsPerDay: string;
  portionPerMealG: string;
  dailyTotalG: string;
  description: string;
};

export const BABY_FOOD_STAGES: BabyFoodStage[] = [
  {
    name: "초기 이유식",
    minMonth: 4,
    maxMonth: 6,
    mealsPerDay: "1회",
    portionPerMealG: "5~80ml",
    dailyTotalG: "5~80ml",
    description: "묽은 미음부터 시작해 삼키는 연습을 하는 단계",
  },
  {
    name: "중기 이유식",
    minMonth: 7,
    maxMonth: 8,
    mealsPerDay: "2회",
    portionPerMealG: "50~100g",
    dailyTotalG: "100~200g",
    description: "농도를 높여가며 으깨먹는 연습을 하는 단계",
  },
  {
    name: "후기 이유식",
    minMonth: 9,
    maxMonth: 11,
    mealsPerDay: "3회",
    portionPerMealG: "90~120g",
    dailyTotalG: "270~360g",
    description: "덩어리 음식을 도입해 씹는 연습을 하는 단계",
  },
  {
    name: "완료기 이유식",
    minMonth: 12,
    maxMonth: 15,
    mealsPerDay: "3회 + 간식",
    portionPerMealG: "100~130g",
    dailyTotalG: "300~400g",
    description: "진밥과 부드러운 반찬으로 유아식에 가까워지는 단계",
  },
];

export function findBabyFoodStage(ageMonths: number): BabyFoodStage {
  const stage = BABY_FOOD_STAGES.find((s) => ageMonths >= s.minMonth && ageMonths <= s.maxMonth);
  if (stage) return stage;
  if (ageMonths < BABY_FOOD_STAGES[0].minMonth) return BABY_FOOD_STAGES[0];
  return BABY_FOOD_STAGES[BABY_FOOD_STAGES.length - 1];
}
