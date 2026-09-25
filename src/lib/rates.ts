import holidays2026 from "@config/holidays/2026.json";
import funRates from "@config/rates/fun.json";
import laborRates from "@config/rates/labor.json";
import livingRates from "@config/rates/living.json";
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

type ElectricityTier = { upTo: number | null; basicFee: number; unitPrice: number };

type FeeBracket = { upTo: number | null; rate: number; cap: number | null };

type LivingYear = {
  electricityBill: RatedValue<{
    general: { tiers: ElectricityTier[] };
    summer: { tiers: ElectricityTier[] };
    summerMonths: number[];
    vatRate: number;
    fundRate: number;
  }>;
  realEstateAgentFee: RatedValue<{
    sale: { brackets: FeeBracket[] };
    lease: { brackets: FeeBracket[] };
  }>;
  movingCostEstimate: RatedValue<{
    pricePerPyeong: { general: number; semiPacked: number; fullPacked: number };
    minimumCost: { general: number; semiPacked: number; fullPacked: number };
    ladderTruckFeePerLocation: number;
    rangeLowerMultiplier: number;
    rangeUpperMultiplier: number;
  }>;
};

type FunRates = {
  lottoFrequency: {
    asOfDrawNo: number;
    asOfDrawDate: string;
    totalDraws: number;
    mainNumberFrequency: RatedValue<{ value: Record<string, number> }>;
    bonusNumberFrequency: RatedValue<{ value: Record<string, number> }>;
  };
};

const labor: Record<string, LaborYear> = laborRates;
const tax: Record<string, TaxYear> = taxRates;
const living: Record<string, LivingYear> = livingRates;
const fun: FunRates = funRates;

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

function getLivingYear(year: string) {
  const entry = living[year];
  if (!entry) {
    throw new Error(`config/rates/living.json에 ${year}년 데이터가 없습니다.`);
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

export function getElectricityBillRates(year: string = "2026") {
  return getLivingYear(year).electricityBill;
}

export function getRealEstateAgentFeeRates(year: string = "2026") {
  return getLivingYear(year).realEstateAgentFee;
}

export function getMovingCostEstimateRates(year: string = "2026") {
  return getLivingYear(year).movingCostEstimate;
}

type HolidayYear = {
  year: number;
  holidays: { date: string; name: string }[];
  source: string;
  verified: boolean;
  note: string;
};

const holidaysByYear: Record<string, HolidayYear> = { "2026": holidays2026 };

export function getHolidays(year: string = "2026") {
  const entry = holidaysByYear[year];
  if (!entry) {
    throw new Error(`config/holidays/${year}.json이 없습니다.`);
  }
  return entry;
}

export function getLottoFrequency() {
  return fun.lottoFrequency;
}
