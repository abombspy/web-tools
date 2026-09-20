// 소득세법(사업소득 원천징수 3%) + 지방세법(지방소득세 = 소득세의 10%).
// plan.md §4.2 "3.3% 원천징수 역산 계산기".

export type WithholdingTaxRates = {
  businessIncomeRate: number;
  localIncomeTaxRateOfIncomeTax: number;
};

export type WithholdingTaxInput =
  | { mode: "fromGross"; grossAmount: number }
  | { mode: "fromNet"; netAmount: number };

export type WithholdingTaxResult = {
  grossAmount: number;
  netAmount: number;
  incomeTax: number;
  localIncomeTax: number;
  totalWithholding: number;
  /** fromNet 모드에서 반올림 때문에 입력한 세후 금액과 결과가 정확히 일치하지 않을 수 있음 */
  isApproximateReverse: boolean;
};

function forward(
  grossAmount: number,
  rates: WithholdingTaxRates,
  isApproximateReverse: boolean,
): WithholdingTaxResult {
  const incomeTax = Math.round(grossAmount * rates.businessIncomeRate);
  const localIncomeTax = Math.round(incomeTax * rates.localIncomeTaxRateOfIncomeTax);
  const totalWithholding = incomeTax + localIncomeTax;
  return {
    grossAmount,
    netAmount: grossAmount - totalWithholding,
    incomeTax,
    localIncomeTax,
    totalWithholding,
    isApproximateReverse,
  };
}

export function calculateWithholdingTax(
  input: WithholdingTaxInput,
  rates: WithholdingTaxRates,
): WithholdingTaxResult {
  if (input.mode === "fromGross") {
    return forward(input.grossAmount, rates, false);
  }
  // 세후 -> 세전 역산은 근사치다: 결합 세율로 나눠 세전을 추정한 뒤 그 값으로 다시 정방향 계산해
  // 소득세/지방소득세 내역을 일관되게 맞춘다. 반올림 때문에 입력한 세후 금액과 1~2원 차이가 날 수 있다.
  const combinedRate = rates.businessIncomeRate * (1 + rates.localIncomeTaxRateOfIncomeTax);
  const approxGross = Math.round(input.netAmount / (1 - combinedRate));
  return forward(approxGross, rates, true);
}
