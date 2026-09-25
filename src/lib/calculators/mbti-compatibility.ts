// .docs/mbti-match-plan.md §2.1 — MBTI 궁합 테스트에 이론적 근거를 부여하는 계산 로직.
// 이름 궁합(compatibility-score.ts, 순수 해시)과는 완전히 분리된 별도 모듈이다.
//
// 핵심 아이디어: MBTI 4기능 스택은 항상 N/S축 중 하나, T/F축 중 하나씩만 정확히
// 포함한다(예: INFJ = Ni·Fe·Ti·Se → N축은 Ni, S축은 Se, T축은 Ti, F축은 Fe). "N/S/T/F
// 4개 축마다 내향(i)·외향(e) 중 어느 태도를 택했는가"를 스택 안 위치와 무관하게
// 비교하면, 16개 유형이 Node 스크립트로 전수 검증한 결과 정확히 5가지 관계로 갈린다
// (plan.md §2.1 참고):
//   - 4축 전부 반대 → duality(소시오닉스 "듀얼리티" — 이론상 가장 상호보완적)
//   - N·S만 일치 → perceivingAligned(정보 인식 방식은 같고 판단 방식은 반대)
//   - T·F만 일치 → judgingAligned(판단 방식은 같고 정보 인식 방식은 반대)
//   - 4축 전부 일치하지만 다른 유형(같은 4기능, 우선순위만 다름) → sameFunctions
//   - 같은 유형 → identity
// 소시오닉스의 공식 16개 인터타입 관계 전체를 재현한 것은 아니다(그러려면 8기능
// Model A가 필요함 — 조사 결과 plan.md §1.1). 듀얼리티 개념만 정확히 차용하고
// 나머지 4단계는 "일치하는 축이 무엇이냐"라는 자체 검증된 지표로 만든 분류다.

export type MbtiType =
  | "ISTJ" | "ISFJ" | "INFJ" | "INTJ" | "ISTP" | "ISFP" | "INFP" | "INTP"
  | "ESTP" | "ESFP" | "ENFP" | "ENTP" | "ESTJ" | "ESFJ" | "ENFJ" | "ENTJ";

export const MBTI_TYPES: MbtiType[] = [
  "ISTJ", "ISFJ", "INFJ", "INTJ", "ISTP", "ISFP", "INFP", "INTP",
  "ESTP", "ESFP", "ENFP", "ENTP", "ESTJ", "ESFJ", "ENFJ", "ENTJ",
];

type FunctionStack = [string, string, string, string];

// 고전 4기능(Myers) 모델의 표준 스택(우세-보조-3차-열등). 대중적으로 가장 널리
// 쓰이는 도출 규칙이라 검증하기 쉽고, 8기능(Beebe) 모델처럼 3차·열등 기능 파생
// 규칙이 출처마다 갈리는 논쟁이 없다.
const FUNCTION_STACK: Record<MbtiType, FunctionStack> = {
  ISTJ: ["Si", "Te", "Fi", "Ne"],
  ISFJ: ["Si", "Fe", "Ti", "Ne"],
  INFJ: ["Ni", "Fe", "Ti", "Se"],
  INTJ: ["Ni", "Te", "Fi", "Se"],
  ISTP: ["Ti", "Se", "Ni", "Fe"],
  ISFP: ["Fi", "Se", "Ni", "Te"],
  INFP: ["Fi", "Ne", "Si", "Te"],
  INTP: ["Ti", "Ne", "Si", "Fe"],
  ESTP: ["Se", "Ti", "Fe", "Ni"],
  ESFP: ["Se", "Fi", "Te", "Ni"],
  ENFP: ["Ne", "Fi", "Te", "Si"],
  ENTP: ["Ne", "Ti", "Fe", "Si"],
  ESTJ: ["Te", "Si", "Ne", "Fi"],
  ESFJ: ["Fe", "Si", "Ne", "Ti"],
  ENFJ: ["Fe", "Ni", "Se", "Ti"],
  ENTJ: ["Te", "Ni", "Se", "Fi"],
};

type Axis = "N" | "S" | "T" | "F";
type Attitude = "i" | "e";

// 스택에서 N/S/T/F 축별 태도를 추출 — 위치 무관, 항상 4개 축 전부 정확히 하나씩 존재.
function categoryAttitudes(type: MbtiType): Record<Axis, Attitude> {
  const result = {} as Record<Axis, Attitude>;
  for (const fn of FUNCTION_STACK[type]) {
    const axis = fn[0] as Axis;
    const attitude = fn[1] as Attitude;
    result[axis] = attitude;
  }
  return result;
}

export type CompatibilityBand =
  | "duality"
  | "perceivingAligned"
  | "judgingAligned"
  | "sameFunctions"
  | "identity";

function determineBand(a: MbtiType, b: MbtiType): CompatibilityBand {
  if (a === b) return "identity";
  const attitudesA = categoryAttitudes(a);
  const attitudesB = categoryAttitudes(b);
  const nsMatch = attitudesA.N === attitudesB.N && attitudesA.S === attitudesB.S;
  const tfMatch = attitudesA.T === attitudesB.T && attitudesA.F === attitudesB.F;

  if (!nsMatch && !tfMatch) return "duality";
  if (nsMatch && tfMatch) return "sameFunctions"; // 태도 전부 일치 → 같은 4기능, 다른 순서
  return nsMatch ? "perceivingAligned" : "judgingAligned";
}

const BAND_SCORE_CENTER: Record<CompatibilityBand, number> = {
  duality: 94,
  sameFunctions: 80,
  identity: 66,
  perceivingAligned: 58,
  judgingAligned: 58,
};
const BAND_WIDTH = 4;

function simpleHash(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return Math.abs(hash);
}

export type MbtiCompatibilityResult = {
  band: CompatibilityBand;
  score: number;
  stackA: FunctionStack;
  stackB: FunctionStack;
  sharedAxes: Axis[];
};

export function calculateMbtiCompatibility(a: MbtiType, b: MbtiType): MbtiCompatibilityResult {
  const attitudesA = categoryAttitudes(a);
  const attitudesB = categoryAttitudes(b);
  const sharedAxes = (["N", "S", "T", "F"] as const).filter((axis) => attitudesA[axis] === attitudesB[axis]);

  const band = determineBand(a, b);
  const jitter = (simpleHash([a, b].sort().join("|")) % (BAND_WIDTH * 2 + 1)) - BAND_WIDTH;

  return {
    band,
    score: BAND_SCORE_CENTER[band] + jitter,
    stackA: FUNCTION_STACK[a],
    stackB: FUNCTION_STACK[b],
    sharedAxes,
  };
}
