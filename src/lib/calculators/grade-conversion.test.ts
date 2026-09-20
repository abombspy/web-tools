import { describe, expect, it } from "vitest";
import { calculateCsatGrade, calculateSchoolGrade } from "./grade-conversion";

describe("calculateSchoolGrade (5등급제)", () => {
  it("석차백분율 10%는 1등급, 10.01%는 2등급이다(경계값)", () => {
    expect(calculateSchoolGrade(10, 100, "5-tier").grade).toBe(1);
    expect(calculateSchoolGrade(11, 100, "5-tier").grade).toBe(2);
  });

  it("석차백분율 34%는 2등급, 그 다음은 3등급이다(경계값)", () => {
    expect(calculateSchoolGrade(34, 100, "5-tier").grade).toBe(2);
    expect(calculateSchoolGrade(35, 100, "5-tier").grade).toBe(3);
  });

  it("꼴찌는 5등급이다", () => {
    expect(calculateSchoolGrade(100, 100, "5-tier").grade).toBe(5);
  });
});

describe("calculateSchoolGrade (9등급제)", () => {
  it("석차백분율 4%는 1등급, 4.01%는 2등급이다(경계값)", () => {
    expect(calculateSchoolGrade(4, 100, "9-tier").grade).toBe(1);
    expect(calculateSchoolGrade(5, 100, "9-tier").grade).toBe(2);
  });

  it("꼴찌는 9등급이다", () => {
    expect(calculateSchoolGrade(100, 100, "9-tier").grade).toBe(9);
  });

  it("석차백분율도 함께 계산해 반환한다", () => {
    const result = calculateSchoolGrade(23, 200, "9-tier");
    expect(result.percentile).toBe(11.5); // 23/200*100
  });
});

describe("calculateCsatGrade", () => {
  it("수능은 내신 9등급제와 같은 누적 구간표를 쓴다", () => {
    expect(calculateCsatGrade(4)).toBe(1);
    expect(calculateCsatGrade(11)).toBe(2);
    expect(calculateCsatGrade(96)).toBe(8);
    expect(calculateCsatGrade(100)).toBe(9);
  });
});
