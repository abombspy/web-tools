import type { Metadata } from "next";
import Link from "next/link";
import content from "@content/tools/ko/date-time/business-days.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
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
        {renderBlocks(asBlocks(content), { holidayYear: holidayData.year })}
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
