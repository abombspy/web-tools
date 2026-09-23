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

// 코드로 던지고(KO/EN 공통), 화면 문구는 content/tools/{ko,en}/freelancer/ecommerce-margin.json의
// errors에서 코드로 조회한다 — 나중에 "읽기 좋은 메시지로 바꿔야지" 하고 이 코드 문자열
// 자체를 고치면 EN 조회가 조용히 깨지니, 값을 바꾸려면 반드시 두 JSON의 errors도 같이 바꿀 것.
export type EcommerceMarginErrorCode = "fee_margin_exceeds_100";

export class EcommerceMarginError extends Error {
  code: EcommerceMarginErrorCode;

  constructor(code: EcommerceMarginErrorCode) {
    super(code);
    this.code = code;
  }
}

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
    throw new EcommerceMarginError("fee_margin_exceeds_100");
  }
  const salePrice = Math.round((input.costPrice + input.shippingCost) / denominator);
  return fromPrice(salePrice, input);
}
