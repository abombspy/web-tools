import type { Metadata } from "next";
import Link from "next/link";
import { getVat } from "@/lib/rates";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "부가세 계산기",
  description: "공급가액과 합계금액(부가세 포함)을 서로 변환합니다.",
};

export default function VatPage() {
  const rates = getVat();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🧮 부가세 계산기</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>계산 방법</h2>
        <p>
          <strong>부가가치세법</strong>에 따라 일반과세자의 부가세율은 <strong>10%</strong>입니다.
        </p>
        <ul>
          <li>공급가액 → 합계금액: 공급가액 × 1.1</li>
          <li>합계금액 → 공급가액: 합계금액 ÷ 1.1 (나누어떨어지지 않으면 반올림)</li>
        </ul>
        <p>
          영수증이나 계산서에 &ldquo;부가세 포함&rdquo;이라고 적힌 금액(합계금액)에서 공급가액과
          부가세를 나눠보고 싶을 때, 또는 공급가액에 부가세를 더해 최종 청구 금액을 계산할 때
          사용하세요.
        </p>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          이 계산기는 일반과세자(10%) 기준입니다. 간이과세자는 업종별로 부가세율이 다르게
          적용되므로 이 계산기의 결과와 다를 수 있습니다.
        </p>
      </section>

      {/* TODO: 애드센스 승인 후 이 위치에 광고 슬롯 삽입 (plan.md §2.3) */}

      <Calculator rates={rates} />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 계산기:{" "}
          <Link
            href="/freelancer/withholding-tax-3-3"
            className="font-medium text-rose-600 dark:text-rose-400"
          >
            3.3% 원천징수 역산 계산기
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
