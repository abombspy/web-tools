import type { Metadata } from "next";
import Link from "next/link";
import { getWithholdingTax } from "@/lib/rates";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "3.3% 원천징수 역산 계산기",
  description: "프리랜서·사업소득 세전/세후 금액을 3.3% 원천징수 기준으로 서로 변환합니다.",
};

export default function WithholdingTax33Page() {
  const rates = getWithholdingTax();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">3.3% 원천징수 역산 계산기</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>3.3%는 어디서 나온 숫자인가요?</h2>
        <p>
          프리랜서 등 사업소득을 지급하는 쪽(회사)은 <strong>소득세법</strong>에 따라 지급액의
          3%를 소득세로 원천징수하고, <strong>지방세법</strong>에 따라 그 소득세액의 10%를
          지방소득세로 추가 원천징수합니다. 결과적으로 3% + 0.3% = <strong>3.3%</strong>를
          떼고 지급합니다.
        </p>

        <h2>계산 방법</h2>
        <ul>
          <li>세전(계약서상 금액) → 세후: 세전 × (1 − 0.033)</li>
          <li>세후(실제 입금액) → 세전: 세후 ÷ (1 − 0.033) (반올림으로 인한 근사치)</li>
        </ul>
        <p>
          지방소득세는 세전 금액의 0.3%가 아니라, <strong>소득세액의 10%</strong>로 계산되므로
          원 단위에서 미세한 차이가 날 수 있습니다. 이 계산기는 실제 원천징수 방식과 동일하게
          소득세를 먼저 계산한 뒤 그 10%로 지방소득세를 구합니다.
        </p>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          이 계산기의 결과는 참고용입니다. 간이과세자·면세사업자 등 예외가 적용되는 경우 실제
          원천징수액이 다를 수 있습니다.
        </p>
      </section>

      {/* TODO: 애드센스 승인 후 이 위치에 광고 슬롯 삽입 (plan.md §2.3) */}

      <Calculator rates={rates} />

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
