import { describe, expect, it } from "vitest";
import { EcommerceMarginError, calculateEcommerceMargin } from "./ecommerce-margin";

describe("calculateEcommerceMargin", () => {
  it("판매가 기준으로 수수료·배송비를 뺀 순이익과 마진율을 계산한다", () => {
    const result = calculateEcommerceMargin({
      mode: "fromPrice",
      salePrice: 30000,
      costPrice: 15000,
      commissionRate: 0.1,
      paymentFeeRate: 0.03,
      shippingCost: 3000,
    });
    expect(result.commission).toBe(3000);
    expect(result.paymentFee).toBe(900);
    expect(result.netProfit).toBe(8100);
    expect(result.marginRate).toBeCloseTo(0.27, 5);
  });

  it("목표 마진율을 입력하면 역산한 판매가가 그 마진율에 근접한다", () => {
    const result = calculateEcommerceMargin({
      mode: "fromTargetMargin",
      targetMarginRate: 0.2,
      costPrice: 15000,
      commissionRate: 0.1,
      paymentFeeRate: 0.03,
      shippingCost: 3000,
    });
    expect(result.marginRate).toBeCloseTo(0.2, 2);
  });

  it("수수료율+목표마진율 합이 100%를 넘으면 fee_margin_exceeds_100 코드로 에러를 던진다(경계값)", () => {
    try {
      calculateEcommerceMargin({
        mode: "fromTargetMargin",
        targetMarginRate: 0.2,
        costPrice: 15000,
        commissionRate: 0.5,
        paymentFeeRate: 0.4,
        shippingCost: 3000,
      });
      expect.unreachable();
    } catch (e) {
      expect(e).toBeInstanceOf(EcommerceMarginError);
      expect((e as EcommerceMarginError).code).toBe("fee_margin_exceeds_100");
    }
  });

  it("판매가가 0이면 마진율도 0이다(0으로 나누기 방지)", () => {
    const result = calculateEcommerceMargin({
      mode: "fromPrice",
      salePrice: 0,
      costPrice: 0,
      commissionRate: 0.1,
      paymentFeeRate: 0.03,
      shippingCost: 0,
    });
    expect(result.marginRate).toBe(0);
  });

  it("원가와 수수료가 판매가보다 크면 순이익이 음수가 될 수 있다", () => {
    const result = calculateEcommerceMargin({
      mode: "fromPrice",
      salePrice: 10000,
      costPrice: 9000,
      commissionRate: 0.2,
      paymentFeeRate: 0.03,
      shippingCost: 3000,
    });
    expect(result.netProfit).toBeLessThan(0);
  });
});
