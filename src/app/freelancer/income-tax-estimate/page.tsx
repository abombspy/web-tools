import type { Metadata } from "next";
import Link from "next/link";
import content from "@content/tools/ko/freelancer/income-tax-estimate.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import { getComprehensiveIncomeTax, getExpenseRatesByIndustry } from "@/lib/rates";
import Calculator from "./Calculator";
import ShareButtons from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "종합소득세 예상 계산기 (프리랜서 간이)",
  description: "프리랜서·사업소득의 예상 종합소득세를 업종별 경비율 기준으로 계산합니다.",
};

export default function IncomeTaxEstimatePage() {
  const rates = getComprehensiveIncomeTax();
  const industries = getExpenseRatesByIndustry();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">📊 종합소득세 예상 계산기 (프리랜서 간이)</h1>
      <ShareButtons />

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        {renderBlocks(asBlocks(content), {
          simplifiedRateThreshold: rates.simplifiedRateThreshold.toLocaleString(),
        })}
      </section>

      <Calculator rates={rates} industries={industries} />

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
