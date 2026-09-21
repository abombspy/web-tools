import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "전월세 전환율 계산기",
  description: "전세보증금을 월세로 바꿀 때 법정 상한 전환율과 월세를 계산합니다.",
};

export default function JeonseToMonthlyRentPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🏘️ 전월세 전환율 계산기</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>계산 방법</h2>
        <p>
          월세 = (기존 전세보증금 − 전환 후 보증금) × 전환율 ÷ 12
        </p>
        <p>
          <strong>주택임대차보호법 제7조의2·시행령 제9조</strong>에 따라, 전환율의 법정 상한은{" "}
          <strong>한국은행 기준금리 + 2%포인트</strong>와 <strong>연 10%</strong> 중{" "}
          <strong>더 낮은 값</strong>입니다. 기준금리가 오르면 상한도 함께 올라가지만, 아무리
          올라도 연 10%를 넘지 않습니다.
        </p>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          기준금리는 한국은행 금융통화위원회가 주기적으로 조정하므로, 계산 시점의 정확한
          기준금리를{" "}
          <a href="https://www.bok.or.kr/portal/singl/baseRate/list.do" target="_blank" rel="noopener noreferrer">
            한국은행 홈페이지
          </a>
          에서 확인해 입력하세요. 이 계산기는 신규 계약·갱신계약 모두에 적용되는 법정 상한만
          계산하며, 개별 계약의 특수 조건은 반영하지 않습니다.
        </p>
      </section>

      {/* TODO: 애드센스 승인 후 이 위치에 광고 슬롯 삽입 (plan.md §2.3) */}

      <Calculator />

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
