import { describe, expect, it } from "vitest";
import { calculateDeliveryRiderNetIncome } from "./delivery-rider-net-income";
import type { WithholdingTaxRates } from "./withholding-tax-3-3";

const withholdingRates: WithholdingTaxRates = {
  businessIncomeRate: 0.03,
  localIncomeTaxRateOfIncomeTax: 0.1,
};

describe("calculateDeliveryRiderNetIncome", () => {
  it("건당 배달료 × 건수에서 수수료·세금·비용을 순서대로 뺀다", () => {
    const result = calculateDeliveryRiderNetIncome(
      {
        feePerDelivery: 5000,
        deliveryCount: 200,
        platformFeeRate: 0.1,
        monthlyExpenses: 300000,
        withholdingApplies: true,
      },
      withholdingRates,
    );
    expect(result.grossIncome).toBe(1000000);
    expect(result.platformFee).toBe(100000);
    expect(result.incomeAfterFee).toBe(900000);
    expect(result.withholding).toBe(29700); // 900,000*0.033
    expect(result.netProfit).toBe(570300);
  });

  it("원천징수를 적용하지 않으면 세금 없이 계산된다", () => {
    const result = calculateDeliveryRiderNetIncome(
      {
        feePerDelivery: 5000,
        deliveryCount: 200,
        platformFeeRate: 0.1,
        monthlyExpenses: 300000,
        withholdingApplies: false,
      },
      withholdingRates,
    );
    expect(result.withholding).toBe(0);
    expect(result.netProfit).toBe(600000);
  });

  it("수수료율 0%면 수수료가 없다(경계값)", () => {
    const result = calculateDeliveryRiderNetIncome(
      {
        feePerDelivery: 5000,
        deliveryCount: 100,
        platformFeeRate: 0,
        monthlyExpenses: 0,
        withholdingApplies: false,
      },
      withholdingRates,
    );
    expect(result.platformFee).toBe(0);
    expect(result.incomeAfterFee).toBe(result.grossIncome);
  });

  it("비용이 수입보다 크면 순수익이 음수가 될 수 있다", () => {
    const result = calculateDeliveryRiderNetIncome(
      {
        feePerDelivery: 1000,
        deliveryCount: 10,
        platformFeeRate: 0,
        monthlyExpenses: 500000,
        withholdingApplies: false,
      },
      withholdingRates,
    );
    expect(result.netProfit).toBeLessThan(0);
  });
});
