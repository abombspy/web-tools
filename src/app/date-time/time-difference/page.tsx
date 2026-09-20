import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "시차 계산기",
  description: "두 도시 간 시차를 서머타임(DST)까지 반영해 계산합니다.",
};

export default function TimeDifferencePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-bold">시차 계산기</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>계산 방법</h2>
        <p>
          각 도시의 표준시간대(타임존) 데이터를 이용해 UTC 기준 오프셋을 구하고, 그 차이를
          시차로 계산합니다. 미국·유럽 등 일부 지역은 여름에{" "}
          <strong>서머타임(DST)</strong>이 적용되어 계절에 따라 시차가 달라지므로, 기준
          날짜를 반드시 입력해야 합니다.
        </p>
        <p>
          예를 들어 서울-뉴욕 시차는 겨울에는 14시간이지만, 미국이 서머타임을 적용하는
          여름에는 13시간으로 줄어듭니다.
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
