// TODO: 실제 서비스명이 정해지면 이 값만 바꾸면 전체 사이트에 반영됩니다.
export const SITE_NAME = "[사이트명]";
export const SITE_DESCRIPTION =
  "세금·급여·생활 계산을 위한 무료 계산기 모음. 계산 원리와 법적 근거를 함께 설명합니다.";
// TODO: 실제 도메인이 정해지면 채워주세요 (사이트맵/OG 태그 등에 사용).
export const SITE_URL = "https://example.com";
// TODO: 문의용 이메일 주소를 확정해주세요 (개인 이메일 그대로 노출할지 별도 주소를 만들지 결정 필요).
export const CONTACT_EMAIL = "[문의 이메일 주소]";

export type CalculatorTool = {
  slug: string;
  name: string;
  /** 실제 계산기 페이지가 구현되어 있으면 true (구현 전에는 "준비 중"으로 표시) */
  available?: boolean;
};

export type CalculatorCategory = {
  slug: string;
  name: string;
  phase: 1 | 2 | 3 | 4;
  description: string;
  tools?: CalculatorTool[];
};

// .docs/plan.md §3, §4 기준. Phase 1(알바·직장인, 프리랜서·사업자)부터 개발.
// tools 슬러그는 §7.4 결정에 따라 완전 영문 의역으로 표기.
export const CATEGORIES: CalculatorCategory[] = [
  {
    slug: "part-time",
    name: "알바·직장인",
    phase: 1,
    description: "주휴수당, 알바 월급, 퇴직금, 연차, 실업급여, 육아휴직급여 계산기",
    tools: [
      { slug: "weekly-holiday-pay", name: "주휴수당 계산기", available: true },
      { slug: "part-time-wage", name: "알바 월급 계산기", available: true },
      { slug: "resignation-date-comparison", name: "퇴사 시점 비교 계산기", available: true },
      { slug: "annual-leave-pay", name: "연차수당 계산기", available: true },
      { slug: "unemployment-benefit", name: "실업급여 모의 계산기", available: true },
      { slug: "parental-leave-pay", name: "육아휴직 급여 계산기", available: true },
    ],
  },
  {
    slug: "freelancer",
    name: "프리랜서·사업자",
    phase: 1,
    description: "3.3% 원천징수, 부가세, 종합소득세, 배달 라이더, 스마트스토어 마진, 해외직구 관세 계산기",
    tools: [
      { slug: "withholding-tax-3-3", name: "3.3% 원천징수 역산 계산기", available: true },
      { slug: "vat", name: "부가세 계산기", available: true },
      { slug: "income-tax-estimate", name: "종합소득세 예상 계산기", available: true },
      { slug: "delivery-rider-net-income", name: "배달 라이더 순수익 계산기", available: true },
      { slug: "ecommerce-margin", name: "스마트스토어·쿠팡 마진 계산기", available: true },
      { slug: "customs-duty", name: "해외직구 관세 계산기", available: true },
    ],
  },
  {
    slug: "living",
    name: "생활·주거",
    phase: 2,
    description: "전기요금, 전월세 전환율, 중개수수료, 대출 상환, 이사 비용 계산기",
  },
  {
    slug: "parenting-health",
    name: "육아·건강",
    phase: 2,
    description: "아기 성장, 출산 예정일, 이유식, BMI, 음주 해독 시간 계산기",
  },
  {
    slug: "date-time",
    name: "날짜·시간",
    phase: 2,
    description: "D-day, 만 나이, 군 전역일, 근무일수, 시차 계산기",
  },
  {
    slug: "student",
    name: "학생·수험생",
    phase: 2,
    description: "내신·수능 등급, 학점(GPA), 공무원 합격선, 토익·오픽 환산",
  },
  {
    slug: "text-file",
    name: "텍스트·파일 도구",
    phase: 3,
    description: "글자수 세기, 이미지 압축·변환, PDF 병합·분할, QR코드, JSON·CSV 변환",
  },
  {
    slug: "fun",
    name: "재미·바이럴",
    phase: 4,
    description: "이름 궁합, 랜덤 추첨기, 점심 메뉴 룰렛, 닉네임 생성기",
  },
];

// 실제 카테고리 랜딩 페이지(/src/app/<slug>/page.tsx)가 구현된 카테고리만 걸러낸다.
// 지금은 phase 1(알바·직장인, 프리랜서·사업자)만 페이지가 있음 — Phase 2+ 페이지를
// 만들면 이 조건을 넓힌다. 헤더 내비게이션과 sitemap이 이 목록을 함께 써서, 페이지가
// 없는 카테고리로 죽은 링크가 생기는 걸 한곳에서 막는다.
export const CATEGORIES_WITH_PAGES = CATEGORIES.filter((c) => c.phase === 1);
