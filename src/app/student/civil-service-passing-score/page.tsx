import type { Metadata } from "next";
import Link from "next/link";
import content from "@content/tools/ko/student/civil-service-passing-score.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "공무원 시험 합격선 비교 도구",
  description: "본인이 조사한 과거 합격선과 예상 점수를 비교합니다.",
};

export default function CivilServicePassingScorePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🏛️ 공무원 시험 합격선 비교 도구</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        {renderBlocks(asBlocks(content))}
      </section>

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 계산기:{" "}
          <Link href="/student" className="font-medium text-indigo-600 dark:text-indigo-400">
            학생·수험생 계산기 모음
          </Link>
        </p>
      </section>
    </div>
  );
}
