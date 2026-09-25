import { describe, expect, it } from "vitest";
import { generateLottoGames } from "./lotto-number-generator";

describe("generateLottoGames", () => {
  it("한 게임은 1~45 범위의 서로 다른 숫자 6개를 오름차순으로 반환한다", () => {
    const [game] = generateLottoGames(1);
    expect(game).toHaveLength(6);
    expect(new Set(game).size).toBe(6);
    for (const n of game) {
      expect(n).toBeGreaterThanOrEqual(1);
      expect(n).toBeLessThanOrEqual(45);
    }
    expect(game).toEqual([...game].sort((a, b) => a - b));
  });

  it("요청한 게임 수만큼 생성한다", () => {
    expect(generateLottoGames(1)).toHaveLength(1);
    expect(generateLottoGames(5)).toHaveLength(5);
  });

  it("게임 수가 1~5를 벗어나면 에러를 던진다", () => {
    expect(() => generateLottoGames(0)).toThrow();
    expect(() => generateLottoGames(6)).toThrow();
    expect(() => generateLottoGames(1.5)).toThrow();
  });

  it("여러 번 생성해도 매번 서로 다른 게임이 나온다(결정론적이지 않음)", () => {
    // 완전히 같은 조합이 반복될 확률은 극히 낮음(45C6 = 8,145,060분의 1) — 10번
    // 생성해서 전부 다르면 정상.
    const games = Array.from({ length: 10 }, () => generateLottoGames(1)[0].join(","));
    expect(new Set(games).size).toBe(10);
  });

  it("충분히 많이 생성하면 번호 1~45가 대략 고르게 나온다(편향 없음 확인용, 느슨한 검증)", () => {
    const counts = new Array(46).fill(0);
    const trials = 2000;
    for (let i = 0; i < trials; i += 1) {
      for (const n of generateLottoGames(1)[0]) counts[n] += 1;
    }
    const totalPicks = trials * 6;
    const expectedPerNumber = totalPicks / 45;
    // 완전 균등 분포에서도 표본 변동은 있으니 넉넉하게(기댓값의 60~140%) 허용.
    for (let n = 1; n <= 45; n += 1) {
      expect(counts[n]).toBeGreaterThan(expectedPerNumber * 0.6);
      expect(counts[n]).toBeLessThan(expectedPerNumber * 1.4);
    }
  });
});
