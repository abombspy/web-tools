import { describe, expect, it } from "vitest";
import { calculateAgeZodiac, calculateKoreanZodiac, calculateWesternZodiac } from "./age-zodiac";

describe("calculateKoreanZodiac", () => {
  it("2020년은 쥐띠(rat), 2021년은 소띠(ox)다", () => {
    expect(calculateKoreanZodiac(2020)).toBe("rat");
    expect(calculateKoreanZodiac(2021)).toBe("ox");
  });

  it("기준연도보다 이전 연도도 올바르게 계산된다(음수 나머지 처리)", () => {
    expect(calculateKoreanZodiac(2019)).toBe("pig");
  });

  it("12년 주기로 같은 띠가 반복된다", () => {
    expect(calculateKoreanZodiac(2032)).toBe(calculateKoreanZodiac(2020));
  });
});

describe("calculateWesternZodiac", () => {
  it("2월 18일은 물병자리(aquarius), 2월 19일은 물고기자리(pisces)다(경계값)", () => {
    expect(calculateWesternZodiac(2, 18)).toBe("aquarius");
    expect(calculateWesternZodiac(2, 19)).toBe("pisces");
  });

  it("12월 21일은 사수자리(sagittarius), 12월 22일은 염소자리(capricorn)다(경계값, 연말 전환)", () => {
    expect(calculateWesternZodiac(12, 21)).toBe("sagittarius");
    expect(calculateWesternZodiac(12, 22)).toBe("capricorn");
  });

  it("1월 19일은 염소자리(capricorn), 1월 20일은 물병자리(aquarius)다(경계값, 연초 전환)", () => {
    expect(calculateWesternZodiac(1, 19)).toBe("capricorn");
    expect(calculateWesternZodiac(1, 20)).toBe("aquarius");
  });
});

describe("calculateAgeZodiac", () => {
  it("생일이 아직 지나지 않았으면 만 나이가 1살 어리다(경계값)", () => {
    const before = calculateAgeZodiac("2000-01-02", "2026-01-01");
    const after = calculateAgeZodiac("2000-01-01", "2026-01-01");
    expect(after.internationalAge - before.internationalAge).toBe(1);
  });
});
