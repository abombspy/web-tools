import { describe, expect, it } from "vitest";
import { calculateWithholdingTax, type WithholdingTaxRates } from "./withholding-tax-3-3";

const rates: WithholdingTaxRates = {
  businessIncomeRate: 0.03,
  localIncomeTaxRateOfIncomeTax: 0.1,
};

describe("calculateWithholdingTax", () => {
  it("세전 100만원이면 소득세 3만원, 지방소득세 3천원이 떼인다", () => {
    const result = calculateWithholdingTax({ mode: "fromGross", grossAmount: 1000000 }, rates);
    expect(result.incomeTax).toBe(30000);
    expect(result.localIncomeTax).toBe(3000);
    expect(result.totalWithholding).toBe(33000);
    expect(result.netAmount).toBe(967000);
  });

  it("지방소득세는 소득세의 10%로 계산된다(단순히 세전의 0.3%가 아님)", () => {
    const result = calculateWithholdingTax({ mode: "fromGross", grossAmount: 1000000 }, rates);
    expect(result.localIncomeTax).toBe(Math.round(result.incomeTax * 0.1));
  });

  it("0원이면 전부 0원이다(경계값)", () => {
    const result = calculateWithholdingTax({ mode: "fromGross", grossAmount: 0 }, rates);
    expect(result.netAmount).toBe(0);
    expect(result.totalWithholding).toBe(0);
  });

  it("세후 967,000원을 역산하면 세전 100만원이 나온다(나누어떨어지는 경우)", () => {
    const result = calculateWithholdingTax({ mode: "fromNet", netAmount: 967000 }, rates);
    expect(result.grossAmount).toBe(1000000);
    expect(result.netAmount).toBe(967000);
  });

  it("세전->세후->세전 역산이 왕복에서 크게 어긋나지 않는다", () => {
    const forward = calculateWithholdingTax({ mode: "fromGross", grossAmount: 3500000 }, rates);
    const reverse = calculateWithholdingTax(
      { mode: "fromNet", netAmount: forward.netAmount },
      rates,
    );
    expect(Math.abs(reverse.grossAmount - 3500000)).toBeLessThanOrEqual(1);
  });
});
