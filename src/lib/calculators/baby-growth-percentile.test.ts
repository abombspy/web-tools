import { describe, expect, it } from "vitest";
import { compareBabyGrowth } from "./baby-growth-percentile";

describe("compareBabyGrowth", () => {
  it("기준표에 있는 정확한 개월수는 그 값을 그대로 반환한다", () => {
    const result = compareBabyGrowth("male", 12, null, null);
    expect(result.referenceWeightKg).toBe(10.0);
    expect(result.referenceHeightCm).toBe(75.5);
  });

  it("기준표 사이의 개월수는 선형 보간으로 계산된다", () => {
    const result = compareBabyGrowth("male", 1.5, null, null); // 0개월과 3개월의 정확히 중간
    expect(result.referenceWeightKg).toBe(5.1); // (3.6+6.6)/2
    expect(result.referenceHeightCm).toBe(55.5); // (50.5+60.5)/2
  });

  it("실제 체중이 기준보다 10% 많으면 +10%로 표시된다", () => {
    const result = compareBabyGrowth("male", 12, 11.0, null); // 기준 10.0kg
    expect(result.weightDiffPercent).toBe(10);
  });

  it("측정값을 입력하지 않으면 비교값은 null이다", () => {
    const result = compareBabyGrowth("male", 12, null, null);
    expect(result.weightDiffPercent).toBeNull();
    expect(result.heightDiffPercent).toBeNull();
  });

  it("지원 범위(24개월)를 넘으면 마지막 기준값으로 고정된다(경계값)", () => {
    const at24 = compareBabyGrowth("female", 24, null, null);
    const beyond = compareBabyGrowth("female", 30, null, null);
    expect(beyond.referenceWeightKg).toBe(at24.referenceWeightKg);
    expect(beyond.referenceHeightCm).toBe(at24.referenceHeightCm);
  });

  it("남아와 여아 기준값은 서로 다르다", () => {
    const male = compareBabyGrowth("male", 6, null, null);
    const female = compareBabyGrowth("female", 6, null, null);
    expect(male.referenceWeightKg).not.toBe(female.referenceWeightKg);
  });
});
