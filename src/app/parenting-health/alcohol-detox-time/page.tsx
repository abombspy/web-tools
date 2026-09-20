import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "음주 후 해독 시간 추정기",
  description: "위드마크 공식을 이용해 음주 후 혈중알코올농도와 해독 시간을 추정합니다.",
};

export default function AlcoholDetoxTimePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-bold">음주 후 해독 시간 추정기</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>계산 방법</h2>
        <p>
          법의학·의학에서 널리 쓰이는 <strong>위드마크(Widmark) 공식</strong>을 이용합니다.
        </p>
        <ul>
          <li>순수 알코올량(g) = 음주량(mL) × 도수(%) × 0.8(알코올 비중)</li>
          <li>초기 혈중알코올농도(BAC, %) = 알코올량 ÷ (체중(g) × 위드마크 계수) × 100</li>
          <li>해독 시간(시간) = 초기 BAC ÷ 시간당 분해율(약 0.015%p)</li>
        </ul>
        <p>
          위드마크 계수는 체내 수분 분포 차이를 반영해 남성 0.7, 여성 0.6을 사용합니다(여성이
          같은 체중·음주량에서 BAC가 더 높게 나옵니다).
        </p>

        <p className="rounded-md bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          이 계산기는 <strong>참고용 추정치</strong>입니다. 실제 알코올 분해 속도는 체질, 간
          기능, 공복 여부, 복용 중인 약물 등에 따라 개인차가 매우 큽니다. 이 결과를 운전 가능
          여부 판단 등에 사용하지 마세요.
        </p>
      </section>

      {/* TODO: 애드센스 승인 후 이 위치에 광고 슬롯 삽입 (plan.md §2.3) */}

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 계산기:{" "}
          <Link href="/parenting-health" className="font-medium text-blue-600 dark:text-blue-400">
            육아·건강 계산기 모음
          </Link>
        </p>
      </section>
    </div>
  );
}
