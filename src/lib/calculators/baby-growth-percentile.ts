// WHO 소아 성장 기준(0~24개월) 참고치 기반. plan.md §4.4 "아기 개월수·성장 백분위 계산기".
//
// 스코프 제한(중요): 진짜 WHO 백분위(3rd~97th 등)는 LMS(Lambda-Mu-Sigma) 파라미터 표를 써서
// 계산하는데, 이 방대한 표를 정확히 재현할 신뢰할 만한 방법이 없어 이 계산기에 넣지 않았다.
// 대신 여러 자료에 공통으로 나오는 "3~97백분위 범위"의 중간값을 근사 평균으로 삼아
// "평균 대비 비교"만 제공한다(정확한 백분위 계산이 아님을 UI에 명확히 알린다).
export type Sex = "male" | "female";

type ReferencePoint = { month: number; weightKg: number; heightCm: number };

const REFERENCE: Record<Sex, ReferencePoint[]> = {
  male: [
    { month: 0, weightKg: 3.6, heightCm: 50.5 },
    { month: 3, weightKg: 6.6, heightCm: 60.5 },
    { month: 6, weightKg: 8.1, heightCm: 67 },
    { month: 9, weightKg: 9.25, heightCm: 72 },
    { month: 12, weightKg: 10.0, heightCm: 75.5 },
    { month: 18, weightKg: 11.25, heightCm: 82.5 },
    { month: 24, weightKg: 12.4, heightCm: 88 },
  ],
  female: [
    { month: 0, weightKg: 3.45, heightCm: 49.5 },
    { month: 3, weightKg: 6.4, heightCm: 59.5 },
    { month: 6, weightKg: 7.65, heightCm: 65.5 },
    { month: 9, weightKg: 8.3, heightCm: 68.5 },
    { month: 12, weightKg: 9.4, heightCm: 74 },
    { month: 18, weightKg: 10.4, heightCm: 81 },
    { month: 24, weightKg: 11.5, heightCm: 86.5 },
  ],
};

export const SUPPORTED_MONTH_RANGE = { min: 0, max: 24 };

function interpolate(points: ReferencePoint[], month: number, key: "weightKg" | "heightCm"): number {
  const clamped = Math.min(Math.max(month, SUPPORTED_MONTH_RANGE.min), SUPPORTED_MONTH_RANGE.max);

  for (let i = 0; i < points.length - 1; i += 1) {
    const a = points[i];
    const b = points[i + 1];
    if (clamped >= a.month && clamped <= b.month) {
      const ratio = (clamped - a.month) / (b.month - a.month);
      return a[key] + (b[key] - a[key]) * ratio;
    }
  }
  return points[points.length - 1][key];
}

export type BabyGrowthComparisonResult = {
  ageMonths: number;
  referenceWeightKg: number;
  referenceHeightCm: number;
  weightDiffPercent: number | null;
  heightDiffPercent: number | null;
};

export function compareBabyGrowth(
  sex: Sex,
  ageMonths: number,
  weightKg: number | null,
  heightCm: number | null,
): BabyGrowthComparisonResult {
  const points = REFERENCE[sex];
  const referenceWeightKg = Math.round(interpolate(points, ageMonths, "weightKg") * 100) / 100;
  const referenceHeightCm = Math.round(interpolate(points, ageMonths, "heightCm") * 10) / 10;

  const weightDiffPercent =
    weightKg !== null ? Math.round(((weightKg - referenceWeightKg) / referenceWeightKg) * 1000) / 10 : null;
  const heightDiffPercent =
    heightCm !== null ? Math.round(((heightCm - referenceHeightCm) / referenceHeightCm) * 1000) / 10 : null;

  return { ageMonths, referenceWeightKg, referenceHeightCm, weightDiffPercent, heightDiffPercent };
}
