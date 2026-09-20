import { describe, expect, it } from "vitest";
import { calculateUnemploymentBenefit, type UnemploymentBenefitRates } from "./unemployment-benefit";

const rates: UnemploymentBenefitRates = {
  rate: 0.6,
  dailyCap: 68100,
  dailyFloorFormula: { minWageRatio: 0.8, hoursPerDay: 8 },
  paymentDaysTable: [
    { insuredYearsLessThan: 1, under50Days: 120, over50Days: 120 },
    { insuredYearsLessThan: 3, under50Days: 150, over50Days: 180 },
    { insuredYearsLessThan: 5, under50Days: 180, over50Days: 210 },
    { insuredYearsLessThan: 10, under50Days: 210, over50Days: 240 },
    { insuredYearsLessThan: null, under50Days: 240, over50Days: 270 },
  ],
};
const minimumHourlyWage = 10320;
const separationDate = "2026-07-01"; // 직전 3개월(2026-04-01~07-01) = 91일

describe("calculateUnemploymentBenefit", () => {
  it("하한액 공식은 최저시급×8×80%다", () => {
    const result = calculateUnemploymentBenefit(
      { birthDate: "1990-01-01", separationDate, insuredYears: 2, monthlyWage: 910000 },
      rates,
      minimumHourlyWage,
    );
    expect(result.dailyFloor).toBe(66048); // 10320*8*0.8
  });

  it("평균임금이 낮으면 구직급여일액이 하한액으로 올라간다", () => {
    // 월급 910,000원 -> 평균임금(1일) 30,000원 -> 60% = 18,000원(하한액 미만)
    const result = calculateUnemploymentBenefit(
      { birthDate: "1990-01-01", separationDate, insuredYears: 2, monthlyWage: 910000 },
      rates,
      minimumHourlyWage,
    );
    expect(result.averageDailyWage).toBe(30000);
    expect(result.dailyBenefit).toBe(66048);
  });

  it("평균임금이 높으면 구직급여일액이 상한액에서 잘린다", () => {
    const result = calculateUnemploymentBenefit(
      { birthDate: "1990-01-01", separationDate, insuredYears: 2, monthlyWage: 7000000 },
      rates,
      minimumHourlyWage,
    );
    expect(result.dailyBenefit).toBe(68100);
  });

  it("중간 소득자는 평균임금의 60%가 그대로 적용된다(상하한 미적용)", () => {
    // 월급 3,367,000원 -> 평균임금 111,000원 -> 60% = 66,600원 (66,048~68,100 사이)
    const result = calculateUnemploymentBenefit(
      { birthDate: "1990-01-01", separationDate, insuredYears: 2, monthlyWage: 3367000 },
      rates,
      minimumHourlyWage,
    );
    expect(result.averageDailyWage).toBe(111000);
    expect(result.dailyBenefit).toBe(66600);
  });

  it("가입기간 1년 미만은 나이와 무관하게 120일이다", () => {
    const under50 = calculateUnemploymentBenefit(
      { birthDate: "1990-01-01", separationDate, insuredYears: 0.9, monthlyWage: 3000000 },
      rates,
      minimumHourlyWage,
    );
    const over50 = calculateUnemploymentBenefit(
      { birthDate: "1970-01-01", separationDate, insuredYears: 0.9, monthlyWage: 3000000 },
      rates,
      minimumHourlyWage,
    );
    expect(under50.paymentDays).toBe(120);
    expect(over50.paymentDays).toBe(120);
  });

  it("만 50세를 넘기면 같은 가입기간이라도 소정급여일수가 늘어난다(경계값)", () => {
    const under50 = calculateUnemploymentBenefit(
      { birthDate: "1976-07-02", separationDate, insuredYears: 2, monthlyWage: 3000000 }, // 만 49세
      rates,
      minimumHourlyWage,
    );
    const exactly50 = calculateUnemploymentBenefit(
      { birthDate: "1976-07-01", separationDate, insuredYears: 2, monthlyWage: 3000000 }, // 만 50세
      rates,
      minimumHourlyWage,
    );
    expect(under50.age).toBe(49);
    expect(under50.paymentDays).toBe(150);
    expect(exactly50.age).toBe(50);
    expect(exactly50.paymentDays).toBe(180);
  });

  it("가입기간 10년 이상은 최대 구간(240/270일)이 적용된다", () => {
    const result = calculateUnemploymentBenefit(
      { birthDate: "1970-01-01", separationDate, insuredYears: 15, monthlyWage: 3000000 },
      rates,
      minimumHourlyWage,
    );
    expect(result.paymentDays).toBe(270);
  });

  it("총 수령액은 구직급여일액 × 소정급여일수다", () => {
    const result = calculateUnemploymentBenefit(
      { birthDate: "1990-01-01", separationDate, insuredYears: 2, monthlyWage: 3367000 },
      rates,
      minimumHourlyWage,
    );
    expect(result.totalBenefit).toBe(result.dailyBenefit * result.paymentDays);
    expect(result.totalBenefit).toBe(66600 * 150);
  });
});
