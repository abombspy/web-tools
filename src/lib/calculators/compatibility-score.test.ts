import { describe, expect, it } from "vitest";
import { calculateCompatibilityScore, getCompatibilityComment } from "./compatibility-score";

describe("calculateCompatibilityScore", () => {
  it("같은 입력이면 항상 같은 점수가 나온다(결정적)", () => {
    const a = calculateCompatibilityScore("민수", "영희");
    const b = calculateCompatibilityScore("민수", "영희");
    expect(a).toBe(b);
  });

  it("순서를 바꿔도 같은 점수가 나온다(대칭성)", () => {
    const a = calculateCompatibilityScore("민수", "영희");
    const b = calculateCompatibilityScore("영희", "민수");
    expect(a).toBe(b);
  });

  it("점수는 항상 0~100 사이다", () => {
    for (const [x, y] of [
      ["a", "b"],
      ["가나다", "라마바"],
      ["INFP", "ENFJ"],
      ["", "x"],
    ]) {
      const score = calculateCompatibilityScore(x, y);
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(100);
    }
  });

  it("서로 다른 입력쌍은 (거의 항상) 다른 점수를 준다", () => {
    const a = calculateCompatibilityScore("민수", "영희");
    const b = calculateCompatibilityScore("철수", "지영");
    expect(a).not.toBe(b);
  });
});

describe("getCompatibilityComment", () => {
  it("점수 구간별로 다른 코멘트를 반환한다(경계값)", () => {
    expect(getCompatibilityComment(90)).toContain("천생연분");
    expect(getCompatibilityComment(89)).not.toContain("천생연분");
    expect(getCompatibilityComment(0)).toBeTruthy();
    expect(getCompatibilityComment(100)).toBeTruthy();
  });
});
