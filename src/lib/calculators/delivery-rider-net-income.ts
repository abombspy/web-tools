// plan.md §4.2 "배달 라이더 순수익 계산기".
// 플랫폼 수수료율은 배달앱·계약마다 다르고 자주 바뀌므로 여기서 고정값을 제공하지 않고
// 사용자가 직접 입력한다(plan.md §6.4 리스크 대응).
import { calculateWithholdingTax, type WithholdingTaxRates } from "./withholding-tax-3-3";

export type DeliveryRiderNetIncomeInput = {
  /** 건당 배달료 (플랫폼 수수료 차감 전, 라이더 기준 금액) */
  feePerDelivery: number;
  deliveryCount: number;
  platformFeeRate: number;
  /** 유류비·소모품비 등 월 고정 비용 */
  monthlyExpenses: number;
  /** 3.3% 사업소득세 원천징수를 플랫폼이 대신 떼는지 여부 */
  withholdingApplies: boolean;
};

export type DeliveryRiderNetIncomeResult = {
  grossIncome: number;
  platformFee: number;
  incomeAfterFee: number;
  withholding: number;
  incomeAfterWithholding: number;
  netProfit: number;
};

export function calculateDeliveryRiderNetIncome(
  input: DeliveryRiderNetIncomeInput,
  withholdingRates: WithholdingTaxRates,
): DeliveryRiderNetIncomeResult {
  const grossIncome = Math.round(input.feePerDelivery * input.deliveryCount);
  const platformFee = Math.round(grossIncome * input.platformFeeRate);
  const incomeAfterFee = grossIncome - platformFee;

  const withholding = input.withholdingApplies
    ? calculateWithholdingTax({ mode: "fromGross", grossAmount: incomeAfterFee }, withholdingRates)
        .totalWithholding
    : 0;
  const incomeAfterWithholding = incomeAfterFee - withholding;

  const netProfit = incomeAfterWithholding - input.monthlyExpenses;

  return { grossIncome, platformFee, incomeAfterFee, withholding, incomeAfterWithholding, netProfit };
}
