// plan.md §4.2 "스마트스토어·쿠팡 마진 계산기".
// 카테고리별 판매수수료·결제수수료는 플랫폼·카테고리마다 다르고 자주 바뀌므로 고정값을 두지
// 않고 사용자가 직접 입력한다(plan.md §6.4 리스크 대응, 배달 라이더 계산기와 동일 원칙).

export type EcommerceMarginCosts = {
  costPrice: number;
  commissionRate: number;
  paymentFeeRate: number;
  shippingCost: number;
};

export type EcommerceMarginInput =
  | ({ mode: "fromPrice"; salePrice: number } & EcommerceMarginCosts)
  | ({ mode: "fromTargetMargin"; targetMarginRate: number } & EcommerceMarginCosts);

export type EcommerceMarginResult = {
  salePrice: number;
  commission: number;
  paymentFee: number;
  shippingCost: number;
  netProfit: number;
  marginRate: number;
};

function fromPrice(
  salePrice: number,
  costs: EcommerceMarginCosts,
): EcommerceMarginResult {
  const commission = Math.round(salePrice * costs.commissionRate);
  const paymentFee = Math.round(salePrice * costs.paymentFeeRate);
  const netProfit = salePrice - costs.costPrice - commission - paymentFee - costs.shippingCost;
  const marginRate = salePrice === 0 ? 0 : netProfit / salePrice;

  return { salePrice, commission, paymentFee, shippingCost: costs.shippingCost, netProfit, marginRate };
}

export function calculateEcommerceMargin(input: EcommerceMarginInput): EcommerceMarginResult {
  if (input.mode === "fromPrice") {
    return fromPrice(input.salePrice, input);
  }

  // 목표 마진율 m을 만족하는 판매가 P를 역산한다:
  // (P - 원가 - P*수수료율 - P*결제수수료율 - 배송비) / P = m
  // => P = (원가 + 배송비) / (1 - 수수료율 - 결제수수료율 - m)
  const denominator = 1 - input.commissionRate - input.paymentFeeRate - input.targetMarginRate;
  if (denominator <= 0) {
    throw new Error(
      "입력한 수수료율과 목표 마진율의 합이 100% 이상이라 달성 가능한 판매가가 없습니다.",
    );
  }
  const salePrice = Math.round((input.costPrice + input.shippingCost) / denominator);
  return fromPrice(salePrice, input);
}
