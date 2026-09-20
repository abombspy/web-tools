// plan.md §4.7 "맞춤법 체크용 텍스트 정리 도구".
//
// 스코프 제한(중요): 실제 맞춤법 검사(문맥 분석, 띄어쓰기 교정 등)는 국립국어원이 공식
// API를 제공하지 않고, 비공식 API(예: 부산대 맞춤법 검사기)는 서비스 중단·ToS 위반
// 리스크가 있어 쓰지 않는다(plan.md §6.4). 대신 이 도구는 (1) 공백·줄바꿈 정리와
// (2) 문맥과 무관하게 항상 틀린 것으로 볼 수 있는 소수의 흔한 오타만 교정한다.
// 띄어쓰기 교정, 문맥 의존적 맞춤법(되/돼, 안/않 등)은 다루지 않는다.

// [찾을 패턴, 교정 결과] — 문맥과 무관하게 항상 틀린 표기만 담는다.
const COMMON_TYPOS: [RegExp, string][] = [
  [/됬/g, "됐"],
  [/웬지/g, "왠지"],
  [/어의없/g, "어이없"],
  [/금새/g, "금세"],
  [/몇일/g, "며칠"],
  [/할께/g, "할게"],
  [/할껄/g, "할걸"],
  [/않되/g, "안돼"],
];

export type TextCleanupResult = {
  cleaned: string;
  typoFixCount: number;
};

export function cleanupText(text: string): TextCleanupResult {
  let cleaned = text;
  let typoFixCount = 0;

  for (const [pattern, replacement] of COMMON_TYPOS) {
    const matches = cleaned.match(pattern);
    if (matches) typoFixCount += matches.length;
    cleaned = cleaned.replace(pattern, replacement);
  }

  cleaned = cleaned
    .replace(/[ \t]+/g, " ") // 연속 공백을 하나로
    .replace(/ +([.,!?])/g, "$1") // 문장부호 앞 공백 제거
    .replace(/\n{3,}/g, "\n\n") // 빈 줄이 3개 이상이면 2개로
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .trim();

  return { cleaned, typoFixCount };
}
