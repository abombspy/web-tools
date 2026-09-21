import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "출산 예정일 계산기",
  description: "마지막 생리 시작일을 기준으로 출산 예정일과 현재 임신 주수를 계산합니다.",
};

export default function DueDatePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">출산 예정일 계산기</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>계산 방법</h2>
        <p>
          산부인과에서 널리 쓰는 <strong>네겔레 법칙(Naegele&apos;s Rule)</strong>에 따라, 마지막
          생리 시작일에 280일(40주)을 더해 출산 예정일을 계산합니다. 이는 생리 주기가 28일로
          규칙적인 경우를 가정한 평균적인 계산법입니다.
        </p>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          이 계산기의 결과는 참고용 추정치입니다. 실제 출산일은 초음파 검사 등을 통한 산부인과
          진단에 따라 달라지며, 생리 주기가 불규칙한 경우 오차가 더 클 수 있습니다. 정확한
          예정일은 산부인과에서 확인하세요.
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
