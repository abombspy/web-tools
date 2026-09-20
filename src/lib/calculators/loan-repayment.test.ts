import { describe, expect, it } from "vitest";
import { calculateLoanRepayment } from "./loan-repayment";

describe("calculateLoanRepayment", () => {
  it("이자율이 0%면 매달 원금을 균등하게만 갚고 이자는 0원이다(경계값)", () => {
    const result = calculateLoanRepayment({ principal: 12000, annualRatePercent: 0, months: 12 });
    expect(result.equalPayment.totalInterest).toBe(0);
    expect(result.equalPrincipal.totalInterest).toBe(0);
    expect(result.equalPayment.schedule[0].payment).toBe(1000);
    expect(result.equalPrincipal.schedule[0].payment).toBe(1000);
  });

  it("두 상환 방식 모두 마지막 회차에 잔액이 정확히 0이 된다", () => {
    const result = calculateLoanRepayment({
      principal: 12000000,
      annualRatePercent: 12,
      months: 12,
    });
    expect(result.equalPayment.schedule.at(-1)?.balance).toBe(0);
    expect(result.equalPrincipal.schedule.at(-1)?.balance).toBe(0);
  });

  it("원금균등상환의 총 이자는 원리금균등상환보다 적거나 같다", () => {
    const result = calculateLoanRepayment({
      principal: 12000000,
      annualRatePercent: 12,
      months: 12,
    });
    expect(result.equalPrincipal.totalInterest).toBeLessThanOrEqual(result.equalPayment.totalInterest);
  });

  it("원리금균등상환은 매달 상환액이 거의 일정하다", () => {
    const result = calculateLoanRepayment({
      principal: 12000000,
      annualRatePercent: 12,
      months: 12,
    });
    const firstPayment = result.equalPayment.schedule[0].payment;
    const middlePayment = result.equalPayment.schedule[5].payment;
    expect(Math.abs(firstPayment - middlePayment)).toBeLessThanOrEqual(1);
  });

  it("원금균등상환은 매달 원금 상환분이 일정하고 이자는 점점 줄어든다", () => {
    const result = calculateLoanRepayment({
      principal: 12000000,
      annualRatePercent: 12,
      months: 12,
    });
    expect(result.equalPrincipal.schedule[0].principal).toBe(result.equalPrincipal.schedule[5].principal);
    expect(result.equalPrincipal.schedule[0].interest).toBeGreaterThan(
      result.equalPrincipal.schedule[5].interest,
    );
  });

  it("총 상환액은 원금 + 총 이자와 같다", () => {
    const result = calculateLoanRepayment({
      principal: 12000000,
      annualRatePercent: 12,
      months: 12,
    });
    expect(result.equalPayment.totalPayment).toBe(12000000 + result.equalPayment.totalInterest);
    expect(result.equalPrincipal.totalPayment).toBe(12000000 + result.equalPrincipal.totalInterest);
  });
});
