import type { Metadata } from "next";
import Link from "next/link";
import content from "@content/tools/ko/parenting-health/due-date.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import Calculator from "./Calculator";
import ShareButtons from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "출산 예정일 계산기",
  description: "마지막 생리 시작일을 기준으로 출산 예정일과 현재 임신 주수를 계산합니다.",
};

export default function DueDatePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🤰 출산 예정일 계산기</h1>
      <ShareButtons />

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        {renderBlocks(asBlocks(content))}
      </section>

      {/* TODO: 애드센스 승인 후 이 위치에 광고 슬롯 삽입 (plan.md §2.3) */}

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 계산기:{" "}
          <Link href="/parenting-health" className="font-medium text-emerald-600 dark:text-emerald-400">
            육아·건강 계산기 모음
          </Link>
        </p>
      </section>
    </div>
  );
}
