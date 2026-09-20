// 소득세법(종합소득세 누진세율) + 업종별 기준·단순경비율. plan.md §4.2 "종합소득세 예상 계산기".
//
// 스코프 제한(사용자 확인):
// - 업종은 상위 6개(1인미디어, 저술가, 학원강사, 배달라이더, IT프리랜서, 직접입력)만 지원.
// - 기본공제는 본인 1인(150만원)만 반영, 부양가족 공제·세액공제 등은 미반영(간이 계산).
// - 단순경비율 적용 기준(직전연도 수입 2,400만원)은 인적용역(940번대) 업종 기준을 그대로 씀.

export type IncomeTaxBracket = { upTo: number | null; rate: number; deduction: number };

export type ComprehensiveIncomeTaxRates = {
  brackets: IncomeTaxBracket[];
  basicPersonalDeduction: number;
  simplifiedRateThreshold: number;
};

export type IndustryExpenseRate = {
  code: string;
  name: string;
  simplifiedRate: number;
  standardRate: number;
};

export type ComprehensiveIncomeTaxInput = {
  annualRevenue: number;
  industryCode: string;
  /** industryCode가 "custom"일 때만 사용 */
  customExpenseRate?: number;
};

export type ComprehensiveIncomeTaxResult = {
  appliedExpenseRateType: "simplified" | "standard" | "custom";
  appliedExpenseRate: number;
  expenseAmount: number;
  businessIncome: number;
  taxBase: number;
  calculatedTax: number;
};

export function calculateComprehensiveIncomeTax(
  input: ComprehensiveIncomeTaxInput,
  rates: ComprehensiveIncomeTaxRates,
  industries: IndustryExpenseRate[],
): ComprehensiveIncomeTaxResult {
  let appliedExpenseRateType: ComprehensiveIncomeTaxResult["appliedExpenseRateType"];
  let appliedExpenseRate: number;

  if (input.industryCode === "custom") {
    appliedExpenseRateType = "custom";
    appliedExpenseRate = input.customExpenseRate ?? 0;
  } else {
    const industry = industries.find((i) => i.code === input.industryCode);
    if (!industry) {
      throw new Error(`알 수 없는 업종코드: ${input.industryCode}`);
    }
    if (input.annualRevenue < rates.simplifiedRateThreshold) {
      appliedExpenseRateType = "simplified";
      appliedExpenseRate = industry.simplifiedRate;
    } else {
      appliedExpenseRateType = "standard";
      appliedExpenseRate = industry.standardRate;
    }
  }

  const expenseAmount = Math.round(input.annualRevenue * appliedExpenseRate);
  const businessIncome = input.annualRevenue - expenseAmount;
  const taxBase = Math.max(businessIncome - rates.basicPersonalDeduction, 0);

  const bracket =
    rates.brackets.find((b) => b.upTo === null || taxBase <= b.upTo) ??
    rates.brackets[rates.brackets.length - 1];
  const calculatedTax = Math.max(Math.round(taxBase * bracket.rate - bracket.deduction), 0);

  return {
    appliedExpenseRateType,
    appliedExpenseRate,
    expenseAmount,
    businessIncome,
    taxBase,
    calculatedTax,
  };
}
