import { describe, expect, it } from "vitest";
import { getRandomIndex, pickRandom, randomMatch, shuffle } from "./random-picker";

describe("getRandomIndex", () => {
  it("항상 0 이상 length 미만의 값을 반환한다", () => {
    for (let i = 0; i < 100; i += 1) {
      const idx = getRandomIndex(5);
      expect(idx).toBeGreaterThanOrEqual(0);
      expect(idx).toBeLessThan(5);
    }
  });

  it("길이가 0 이하면 에러를 던진다(경계값)", () => {
    expect(() => getRandomIndex(0)).toThrow();
  });
});

describe("pickRandom", () => {
  it("빈 배열이면 에러를 던진다(경계값)", () => {
    expect(() => pickRandom([])).toThrow();
  });

  it("항상 원본 목록 안에 있는 값을 반환한다", () => {
    const items = ["a", "b", "c"];
    for (let i = 0; i < 50; i += 1) {
      expect(items).toContain(pickRandom(items));
    }
  });

  it("원소가 하나면 항상 그 값을 반환한다(경계값)", () => {
    expect(pickRandom(["only"])).toBe("only");
  });
});

describe("shuffle", () => {
  it("원본 배열의 원소를 모두 그대로 포함한다(순서만 바뀜)", () => {
    const items = [1, 2, 3, 4, 5];
    const shuffled = shuffle(items);
    expect(shuffled.sort()).toEqual(items.sort());
  });

  it("원본 배열을 바꾸지 않는다(불변성)", () => {
    const items = [1, 2, 3];
    const original = [...items];
    shuffle(items);
    expect(items).toEqual(original);
  });
});

describe("randomMatch", () => {
  it("참가자 수와 결과 수가 다르면 에러를 던진다(경계값)", () => {
    expect(() => randomMatch(["a", "b"], ["x"])).toThrow();
  });

  it("모든 참가자가 정확히 하나의 결과와 매칭된다", () => {
    const matches = randomMatch(["a", "b", "c"], ["x", "y", "z"]);
    expect(matches).toHaveLength(3);
    const matchedOutcomes = matches.map(([, outcome]) => outcome).sort();
    expect(matchedOutcomes).toEqual(["x", "y", "z"]);
  });
});
