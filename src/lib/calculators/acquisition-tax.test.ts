import { describe, expect, it } from "vitest";
import { calculateAcquisitionTax, type AcquisitionTaxRates } from "./acquisition-tax";

// config/rates/living.json의 2026 acquisitionTax와 동일한 값 — 테스트를 라이브 설정
// 파일과 분리해 설정이 바뀌어도(연도 갱신 등) 이 테스트의 의도가 흔들리지 않게 한다.
const rates: AcquisitionTaxRates = {
  baseRate: {
    upTo6eok: 0.01,
    linearBandFrom6To9eok: { coefficientPercentPerEok: 0.6666666666666666, constantPercent: -3 },
    over9eok: 0.03,
  },
  multiHouseSurchargeRate: {
    regulatedArea: { second: 0.08, thirdPlus: 0.12 },
    nonRegulatedArea: { third: 0.08, fourthPlus: 0.12 },
    corporation: 0.12,
  },
  firstTimeBuyerRelief: {
    priceLimit: 1_200_000_000,
    generalCap: 2_000_000,
    smallLowPriceCap: 3_000_000,
    smallAreaLimitM2: 60,
    smallPriceLimitMetro: 600_000_000,
    smallPriceLimitNonMetro: 300_000_000,
  },
  localEducationTaxRateOfBase: 0.1,
  ruralSpecialTaxRate: 0.002,
  ruralSpecialTaxAreaThresholdM2: 85,
};

const base = {
  isCorporation: false,
  isRegulatedArea: false,
  isOver85m2: false,
  isFirstTimeBuyer: false,
  isSmallLowPriceHome: false,
};

describe("calculateAcquisitionTax — 기본세율(1주택)", () => {
  it("6억 이하는 1%", () => {
    const r = calculateAcquisitionTax({ ...base, price: 600_000_000, houseCountTier: 1 }, rates);
    expect(r.rate).toBeCloseTo(0.01, 5);
    expect(r.isSurcharged).toBe(false);
  });

  it("7.5억(6~9억 구간 중간)은 선형보간으로 정확히 2%", () => {
    const r = calculateAcquisitionTax({ ...base, price: 750_000_000, houseCountTier: 1 }, rates);
    expect(r.rate).toBeCloseTo(0.02, 5);
  });

  it("9억 초과는 3%", () => {
    const r = calculateAcquisitionTax({ ...base, price: 1_000_000_000, houseCountTier: 1 }, rates);
    expect(r.rate).toBeCloseTo(0.03, 5);
  });

  it("경계값: 정확히 6억은 1%, 정확히 9억은 3%", () => {
    expect(calculateAcquisitionTax({ ...base, price: 600_000_000, houseCountTier: 1 }, rates).rate).toBeCloseTo(0.01, 5);
    expect(calculateAcquisitionTax({ ...base, price: 900_000_000, houseCountTier: 1 }, rates).rate).toBeCloseTo(0.03, 5);
  });
});

describe("calculateAcquisitionTax — 다주택/법인 중과", () => {
  it("2주택 조정대상지역은 8%, 비조정지역은 기본세율", () => {
    const regulated = calculateAcquisitionTax(
      { ...base, price: 500_000_000, houseCountTier: 2, isRegulatedArea: true },
      rates,
    );
    expect(regulated.rate).toBeCloseTo(0.08, 5);
    expect(regulated.isSurcharged).toBe(true);

    const nonRegulated = calculateAcquisitionTax(
      { ...base, price: 500_000_000, houseCountTier: 2, isRegulatedArea: false },
      rates,
    );
    expect(nonRegulated.rate).toBeCloseTo(0.01, 5);
    expect(nonRegulated.isSurcharged).toBe(false);
  });

  it("3주택 조정대상지역은 12%, 비조정지역은 8%", () => {
    const regulated = calculateAcquisitionTax(
      { ...base, price: 500_000_000, houseCountTier: 3, isRegulatedArea: true },
      rates,
    );
    expect(regulated.rate).toBeCloseTo(0.12, 5);

    const nonRegulated = calculateAcquisitionTax(
      { ...base, price: 500_000_000, houseCountTier: 3, isRegulatedArea: false },
      rates,
    );
    expect(nonRegulated.rate).toBeCloseTo(0.08, 5);
  });

  it("4채 이상은 조정·비조정 무관 12%", () => {
    const regulated = calculateAcquisitionTax(
      { ...base, price: 500_000_000, houseCountTier: 4, isRegulatedArea: true },
      rates,
    );
    const nonRegulated = calculateAcquisitionTax(
      { ...base, price: 500_000_000, houseCountTier: 4, isRegulatedArea: false },
      rates,
    );
    expect(regulated.rate).toBeCloseTo(0.12, 5);
    expect(nonRegulated.rate).toBeCloseTo(0.12, 5);
  });

  it("법인은 주택 수와 무관하게 항상 12%", () => {
    const r = calculateAcquisitionTax({ ...base, price: 500_000_000, houseCountTier: 1, isCorporation: true }, rates);
    expect(r.rate).toBeCloseTo(0.12, 5);
    expect(r.isSurcharged).toBe(true);
  });
});

