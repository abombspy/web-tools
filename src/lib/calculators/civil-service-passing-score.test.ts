import { describe, expect, it } from "vitest";
import { compareCivilServiceScore } from "./civil-service-passing-score";

describe("compareCivilServiceScore", () => {
  it("과거 합격선의 평균·최고·최저를 계산한다", () => {
    const result = compareCivilServiceScore(90, [
      { year: "2023", score: 85 },
      { year: "2024", score: 88 },
      { year: "2025", score: 87 },
    ]);
    expect(result.averageCutoff).toBe(86.67);
    expect(result.maxCutoff).toBe(88);
    expect(result.minCutoff).toBe(85);
  });

  it("본인 점수가 평균보다 높으면 격차가 양수다", () => {
    const result = compareCivilServiceScore(90, [{ year: "2025", score: 85 }]);
    expect(result.gapFromAverage).toBe(5);
  });

  it("본인 점수가 낮으면 격차가 음수다", () => {
    const result = compareCivilServiceScore(80, [{ year: "2025", score: 85 }]);
    expect(result.gapFromAverage).toBe(-5);
  });

  it("과거 합격선이 하나뿐이면 평균·최고·최저가 모두 같다", () => {
    const result = compareCivilServiceScore(90, [{ year: "2025", score: 85 }]);
    expect(result.averageCutoff).toBe(85);
    expect(result.maxCutoff).toBe(85);
    expect(result.minCutoff).toBe(85);
  });
});
