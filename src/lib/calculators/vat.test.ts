import { describe, expect, it } from "vitest";
import { calculateVat, type VatRates } from "./vat";

const rates: VatRates = { rate: 0.1 };

describe("calculateVat", () => {
  it("공급가액 100만원의 부가세는 10만원이다", () => {
    const result = calculateVat({ mode: "fromSupply", supplyAmount: 1000000 }, rates);
    expect(result.vat).toBe(100000);
    expect(result.totalAmount).toBe(1100000);
  });

  it("합계 110만원을 역산하면 공급가액 100만원, 부가세 10만원이 나온다(나누어떨어지는 경우)", () => {
    const result = calculateVat({ mode: "fromTotal", totalAmount: 1100000 }, rates);
    expect(result.supplyAmount).toBe(1000000);
    expect(result.vat).toBe(100000);
  });

  it("나누어떨어지지 않아도 공급가액+부가세는 항상 합계와 같다", () => {
    const result = calculateVat({ mode: "fromTotal", totalAmount: 1000000 }, rates);
    expect(result.supplyAmount + result.vat).toBe(1000000);
  });

  it("0원이면 전부 0원이다(경계값)", () => {
    const result = calculateVat({ mode: "fromSupply", supplyAmount: 0 }, rates);
    expect(result.vat).toBe(0);
    expect(result.totalAmount).toBe(0);
  });
});
