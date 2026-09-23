export const SITE_NAME = "생활계산소";
export const SITE_DESCRIPTION =
  "세금·급여·생활 계산을 위한 무료 계산기 모음. 계산 원리와 법적 근거를 함께 설명합니다.";
// 영문판(/en)용 사이트명·설명. 2026-09-23부터 알바·직장인, 프리랜서·사업자 포함 전체 카테고리
// 번역 — 외국인 거주자를 위한 한국 노동법/세법 참고 자료로 제공(법령 인용은 원문 기준 직역,
// 정확한 세액·수당은 공식 기관에서 재확인 권장).
export const SITE_NAME_EN = "Life Calc";
export const SITE_DESCRIPTION_EN =
  "Free calculators for everyday life in Korea — wages, taxes, housing, health, dates, school, files, and fun.";
// 커스텀 도메인(web-tools.gssystems.co.kr) 연결 전까지는 실제 배포 주소를 그대로 쓴다.
// 나중에 커스텀 도메인이 연결되면 이 값만 바꾸면 됨(sitemap.ts/robots.ts/layout.tsx의
// metadataBase·OG url·JSON-LD가 전부 이 값 하나를 참조).
export const SITE_URL = "https://abombspy.github.io/web-tools";
export const CONTACT_EMAIL = "abombspy@gmail.com";
export const GA_MEASUREMENT_ID = "G-KYE3JE4EB2";

// 이름/태그라인/설명 같은 표시 텍스트는 이제 content/catalog/categories.{ko,en}.json에
// 언어별로 분리돼 있다(src/lib/content/catalog.ts의 getCategories(locale)가 이 파일의
// 구조 정보와 병합해 돌려준다). 이 파일에는 라우팅·테마처럼 언어에 무관한 구조 정보만 남는다.
export type CalculatorTool = {
  slug: string;
  /** 실제 계산기 페이지가 구현되어 있으면 true (구현 전에는 "준비 중"으로 표시) */
  available?: boolean;
  /** 카드에 표시할 이모지 아이콘 */
  icon: string;
  /** 영문판(/en) 페이지가 있으면 true. text-cleanup(한국어 맞춤법 전용)만 false. */
  hasPageEn?: boolean;
};

/**
 * 카테고리별 파스텔 테마. Tailwind는 클래스명을 빌드 시점에 정적으로 스캔하므로
 * `bg-${color}-100`처럼 런타임에 문자열을 조합하면 안 되고(스캐너가 못 찾아서
 * CSS가 생성되지 않음), 이렇게 완성된 클래스 문자열을 그대로 저장해둬야 한다.
 * 같은 이유로 이 필드는 JSON 콘텐츠 파일로 옮기지 않는다.
 */
export type CategoryTheme = {
  /** 카드 배경(칠해진 파스텔) */
  cardBg: string;
  /** 카드 안 제목 텍스트 색 */
  titleText: string;
  /** 카드 안 설명 텍스트 색 */
  descText: string;
  /** 헤더 드롭다운 트리거·섹션 아이콘 배지 배경 (카드와 동일 톤) */
  badgeBg: string;
  /** 헤더 드롭다운 트리거 텍스트 색 */
  badgeText: string;
  /** 헤더 드롭다운 트리거 hover 배경 */
  badgeHoverBg: string;
};

export type CalculatorCategory = {
  slug: string;
  phase: 1 | 2 | 3 | 4;
  /** 카테고리 아이콘(헤더·홈 섹션 배지에 사용) */
  icon: string;
  theme: CategoryTheme;
  tools?: CalculatorTool[];
  /** 카테고리 랜딩 페이지(/src/app/<slug>/page.tsx)가 실제로 구현되어 있으면 true */
  hasPage?: boolean;
  /** 영문판 카테고리 랜딩 페이지(/src/app/en/<slug>/page.tsx)가 구현돼 있으면 true */
  hasPageEn?: boolean;
};

