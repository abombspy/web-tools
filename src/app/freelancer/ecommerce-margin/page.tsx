import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "스마트스토어·쿠팡 마진 계산기",
  description: "판매수수료·결제수수료·배송비를 반영한 순이익과 마진율, 또는 목표 마진율에 필요한 판매가를 계산합니다.",
};

export default function EcommerceMarginPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">스마트스토어·쿠팡 마진 계산기</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>계산 방법</h2>
        <p>순이익 = 판매가 − 원가 − 판매수수료 − 결제수수료 − 배송비</p>
        <p>
          또는 반대로, 원하는 마진율을 정해두고 그 마진율을 맞추려면 얼마에 팔아야 하는지
          역산할 수도 있습니다.
        </p>

        <p className="rounded-md bg-blue-50 p-4 text-sm not-prose dark:bg-blue-950/40">
          네이버 스마트스토어·쿠팡의 판매수수료는 카테고리마다 다르고 자주 바뀝니다. 그래서
          카테고리별 수수료율표를 미리 넣어두는 대신, <strong>판매자센터에서 확인한 본인의
          수수료율을 직접 입력</strong>하도록 만들었습니다.
        </p>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          이 계산기의 결과는 참고용입니다. 프로모션 할인, 부가세, 반품·교환 비용 등은 반영하지
          않습니다.
        </p>
      </section>

      {/* TODO: 애드센스 승인 후 이 위치에 광고 슬롯 삽입 (plan.md §2.3) */}

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 계산기:{" "}
          <Link href="/freelancer/vat" className="font-medium text-orange-600 dark:text-orange-400">
            부가세 계산기
          </Link>{" "}
          ·{" "}
          <Link href="/freelancer" className="font-medium text-orange-600 dark:text-orange-400">
            프리랜서·사업자 계산기 모음
          </Link>
        </p>
      </section>
    </div>
  );
}
