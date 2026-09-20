import { describe, expect, it } from "vitest";
import { calculateBmiCalorie, classifyBmi } from "./bmi-calorie";

describe("classifyBmi (대한비만학회 2022 기준)", () => {
  it("18.5 미만은 저체중, 정확히 18.5는 정상이다(경계값)", () => {
    expect(classifyBmi(18.4)).toBe("저체중");
    expect(classifyBmi(18.5)).toBe("정상");
  });

  it("23 미만은 정상, 정확히 23은 비만 전단계다(경계값)", () => {
    expect(classifyBmi(22.9)).toBe("정상");
    expect(classifyBmi(23)).toBe("비만 전단계");
  });

  it("정확히 25는 1단계 비만이다(경계값)", () => {
    expect(classifyBmi(24.9)).toBe("비만 전단계");
    expect(classifyBmi(25)).toBe("1단계 비만");
  });

  it("정확히 30은 2단계 고도비만, 35는 3단계 초고도비만이다(경계값)", () => {
    expect(classifyBmi(30)).toBe("2단계 고도비만");
    expect(classifyBmi(35)).toBe("3단계 초고도비만");
  });
});

describe("calculateBmiCalorie", () => {
  it("남성 BMR은 Mifflin-St Jeor 공식대로 계산된다", () => {
    const result = calculateBmiCalorie({
      sex: "male",
      age: 30,
      heightCm: 175,
      weightKg: 70,
      activityLevel: "sedentary",
      goal: "maintain",
    });
    expect(result.bmr).toBe(1649); // 10*70+6.25*175-5*30+5
    expect(result.bmi).toBe(22.9); // 70/1.75^2
    expect(result.bmiCategory).toBe("정상");
  });

  it("여성 BMR은 남성과 상수항이 다르다(-161)", () => {
    const result = calculateBmiCalorie({
      sex: "female",
      age: 30,
      heightCm: 160,
      weightKg: 55,
      activityLevel: "moderate",
      goal: "lose",
    });
    expect(result.bmr).toBe(1239); // 10*55+6.25*160-5*30-161
    expect(result.tdee).toBe(1920); // 1239*1.55
    expect(result.targetCalories).toBe(1420); // 1920-500(감량)
  });

  it("체중 감량 목표는 유지 목표보다 목표 칼로리가 500kcal 적다", () => {
    const maintain = calculateBmiCalorie({
      sex: "male",
      age: 30,
      heightCm: 175,
      weightKg: 70,
      activityLevel: "moderate",
      goal: "maintain",
    });
    const lose = calculateBmiCalorie({
      sex: "male",
      age: 30,
      heightCm: 175,
      weightKg: 70,
      activityLevel: "moderate",
      goal: "lose",
    });
    expect(maintain.targetCalories - lose.targetCalories).toBe(500);
  });
});
