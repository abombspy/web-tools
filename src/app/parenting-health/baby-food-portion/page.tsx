import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "이유식 단계별 양 계산기",
  description: "아기 월령에 맞는 이유식 단계와 급여 횟수·양을 확인합니다.",
};

export default function BabyFoodPortionPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">이유식 단계별 양 계산기</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>이유식 4단계</h2>
        <ul>
          <li><strong>초기(4~6개월)</strong>: 묽은 미음, 하루 1회, 5~80ml</li>
          <li><strong>중기(7~8개월)</strong>: 되직한 죽, 하루 2회, 1회 50~100g</li>
          <li><strong>후기(9~11개월)</strong>: 덩어리 음식 도입, 하루 3회, 1회 90~120g</li>
          <li><strong>완료기(12~15개월)</strong>: 진밥·반찬, 하루 3회+간식, 1회 100~130g</li>
        </ul>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          이 표는 국가 공식 기준이 아니라 소아과·육아 정보 자료를 참고한 <strong>일반적인
          권장 범위</strong>입니다. 아기마다 발달 속도, 식욕, 소화 상태가 달라 이 범위와
          차이가 있을 수 있으며, 알레르기 반응이나 특이사항이 있다면 소아과 전문의와
          상담하세요.
        </p>
      </section>

      {/* TODO: 애드센스 승인 후 이 위치에 광고 슬롯 삽입 (plan.md §2.3) */}

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 계산기:{" "}
          <Link href="/parenting-health" className="font-medium text-orange-600 dark:text-orange-400">
            육아·건강 계산기 모음
          </Link>
        </p>
      </section>
    </div>
  );
}
