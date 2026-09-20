// 근로기준법 제56조(연장·야간·휴일수당) + 국민연금법·국민건강보험법·고용보험법(4대보험) +
// 소득세법 시행령 별표2(근로소득 간이세액표) 기반. plan.md §4.1 "알바 월급 계산기".
//
// 이 계산기는 주휴수당을 포함하지 않는다(별도로 "주휴수당 계산기"를 사용).
// 월급여액이 근로소득세 원천징수 0원 구간(1인 가구 기준)을 넘으면, 정확한 세액은
// 국세청 근로소득 간이세액표를 따라야 하므로 이 계산기는 추정치를 만들어내지 않고
// "4대보험 공제 후 금액"까지만 확정치로 제공한다.

export type PartTimeWageInput = {
  hourlyWage: number;
  /** 기본(가산 없는) 근로시간 */
  baseHours: number;
  /** 연장근로시간 (8시간 이내 가산 대상) */
  overtimeHours: number;
  /** 야간근로시간 (22~06시) */
  nightHours: number;
  /** 휴일근로시간 중 8시간 이내분 */
  holidayHoursNormal: number;
  /** 휴일근로시간 중 8시간 초과분 */
  holidayHoursExcess: number;
  /** 상시근로자 5인 이상 사업장 여부 (5인 미만은 가산수당 미적용) */
  isFivePlusEmployees: boolean;
};

export type PartTimeWageRates = {
  overtimePremium: { extendedNightHolidayRate: number; holidayExcess8hRate: number };
  socialInsurance: {
    monthlyHoursExemptionThreshold: number;
    nationalPension: { employeeRate: number };
    healthInsurance: { employeeRate: number; longTermCareRateOfHealthPremium: number };
    employmentInsurance: { employeeRate: number };
  };
  incomeTaxWithholding: {
    singleHouseholdZeroTaxMonthlyThreshold: number;
    localIncomeTaxRateOfIncomeTax: number;
  };
};

export type PartTimeWageResult = {
  /** 시간대별 세전 지급액 내역 */
  breakdown: {
    basePay: number;
    overtimePay: number;
    nightPay: number;
    holidayNormalPay: number;
    holidayExcessPay: number;
  };
  grossPay: number;
  totalMonthlyHours: number;
  socialInsuranceApplicable: boolean;
  socialInsuranceDeduction: {
    nationalPension: number;
    healthInsurance: number;
    longTermCare: number;
    employmentInsurance: number;
    total: number;
  };
  payAfterSocialInsurance: number;
  /** 월급여가 원천징수 0원 구간(1인 가구 기준) 안에 들어와서 세액을 확정할 수 있는 경우에만 값이 있다 */
  incomeTax: { known: true; amount: 0 } | { known: false };
  localIncomeTax: { known: true; amount: 0 } | { known: false };
  /** incomeTax.known이 true일 때만 계산된다 */
  netPay: number | null;
};

export function calculatePartTimeWage(
  input: PartTimeWageInput,
  rates: PartTimeWageRates,
): PartTimeWageResult {
  const {
    hourlyWage,
    baseHours,
    overtimeHours,
    nightHours,
    holidayHoursNormal,
    holidayHoursExcess,
    isFivePlusEmployees,
  } = input;

  const premiumRate = isFivePlusEmployees ? rates.overtimePremium.extendedNightHolidayRate : 0;
  const excessPremiumRate = isFivePlusEmployees ? rates.overtimePremium.holidayExcess8hRate : 0;

  const basePay = Math.round(baseHours * hourlyWage);
  const overtimePay = Math.round(overtimeHours * hourlyWage * (1 + premiumRate));
  const nightPay = Math.round(nightHours * hourlyWage * (1 + premiumRate));
  const holidayNormalPay = Math.round(holidayHoursNormal * hourlyWage * (1 + premiumRate));
  const holidayExcessPay = Math.round(holidayHoursExcess * hourlyWage * (1 + excessPremiumRate));

  const grossPay = basePay + overtimePay + nightPay + holidayNormalPay + holidayExcessPay;
  const totalMonthlyHours =
    baseHours + overtimeHours + nightHours + holidayHoursNormal + holidayHoursExcess;

  const socialInsuranceApplicable =
    totalMonthlyHours >= rates.socialInsurance.monthlyHoursExemptionThreshold;

  const nationalPension = socialInsuranceApplicable
    ? Math.round(grossPay * rates.socialInsurance.nationalPension.employeeRate)
    : 0;
  const healthInsurance = socialInsuranceApplicable
    ? Math.round(grossPay * rates.socialInsurance.healthInsurance.employeeRate)
    : 0;
  const longTermCare = socialInsuranceApplicable
    ? Math.round(
        healthInsurance * rates.socialInsurance.healthInsurance.longTermCareRateOfHealthPremium,
      )
    : 0;
  const employmentInsurance = socialInsuranceApplicable
    ? Math.round(grossPay * rates.socialInsurance.employmentInsurance.employeeRate)
    : 0;

  const totalSocialInsurance = nationalPension + healthInsurance + longTermCare + employmentInsurance;
  const payAfterSocialInsurance = grossPay - totalSocialInsurance;

  const incomeTaxIsZero = grossPay < rates.incomeTaxWithholding.singleHouseholdZeroTaxMonthlyThreshold;
  const incomeTax: PartTimeWageResult["incomeTax"] = incomeTaxIsZero
    ? { known: true, amount: 0 }
    : { known: false };
  const localIncomeTax: PartTimeWageResult["localIncomeTax"] = incomeTaxIsZero
    ? { known: true, amount: 0 }
    : { known: false };

  const netPay = incomeTax.known && localIncomeTax.known ? payAfterSocialInsurance : null;

  return {
    breakdown: { basePay, overtimePay, nightPay, holidayNormalPay, holidayExcessPay },
    grossPay,
    totalMonthlyHours,
    socialInsuranceApplicable,
    socialInsuranceDeduction: {
      nationalPension,
      healthInsurance,
      longTermCare,
      employmentInsurance,
      total: totalSocialInsurance,
    },
    payAfterSocialInsurance,
    incomeTax,
    localIncomeTax,
    netPay,
  };
}
