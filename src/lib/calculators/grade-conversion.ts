// 내신 등급(5등급제/9등급제)과 수능 등급(9등급제) 환산. plan.md §4.6 "내신·수능 등급 환산
// 계산기".
//
// 스코프 제한(교육부 2028 대입제도 개편 확인, 2026-09-20):
// - 2026년은 제도 전환기라 학년별로 다른 등급제가 적용된다: 2026년 고3(마지막 9등급제 세대),
//   고1·고2(5등급제 첫 적용). 사용자가 직접 등급제를 선택하게 한다.
// - 내신 석차백분율은 "석차 ÷ 재적수 × 100"으로 간이 계산한다. 실제 나이스 공식은 동점자를
//   반영한 [석차 + (동석차 인원수-1)/2] ÷ 재적수 × 100이라, 동점자가 있으면 실제 학교
//   산출값과 차이가 날 수 있다(UI에 명시).
// - 수능은 표준점수가 아니라 백분위를 직접 입력받는다. 표준점수→등급 환산은 그 해 채점
//   난이도에 따라 등급컷이 달라져 공식 발표 전에는 정확히 계산할 수 없기 때문이다.
export type GradeSystem = "5-tier" | "9-tier";

const TIER_5_CUMULATIVE_PERCENT = [10, 34, 66, 90, 100];
const TIER_9_CUMULATIVE_PERCENT = [4, 11, 23, 40, 60, 77, 89, 96, 100];

function findGrade(percentile: number, cumulativeBrackets: number[]): number {
  for (let i = 0; i < cumulativeBrackets.length; i += 1) {
    if (percentile <= cumulativeBrackets[i]) return i + 1;
  }
  return cumulativeBrackets.length;
}

export type SchoolGradeResult = { percentile: number; grade: number };

export function calculateSchoolGrade(
  rank: number,
  totalStudents: number,
  system: GradeSystem,
): SchoolGradeResult {
  const percentile = Math.round((rank / totalStudents) * 10000) / 100;
  const brackets = system === "5-tier" ? TIER_5_CUMULATIVE_PERCENT : TIER_9_CUMULATIVE_PERCENT;
  return { percentile, grade: findGrade(percentile, brackets) };
}

export function calculateCsatGrade(percentile: number): number {
  return findGrade(percentile, TIER_9_CUMULATIVE_PERCENT);
}
