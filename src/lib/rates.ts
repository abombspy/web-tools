import laborRates from "@config/rates/labor.json";
import taxRates from "@config/rates/tax.json";

type RatedValue<T> = T & { source: string; verified: boolean; note?: string };

type LaborYear = {
  minimumWage: RatedValue<{ hourly: number }>;
  overtimePremium: RatedValue<{
    extendedNightHolidayRate: number;
    holidayExcess8hRate: number;
  }>;
  socialInsurance: {
    monthlyHoursExemptionThreshold: number;
    note: string;
    nationalPension: RatedValue<{ employeeRate: number }>;
    healthInsurance: RatedValue<{
      employeeRate: number;
      longTermCareRateOfHealthPremium: number;
    }>;
    employmentInsurance: RatedValue<{ employeeRate: number }>;
  };
  incomeTaxWithholding: RatedValue<{
    singleHouseholdZeroTaxMonthlyThreshold: number;
    localIncomeTaxRateOfIncomeTax: number;
  }>;
  unemploymentBenefit: RatedValue<{
    rate: number;
    dailyCap: number;
    dailyFloorFormula: { minWageRatio: number; hoursPerDay: number };
    paymentDaysTable: {
      insuredYearsLessThan: number | null;
      under50Days: number;
      over50Days: number;
    }[];
  }>;
  parentalLeavePay: RatedValue<{
    tiers: { maxMonth: number; rate: number; cap: number }[];
    floor: number;
  }>;
};

type IndustryExpenseRate = {
  code: string;
  name: string;
  simplifiedRate: number;
  standardRate: number;
  sourceYear: number;
  verified: boolean;
};

type TaxYear = {
  withholdingTax: RatedValue<{
    businessIncomeRate: number;
    localIncomeTaxRateOfIncomeTax: number;
  }>;
  vat: RatedValue<{ rate: number }>;
  comprehensiveIncomeTax: RatedValue<{
    brackets: { upTo: number | null; rate: number; deduction: number }[];
    basicPersonalDeduction: number;
    simplifiedRateThreshold: number;
  }>;
  expenseRatesByIndustry: IndustryExpenseRate[];
  expenseRatesNote: string;
  customsDuty: RatedValue<{
    generalLimitUsd: number;
    usOriginLimitUsd: number;
    vatRate: number;
  }>;
};

const labor: Record<string, LaborYear> = laborRates;
const tax: Record<string, TaxYear> = taxRates;

function getLaborYear(year: string) {
  const entry = labor[year];
  if (!entry) {
    throw new Error(`config/rates/labor.json에 ${year}년 데이터가 없습니다.`);
  }
  return entry;
}

function getTaxYear(year: string) {
  const entry = tax[year];
  if (!entry) {
    throw new Error(`config/rates/tax.json에 ${year}년 데이터가 없습니다.`);
  }
  return entry;
}

export function getMinimumWage(year: string = "2026") {
  return getLaborYear(year).minimumWage;
}

export function getOvertimePremium(year: string = "2026") {
  return getLaborYear(year).overtimePremium;
}

export function getSocialInsurance(year: string = "2026") {
  return getLaborYear(year).socialInsurance;
}

export function getIncomeTaxWithholding(year: string = "2026") {
  return getLaborYear(year).incomeTaxWithholding;
}

export function getUnemploymentBenefit(year: string = "2026") {
  return getLaborYear(year).unemploymentBenefit;
}

export function getParentalLeavePay(year: string = "2026") {
  return getLaborYear(year).parentalLeavePay;
}

export function getWithholdingTax(year: string = "2026") {
  return getTaxYear(year).withholdingTax;
}

export function getVat(year: string = "2026") {
  return getTaxYear(year).vat;
}

export function getComprehensiveIncomeTax(year: string = "2026") {
  return getTaxYear(year).comprehensiveIncomeTax;
}

export function getExpenseRatesByIndustry(year: string = "2026") {
  return getTaxYear(year).expenseRatesByIndustry;
}

export function getCustomsDuty(year: string = "2026") {
  return getTaxYear(year).customsDuty;
}
