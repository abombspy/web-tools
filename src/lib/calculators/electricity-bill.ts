// 한국전력 주택용(저압) 전기요금표, 3단계 누진제. plan.md §4.3 "전기요금 계산기".
// 부가세(10%)·전력산업기반기금(3.7%)은 정확한 10원 단위 절사 규칙까지는 반영하지 않고
// 안내 문구로만 다룬다(스코프 제한).

export type ElectricityTier = { upTo: number | null; basicFee: number; unitPrice: number };
export type ElectricityRates = {
  general: { tiers: ElectricityTier[] };
  summer: { tiers: ElectricityTier[] };
  summerMonths: number[];
};

export type ElectricityBillBreakdownRow = {
  tierUpTo: number | null;
  amountKwh: number;
  unitPrice: number;
  charge: number;
};

export type ElectricityBillResult = {
  isSummer: boolean;
  basicFee: number;
  energyCharge: number;
  totalBeforeTax: number;
  breakdown: ElectricityBillBreakdownRow[];
};

export function calculateElectricityBill(
  usageKwh: number,
  month: number,
  rates: ElectricityRates,
): ElectricityBillResult {
  const isSummer = rates.summerMonths.includes(month);
  const tiers = isSummer ? rates.summer.tiers : rates.general.tiers;

  let prevUpTo = 0;
  let energyCharge = 0;
  let basicFee = tiers[0].basicFee;
  const breakdown: ElectricityBillBreakdownRow[] = [];

  for (const tier of tiers) {
    const tierCap = tier.upTo ?? Infinity;
    const tierSize = tierCap - prevUpTo;
    const amountKwh = Math.min(Math.max(usageKwh - prevUpTo, 0), tierSize);

    if (amountKwh > 0) {
      const charge = Math.round(amountKwh * tier.unitPrice);
      energyCharge += charge;
      basicFee = tier.basicFee;
      breakdown.push({ tierUpTo: tier.upTo, amountKwh, unitPrice: tier.unitPrice, charge });
    }
    prevUpTo = tierCap;
  }

  const totalBeforeTax = basicFee + energyCharge;

  return { isSummer, basicFee, energyCharge, totalBeforeTax, breakdown };
}
