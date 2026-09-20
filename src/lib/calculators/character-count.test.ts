import { describe, expect, it } from "vitest";
import { calculateCharacterCount } from "./character-count";

describe("calculateCharacterCount", () => {
  it("빈 문자열은 전부 0이다(경계값)", () => {
    const result = calculateCharacterCount("");
    expect(result.totalChars).toBe(0);
    expect(result.words).toBe(0);
    expect(result.lines).toBe(0);
  });

  it("공백 포함/제외 글자수와 단어 수를 정확히 센다", () => {
    const result = calculateCharacterCount("안녕 hello");
    expect(result.totalChars).toBe(8); // 안,녕,공백,h,e,l,l,o
    expect(result.charsNoSpace).toBe(7);
    expect(result.words).toBe(2);
  });

  it("UTF-8 바이트 수를 정확히 센다(한글은 3바이트)", () => {
    const result = calculateCharacterCount("안녕 hello");
    expect(result.bytes).toBe(12); // 3+3+1+5
  });

  it("줄바꿈 개수만큼 줄 수를 센다", () => {
    const result = calculateCharacterCount("line1\nline2\nline3");
    expect(result.lines).toBe(3);
  });

  it("이모지처럼 서로게이트 쌍인 문자도 1글자로 센다(naive length와 다름)", () => {
    const result = calculateCharacterCount("😀");
    expect(result.totalChars).toBe(1);
    expect("😀".length).toBe(2); // 참고: JS 문자열 length는 2로 나옴(버그 아님, 대비 확인용)
  });
});
