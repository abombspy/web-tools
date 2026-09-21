import type { Metadata } from "next";
import Link from "next/link";
import { getComprehensiveIncomeTax, getExpenseRatesByIndustry } from "@/lib/rates";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "종합소득세 예상 계산기 (프리랜서 간이)",
  description: "프리랜서·사업소득의 예상 종합소득세를 업종별 경비율 기준으로 계산합니다.",
};

export default function IncomeTaxEstimatePage() {
  const rates = getComprehensiveIncomeTax();
  const industries = getExpenseRatesByIndustry();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">종합소득세 예상 계산기 (프리랜서 간이)</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>계산 방법</h2>
        <p>
          연 매출(수입금액)에서 업종별 경비율만큼을 필요경비로 인정해 사업소득금액을 구하고,
          기본공제 150만원을 뺀 과세표준에 <strong>종합소득세 누진세율(6~45%, 8단계)</strong>을
          적용합니다.
        </p>
        <p>
          산출세액 = 과세표준 × 세율 − 누진공제액이며, 연 수입이{" "}
          {rates.simplifiedRateThreshold.toLocaleString()}원{" "}
          <strong>미만이면 단순경비율</strong>, 그 이상이면{" "}
          <strong>기준경비율</strong>을 적용합니다(단순경비율이 훨씬 높아 세금이 줄어듭니다).
        </p>

        <p className="rounded-md bg-blue-50 p-4 text-sm not-prose dark:bg-blue-950/40">
          이 계산기는 <strong>상위 업종 5개</strong>(1인미디어 콘텐츠창작자, 저술가·작가·번역가,
          학원강사·과외교습자, 퀵서비스·배달라이더, IT프리랜서·기타자영업)만 지원합니다. 목록에
          없는 업종은 국세청 홈택스에서 본인 업종코드의 경비율을 직접 조회해 입력할 수 있습니다.
        </p>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          업종별 경비율은 국세청이 매년 4월경(다음 연도)에 고시합니다. 이 계산기에 들어있는
          경비율은 여러 세무 자료를 교차 검색해 모은 참고치이며, 업종마다 기준 연도가 다릅니다
          (2019~2024년). 정확한 값은 국세청 홈택스 &ldquo;기준(단순)경비율 조회&rdquo;에서 확인
          하세요. 또한 이 계산기는 본인 기본공제(150만원)만 반영하며, 부양가족 공제·세액공제·
          건강보험료 공제 등은 반영하지 않은 간이 계산입니다.
        </p>
      </section>

      {/* TODO: 애드센스 승인 후 이 위치에 광고 슬롯 삽입 (plan.md §2.3) */}

      <Calculator rates={rates} industries={industries} />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 계산기:{" "}
          <Link
            href="/freelancer/withholding-tax-3-3"
            className="font-medium text-orange-600 dark:text-orange-400"
          >
            3.3% 원천징수 역산 계산기
          </Link>{" "}
          ·{" "}
          <Link href="/freelancer" className="font-medium text-orange-600 dark:text-orange-400">
            프리랜서·사업자 계산기 모음
          </Link>
        </p>
      </section>
    </div>
  );
}
