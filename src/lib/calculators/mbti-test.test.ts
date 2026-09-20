import { describe, expect, it } from "vitest";
import {
  calculateMbtiType,
  getMbtiTypeInfo,
  MBTI_QUESTIONS,
  MBTI_TYPE_INFO,
  type Letter,
} from "./mbti-test";

describe("MBTI_QUESTIONS", () => {
  it("각 축마다 정확히 7문항씩 총 28문항이다", () => {
    expect(MBTI_QUESTIONS).toHaveLength(28);
    const perAxis = { EI: 0, SN: 0, TF: 0, JP: 0 };
    for (const q of MBTI_QUESTIONS) perAxis[q.axis] += 1;
    expect(perAxis).toEqual({ EI: 7, SN: 7, TF: 7, JP: 7 });
  });

  it("문항마다 두 선택지의 글자가 서로 반대 축이다", () => {
    const pairs: Record<string, [Letter, Letter]> = {
      EI: ["E", "I"],
      SN: ["S", "N"],
      TF: ["T", "F"],
      JP: ["J", "P"],
    };
    for (const q of MBTI_QUESTIONS) {
      const [expectedA, expectedB] = pairs[q.axis];
      expect(q.optionA.letter).toBe(expectedA);
      expect(q.optionB.letter).toBe(expectedB);
    }
  });
});

describe("calculateMbtiType", () => {
  it("각 축에서 다수인 글자가 채택된다(4:3 다수결)", () => {
    const answers: Letter[] = [
      "E", "E", "E", "E", "I", "I", "I", // EI: E 4 I 3 -> E
      "S", "S", "S", "N", "N", "N", "N", // SN: S 3 N 4 -> N
      "T", "T", "T", "T", "F", "F", "F", // TF: T 4 F 3 -> T
      "J", "J", "J", "P", "P", "P", "P", // JP: J 3 P 4 -> P
    ];
    expect(calculateMbtiType(answers)).toBe("ENTP");
  });

  it("전부 한쪽으로 응답하면 그 유형이 그대로 나온다(경계값)", () => {
    const allIntrovertFeeling: Letter[] = new Array(7)
      .fill("I")
      .concat(new Array(7).fill("N"))
      .concat(new Array(7).fill("F"))
      .concat(new Array(7).fill("P")) as Letter[];
    expect(calculateMbtiType(allIntrovertFeeling)).toBe("INFP");
  });
});

describe("MBTI_TYPE_INFO", () => {
  it("16가지 유형 전부에 대한 설명이 빠짐없이 있다", () => {
    const letters = ["E", "I"];
    const letters2 = ["S", "N"];
    const letters3 = ["T", "F"];
    const letters4 = ["J", "P"];
    for (const a of letters) {
      for (const b of letters2) {
        for (const c of letters3) {
          for (const d of letters4) {
            const type = a + b + c + d;
            expect(getMbtiTypeInfo(type)).not.toBeNull();
          }
        }
      }
    }
    expect(Object.keys(MBTI_TYPE_INFO)).toHaveLength(16);
  });

  it("존재하지 않는 유형 코드는 null을 반환한다", () => {
    expect(getMbtiTypeInfo("XXXX")).toBeNull();
  });
});