// .docs/plan.md §3, §4 기준. Phase 1(알바·직장인, 프리랜서·사업자)부터 개발.
// tools 슬러그는 §7.4 결정에 따라 완전 영문 의역으로 표기.
// 색상·아이콘·문구는 .docs/ui-plan.md의 "친절하고 귀여운 UI" 결정(2026-09-22,
// sample.html/sample-colors-v2.html 스타일 1 기준) 반영.
export const CATEGORIES: CalculatorCategory[] = [
  {
    slug: "part-time",
    phase: 1,
    icon: "💼",
    theme: {
      cardBg: "bg-orange-100",
      titleText: "text-orange-800",
      descText: "text-orange-500",
      badgeBg: "bg-orange-100",
      badgeText: "text-orange-700",
      badgeHoverBg: "hover:bg-orange-200",
    },
    hasPage: true,
    hasPageEn: true,
    tools: [
      { slug: "weekly-holiday-pay", available: true, icon: "🏖️", hasPageEn: true },
      { slug: "part-time-wage", available: true, icon: "💰", hasPageEn: true },
      { slug: "resignation-date-comparison", available: true, icon: "📦", hasPageEn: true },
      { slug: "annual-leave-pay", available: true, icon: "🌴", hasPageEn: true },
      { slug: "unemployment-benefit", available: true, icon: "🧳", hasPageEn: true },
      { slug: "parental-leave-pay", available: true, icon: "🍼", hasPageEn: true },
    ],
  },
  {
    slug: "freelancer",
    phase: 1,
    icon: "🧾",
    theme: {
      cardBg: "bg-rose-100",
      titleText: "text-rose-800",
      descText: "text-rose-500",
      badgeBg: "bg-rose-100",
      badgeText: "text-rose-700",
      badgeHoverBg: "hover:bg-rose-200",
    },
    hasPage: true,
    hasPageEn: true,
    tools: [
      { slug: "withholding-tax-3-3", available: true, icon: "🧾", hasPageEn: true },
      { slug: "vat", available: true, icon: "🧮", hasPageEn: true },
      { slug: "income-tax-estimate", available: true, icon: "📊", hasPageEn: true },
      { slug: "delivery-rider-net-income", available: true, icon: "🛵", hasPageEn: true },
      { slug: "ecommerce-margin", available: true, icon: "🛍️", hasPageEn: true },
      { slug: "customs-duty", available: true, icon: "✈️", hasPageEn: true },
    ],
  },
  {
    slug: "living",
    phase: 2,
    icon: "🏠",
    theme: {
      cardBg: "bg-sky-100",
      titleText: "text-sky-800",
      descText: "text-sky-500",
      badgeBg: "bg-sky-100",
      badgeText: "text-sky-700",
      badgeHoverBg: "hover:bg-sky-200",
    },
    hasPage: true,
    hasPageEn: true,
    tools: [
      { slug: "electricity-bill", available: true, icon: "💡", hasPageEn: true },
      { slug: "jeonse-to-monthly-rent", available: true, icon: "🏘️", hasPageEn: true },
      { slug: "real-estate-agent-fee", available: true, icon: "🤝", hasPageEn: true },
      { slug: "loan-repayment", available: true, icon: "🏦", hasPageEn: true },
      { slug: "moving-cost-estimate", available: true, icon: "🚚", hasPageEn: true },
    ],
  },
  {
    slug: "parenting-health",
    phase: 2,
    icon: "👶",
    theme: {
      cardBg: "bg-emerald-100",
      titleText: "text-emerald-800",
      descText: "text-emerald-500",
      badgeBg: "bg-emerald-100",
      badgeText: "text-emerald-700",
      badgeHoverBg: "hover:bg-emerald-200",
    },
    hasPage: true,
    hasPageEn: true,
    tools: [
      { slug: "baby-growth-percentile", available: true, icon: "📏", hasPageEn: true },
      { slug: "due-date", available: true, icon: "🤰", hasPageEn: true },
      { slug: "baby-food-portion", available: true, icon: "🥣", hasPageEn: true },
      { slug: "bmi-calorie", available: true, icon: "⚖️", hasPageEn: true },
      { slug: "alcohol-detox-time", available: true, icon: "🍺", hasPageEn: true },
    ],
  },
  {
    slug: "date-time",
    phase: 2,
    icon: "📅",
    theme: {
      cardBg: "bg-amber-100",
      titleText: "text-amber-800",
      descText: "text-amber-500",
      badgeBg: "bg-amber-100",
      badgeText: "text-amber-700",
      badgeHoverBg: "hover:bg-amber-200",
    },
    hasPage: true,
    hasPageEn: true,
    tools: [
      { slug: "d-day", available: true, icon: "📆", hasPageEn: true },
      { slug: "age-zodiac", available: true, icon: "🐉", hasPageEn: true },
      { slug: "military-discharge-date", available: true, icon: "🪖", hasPageEn: true },
      { slug: "business-days", available: true, icon: "🗓️", hasPageEn: true },
      { slug: "time-difference", available: true, icon: "🌐", hasPageEn: true },
    ],
  },
  {
    slug: "student",
    phase: 2,
    icon: "🎓",
    theme: {
      cardBg: "bg-indigo-100",
      titleText: "text-indigo-800",
      descText: "text-indigo-500",
      badgeBg: "bg-indigo-100",
      badgeText: "text-indigo-700",
      badgeHoverBg: "hover:bg-indigo-200",
    },
    hasPage: true,
    hasPageEn: true,
    tools: [
      { slug: "grade-conversion", available: true, icon: "📝", hasPageEn: true },
      { slug: "gpa", available: true, icon: "📚", hasPageEn: true },
      { slug: "civil-service-passing-score", available: true, icon: "🏛️", hasPageEn: true },
      { slug: "toeic-opic-conversion", available: true, icon: "🗣️", hasPageEn: true },
    ],
  },
  {
    slug: "text-file",
    phase: 3,
    icon: "📄",
    theme: {
      cardBg: "bg-teal-100",
      titleText: "text-teal-800",
      descText: "text-teal-500",
      badgeBg: "bg-teal-100",
      badgeText: "text-teal-700",
      badgeHoverBg: "hover:bg-teal-200",
    },
    hasPage: true,
    hasPageEn: true,
    tools: [
      { slug: "character-count", available: true, icon: "🔤", hasPageEn: true },
      { slug: "json-csv-convert", available: true, icon: "🔄", hasPageEn: true },
      { slug: "qr-code", available: true, icon: "📱", hasPageEn: true },
      { slug: "image-tool", available: true, icon: "🖼️", hasPageEn: true },
      { slug: "pdf-tool", available: true, icon: "📑", hasPageEn: true },
      // 한국어 흔한 오타 교정(됬다→됐다 등)이 핵심 기능이라 영어 텍스트에는 의미가
      // 없어 의도적으로 영문판 없음(hasPageEn 없음).
      { slug: "text-cleanup", available: true, icon: "✏️" },
    ],
  },
  {
    slug: "fun",
    phase: 4,
    icon: "🎉",
    theme: {
      cardBg: "bg-violet-100",
      titleText: "text-violet-800",
      descText: "text-violet-500",
      badgeBg: "bg-violet-100",
      badgeText: "text-violet-700",
      badgeHoverBg: "hover:bg-violet-200",
    },
    hasPage: true,
    hasPageEn: true,
    tools: [
      { slug: "mbti-test", available: true, icon: "🔮", hasPageEn: true },
      { slug: "name-compatibility", available: true, icon: "💘", hasPageEn: true },
      { slug: "random-picker", available: true, icon: "🎲", hasPageEn: true },
      { slug: "lunch-roulette", available: true, icon: "🍱", hasPageEn: true },
      { slug: "nickname-generator", available: true, icon: "🐣", hasPageEn: true },
      { slug: "recommended-combos", available: true, icon: "✨", hasPageEn: true },
    ],
  },
];

