import type { Metadata } from "next";
import Link from "next/link";
import { getHolidays } from "@/lib/rates";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "근무일수(영업일) 계산기",
  description: "주말과 공휴일을 제외한 근무일수(영업일)를 계산합니다.",
};

export default function BusinessDaysPage() {
  const holidayData = getHolidays();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🗓️ 근무일수(영업일) 계산기</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>계산 방법</h2>
        <p>
          시작일부터 종료일까지(양 끝 날짜 포함)의 전체 일수에서 <strong>토·일요일</strong>과{" "}
          <strong>관공서의 공휴일에 관한 규정</strong>상 공휴일을 뺀 평일 수를 계산합니다.
        </p>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          공휴일 데이터는 {holidayData.year}년 기준이며, 설날·추석·대체공휴일은 매년 바뀌므로
          실제 사용 전 행정안전부 발표로 재확인하는 걸 권장합니다. 근로자의날(5월 1일)은
          관공서 공휴일이 아니라서 이 계산기에 포함하지 않았습니다. 제헌절(7월 17일)은
          2008년부터 공휴일에서 제외됐었으나, 2026년부터 다시 관공서 공휴일로 지정되어 이
          계산기에도 포함했습니다.
        </p>
      </section>

      <Calculator holidays={holidayData.holidays} coveredYear={holidayData.year} />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 계산기:{" "}
          <Link href="/date-time" className="font-medium text-amber-600 dark:text-amber-400">
            날짜·시간 계산기 모음
          </Link>
        </p>
      </section>
    </div>
  );
}
