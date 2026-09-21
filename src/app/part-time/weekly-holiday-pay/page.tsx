import type { Metadata } from "next";
import Link from "next/link";
import { getMinimumWage } from "@/lib/rates";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "주휴수당 계산기",
  description: "시급과 주 근무시간을 입력하면 근로기준법 기준 주휴수당을 계산합니다.",
};

export default function WeeklyHolidayPayPage() {
  const minimumWage = getMinimumWage();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🏖️ 주휴수당 계산기</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>주휴수당이란?</h2>
        <p>
          <strong>근로기준법 제55조, 시행령 제30조</strong>에 따라, 사용자는 1주 동안 소정근로일을
          개근한 근로자에게 1주에 평균 1회 이상의 유급휴일(주휴일)을 주어야 합니다. 이때 지급되는
          임금이 주휴수당입니다.
        </p>
        <h2>지급 조건</h2>
        <ul>
          <li>
            1주 소정근로시간이 <strong>15시간 이상</strong>이어야 합니다. (엄밀히는 4주간을
            평균한 시간 기준이지만, 매주 근무시간이 동일하다면 한 주 기준으로 판단해도 됩니다.
            주마다 근무시간이 크게 다르다면 이 계산기의 결과가 실제와 다를 수 있습니다.)
          </li>
          <li>
            해당 주의 소정근로일에 <strong>결근 없이 개근</strong>해야 합니다. (지각·조퇴는
            무관하지만, 결근이 있으면 그 주는 지급되지 않습니다.)
          </li>
        </ul>
        <h2>계산 방법</h2>
        <p>
          주휴수당 = (1주 <strong>소정근로시간</strong> ÷ 40, 40시간 상한) × 8 × 시급
        </p>
        <p>
          여기서 소정근로시간은 실제로 더 일하거나 덜 일한 시간이 아니라, 근로계약서에 정해진(약정된)
          시간을 말합니다. 주 40시간을 초과해 계약했더라도 주휴수당 계산 시에는 8시간(최대치)까지만
          인정됩니다.
        </p>
        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          이 계산기의 결과는 참고용 모의 계산입니다. 실제 지급 여부와 금액은 근로계약 내용,
          사업장 특성에 따라 달라질 수 있으며, 고용노동부·노무사 등 공식 확인을 대체하지
          않습니다.
        </p>
      </section>

      {/* TODO: 애드센스 승인 후 이 위치에 광고 슬롯 삽입 (plan.md §2.3) */}

      <Calculator minimumWage={minimumWage.hourly} />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 계산기:{" "}
          <Link href="/part-time" className="font-medium text-orange-600 dark:text-orange-400">
            알바·직장인 계산기 모음
          </Link>
        </p>
      </section>
    </div>
  );
}
