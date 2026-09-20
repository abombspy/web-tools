import { describe, expect, it } from "vitest";
import { calculateGpa } from "./gpa";

describe("calculateGpa", () => {
  it("전 과목 A+면 4.5만점이 그대로 나오고 4.3만점으로 환산된다", () => {
    const result = calculateGpa([{ credit: 3, grade: "A+" }]);
    expect(result.gpa45).toBe(4.5);
    expect(result.gpa43).toBe(4.3);
  });

  it("학점 가중평균으로 계산된다", () => {
    const result = calculateGpa([
      { credit: 3, grade: "A+" }, // 4.5
      { credit: 3, grade: "C0" }, // 2.0
    ]);
    expect(result.totalCredits).toBe(6);
    expect(result.gpa45).toBe(3.25); // (3*4.5+3*2.0)/6
  });

  it("과목이 없으면 0으로 나누지 않고 0을 반환한다(경계값)", () => {
    const result = calculateGpa([]);
    expect(result.gpa45).toBe(0);
    expect(result.totalCredits).toBe(0);
  });

  it("F 학점은 0점으로 계산되지만 이수학점에는 포함된다", () => {
    const result = calculateGpa([
      { credit: 3, grade: "A+" },
      { credit: 3, grade: "F" },
    ]);
    expect(result.totalCredits).toBe(6);
    expect(result.gpa45).toBe(2.25); // (3*4.5+3*0)/6
  });
});
