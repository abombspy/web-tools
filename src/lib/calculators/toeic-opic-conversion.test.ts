import { describe, expect, it } from "vitest";
import { findOpicLevelForToeic, findToeicRangeForOpic } from "./toeic-opic-conversion";

describe("findToeicRangeForOpic", () => {
  it("각 OPIc 레벨은 표에 정의된 TOEIC 평균점수를 반환한다", () => {
    expect(findToeicRangeForOpic("IM1").toeicAverage).toBe(593);
    expect(findToeicRangeForOpic("AL").toeicAverage).toBe(980);
  });
});

describe("findOpicLevelForToeic", () => {
  it("구간 안의 점수는 해당 레벨을 반환한다", () => {
    expect(findOpicLevelForToeic(600)).toBe("IM1");
    expect(findOpicLevelForToeic(990)).toBe("AL");
  });

  it("원본 표에 있는 최저 구간보다 낮은 점수는 null이다(이 표는 IM1 미만을 다루지 않음)", () => {
    expect(findOpicLevelForToeic(400)).toBeNull();
  });

  it("구간 사이 빈틈(716~719점)은 null이다(원본 표 자체의 간격)", () => {
    expect(findOpicLevelForToeic(717)).toBeNull();
  });

  it("구간 경계가 겹치는 지점(예: 815점)은 더 낮은 레벨이 우선한다(표기 순서상 첫 매치)", () => {
    expect(findOpicLevelForToeic(815)).toBe("IM2");
  });
});
