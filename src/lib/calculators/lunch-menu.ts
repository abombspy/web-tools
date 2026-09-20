// 점심 메뉴 목록(재미용 참고 데이터). plan.md §4.8 "점심 메뉴 추천 룰렛".
// random-picker.ts의 pickRandom을 그대로 재사용한다.
export type LunchCategory = "한식" | "중식" | "일식" | "양식" | "분식" | "패스트푸드";

export const LUNCH_MENUS: { name: string; category: LunchCategory }[] = [
  { name: "김치찌개", category: "한식" },
  { name: "된장찌개", category: "한식" },
  { name: "제육볶음", category: "한식" },
  { name: "비빔밥", category: "한식" },
  { name: "순두부찌개", category: "한식" },
  { name: "갈비탕", category: "한식" },
  { name: "짜장면", category: "중식" },
  { name: "짬뽕", category: "중식" },
  { name: "탕수육", category: "중식" },
  { name: "마라탕", category: "중식" },
  { name: "돈까스", category: "일식" },
  { name: "초밥", category: "일식" },
  { name: "라멘", category: "일식" },
  { name: "우동", category: "일식" },
  { name: "파스타", category: "양식" },
  { name: "스테이크", category: "양식" },
  { name: "리조또", category: "양식" },
  { name: "떡볶이", category: "분식" },
  { name: "김밥", category: "분식" },
  { name: "라면", category: "분식" },
  { name: "햄버거", category: "패스트푸드" },
  { name: "샌드위치", category: "패스트푸드" },
];

export const LUNCH_CATEGORIES: LunchCategory[] = [
  "한식",
  "중식",
  "일식",
  "양식",
  "분식",
  "패스트푸드",
];
