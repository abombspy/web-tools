// 원리금균등상환/원금균등상환 표준 금융 공식. plan.md §4.3 "대출 이자·상환 계산기".
// 법령이 아닌 순수 수학 공식이라 연도별 요율 검증이 필요 없다.

export type LoanRepaymentInput = {
  principal: number;
  annualRatePercent: number;
  months: number;
};

export type MonthlyPayment = {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
};

export type LoanRepaymentSchedule = {
  schedule: MonthlyPayment[];
  totalPayment: number;
  totalInterest: number;
};

export type LoanRepaymentResult = {
  equalPayment: LoanRepaymentSchedule;
  equalPrincipal: LoanRepaymentSchedule;
};

function round(n: number): number {
  return Math.round(n);
}

function calculateEqualPayment(principal: number, monthlyRate: number, months: number): LoanRepaymentSchedule {
  const monthlyPayment =
    monthlyRate === 0
      ? principal / months
      : (principal * monthlyRate * (1 + monthlyRate) ** months) / ((1 + monthlyRate) ** months - 1);

  const schedule: MonthlyPayment[] = [];
  let balance = principal;

  for (let month = 1; month <= months; month += 1) {
    const interest = round(balance * monthlyRate);
    // 마지막 회차는 반올림 오차를 흡수해 잔액이 정확히 0이 되도록 원금을 맞춘다.
    const principalPortion = month === months ? balance : round(monthlyPayment - interest);
    balance -= principalPortion;
    schedule.push({ month, payment: principalPortion + interest, principal: principalPortion, interest, balance: Math.max(balance, 0) });
  }

  const totalPayment = schedule.reduce((sum, m) => sum + m.payment, 0);
  const totalInterest = totalPayment - principal;

  return { schedule, totalPayment, totalInterest };
}

function calculateEqualPrincipal(principal: number, monthlyRate: number, months: number): LoanRepaymentSchedule {
  const principalPortion = round(principal / months);
  const schedule: MonthlyPayment[] = [];
  let balance = principal;

  for (let month = 1; month <= months; month += 1) {
    const interest = round(balance * monthlyRate);
    // 마지막 회차는 반올림 오차를 흡수해 잔액을 정확히 0으로 맞춘다.
    const thisPrincipal = month === months ? balance : principalPortion;
    balance -= thisPrincipal;
    schedule.push({ month, payment: thisPrincipal + interest, principal: thisPrincipal, interest, balance: Math.max(balance, 0) });
  }

  const totalPayment = schedule.reduce((sum, m) => sum + m.payment, 0);
  const totalInterest = totalPayment - principal;

  return { schedule, totalPayment, totalInterest };
}

export function calculateLoanRepayment(input: LoanRepaymentInput): LoanRepaymentResult {
  const monthlyRate = input.annualRatePercent / 100 / 12;

  return {
    equalPayment: calculateEqualPayment(input.principal, monthlyRate, input.months),
    equalPrincipal: calculateEqualPrincipal(input.principal, monthlyRate, input.months),
  };
}
