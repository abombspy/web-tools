import { describe, expect, it } from "vitest";
import { calculatePartTimeWage, type PartTimeWageRates } from "./part-time-wage";

// 실제 config/rates/labor.json 값과 별개로, 계산 로직만 검증하기 위해 고정된 요율을 사용한다.
const rates: PartTimeWageRates = {
  overtimePremium: { extendedNightHolidayRate: 0.5, holidayExcess8hRate: 1.0 },
  socialInsurance: {
    monthlyHoursExemptionThreshold: 60,
    nationalPension: { employeeRate: 0.0475 },
    healthInsurance: { employeeRate: 0.03595, longTermCareRateOfHealthPremium: 0.1314 },
    employmentInsurance: { employeeRate: 0.009 },
  },
  incomeTaxWithholding: {
    singleHouseholdZeroTaxMonthlyThreshold: 1060000,
    localIncomeTaxRateOfIncomeTax: 0.1,
  },
};

const baseInput = {
  hourlyWage: 10000,
  baseHours: 40,
  overtimeHours: 0,
  nightHours: 0,
  holidayHoursNormal: 0,
  holidayHoursExcess: 0,
  isFivePlusEmployees: true,
};

describe("calculatePartTimeWage", () => {
  it("5인 이상 사업장은 연장근로에 50% 가산이 붙는다", () => {
    const result = calculatePartTimeWage(
      { ...baseInput, baseHours: 0, overtimeHours: 10 },
      rates,
    );
    expect(result.breakdown.overtimePay).toBe(150000); // 10h * 10000 * 1.5
  });

  it("5인 미만 사업장은 가산수당이 붙지 않는다(경계값)", () => {
    const result = calculatePartTimeWage(
      { ...baseInput, baseHours: 0, overtimeHours: 10, isFivePlusEmployees: false },
      rates,
    );
    expect(result.breakdown.overtimePay).toBe(100000); // 가산 없이 기본 시급만
  });

  it("휴일근로 8시간 초과분은 100% 가산된다", () => {
    const result = calculatePartTimeWage(
      { ...baseInput, baseHours: 0, holidayHoursExcess: 2 },
      rates,
    );
    expect(result.breakdown.holidayExcessPay).toBe(40000); // 2h * 10000 * 2.0
  });

  it("월 근로시간이 60시간 미만이면 4대보험이 적용되지 않는다(경계값)", () => {
    const result = calculatePartTimeWage({ ...baseInput, baseHours: 59 }, rates);
    expect(result.socialInsuranceApplicable).toBe(false);
    expect(result.socialInsuranceDeduction.total).toBe(0);
  });

  it("월 근로시간이 정확히 60시간이면 4대보험이 적용된다(경계값)", () => {
    const result = calculatePartTimeWage({ ...baseInput, baseHours: 60 }, rates);
    expect(result.socialInsuranceApplicable).toBe(true);
    expect(result.socialInsuranceDeduction.total).toBeGreaterThan(0);
  });

  it("월급여가 106만원 미만이면 소득세 0원, 실수령액까지 계산된다", () => {
    // 60시간 * 10000 = 600,000원 (임계값 미만)
    const result = calculatePartTimeWage({ ...baseInput, baseHours: 60 }, rates);
    expect(result.grossPay).toBe(600000);
    expect(result.incomeTax).toEqual({ known: true, amount: 0 });
    expect(result.netPay).toBe(result.payAfterSocialInsurance);
  });

  it("월급여가 106만원 이상이면 소득세를 알 수 없고 실수령액도 계산하지 않는다", () => {
    // 120시간 * 10000 = 1,200,000원 (임계값 이상)
    const result = calculatePartTimeWage({ ...baseInput, baseHours: 120 }, rates);
    expect(result.grossPay).toBe(1200000);
    expect(result.incomeTax).toEqual({ known: false });
    expect(result.netPay).toBeNull();
    // 4대보험 공제 후 금액까지는 여전히 확정치로 제공된다
    expect(result.payAfterSocialInsurance).toBeGreaterThan(0);
  });

  it("장기요양보험료는 건강보험료(근로자 부담분)의 13.14%다", () => {
    const result = calculatePartTimeWage({ ...baseInput, baseHours: 60 }, rates);
    const expectedHealth = Math.round(600000 * 0.03595);
    const expectedLongTermCare = Math.round(expectedHealth * 0.1314);
    expect(result.socialInsuranceDeduction.healthInsurance).toBe(expectedHealth);
    expect(result.socialInsuranceDeduction.longTermCare).toBe(expectedLongTermCare);
  });
});
