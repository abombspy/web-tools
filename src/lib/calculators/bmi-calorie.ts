// BMI: 체중(kg)/키(m)². 비만도 분류는 대한비만학회 2022 진료지침(아시아인 기준, WHO 국제
// 기준과 다름). 기초대사량은 Mifflin-St Jeor 공식. plan.md §4.4 "BMI·기초대사량·목표 칼로리
// 계산기".

export type Sex = "male" | "female";
export type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "veryActive";
export type Goal = "lose" | "maintain" | "gain";

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
};

const GOAL_ADJUSTMENT_KCAL: Record<Goal, number> = {
  lose: -500,
  maintain: 0,
  gain: 500,
};

export type BmiCategory = "저체중" | "정상" | "비만 전단계" | "1단계 비만" | "2단계 고도비만" | "3단계 초고도비만";

export type BmiCalorieInput = {
  sex: Sex;
  age: number;
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  goal: Goal;
};

export type BmiCalorieResult = {
  bmi: number;
  bmiCategory: BmiCategory;
  bmr: number;
  tdee: number;
  targetCalories: number;
};

export function classifyBmi(bmi: number): BmiCategory {
  if (bmi < 18.5) return "저체중";
  if (bmi < 23) return "정상";
  if (bmi < 25) return "비만 전단계";
  if (bmi < 30) return "1단계 비만";
  if (bmi < 35) return "2단계 고도비만";
  return "3단계 초고도비만";
}

export function calculateBmiCalorie(input: BmiCalorieInput): BmiCalorieResult {
  const heightM = input.heightCm / 100;
  const bmi = input.weightKg / (heightM * heightM);

  const bmr =
    input.sex === "male"
      ? 10 * input.weightKg + 6.25 * input.heightCm - 5 * input.age + 5
      : 10 * input.weightKg + 6.25 * input.heightCm - 5 * input.age - 161;

  const tdee = bmr * ACTIVITY_MULTIPLIERS[input.activityLevel];
  const targetCalories = tdee + GOAL_ADJUSTMENT_KCAL[input.goal];

  return {
    bmi: Math.round(bmi * 10) / 10,
    bmiCategory: classifyBmi(bmi),
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    targetCalories: Math.round(targetCalories),
  };
}
