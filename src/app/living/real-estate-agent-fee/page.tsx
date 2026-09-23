import type { Metadata } from "next";
import Link from "next/link";
import { getRealEstateAgentFeeRates } from "@/lib/rates";
import content from "@content/tools/ko/living/real-estate-agent-fee.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import Calculator from "./Calculator";
import ShareButtons from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "중개수수료 계산기",
  description: "매매·전세·월세 거래의 중개수수료(복비) 상한액을 계산합니다.",
};

export default function RealEstateAgentFeePage() {
  const rates = getRealEstateAgentFeeRates();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🤝 중개수수료 계산기</h1>
      <ShareButtons />

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        {renderBlocks(asBlocks(content))}
      </section>

      {/* TODO: 애드센스 승인 후 이 위치에 광고 슬롯 삽입 (plan.md §2.3) */}

      <Calculator rates={rates} />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 계산기:{" "}
          <Link
            href="/living/jeonse-to-monthly-rent"
            className="font-medium text-sky-600 dark:text-sky-400"
          >
            전월세 전환율 계산기
          </Link>{" "}
          ·{" "}
          <Link href="/living" className="font-medium text-sky-600 dark:text-sky-400">
            생활·주거 계산기 모음
          </Link>
        </p>
      </section>
    </div>
  );
}
