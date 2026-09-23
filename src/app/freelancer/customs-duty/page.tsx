import type { Metadata } from "next";
import Link from "next/link";
import content from "@content/tools/ko/freelancer/customs-duty.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import { getCustomsDuty } from "@/lib/rates";
import Calculator from "./Calculator";
import ShareButtons from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "해외직구 관세 계산기",
  description: "면세한도, 관세, 부가세를 계산합니다.",
};

export default function CustomsDutyPage() {
  const rates = getCustomsDuty();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">✈️ 해외직구 관세 계산기</h1>
      <ShareButtons />

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        {renderBlocks(asBlocks(content), {
          generalLimitUsd: rates.generalLimitUsd,
          usOriginLimitUsd: rates.usOriginLimitUsd,
          vatRatePercent: (rates.vatRate * 100).toFixed(0),
        })}
      </section>

      <Calculator rates={rates} />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 계산기:{" "}
          <Link href="/freelancer" className="font-medium text-rose-600 dark:text-rose-400">
            프리랜서·사업자 계산기 모음
          </Link>
        </p>
      </section>
    </div>
  );
}
