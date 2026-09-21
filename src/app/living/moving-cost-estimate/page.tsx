import type { Metadata } from "next";
import Link from "next/link";
import { getMovingCostEstimateRates } from "@/lib/rates";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "이사 비용 견적 계산기",
  description: "평수, 이사 방식, 사다리차 여부를 반영한 대략적인 이사 비용 범위를 추정합니다.",
};

export default function MovingCostEstimatePage() {
  const rates = getMovingCostEstimateRates();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🚚 이사 비용 견적 계산기</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>왜 범위로 나오나요?</h2>
        <p>
          이사 비용은 관세청·한전처럼 정부가 정한 공식 요금표가 <strong>존재하지 않습니다.</strong>{" "}
          업체별로 자유롭게 가격을 책정하고, 같은 평수라도 짐의 양·이동 거리·이사 날짜(손 없는
          날 등 성수기)에 따라 가격이 크게 달라집니다.
        </p>
        <p>
          이 계산기는 여러 이사 업체·견적 비교 플랫폼의 공개 자료를 참고해 만든{" "}
          <strong>대략적인 추정치</strong>이며, 평수 × 이사 방식별 단가에 사다리차 비용을 더한
          뒤 상하 20~30% 범위로 보여줍니다.
        </p>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          이 계산기는 감을 잡기 위한 참고용입니다. 실제 이사 전에는 <strong>반드시 2~3곳 이상
          실제 견적을 받아 비교</strong>하세요. 특히 성수기(3~4월, 손 없는 날)에는 이 범위보다
          훨씬 비쌀 수 있습니다.
        </p>
      </section>

      {/* TODO: 애드센스 승인 후 이 위치에 광고 슬롯 삽입 (plan.md §2.3) */}

      <Calculator rates={rates} />

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
