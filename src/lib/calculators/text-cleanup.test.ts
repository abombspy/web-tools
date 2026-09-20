import { describe, expect, it } from "vitest";
import { cleanupText } from "./text-cleanup";

describe("cleanupText", () => {
  it("흔한 오타를 교정하고 개수를 센다", () => {
    const result = cleanupText("드디어 됬다! 웬지 예감이 좋아.");
    expect(result.cleaned).toContain("됐다");
    expect(result.cleaned).toContain("왠지");
    expect(result.typoFixCount).toBe(2);
  });

  it("연속된 공백을 하나로 줄인다", () => {
    expect(cleanupText("안녕    하세요").cleaned).toBe("안녕 하세요");
  });

  it("문장부호 앞의 불필요한 공백을 없앤다", () => {
    expect(cleanupText("안녕 .").cleaned).toBe("안녕.");
  });

  it("빈 줄이 3개 이상이면 2개로 줄인다", () => {
    expect(cleanupText("a\n\n\n\nb").cleaned).toBe("a\n\nb");
  });

  it("앞뒤 공백을 정리한다", () => {
    expect(cleanupText("  hello  ").cleaned).toBe("hello");
  });

  it("오타가 없으면 개수는 0이다(경계값)", () => {
    expect(cleanupText("정상적인 문장입니다.").typoFixCount).toBe(0);
  });
});
