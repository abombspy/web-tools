// 공공기관 채용 공고에서 널리 쓰이는 "어학성적 환산 기준표"(OPIc→TOEIC 환산) 기준.
// plan.md §4.6 "토익·오픽 점수 환산표". 출처: 공공기관 채용 공고 첨부문서(2026-09-20 확인).
export type OpicLevel = "IM1" | "IM2" | "IM3" | "IH" | "AL";

export type OpicToToeicRow = {
  opicLevel: OpicLevel;
  toeicMin: number;
  toeicMax: number;
  toeicAverage: number;
};

export const OPIC_TO_TOEIC_TABLE: OpicToToeicRow[] = [
  { opicLevel: "IM1", toeicMin: 470, toeicMax: 715, toeicAverage: 593 },
  { opicLevel: "IM2", toeicMin: 720, toeicMax: 815, toeicAverage: 765 },
  { opicLevel: "IM3", toeicMin: 815, toeicMax: 915, toeicAverage: 860 },
  { opicLevel: "IH", toeicMin: 915, toeicMax: 955, toeicAverage: 935 },
  { opicLevel: "AL", toeicMin: 955, toeicMax: 990, toeicAverage: 980 },
];

export function findToeicRangeForOpic(level: OpicLevel): OpicToToeicRow {
  const row = OPIC_TO_TOEIC_TABLE.find((r) => r.opicLevel === level);
  if (!row) throw new Error(`알 수 없는 OPIc 레벨: ${level}`);
  return row;
}

/** 이 공식 환산표는 IM1 미만(IM, IL, NH 등)은 다루지 않는다 */
export function findOpicLevelForToeic(toeicScore: number): OpicLevel | null {
  const row = OPIC_TO_TOEIC_TABLE.find((r) => toeicScore >= r.toeicMin && toeicScore <= r.toeicMax);
  return row?.opicLevel ?? null;
}
