import type { Metadata } from "next";
import Link from "next/link";
import { getCustomsDuty } from "@/lib/rates";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "해외직구 관세 계산기",
  description: "면세한도, 관세, 부가세를 계산합니다.",
};

export default function CustomsDutyPage() {
  const rates = getCustomsDuty();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-bold">해외직구 관세 계산기</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>면세한도</h2>
        <ul>
          <li>일반: 물품가+배송료 합계 {rates.generalLimitUsd}달러 이하는 면세</li>
          <li>
            미국발(한미FTA) + 목록통관 가능 품목: {rates.usOriginLimitUsd}달러까지 면세
            (건강기능식품·화장품·주류 등은 미국발이어도 {rates.generalLimitUsd}달러 기준이
            적용됩니다)
          </li>
        </ul>
        <p className="rounded-md bg-blue-50 p-4 text-sm not-prose dark:bg-blue-950/40">
          <strong>면세한도를 넘으면 초과분이 아니라 전체 금액에 과세됩니다.</strong> 예를 들어
          151달러짜리 물품은 150달러를 1달러 넘겼다는 이유로 151달러 전체에 관세와 부가세가
          부과됩니다.
        </p>

        <h2>과세 시 계산 방법</h2>
        <p>
          과세가격 = (물품가격 + 국제배송료) × 환율. 관세 = 과세가격 × 관세율, 부가세 =
          (과세가격 + 관세) × {(rates.vatRate * 100).toFixed(0)}%.
        </p>

        <p className="rounded-md bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          관세율은 품목마다(HS코드 기준 수천 개) 다르므로 이 계산기가 자동으로 넣어주지
          않습니다. 관세청 홈페이지에서 본인 품목의 관세율을 확인해 직접 입력하세요. 환율도
          실시간 연동 없이 직접 입력합니다. 개별소비세가 부과되는 고가품 등 일부 품목은 이
          계산기 범위 밖입니다.
        </p>
      </section>

      {/* TODO: 애드센스 승인 후 이 위치에 광고 슬롯 삽입 (plan.md §2.3) */}

      <Calculator rates={rates} />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 계산기:{" "}
          <Link href="/freelancer" className="font-medium text-blue-600 dark:text-blue-400">
            프리랜서·사업자 계산기 모음
          </Link>
        </p>
      </section>
    </div>
  );
}
