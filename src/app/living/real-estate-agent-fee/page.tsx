import type { Metadata } from "next";
import Link from "next/link";
import { getRealEstateAgentFeeRates } from "@/lib/rates";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "중개수수료 계산기",
  description: "매매·전세·월세 거래의 중개수수료(복비) 상한액을 계산합니다.",
};

export default function RealEstateAgentFeePage() {
  const rates = getRealEstateAgentFeeRates();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-bold">중개수수료 계산기</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>계산 방법</h2>
        <p>
          <strong>공인중개사법 시행규칙</strong>과 지자체 조례에 따라, 거래금액 구간별로 상한
          요율과 한도액이 정해져 있습니다. 실제 중개수수료는 이 상한 이내에서 중개사와
          협의해 정합니다.
        </p>
        <p>
          월세 거래는 보증금과 월세를 합쳐 <strong>환산보증금</strong>으로 계산합니다:
          보증금 + (월세 × 100), 단 그 합이 5천만원 미만이면 보증금 + (월세 × 70)을 씁니다.
        </p>

        <p className="rounded-md bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          이 계산기의 요율표는 서울시 공식 자료 기준입니다. 대부분 지자체가 같은 표준 요율표를
          쓰지만, 지역에 따라 다를 수 있으니 정확한 값은 해당 지역 조례나 부동산 중개사에게
          확인하세요. 표시된 금액은 상한액이며, 부가세는 별도입니다.
        </p>
      </section>

      {/* TODO: 애드센스 승인 후 이 위치에 광고 슬롯 삽입 (plan.md §2.3) */}

      <Calculator rates={rates} />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 계산기:{" "}
          <Link
            href="/living/jeonse-to-monthly-rent"
            className="font-medium text-blue-600 dark:text-blue-400"
          >
            전월세 전환율 계산기
          </Link>{" "}
          ·{" "}
          <Link href="/living" className="font-medium text-blue-600 dark:text-blue-400">
            생활·주거 계산기 모음
          </Link>
        </p>
      </section>
    </div>
  );
}
