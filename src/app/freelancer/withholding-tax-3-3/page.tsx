import type { Metadata } from "next";
import Link from "next/link";
import { getWithholdingTax } from "@/lib/rates";
import content from "@content/tools/ko/freelancer/withholding-tax-3-3.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "3.3% 원천징수 역산 계산기",
  description: "프리랜서·사업소득 세전/세후 금액을 3.3% 원천징수 기준으로 서로 변환합니다.",
};

export default function WithholdingTax33Page() {
  const rates = getWithholdingTax();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🧾 3.3% 원천징수 역산 계산기</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        {renderBlocks(asBlocks(content))}
      </section>

      {/* TODO: 애드센스 승인 후 이 위치에 광고 슬롯 삽입 (plan.md §2.3) */}

      <Calculator rates={rates} />

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