// 실제 카테고리 랜딩 페이지(/src/app/<slug>/page.tsx)가 구현된 카테고리만 걸러낸다.
// 헤더 내비게이션과 sitemap이 이 목록을 함께 써서, 페이지가 없는 카테고리로
// 죽은 링크가 생기는 걸 한곳에서 막는다.
export const CATEGORIES_WITH_PAGES = CATEGORIES.filter((c) => c.hasPage);

// 영문판(/en/<slug>)이 구현된 카테고리만 걸러낸다.
export const CATEGORIES_WITH_PAGES_EN = CATEGORIES.filter((c) => c.hasPageEn);

// 카테고리가 아닌 고정 페이지 중 영문판이 있는 것들. 한→영 전환 시 이 목록에
// 없으면(현재는 모두 있음) 영문 홈으로 보낸다.
const STATIC_PAGES_WITH_EN = ["about", "contact", "privacy-policy", "terms"];

/**
 * 헤더의 언어 전환 링크가 이동할 경로를 계산한다.
 * - 영문판(/en/...)에 있으면: 그냥 /en 접두사만 떼면 되는 한국어판이 항상 존재하므로
 *   (영문판은 한국어판의 부분집합) 단순히 접두사 제거.
 * - 한국어판에 있으면: 소개/문의/개인정보처리방침/이용약관 같은 고정 페이지는
 *   STATIC_PAGES_WITH_EN에서 바로 매칭하고, 그 외에는 지금 보는 카테고리/도구에
 *   영문판이 있는지 확인해서 있으면 /en 접두사를 붙이고, 없으면 영문 홈으로 보낸다.
 */
export function getLanguageSwitchHref(pathname: string): string {
  if (pathname.startsWith("/en")) {
    const rest = pathname.slice(3);
    return rest === "" ? "/" : rest;
  }

  const segments = pathname.split("/").filter(Boolean);
  const [categorySlug, toolSlug] = segments;
  if (!categorySlug) return "/en";

  if (!toolSlug && STATIC_PAGES_WITH_EN.includes(categorySlug)) {
    return `/en/${categorySlug}`;
  }

  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  if (!category?.hasPageEn) return "/en";
  if (!toolSlug) return `/en/${categorySlug}`;

  const tool = category.tools?.find((t) => t.slug === toolSlug);
  if (!tool?.hasPageEn) return "/en";
  return `/en/${categorySlug}/${toolSlug}`;
}
