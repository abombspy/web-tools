import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "추천 조합",
  description: "상황별로 함께 쓰면 좋은 계산기 조합을 모아뒀습니다.",
};

const COMBOS = [
  {
    title: "알바 시작할 때",
    description: "첫 알바를 시작했다면 이 세 가지를 확인해 보세요.",
    links: [
      { name: "주휴수당 계산기", href: "/part-time/weekly-holiday-pay" },
      { name: "알바 월급 계산기", href: "/part-time/part-time-wage" },
      { name: "근무일수(영업일) 계산기", href: "/date-time/business-days" },
    ],
  },
  {
    title: "퇴사를 앞두고 있다면",
    description: "퇴사 시점에 따라 퇴직금·연차·실업급여가 달라질 수 있어요.",
    links: [
      { name: "퇴사 시점 비교 계산기", href: "/part-time/resignation-date-comparison" },
      { name: "연차수당 계산기", href: "/part-time/annual-leave-pay" },
      { name: "실업급여 모의 계산기", href: "/part-time/unemployment-benefit" },
    ],
  },
  {
    title: "프리랜서 세금 정리",
    description: "3.3% 원천징수부터 종합소득세까지 한 번에 확인하세요.",
    links: [
      { name: "3.3% 원천징수 역산 계산기", href: "/freelancer/withholding-tax-3-3" },
      { name: "부가세 계산기", href: "/freelancer/vat" },
      { name: "종합소득세 예상 계산기", href: "/freelancer/income-tax-estimate" },
    ],
  },
  {
    title: "이사·집 구하기",
    description: "전월세 전환부터 중개수수료, 이사비용까지 미리 가늠해 보세요.",
    links: [
      { name: "전월세 전환율 계산기", href: "/living/jeonse-to-monthly-rent" },
      { name: "중개수수료 계산기", href: "/living/real-estate-agent-fee" },
      { name: "대출 이자·상환 계산기", href: "/living/loan-repayment" },
      { name: "이사 비용 견적 계산기", href: "/living/moving-cost-estimate" },
    ],
  },
  {
    title: "출산·육아 준비",
    description: "출산 예정일부터 육아휴직급여, 이유식까지 챙겨보세요.",
    links: [
      { name: "출산 예정일 계산기", href: "/parenting-health/due-date" },
      { name: "육아휴직 급여 계산기", href: "/part-time/parental-leave-pay" },
      { name: "아기 개월수·성장 백분위 계산기", href: "/parenting-health/baby-growth-percentile" },
      { name: "이유식 단계별 양 계산기", href: "/parenting-health/baby-food-portion" },
    ],
  },
  {
    title: "수험생 필수 도구",
    description: "등급 환산부터 학점, 어학 점수 환산까지.",
    links: [
      { name: "내신·수능 등급 환산 계산기", href: "/student/grade-conversion" },
      { name: "학점 평균(GPA) 계산기", href: "/student/gpa" },
      { name: "토익·오픽 점수 환산표", href: "/student/toeic-opic-conversion" },
    ],
  },
];

export default function RecommendedCombosPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">추천 조합</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        상황별로 함께 쓰면 좋은 계산기들을 모아뒀습니다.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {COMBOS.map((combo) => (
          <div
            key={combo.title}
            className="rounded-2xl border-2 border-violet-100 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-900"
          >
            <h2 className="font-semibold">{combo.title}</h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{combo.description}</p>
            <ul className="mt-3 space-y-1">
              {combo.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-orange-600 hover:underline dark:text-orange-400"
                  >
                    {link.name} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          전체 도구는{" "}
          <Link href="/" className="font-medium text-orange-600 dark:text-orange-400">
            홈
          </Link>
          에서 카테고리별로 확인할 수 있습니다.
        </p>
      </section>
    </div>
  );
}
