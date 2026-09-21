import type { Metadata } from "next";
import Link from "next/link";
import { getElectricityBillRates } from "@/lib/rates";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "전기요금 계산기",
  description: "주택용 전기요금 누진제를 반영한 예상 전기요금을 계산합니다.",
};

export default function ElectricityBillPage() {
  const rates = getElectricityBillRates();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">💡 전기요금 계산기</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>누진제란?</h2>
        <p>
          주택용(저압) 전기요금은 사용량이 늘어날수록 <strong>3단계로 구간을 나눠 각 구간마다
          다른 단가</strong>를 적용하는 누진제를 씁니다. 기본요금도 최종적으로 도달한 구간의
          금액이 적용됩니다.
        </p>
        <p>
          <strong>여름철(7~8월)</strong>에는 에어컨 사용이 늘어나는 걸 감안해 구간 기준이
          완화됩니다(1단계 200→300kWh, 2단계 400→450kWh).
        </p>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          이 계산기의 요금표는 여러 자료를 교차 검색해 모은 참고치이며, 정확한 값은 한전
          ON(한국전력)에서 확인하세요. 부가세(10%)와 전력산업기반기금(3.7%)은 추정치로만
          더했으며, 실제 청구서의 10원 단위 절사 규칙까지는 반영하지 않았습니다.
        </p>
      </section>

      {/* TODO: 애드센스 승인 후 이 위치에 광고 슬롯 삽입 (plan.md §2.3) */}

      <Calculator rates={rates} vatRate={rates.vatRate} fundRate={rates.fundRate} />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 계산기:{" "}
          <Link href="/living" className="font-medium text-sky-600 dark:text-sky-400">
            생활·주거 계산기 모음
          </Link>
        </p>
      </section>
    </div>
  );
}
