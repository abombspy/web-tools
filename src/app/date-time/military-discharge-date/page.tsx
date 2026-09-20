import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "군 전역일 계산기",
  description: "입대일과 군종을 기준으로 전역일과 복무 진행률을 계산합니다.",
};

export default function MilitaryDischargeDatePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-bold">군 전역일 계산기</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>2026년 기준 복무기간</h2>
        <ul>
          <li>육군·해병대: 18개월</li>
          <li>해군: 20개월</li>
          <li>공군: 21개월</li>
          <li>사회복무요원: 21개월</li>
        </ul>

        <p className="rounded-md bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          복무기간은 병역법 개정에 따라 바뀔 수 있고, 휴가·징계 등에 따라 실제 전역일이
          달라질 수 있습니다. 정확한 전역일은 병무청 나라사랑포털이나 소속 부대에서
          확인하세요.
        </p>
      </section>

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 계산기:{" "}
          <Link href="/date-time" className="font-medium text-blue-600 dark:text-blue-400">
            날짜·시간 계산기 모음
          </Link>
        </p>
      </section>
    </div>
  );
}
