import { describe, expect, it } from "vitest";
import {
  calculateComprehensiveIncomeTax,
  type ComprehensiveIncomeTaxRates,
  type IndustryExpenseRate,
} from "./comprehensive-income-tax";

const rates: ComprehensiveIncomeTaxRates = {
  brackets: [
    { upTo: 14000000, rate: 0.06, deduction: 0 },
    { upTo: 50000000, rate: 0.15, deduction: 1260000 },
    { upTo: 88000000, rate: 0.24, deduction: 5760000 },
    { upTo: 150000000, rate: 0.35, deduction: 15440000 },
    { upTo: 300000000, rate: 0.38, deduction: 19940000 },
    { upTo: 500000000, rate: 0.4, deduction: 25940000 },
    { upTo: 1000000000, rate: 0.42, deduction: 35940000 },
    { upTo: null, rate: 0.45, deduction: 65940000 },
  ],
  basicPersonalDeduction: 1500000,
  simplifiedRateThreshold: 24000000,
};

const industries: IndustryExpenseRate[] = [
  { code: "940306", name: "1인미디어 콘텐츠창작자", simplifiedRate: 0.641, standardRate: 0.151 },
];

describe("calculateComprehensiveIncomeTax", () => {
  it("수입이 기준선 미만이면 단순경비율이 적용된다(경계값)", () => {
    const result = calculateComprehensiveIncomeTax(
      { annualRevenue: 20000000, industryCode: "940306" },
      rates,
      industries,
    );
    expect(result.appliedExpenseRateType).toBe("simplified");
    expect(result.expenseAmount).toBe(12820000); // 20,000,000 * 0.641
    expect(result.businessIncome).toBe(7180000);
    expect(result.taxBase).toBe(5680000); // 7,180,000 - 1,500,000
    expect(result.calculatedTax).toBe(340800); // 5,680,000 * 0.06
  });

  it("수입이 기준선 이상이면 기준경비율이 적용된다(경계값)", () => {
    const result = calculateComprehensiveIncomeTax(
      { annualRevenue: 50000000, industryCode: "940306" },
      rates,
      industries,
    );
    expect(result.appliedExpenseRateType).toBe("standard");
    expect(result.expenseAmount).toBe(7550000); // 50,000,000 * 0.151
    expect(result.businessIncome).toBe(42450000);
    expect(result.taxBase).toBe(40950000);
    expect(result.calculatedTax).toBe(4882500); // 40,950,000*0.15 - 1,260,000
  });

  it("직접 입력한 경비율을 쓸 수 있다", () => {
    const result = calculateComprehensiveIncomeTax(
      { annualRevenue: 30000000, industryCode: "custom", customExpenseRate: 0.3 },
      rates,
      industries,
    );
    expect(result.appliedExpenseRateType).toBe("custom");
    expect(result.expenseAmount).toBe(9000000);
    expect(result.taxBase).toBe(19500000); // (30,000,000-9,000,000)-1,500,000
    expect(result.calculatedTax).toBe(1665000); // 19,500,000*0.15 - 1,260,000
  });

  it("과세표준이 정확히 1,400만원이면 첫 구간(6%)이 적용된다(경계값)", () => {
    const result = calculateComprehensiveIncomeTax(
      { annualRevenue: 15500000, industryCode: "custom", customExpenseRate: 0 },
      rates,
      industries,
    );
    expect(result.taxBase).toBe(14000000);
    expect(result.calculatedTax).toBe(840000); // 14,000,000 * 0.06
  });

  it("과세표준이 1,400만원을 살짝 넘으면 둘째 구간(15%)으로 전환된다(경계값)", () => {
    const result = calculateComprehensiveIncomeTax(
      { annualRevenue: 16000000, industryCode: "custom", customExpenseRate: 0 },
      rates,
      industries,
    );
    expect(result.taxBase).toBe(14500000);
    expect(result.calculatedTax).toBe(915000); // 14,500,000*0.15 - 1,260,000
  });

  it("경비와 기본공제를 빼면 소득이 0 이하가 되는 경우 세금은 0원이다", () => {
    const result = calculateComprehensiveIncomeTax(
      { annualRevenue: 1000000, industryCode: "custom", customExpenseRate: 0.9 },
      rates,
      industries,
    );
    expect(result.taxBase).toBe(0);
    expect(result.calculatedTax).toBe(0);
  });
});
