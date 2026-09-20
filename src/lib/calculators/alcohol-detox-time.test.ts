import { describe, expect, it } from "vitest";
import { calculateAlcoholDetoxTime } from "./alcohol-detox-time";

describe("calculateAlcoholDetoxTime", () => {
  it("소주 1병(360mL, 17도)을 마신 남성 70kg의 순수 알코올량은 약 49g이다", () => {
    const result = calculateAlcoholDetoxTime({
      sex: "male",
      weightKg: 70,
      volumeMl: 360,
      abvPercent: 17,
    });
    expect(result.alcoholGrams).toBe(49); // 360*0.17*0.8=48.96 -> 반올림
  });

  it("체중을 kg이 아니라 g 단위로 환산해 계산한다(단위 실수 방지 회귀 테스트)", () => {
    const result = calculateAlcoholDetoxTime({
      sex: "male",
      weightKg: 70,
      volumeMl: 360,
      abvPercent: 17,
    });
    // BAC가 0.1% 근처여야 한다(체중을 kg 그대로 쓰면 100배 더 큰 값이 나와 버그가 바로 드러남)
    expect(result.initialBac).toBeGreaterThan(0.05);
    expect(result.initialBac).toBeLessThan(0.2);
    expect(result.initialBac).toBe(0.1);
  });

  it("해독 시간은 초기 BAC를 시간당 분해율(0.015)로 나눈 값이다", () => {
    const result = calculateAlcoholDetoxTime({
      sex: "male",
      weightKg: 70,
      volumeMl: 360,
      abvPercent: 17,
    });
    expect(result.hoursToSober).toBeCloseTo(6.7, 1);
  });

  it("같은 조건이면 여성이 남성보다 BAC가 더 높게 나온다(위드마크 계수 차이)", () => {
    const male = calculateAlcoholDetoxTime({
      sex: "male",
      weightKg: 70,
      volumeMl: 360,
      abvPercent: 17,
    });
    const female = calculateAlcoholDetoxTime({
      sex: "female",
      weightKg: 70,
      volumeMl: 360,
      abvPercent: 17,
    });
    expect(female.initialBac).toBeGreaterThan(male.initialBac);
  });

  it("체중이 무거울수록 같은 음주량에서 BAC가 낮게 나온다", () => {
    const light = calculateAlcoholDetoxTime({
      sex: "male",
      weightKg: 60,
      volumeMl: 360,
      abvPercent: 17,
    });
    const heavy = calculateAlcoholDetoxTime({
      sex: "male",
      weightKg: 90,
      volumeMl: 360,
      abvPercent: 17,
    });
    expect(heavy.initialBac).toBeLessThan(light.initialBac);
  });
});
