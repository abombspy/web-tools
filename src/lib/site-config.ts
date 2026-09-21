export const SITE_NAME = "생활계산소";
export const SITE_DESCRIPTION =
  "세금·급여·생활 계산을 위한 무료 계산기 모음. 계산 원리와 법적 근거를 함께 설명합니다.";
export const SITE_URL = "https://web-tools.gssystems.co.kr";
export const CONTACT_EMAIL = "abombspy@gmail.com";
export const GA_MEASUREMENT_ID = "G-KYE3JE4EB2";

export type CalculatorTool = {
  slug: string;
  name: string;
  /** 실제 계산기 페이지가 구현되어 있으면 true (구현 전에는 "준비 중"으로 표시) */
  available?: boolean;
  /** 카드에 표시할 이모지 아이콘 */
  icon: string;
  /** 카드에 표시할 한 줄 소개 문구(친근한 톤) */
  tagline: string;
};

/**
 * 카테고리별 파스텔 테마. Tailwind는 클래스명을 빌드 시점에 정적으로 스캔하므로
 * `bg-${color}-100`처럼 런타임에 문자열을 조합하면 안 되고(스캐너가 못 찾아서
 * CSS가 생성되지 않음), 이렇게 완성된 클래스 문자열을 그대로 저장해둬야 한다.
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
  name: string;
  phase: 1 | 2 | 3 | 4;
  description: string;
  /** 카테고리 아이콘(헤더·홈 섹션 배지에 사용) */
  icon: string;
  theme: CategoryTheme;
  tools?: CalculatorTool[];
  /** 카테고리 랜딩 페이지(/src/app/<slug>/page.tsx)가 실제로 구현되어 있으면 true */
  hasPage?: boolean;
};

