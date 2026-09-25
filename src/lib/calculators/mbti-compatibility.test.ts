import { describe, expect, it } from "vitest";
import { calculateMbtiCompatibility, MBTI_TYPES, type CompatibilityBand } from "./mbti-compatibility";

describe("calculateMbtiCompatibility", () => {
  it("같은 유형을 넣으면 identity 밴드가 나온다", () => {
    for (const type of MBTI_TYPES) {
      expect(calculateMbtiCompatibility(type, type).band).toBe("identity");
    }
  });

  it("순서를 바꿔도 같은 밴드·점수가 나온다(대칭성)", () => {
    for (const a of MBTI_TYPES) {
      for (const b of MBTI_TYPES) {
        const ab = calculateMbtiCompatibility(a, b);
        const ba = calculateMbtiCompatibility(b, a);
        expect(ba.band).toBe(ab.band);
        expect(ba.score).toBe(ab.score);
      }
    }
  });

  it("듀얼리티(4축 전부 반대)로 검증된 페어가 정확히 판정된다", () => {
    // plan.md §2.1에서 전수 계산으로 확인한 듀얼 페어 예시.
    expect(calculateMbtiCompatibility("ISTJ", "ESTP").band).toBe("duality");
    expect(calculateMbtiCompatibility("INFJ", "ENFP").band).toBe("duality");
  });

  it("닮은꼴형(같은 4기능, 다른 순서)으로 검증된 페어가 정확히 판정된다", () => {
    // ISTP(Ti-Se-Ni-Fe)와 ESTP(Se-Ti-Fe-Ni)는 4기능이 완전히 같고 우선순위만 다르다.
    expect(calculateMbtiCompatibility("ISTP", "ESTP").band).toBe("sameFunctions");
  });

  it("모든 유형 쌍(16×16=256개)에서 밴드별 분포가 이론과 정확히 일치한다", () => {
    // 자기 자신을 제외한 15명 중 duality 4명, perceivingAligned 4명,
    // judgingAligned 4명, sameFunctions 3명 (plan.md §2.1 전수 검증 결과).
    for (const a of MBTI_TYPES) {
      const counts: Record<CompatibilityBand, number> = {
        duality: 0,
        perceivingAligned: 0,
        judgingAligned: 0,
        sameFunctions: 0,
        identity: 0,
      };
      for (const b of MBTI_TYPES) {
        counts[calculateMbtiCompatibility(a, b).band] += 1;
      }
      expect(counts).toEqual({
        duality: 4,
        perceivingAligned: 4,
        judgingAligned: 4,
        sameFunctions: 3,
        identity: 1,
      });
    }
  });

  it("점수는 항상 54~98 범위 안에 있다(밴드 중심값 58~94 ± 4)", () => {
    for (const a of MBTI_TYPES) {
      for (const b of MBTI_TYPES) {
        const { score } = calculateMbtiCompatibility(a, b);
        expect(score).toBeGreaterThanOrEqual(54);
        expect(score).toBeLessThanOrEqual(98);
      }
    }
  });

  it("공유 축(sharedAxes)은 밴드와 일관된다", () => {
    // duality는 공유 축이 0개, sameFunctions/identity는 4개.
    expect(calculateMbtiCompatibility("ISTJ", "ISTP").sharedAxes).toHaveLength(0);
    expect(calculateMbtiCompatibility("ISTP", "ESTP").sharedAxes).toHaveLength(4);
    expect(calculateMbtiCompatibility("INFJ", "INFJ").sharedAxes).toHaveLength(4);
  });
});
