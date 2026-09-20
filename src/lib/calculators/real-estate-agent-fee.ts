// 공인중개사법 시행규칙 + 지자체 조례(중개보수 요율표). plan.md §4.3 "중개수수료 계산기".
// 지자체마다 조례가 다를 수 있으나, 대부분 서울시 등과 동일한 표준 요율표를 채택하고 있다.

export type FeeBracket = { upTo: number | null; rate: number; cap: number | null };

export type RealEstateAgentFeeRates = {
  sale: { brackets: FeeBracket[] };
  lease: { brackets: FeeBracket[] };
};

export type RealEstateAgentFeeInput =
  | { type: "sale"; price: number }
  | { type: "lease"; deposit: number; monthlyRent: number };

export type RealEstateAgentFeeResult = {
  transactionAmount: number;
  appliedRatePercent: number;
  cap: number | null;
  fee: number;
  feeCapped: boolean;
};

function findBracket(brackets: FeeBracket[], amount: number): FeeBracket {
  return brackets.find((b) => b.upTo === null || amount < b.upTo) ?? brackets[brackets.length - 1];
}

export function calculateRealEstateAgentFee(
  input: RealEstateAgentFeeInput,
  rates: RealEstateAgentFeeRates,
): RealEstateAgentFeeResult {
  let transactionAmount: number;
  let brackets: FeeBracket[];

  if (input.type === "sale") {
    transactionAmount = input.price;
    brackets = rates.sale.brackets;
  } else {
    // 월세 환산보증금: 보증금 + (월차임 × 100), 단 그 합이 5천만원 미만이면 × 70을 쓴다.
    const raw = input.deposit + input.monthlyRent * 100;
    transactionAmount = raw < 50000000 ? input.deposit + input.monthlyRent * 70 : raw;
    brackets = rates.lease.brackets;
  }

  const bracket = findBracket(brackets, transactionAmount);
  const rawFee = transactionAmount * bracket.rate;
  const fee = bracket.cap !== null ? Math.min(rawFee, bracket.cap) : rawFee;

  return {
    transactionAmount,
    appliedRatePercent: bracket.rate * 100,
    cap: bracket.cap,
    fee: Math.round(fee),
    feeCapped: bracket.cap !== null && rawFee > bracket.cap,
  };
}