// .docs/plan.md §3, §4 기준. Phase 1(알바·직장인, 프리랜서·사업자)부터 개발.
// tools 슬러그는 §7.4 결정에 따라 완전 영문 의역으로 표기.
// 색상·아이콘·문구는 .docs/ui-plan.md의 "친절하고 귀여운 UI" 결정(2026-09-22,
// sample.html/sample-colors-v2.html 스타일 1 기준) 반영.
export const CATEGORIES: CalculatorCategory[] = [
  {
    slug: "part-time",
    name: "알바·직장인",
    phase: 1,
    description: "주휴수당, 알바 월급, 퇴직금, 연차, 실업급여, 육아휴직급여 계산기",
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
    tools: [
      { slug: "weekly-holiday-pay", name: "주휴수당 계산기", available: true, icon: "🏖️", tagline: "쉬어도 받는 돈, 얼마일까?" },
      { slug: "part-time-wage", name: "알바 월급 계산기", available: true, icon: "💰", tagline: "4대보험 떼고 실수령액은?" },
      { slug: "resignation-date-comparison", name: "퇴사 시점 비교 계산기", available: true, icon: "📦", tagline: "언제 나가야 더 유리할까?" },
      { slug: "annual-leave-pay", name: "연차수당 계산기", available: true, icon: "🌴", tagline: "못 쓴 연차, 돈으로 받으면?" },
      { slug: "unemployment-benefit", name: "실업급여 모의 계산기", available: true, icon: "🧳", tagline: "다음 스텝을 준비하는 동안" },
      { slug: "parental-leave-pay", name: "육아휴직 급여 계산기", available: true, icon: "🍼", tagline: "쉬는 동안 얼마나 받을까?" },
    ],
  },
  {
    slug: "freelancer",
    name: "프리랜서·사업자",
    phase: 1,
    description: "3.3% 원천징수, 부가세, 종합소득세, 배달 라이더, 스마트스토어 마진, 해외직구 관세 계산기",
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
    tools: [
      { slug: "withholding-tax-3-3", name: "3.3% 원천징수 역산 계산기", available: true, icon: "🧾", tagline: "세전 받으려면 얼마 불러야 할까?" },
      { slug: "vat", name: "부가세 계산기", available: true, icon: "🧮", tagline: "공급가액과 부가세, 한 번에" },
      { slug: "income-tax-estimate", name: "종합소득세 예상 계산기", available: true, icon: "📊", tagline: "올해 낼 세금 미리 가늠해보기" },
      { slug: "delivery-rider-net-income", name: "배달 라이더 순수익 계산기", available: true, icon: "🛵", tagline: "오늘 진짜 번 돈은 얼마?" },
      { slug: "ecommerce-margin", name: "스마트스토어·쿠팡 마진 계산기", available: true, icon: "🛍️", tagline: "수수료 빼면 남는 이익은?" },
      { slug: "customs-duty", name: "해외직구 관세 계산기", available: true, icon: "✈️", tagline: "면세 한도, 나는 안전할까?" },
    ],
  },
  {
    slug: "living",
    name: "생활·주거",
    phase: 2,
    description: "전기요금, 전월세 전환율, 중개수수료, 대출 상환, 이사 비용 계산기",
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
    tools: [
      { slug: "electricity-bill", name: "전기요금 계산기", available: true, icon: "💡", tagline: "이번 달 전기세, 미리 확인" },
      { slug: "jeonse-to-monthly-rent", name: "전월세 전환율 계산기", available: true, icon: "🏘️", tagline: "전세를 월세로 바꾸면?" },
      { slug: "real-estate-agent-fee", name: "중개수수료 계산기", available: true, icon: "🤝", tagline: "복비, 얼마가 적당할까?" },
      { slug: "loan-repayment", name: "대출 이자·상환 계산기", available: true, icon: "🏦", tagline: "매달 갚을 돈, 정확히 계산" },
      { slug: "moving-cost-estimate", name: "이사 비용 견적 계산기", available: true, icon: "🚚", tagline: "이사비, 대략 얼마 들까?" },
    ],
  },
  {
    slug: "parenting-health",
    name: "육아·건강",
    phase: 2,
    description: "아기 성장, 출산 예정일, 이유식, BMI, 음주 해독 시간 계산기",
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
    tools: [
      { slug: "baby-growth-percentile", name: "아기 개월수·성장 백분위 계산기", available: true, icon: "📏", tagline: "우리 아기, 또래보다 어떨까?" },
      { slug: "due-date", name: "출산 예정일 계산기", available: true, icon: "🤰", tagline: "언제쯤 만날 수 있을까?" },
      { slug: "baby-food-portion", name: "이유식 단계별 양 계산기", available: true, icon: "🥣", tagline: "지금 몇 단계, 얼마나 먹여야 할까?" },
      { slug: "bmi-calorie", name: "BMI·기초대사량·목표 칼로리 계산기", available: true, icon: "⚖️", tagline: "내 몸에 맞는 숫자 알아보기" },
      { slug: "alcohol-detox-time", name: "음주 후 해독 시간 추정기", available: true, icon: "🍺", tagline: "지금 운전해도 괜찮을까?" },
    ],
  },
  {
    slug: "date-time",
    name: "날짜·시간",
    phase: 2,
    description: "D-day, 만 나이, 군 전역일, 근무일수, 시차 계산기",
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
    tools: [
      { slug: "d-day", name: "D-day·기념일 계산기", available: true, icon: "📆", tagline: "그날까지 며칠 남았을까?" },
      { slug: "age-zodiac", name: "만 나이·띠·별자리 계산기", available: true, icon: "🐉", tagline: "나는 만 나이로 몇 살?" },
      { slug: "military-discharge-date", name: "군 전역일 계산기", available: true, icon: "🪖", tagline: "전역까지 손꼽아 세기" },
      { slug: "business-days", name: "근무일수(영업일) 계산기", available: true, icon: "🗓️", tagline: "공휴일 빼고 진짜 일하는 날" },
      { slug: "time-difference", name: "시차 계산기", available: true, icon: "🌐", tagline: "그 나라는 지금 몇 시일까?" },
    ],
  },
  {
    slug: "student",
    name: "학생·수험생",
    phase: 2,
    description: "내신·수능 등급, 학점(GPA), 공무원 합격선, 토익·오픽 환산",
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
    tools: [
      { slug: "grade-conversion", name: "내신·수능 등급 환산 계산기", available: true, icon: "📝", tagline: "내 점수는 몇 등급일까?" },
      { slug: "gpa", name: "학점 평균(GPA) 계산기", available: true, icon: "📚", tagline: "이번 학기 평점, 미리 계산" },
      { slug: "civil-service-passing-score", name: "공무원 시험 합격선 비교 도구", available: true, icon: "🏛️", tagline: "내 점수, 합격선과 비교해보기" },
      { slug: "toeic-opic-conversion", name: "토익·오픽 점수 환산표", available: true, icon: "🗣️", tagline: "점수 환산, 헷갈릴 때" },
    ],
  },
  {
    slug: "text-file",
    name: "텍스트·파일 도구",
    phase: 3,
    description: "글자수 세기, 이미지 압축·변환, PDF 병합·분할, QR코드, JSON·CSV 변환",
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
    tools: [
      { slug: "character-count", name: "글자수 세기", available: true, icon: "🔤", tagline: "자소서 글자수, 딱 맞게" },
      { slug: "json-csv-convert", name: "JSON·CSV 변환기", available: true, icon: "🔄", tagline: "형식 변환, 복붙 한 번에" },
      { slug: "qr-code", name: "QR코드 생성기", available: true, icon: "📱", tagline: "링크를 QR코드로 뚝딱" },
      { slug: "image-tool", name: "이미지 압축·리사이즈·포맷 변환", available: true, icon: "🖼️", tagline: "용량 줄이고 크기도 딱 맞게" },
      { slug: "pdf-tool", name: "PDF 병합·분할", available: true, icon: "📑", tagline: "여러 장 PDF, 합치거나 나누기" },
      { slug: "text-cleanup", name: "맞춤법 체크용 텍스트 정리 도구", available: true, icon: "✏️", tagline: "띄어쓰기·오타, 깔끔하게" },
    ],
  },
  {
    slug: "fun",
    name: "재미·바이럴",
    phase: 4,
    description: "이름 궁합, 랜덤 추첨기, 점심 메뉴 룰렛, 닉네임 생성기",
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
    tools: [
      { slug: "mbti-test", name: "MBTI 성격 유형 테스트", available: true, icon: "🔮", tagline: "나는 어떤 사람일까?" },
      { slug: "name-compatibility", name: "이름 궁합·MBTI 궁합 테스트", available: true, icon: "💘", tagline: "우리 얼마나 잘 맞을까?" },
      { slug: "random-picker", name: "랜덤 추첨기·사다리타기·룰렛", available: true, icon: "🎲", tagline: "공정하게 딱 하나 뽑기" },
      { slug: "lunch-roulette", name: "점심 메뉴 추천 룰렛", available: true, icon: "🍱", tagline: "오늘 뭐 먹지 고민 끝" },
      { slug: "nickname-generator", name: "닉네임 생성기", available: true, icon: "🐣", tagline: "센스있는 닉네임, 뚝딱" },
      { slug: "recommended-combos", name: "추천 조합", available: true, icon: "✨", tagline: "같이 하면 더 재밌는 조합" },
    ],
  },
];

// 실제 카테고리 랜딩 페이지(/src/app/<slug>/page.tsx)가 구현된 카테고리만 걸러낸다.
// 헤더 내비게이션과 sitemap이 이 목록을 함께 써서, 페이지가 없는 카테고리로
// 죽은 링크가 생기는 걸 한곳에서 막는다.
export const CATEGORIES_WITH_PAGES = CATEGORIES.filter((c) => c.hasPage);
