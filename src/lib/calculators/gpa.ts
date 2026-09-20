// 한국 대학 표준 4.5 만점 척도(A+/A0/B+/B0/C+/C0/D+/D0/F) 기준 GPA 계산.
// plan.md §4.6 "학점 평균(GPA) 계산기". 4.3 만점 환산은 단순 비례식(×4.3/4.5)을 쓴다.
export type LetterGrade = "A+" | "A0" | "B+" | "B0" | "C+" | "C0" | "D+" | "D0" | "F";

export const GRADE_POINTS_4_5: Record<LetterGrade, number> = {
  "A+": 4.5,
  A0: 4.0,
  "B+": 3.5,
  B0: 3.0,
  "C+": 2.5,
  C0: 2.0,
  "D+": 1.5,
  D0: 1.0,
  F: 0.0,
};

export type Course = { credit: number; grade: LetterGrade };

export type GpaResult = {
  totalCredits: number;
  gpa45: number;
  gpa43: number;
};

export function calculateGpa(courses: Course[]): GpaResult {
  const totalCredits = courses.reduce((sum, c) => sum + c.credit, 0);
  const totalPoints = courses.reduce((sum, c) => sum + c.credit * GRADE_POINTS_4_5[c.grade], 0);

  const gpa45 = totalCredits === 0 ? 0 : totalPoints / totalCredits;
  const gpa43 = gpa45 * (4.3 / 4.5);

  return {
    totalCredits,
    gpa45: Math.round(gpa45 * 100) / 100,
    gpa43: Math.round(gpa43 * 100) / 100,
  };
}
