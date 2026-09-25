// 주택(residential) 매매 취득세 계산기. 지방세법 제11조·제13조의2, 지방세특례제한법
// 제36조의3 기준(config/rates/living.json의 acquisitionTax 참고). 조정대상지역 지정
// 현황은 자주 바뀌어 이 사이트가 목록을 관리하지 않고 사용자가 직접 선택하게 한다.
// 중과세율(8%/12%) 구간의 지방교육세는 산식이 더 복잡해 계산에 포함하지 않고
// 위택스 공식 계산기로 안내한다(계산기 UI에서 명시).

export type AcquisitionTaxRates = {
  baseRate: {
    upTo6eok: number;
    linearBandFrom6To9eok: { coefficientPercentPerEok: number; constantPercent: number };
    over9eok: number;
  };
  multiHouseSurchargeRate: {
    regulatedArea: { second: number; thirdPlus: number };
    nonRegulatedArea: { third: number; fourthPlus: number };
    corporation: number;
  };
  firstTimeBuyerRelief: {
    priceLimit: number;
    generalCap: number;
    smallLowPriceCap: number;
    smallAreaLimitM2: number;
    smallPriceLimitMetro: number;
    smallPriceLimitNonMetro: number;
  };
  localEducationTaxRateOfBase: number;
  ruralSpecialTaxRate: number;
  ruralSpecialTaxAreaThresholdM2: number;
};

export type HouseCountTier = 1 | 2 | 3 | 4; // 4 = 4채 이상(비조정)/3채 이상(조정)과 무관하게 "4채 이상"

export type AcquisitionTaxInput = {
  price: number; // 취득가액(원)
  houseCountTier: HouseCountTier; // 이 주택을 포함해 총 보유하게 되는 주택 수(4=4채 이상)
  isCorporation: boolean;
  isRegulatedArea: boolean; // 조정대상지역 여부(사용자 직접 선택)
  isOver85m2: boolean; // 전용면적 85㎡ 초과 여부(농어촌특별세 대상)
  isFirstTimeBuyer: boolean; // 생애최초 주택 구입 감면 대상 여부
  isSmallLowPriceHome: boolean; // 전용 60㎡ 이하 + 수도권 6억/비수도권 3억 이하(생애최초 300만원 한도 대상)
};

export type AcquisitionTaxResult = {
  rate: number; // 적용된 취득세율(기본 또는 중과)
  isSurcharged: boolean; // 다주택/법인 중과 여부(true면 지방교육세 계산 생략)
  acquisitionTaxBeforeRelief: number;
  firstTimeBuyerReliefAmount: number;
  acquisitionTax: number; // 감면 반영 후 실제 취득세
  localEducationTax: number; // 중과 구간이면 0(별도 안내)
  ruralSpecialTax: number;
  total: number;
};

function calculateBaseRate(price: number, rates: AcquisitionTaxRates): number {
  const { upTo6eok, linearBandFrom6To9eok, over9eok } = rates.baseRate;
  const priceInEok = price / 100_000_000;

  if (priceInEok <= 6) return upTo6eok;
  if (priceInEok > 9) return over9eok;

  const ratePercent = linearBandFrom6To9eok.coefficientPercentPerEok * priceInEok + linearBandFrom6To9eok.constantPercent;
  return ratePercent / 100;
}

function determineRate(
  price: number,
  houseCountTier: HouseCountTier,
  isCorporation: boolean,
  isRegulatedArea: boolean,
  rates: AcquisitionTaxRates,
): { rate: number; isSurcharged: boolean } {
  if (isCorporation) {
    return { rate: rates.multiHouseSurchargeRate.corporation, isSurcharged: true };
  }

  if (houseCountTier === 1) {
    return { rate: calculateBaseRate(price, rates), isSurcharged: false };
  }

  if (houseCountTier === 2) {
    if (isRegulatedArea) {
      return { rate: rates.multiHouseSurchargeRate.regulatedArea.second, isSurcharged: true };
    }
    return { rate: calculateBaseRate(price, rates), isSurcharged: false };
  }

  if (houseCountTier === 3) {
    if (isRegulatedArea) {
      return { rate: rates.multiHouseSurchargeRate.regulatedArea.thirdPlus, isSurcharged: true };
    }
    return { rate: rates.multiHouseSurchargeRate.nonRegulatedArea.third, isSurcharged: true };
  }

  // houseCountTier === 4(4채 이상): 조정·비조정 모두 최고 중과세율(12%)로 수렴.
  return { rate: rates.multiHouseSurchargeRate.nonRegulatedArea.fourthPlus, isSurcharged: true };
}

export function calculateAcquisitionTax(
  input: AcquisitionTaxInput,
  rates: AcquisitionTaxRates,
): AcquisitionTaxResult {
  const { rate, isSurcharged } = determineRate(
    input.price,
    input.houseCountTier,
    input.isCorporation,
    input.isRegulatedArea,
    rates,
  );

  const acquisitionTaxBeforeRelief = Math.round(input.price * rate);

  let firstTimeBuyerReliefAmount = 0;
  if (
    input.isFirstTimeBuyer &&
    !input.isCorporation &&
    input.houseCountTier === 1 &&
    input.price <= rates.firstTimeBuyerRelief.priceLimit
  ) {
    const cap = input.isSmallLowPriceHome
      ? rates.firstTimeBuyerRelief.smallLowPriceCap
      : rates.firstTimeBuyerRelief.generalCap;
    firstTimeBuyerReliefAmount = Math.min(acquisitionTaxBeforeRelief, cap);
  }

  const acquisitionTax = acquisitionTaxBeforeRelief - firstTimeBuyerReliefAmount;
  const localEducationTax = isSurcharged ? 0 : Math.round(acquisitionTax * rates.localEducationTaxRateOfBase);
  const ruralSpecialTax = input.isOver85m2 ? Math.round(input.price * rates.ruralSpecialTaxRate) : 0;

  return {
    rate,
    isSurcharged,
    acquisitionTaxBeforeRelief,
    firstTimeBuyerReliefAmount,
    acquisitionTax,
    localEducationTax,
    ruralSpecialTax,
    total: acquisitionTax + localEducationTax + ruralSpecialTax,
  };
}
