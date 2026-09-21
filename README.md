# 생활계산소

세금·급여·생활 계산을 위한 무료 계산기 모음. 각 계산기는 계산 원리와 법적 근거를 함께 설명한다.

- 서비스 주소(예정): https://web-tools.gssystems.co.kr (도메인 연결 전 임시 주소: https://abombspy.github.io/web-tools/)
- 기획 문서: [`.docs/plan.md`](.docs/plan.md) — 메뉴별 개발 근거, 미결정 사항, 진행 현황
- UI 개선 기록: [`.docs/ui-plan.md`](.docs/ui-plan.md)
- 계산기별 검증 로그: [`.docs/verification-checklist.md`](.docs/verification-checklist.md)

## 기술 스택

- Next.js(App Router) + TypeScript + Tailwind CSS
- `output: "export"`로 완전 정적 사이트로 빌드 (API 라우트·서버 런타임 없음, 계산은 전부 브라우저에서 수행)
- 테스트: Vitest (`src/lib/calculators/*.test.ts`)
- 배포: GitHub Actions → GitHub Pages (`.github/workflows/deploy.yml`, main 브랜치 push 시 자동)

## 개발

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run test      # vitest run
npm run build     # 정적 내보내기(out/ 생성)
```

## 서비스 경로 · 메뉴 구성

홈(`/`)과 헤더 드롭다운 메뉴에서 아래 8개 카테고리·43개 도구 전체에 바로 접근할 수 있다.

### 알바·직장인 (`/part-time`)
| 경로 | 도구 |
|---|---|
| `/part-time/weekly-holiday-pay` | 주휴수당 계산기 |
| `/part-time/part-time-wage` | 알바 월급 계산기 |
| `/part-time/resignation-date-comparison` | 퇴사 시점 비교 계산기 |
| `/part-time/annual-leave-pay` | 연차수당 계산기 |
| `/part-time/unemployment-benefit` | 실업급여 모의 계산기 |
| `/part-time/parental-leave-pay` | 육아휴직 급여 계산기 |

### 프리랜서·사업자 (`/freelancer`)
| 경로 | 도구 |
|---|---|
| `/freelancer/withholding-tax-3-3` | 3.3% 원천징수 역산 계산기 |
| `/freelancer/vat` | 부가세 계산기 |
| `/freelancer/income-tax-estimate` | 종합소득세 예상 계산기 |
| `/freelancer/delivery-rider-net-income` | 배달 라이더 순수익 계산기 |
| `/freelancer/ecommerce-margin` | 스마트스토어·쿠팡 마진 계산기 |
| `/freelancer/customs-duty` | 해외직구 관세 계산기 |

### 생활·주거 (`/living`)
| 경로 | 도구 |
|---|---|
| `/living/electricity-bill` | 전기요금 계산기 |
| `/living/jeonse-to-monthly-rent` | 전월세 전환율 계산기 |
| `/living/real-estate-agent-fee` | 중개수수료 계산기 |
| `/living/loan-repayment` | 대출 이자·상환 계산기 |
| `/living/moving-cost-estimate` | 이사 비용 견적 계산기 |

### 육아·건강 (`/parenting-health`)
| 경로 | 도구 |
|---|---|
| `/parenting-health/baby-growth-percentile` | 아기 개월수·성장 백분위 계산기 |
| `/parenting-health/due-date` | 출산 예정일 계산기 |
| `/parenting-health/baby-food-portion` | 이유식 단계별 양 계산기 |
| `/parenting-health/bmi-calorie` | BMI·기초대사량·목표 칼로리 계산기 |
| `/parenting-health/alcohol-detox-time` | 음주 후 해독 시간 추정기 |

### 날짜·시간 (`/date-time`)
| 경로 | 도구 |
|---|---|
| `/date-time/d-day` | D-day·기념일 계산기 |
| `/date-time/age-zodiac` | 만 나이·띠·별자리 계산기 |
| `/date-time/military-discharge-date` | 군 전역일 계산기 |
| `/date-time/business-days` | 근무일수(영업일) 계산기 |
| `/date-time/time-difference` | 시차 계산기 |

### 학생·수험생 (`/student`)
| 경로 | 도구 |
|---|---|
| `/student/grade-conversion` | 내신·수능 등급 환산 계산기 |
| `/student/gpa` | 학점 평균(GPA) 계산기 |
| `/student/civil-service-passing-score` | 공무원 시험 합격선 비교 도구 |
| `/student/toeic-opic-conversion` | 토익·오픽 점수 환산표 |

### 텍스트·파일 도구 (`/text-file`)
| 경로 | 도구 |
|---|---|
| `/text-file/character-count` | 글자수 세기 |
| `/text-file/json-csv-convert` | JSON·CSV 변환기 |
| `/text-file/qr-code` | QR코드 생성기 |
| `/text-file/image-tool` | 이미지 압축·리사이즈·포맷 변환 |
| `/text-file/pdf-tool` | PDF 병합·분할 |
| `/text-file/text-cleanup` | 맞춤법 체크용 텍스트 정리 도구 |

### 재미·바이럴 (`/fun`)
| 경로 | 도구 |
|---|---|
| `/fun/mbti-test` | MBTI 성격 유형 테스트 |
| `/fun/name-compatibility` | 이름 궁합·MBTI 궁합 테스트 |
| `/fun/random-picker` | 랜덤 추첨기·사다리타기·룰렛 |
| `/fun/lunch-roulette` | 점심 메뉴 추천 룰렛 |
| `/fun/nickname-generator` | 닉네임 생성기 |
| `/fun/recommended-combos` | 추천 조합 |

### 공통 페이지
`/about`(소개), `/contact`(문의), `/privacy-policy`(개인정보처리방침), `/terms`(이용약관)

메뉴 구성의 단일 원천은 [`src/lib/site-config.ts`](src/lib/site-config.ts)의 `CATEGORIES`다. 새 카테고리·도구를 추가하면 이 파일만 수정해도 홈·헤더·sitemap.xml이 전부 자동 반영된다(`hasPage`/`available` 필드 기준).
