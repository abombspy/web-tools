import type { Metadata } from "next";
import Link from "next/link";
import {
  getIncomeTaxWithholding,
  getMinimumWage,
  getOvertimePremium,
  getSocialInsurance,
} from "@/lib/rates";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "알바 월급 계산기",
  description: "시급과 이번 달 근무시간을 입력하면 야간·연장·휴일수당과 4대보험 공제까지 반영한 예상 급여를 계산합니다.",
};

export default function PartTimeWagePage() {
  const minimumWage = getMinimumWage();
  const overtimePremium = getOvertimePremium();
  const socialInsurance = getSocialInsurance();
  const incomeTaxWithholding = getIncomeTaxWithholding();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-bold">알바 월급 계산기</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>무엇을 계산하나요?</h2>
        <p>
          시급과 이번 달 근무시간(기본·연장·야간·휴일)을 입력하면 <strong>근로기준법 제56조</strong>에
          따른 가산수당을 반영해 세전 총지급액을 계산하고, 국민연금·건강보험·고용보험(4대보험)
          공제를 반영한 금액까지 보여줍니다.
        </p>
        <p className="rounded-md bg-blue-50 p-4 text-sm not-prose dark:bg-blue-950/40">
          이 계산기는 <strong>주휴수당을 포함하지 않습니다.</strong> 주휴수당은{" "}
          <Link href="/part-time/weekly-holiday-pay">주휴수당 계산기</Link>에서 별도로 계산해
          더해주세요.
        </p>

        <h2>가산수당 (연장·야간·휴일)</h2>
        <ul>
          <li>연장근로, 야간근로(22~06시), 휴일근로 8시간 이내분: 통상임금의 50% 가산</li>
          <li>휴일근로 중 하루 8시간 초과분: 통상임금의 100% 가산</li>
          <li>
            <strong>단, 상시근로자 5인 미만 사업장은 이 가산수당 규정이 적용되지 않습니다</strong>
            (근로기준법 시행령 별표1). 편의점·카페 등 소규모 사업장이 많아 이 계산기는 사업장
            규모를 입력받아 반영합니다.
          </li>
        </ul>

        <h2>4대보험 공제</h2>
        <p>
          1개월 소정근로시간이 <strong>{socialInsurance.monthlyHoursExemptionThreshold}시간
          미만</strong>인 단시간근로자는 국민연금·건강보험·고용보험 적용이 제외되는 것이
          원칙입니다(산재보험은 예외 없이 전액 사업주 부담으로 적용). 다만 월 8일 이상 근무,
          월급 220만원 이상, 3개월 이상 계속근로 등 추가 예외가 있으며 이 계산기는 반영하지
          않으니 애매한 경우 국민연금공단·건강보험공단에 확인하세요.
        </p>
        <p>
          적용 시 근로자 부담률은 국민연금{" "}
          {(socialInsurance.nationalPension.employeeRate * 100).toFixed(2)}%, 건강보험{" "}
          {(socialInsurance.healthInsurance.employeeRate * 100).toFixed(3)}% + 장기요양보험(건강보험료의{" "}
          {(socialInsurance.healthInsurance.longTermCareRateOfHealthPremium * 100).toFixed(2)}%),
          고용보험 {(socialInsurance.employmentInsurance.employeeRate * 100).toFixed(1)}%입니다.
        </p>

        <h2>소득세(근로소득세) 원천징수</h2>
        <p>
          월급여액이{" "}
          <strong>{incomeTaxWithholding.singleHouseholdZeroTaxMonthlyThreshold.toLocaleString()}원
          미만</strong>(공제대상가족 1명, 본인만 기준)이면 근로소득세 원천징수액이 0원입니다.
          그 이상 구간은 국세청이 발행하는 <strong>근로소득 간이세액표(조견표)</strong>를 따라
          정확한 세액이 정해지는데, 이 표는 급여 수준과 부양가족 수에 따라 달라지는 방대한
          조견표라 이 계산기에서는 정확한 세액을 계산하지 않고 4대보험 공제 후 금액까지만
          보여드립니다.
        </p>

        <p className="rounded-md bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          이 계산기의 결과는 참고용 모의 계산입니다. 실제 지급액은 근로계약, 회사의 급여 규정,
          정확한 세액 등에 따라 달라질 수 있습니다.
        </p>
      </section>

      {/* TODO: 애드센스 승인 후 이 위치에 광고 슬롯 삽입 (plan.md §2.3) */}

      <Calculator
        minimumWage={minimumWage.hourly}
        rates={{ overtimePremium, socialInsurance, incomeTaxWithholding }}
      />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 계산기:{" "}
          <Link href="/part-time/weekly-holiday-pay" className="font-medium text-blue-600 dark:text-blue-400">
            주휴수당 계산기
          </Link>{" "}
          ·{" "}
          <Link href="/part-time" className="font-medium text-blue-600 dark:text-blue-400">
            알바·직장인 계산기 모음
          </Link>
        </p>
      </section>
    </div>
  );
}
