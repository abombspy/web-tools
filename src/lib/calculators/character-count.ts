// 순수 텍스트 통계 계산. plan.md §4.7 "글자수 세기".
export type CharacterCountResult = {
  totalChars: number;
  charsNoSpace: number;
  words: number;
  bytes: number;
  lines: number;
};

export function calculateCharacterCount(text: string): CharacterCountResult {
  const totalChars = [...text].length; // 이모지 등 서로게이트 쌍도 1글자로 센다
  const charsNoSpace = [...text.replace(/\s/g, "")].length;
  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const bytes = new TextEncoder().encode(text).length;
  const lines = text === "" ? 0 : text.split(/\r\n|\r|\n/).length;

  return { totalChars, charsNoSpace, words, bytes, lines };
}
