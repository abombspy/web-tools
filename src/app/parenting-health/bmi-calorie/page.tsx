import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "BMI·기초대사량·목표 칼로리 계산기",
  description: "체질량지수(BMI), 기초대사량(BMR), 목표에 맞는 하루 섭취 칼로리를 계산합니다.",
};

export default function BmiCaloriePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-bold">BMI·기초대사량·목표 칼로리 계산기</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>BMI 기준 (대한비만학회 2022 진료지침)</h2>
        <p>
          한국(아시아인) 기준은 WHO 국제 기준보다 낮습니다. 아시아인은 같은 BMI에서도 체지방률이
          더 높고, 더 낮은 BMI에서부터 당뇨·고혈압 등의 위험이 올라가기 때문입니다.
        </p>
        <ul>
          <li>저체중: 18.5 미만</li>
          <li>정상: 18.5 ~ 22.9</li>
          <li>비만 전단계(과체중): 23 ~ 24.9</li>
          <li>1단계 비만: 25 ~ 29.9</li>
          <li>2단계 고도비만: 30 ~ 34.9</li>
          <li>3단계 초고도비만: 35 이상</li>
        </ul>

        <h2>기초대사량과 목표 칼로리</h2>
        <p>
          기초대사량(BMR)은 <strong>Mifflin-St Jeor 공식</strong>으로 계산합니다. 여기에 활동
          수준별 계수를 곱해 하루 총 소비 칼로리(TDEE)를 구하고, 체중 감량은 하루 500kcal를
          빼고 증량은 500kcal를 더해 목표 칼로리를 제안합니다(주당 약 0.5kg 변화에 해당하는
          일반적인 권장치).
        </p>

        <p className="rounded-md bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          이 계산기의 결과는 참고용입니다. 기저질환이 있거나 임신 중인 경우 등은 다른 기준이
          적용될 수 있으니 의료 전문가와 상담하세요.
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
