// plan.md §4.6 "공무원 시험 합격선 예측기".
//
// 스코프를 크게 좁힘(중요): 직렬별·연도별 합격선 통계를 이 계산기에 직접 내장하지 않는다.
// 조사해보니 아직 치르지 않은 시험의 "예상 커트라인"은 학원·블로그의 추측치뿐이고, 공식
// 통계(사이버국가고시센터·인사혁신처 발표)는 시험이 끝나야 나온다. 근거 없는 숫자를
// 내장해 "예측"처럼 보여주면 오히려 잘못된 확신을 줄 위험이 있어, 대신 사용자가 직접
// 조사한 과거 합격선을 입력하면 본인 예상 점수와 비교해 주는 "비교 도구"로 스코프를
// 제한한다(공식 예측이 아님을 UI에 명확히 표시).
export type PastCutoff = { year: string; score: number };

export type CivilServiceComparisonResult = {
  averageCutoff: number;
  maxCutoff: number;
  minCutoff: number;
  gapFromAverage: number;
  gapFromMax: number;
};

export function compareCivilServiceScore(
  myScore: number,
  pastCutoffs: PastCutoff[],
): CivilServiceComparisonResult {
  const scores = pastCutoffs.map((c) => c.score);
  const averageCutoff = Math.round((scores.reduce((sum, s) => sum + s, 0) / scores.length) * 100) / 100;
  const maxCutoff = Math.max(...scores);
  const minCutoff = Math.min(...scores);

  return {
    averageCutoff,
    maxCutoff,
    minCutoff,
    gapFromAverage: Math.round((myScore - averageCutoff) * 100) / 100,
    gapFromMax: Math.round((myScore - maxCutoff) * 100) / 100,
  };
}
