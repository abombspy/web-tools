// plan.md §4.8 "이름 궁합·MBTI 궁합 테스트". 과학적 근거가 없는 엔터테인먼트 콘텐츠라고
// 명시된 항목이라, 두 입력값을 결정적(같은 입력이면 항상 같은 결과)으로 0~100점에
// 매핑하는 해시 기반 점수만 제공한다. 순서를 바꿔 넣어도(A,B / B,A) 같은 점수가 나오도록
// 정렬 후 해시한다.

export function simpleHash(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return Math.abs(hash);
}

export function calculateCompatibilityScore(a: string, b: string): number {
  const normalized = [a.trim(), b.trim()].sort().join("|");
  return simpleHash(normalized) % 101;
}

export function getCompatibilityComment(score: number): string {
  if (score >= 90) return "천생연분! 환상의 궁합이에요";
  if (score >= 70) return "잘 맞는 편이에요";
  if (score >= 50) return "무난한 궁합이에요";
  if (score >= 30) return "조금 노력이 필요해요";
  return "서로 다른 매력을 가졌네요";
}
