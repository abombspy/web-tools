// 관세법(목록통관 면세한도) + 부가가치세법. plan.md §4.2 "해외직구 관세 계산기".
//
// 스코프 제한(사용자 확인): 면세한도 초과 여부만 정확히 판정하고, 관세율은 품목마다
// 수천 개의 HS코드로 갈려 이 계산기가 내장하지 않는다 — 사용자가 관세청에서 확인한
// 관세율을 직접 입력한다. 개별소비세(고가품 등 일부 품목에 추가 부과)는 다루지 않는다.
// 환율은 실시간 연동 없이 사용자가 직접 입력한다(plan.md §6.5 외부 API 의존성 리스크 회피).

export type CustomsDutyRates = {
  generalLimitUsd: number;
  usOriginLimitUsd: number;
  vatRate: number;
};

export type CustomsDutyInput = {
  itemPriceUsd: number;
  shippingFeeUsd: number;
  exchangeRate: number;
  isUsOrigin: boolean;
  /** 건강기능식품·화장품·주류 등은 미국발이어도 목록통관 대상에서 제외되어 150달러 기준이 적용됨 */
  isListClearanceEligible: boolean;
  dutyRate: number;
};

export type CustomsDutyResult = {
  totalPriceUsd: number;
  dutyFreeLimit: number;
  isDutyFree: boolean;
  taxableValueKrw: number;
  duty: number;
  vat: number;
  totalTax: number;
};

export function calculateCustomsDuty(
  input: CustomsDutyInput,
  rates: CustomsDutyRates,
): CustomsDutyResult {
  const totalPriceUsd = input.itemPriceUsd + input.shippingFeeUsd;
  const dutyFreeLimit =
    input.isUsOrigin && input.isListClearanceEligible ? rates.usOriginLimitUsd : rates.generalLimitUsd;
  const isDutyFree = totalPriceUsd <= dutyFreeLimit;

  const taxableValueKrw = Math.round(totalPriceUsd * input.exchangeRate);

  if (isDutyFree) {
    return { totalPriceUsd, dutyFreeLimit, isDutyFree, taxableValueKrw, duty: 0, vat: 0, totalTax: 0 };
  }

  // 면세한도를 넘으면 초과분이 아니라 전체 금액에 과세한다(공제 없음).
  const duty = Math.round(taxableValueKrw * input.dutyRate);
  const vat = Math.round((taxableValueKrw + duty) * rates.vatRate);
  const totalTax = duty + vat;

  return { totalPriceUsd, dutyFreeLimit, isDutyFree, taxableValueKrw, duty, vat, totalTax };
}
