import { describe, expect, it } from "vitest";
import { calculateJeonseToMonthlyRent } from "./jeonse-to-monthly-rent";

describe("calculateJeonseToMonthlyRent", () => {
  it("법정 상한은 기준금리+2%p다(고정 10% 상한에 안 걸릴 때)", () => {
    const result = calculateJeonseToMonthlyRent({
      jeonseDeposit: 300000000,
      newDeposit: 100000000,
      baseRatePercent: 2.75,
      appliedRatePercent: 4.75,
    });
    expect(result.legalMaxRatePercent).toBe(4.75);
  });

  it("기준금리가 높아도 법정 상한은 연 10%를 넘지 않는다(경계값)", () => {
    const result = calculateJeonseToMonthlyRent({
      jeonseDeposit: 300000000,
      newDeposit: 100000000,
      baseRatePercent: 9,
      appliedRatePercent: 10,
    });
    expect(result.legalMaxRatePercent).toBe(10);
  });

  it("전환금액×전환율÷12로 월세를 계산한다", () => {
    const result = calculateJeonseToMonthlyRent({
      jeonseDeposit: 300000000,
      newDeposit: 100000000, // 전환금액 2억
      baseRatePercent: 2.75,
      appliedRatePercent: 4.75,
    });
    expect(result.convertedAmount).toBe(200000000);
    expect(result.appliedMonthlyRent).toBe(791667); // 2억 * 4.75% / 12
  });

  it("적용 전환율이 법정 상한을 넘으면 경고 플래그가 켜진다", () => {
    const result = calculateJeonseToMonthlyRent({
      jeonseDeposit: 300000000,
      newDeposit: 100000000,
      baseRatePercent: 2.75,
      appliedRatePercent: 6,
    });
    expect(result.exceedsLegalMax).toBe(true);
  });

  it("적용 전환율이 법정 상한 이내면 경고가 없다(경계값: 정확히 같을 때)", () => {
    const result = calculateJeonseToMonthlyRent({
      jeonseDeposit: 300000000,
      newDeposit: 100000000,
      baseRatePercent: 2.75,
      appliedRatePercent: 4.75,
    });
    expect(result.exceedsLegalMax).toBe(false);
  });
});