describe("calculateAcquisitionTax — 생애최초 감면", () => {
  it("1주택 + 12억 이하 + 생애최초면 일반 한도 200만원까지 감면", () => {
    const r = calculateAcquisitionTax(
      { ...base, price: 500_000_000, houseCountTier: 1, isFirstTimeBuyer: true },
      rates,
    );
    expect(r.acquisitionTaxBeforeRelief).toBe(5_000_000); // 5억 × 1%
    expect(r.firstTimeBuyerReliefAmount).toBe(2_000_000);
    expect(r.acquisitionTax).toBe(3_000_000);
  });

  it("소형·저가 주택 조건을 만족하면 300만원 한도까지 감면", () => {
    const r = calculateAcquisitionTax(
      {
        ...base,
        price: 200_000_000,
        houseCountTier: 1,
        isFirstTimeBuyer: true,
        isSmallLowPriceHome: true,
      },
      rates,
    );
    expect(r.acquisitionTaxBeforeRelief).toBe(2_000_000); // 2억 × 1%
    // 감면 한도(300만원)가 세액(200만원)보다 커서 전액 면제
    expect(r.firstTimeBuyerReliefAmount).toBe(2_000_000);
    expect(r.acquisitionTax).toBe(0);
  });

  it("12억 초과면 생애최초 감면을 받을 수 없다", () => {
    const r = calculateAcquisitionTax(
      { ...base, price: 1_300_000_000, houseCountTier: 1, isFirstTimeBuyer: true },
      rates,
    );
    expect(r.firstTimeBuyerReliefAmount).toBe(0);
  });

  it("2주택 이상이면 생애최초 감면을 받을 수 없다", () => {
    const r = calculateAcquisitionTax(
      { ...base, price: 500_000_000, houseCountTier: 2, isFirstTimeBuyer: true },
      rates,
    );
    expect(r.firstTimeBuyerReliefAmount).toBe(0);
  });
});

describe("calculateAcquisitionTax — 지방교육세·농어촌특별세", () => {
  it("기본세율 구간은 지방교육세를 계산하고(취득세의 10%), 중과 구간은 0으로 둔다", () => {
    const baseRateCase = calculateAcquisitionTax({ ...base, price: 500_000_000, houseCountTier: 1 }, rates);
    expect(baseRateCase.localEducationTax).toBe(500_000); // 5,000,000 × 10%

    const surchargedCase = calculateAcquisitionTax(
      { ...base, price: 500_000_000, houseCountTier: 1, isCorporation: true },
      rates,
    );
    expect(surchargedCase.localEducationTax).toBe(0);
  });

  it("전용 85㎡ 초과면 농어촌특별세(0.2%)가 붙고, 이하면 0", () => {
    const over85 = calculateAcquisitionTax(
      { ...base, price: 500_000_000, houseCountTier: 1, isOver85m2: true },
      rates,
    );
    expect(over85.ruralSpecialTax).toBe(1_000_000); // 5억 × 0.2%

    const under85 = calculateAcquisitionTax(
      { ...base, price: 500_000_000, houseCountTier: 1, isOver85m2: false },
      rates,
    );
    expect(under85.ruralSpecialTax).toBe(0);
  });

  it("합계는 취득세+지방교육세+농특세다", () => {
    const r = calculateAcquisitionTax({ ...base, price: 500_000_000, houseCountTier: 1, isOver85m2: true }, rates);
    expect(r.total).toBe(r.acquisitionTax + r.localEducationTax + r.ruralSpecialTax);
  });
});
