// 부가가치세법(일반과세 10%). plan.md §4.2 "부가세 계산기".

export type VatRates = { rate: number };

export type VatInput =
  | { mode: "fromSupply"; supplyAmount: number }
  | { mode: "fromTotal"; totalAmount: number };

export type VatResult = {
  supplyAmount: number;
  vat: number;
  totalAmount: number;
};

export function calculateVat(input: VatInput, rates: VatRates): VatResult {
  if (input.mode === "fromSupply") {
    const supplyAmount = input.supplyAmount;
    const vat = Math.round(supplyAmount * rates.rate);
    return { supplyAmount, vat, totalAmount: supplyAmount + vat };
  }

  const totalAmount = input.totalAmount;
  const supplyAmount = Math.round(totalAmount / (1 + rates.rate));
  const vat = totalAmount - supplyAmount;
  return { supplyAmount, vat, totalAmount };
}
