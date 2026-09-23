import type { Metadata } from "next";
import Link from "next/link";
import content from "@content/tools/ko/freelancer/ecommerce-margin.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "스마트스토어·쿠팡 마진 계산기",
  description: "판매수수료·결제수수료·배송비를 반영한 순이익과 마진율, 또는 목표 마진율에 필요한 판매가를 계산합니다.",
};

export default function EcommerceMarginPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🛍️ 스마트스토어·쿠팡 마진 계산기</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        {renderBlocks(asBlocks(content))}
      </section>

      {/* TODO: 애드센스 승인 후 이 위치에 광고 슬롯 삽입 (plan.md §2.3) */}

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 계산기:{" "}
          <Link href="/freelancer/vat" className="font-medium text-rose-600 dark:text-rose-400">
            부가세 계산기
          </Link>{" "}
          ·{" "}
          <Link href="/freelancer" className="font-medium text-rose-600 dark:text-rose-400">
            프리랜서·사업자 계산기 모음
          </Link>
        </p>
      </section>
    </div>
  );
}
