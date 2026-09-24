# MBTI 궁합 테스트에 이론적 근거 부여하기

## Context

`/fun/mbti-compatibility`(2026-09-25에 `/fun/name-compatibility`에서 분리 신설)는 현재
`src/lib/calculators/compatibility-score.ts`의 `calculateCompatibilityScore()`를 그대로
쓰고 있다. 이 함수는 두 입력 문자열(이름이든 MBTI 코드든)을 정렬·연결한 뒤 djb2 스타일
해시를 돌려 0~100 사이 숫자로 매핑하는, **순수 무작위 결정론적 함수**다 — MBTI 이론과는
아무 관계가 없다.

사용자가 "MBTI별 성격·성향을 정리하고, 관계별 상관·상생 관계를 정리해서 점수화하는 방법을
찾고, 기존 궁합 관련 측정 데이터를 조사해서 가능하다면 궁합에 근거를 만들고 싶다"고 요청함에
따라, 개발 착수 전 조사 결과를 정리하고 설계 방향을 제안하는 문서다. **이름 궁합
(`/fun/name-compatibility`)은 범위 밖**이다 — 이름에는 애초에 근거로 삼을 만한 구조화된
이론이 없으므로 지금처럼 해시 기반 재미용 콘텐츠로 유지한다.

**가장 먼저 정직하게 짚어야 할 것**: 조사 결과, "MBTI 궁합"에 대해 **과학적으로 검증된
공식은 존재하지 않는다**(§3). 이 문서가 제안하는 방향은 "과학적 근거"가 아니라 **명시적으로
정의된 유형학 이론(소시오닉스의 인터타입 관계)에 근거한, 일관성 있고 설명 가능한 규칙 기반
점수화**다 — 지금의 순수 해시보다는 훨씬 "왜 이런 점수가 나왔는지" 설명할 수 있지만,
여전히 "재미용 콘텐츠"라는 프레이밍은 유지해야 한다. 이 구분을 흐리면 안 된다.

---

## 1. 조사 결과 요약

### 1.1 소시오닉스(Socionics) 인터타입 관계 — 가장 유력한 근거 후보

소시오닉스는 1970~80년대 리투아니아의 아우슈라 아우구스티나비추테(Aušra
Augustinavičiūtė)가 융의 심리유형론을 확장해 만든 별도의 유형학 체계다
([Wikipedia](https://en.wikipedia.org/wiki/Socionics)). MBTI와 완전히 같은 이론은
아니며(두 체계의 유형 판정이 실제로 일치하는 비율은 자료마다 다르게 추정되지만 대략
30% 안팎으로 낮다는 지적이 있음), **16개 유형 간의 관계를 12개의 대칭 관계 + 2쌍의
비대칭(방향성 있는) 관계 = 16종으로 공식적으로 정의**해 둔다는 점이 핵심 장점이다:

| 관계 | 성격 | 비고 |
|---|---|---|
| 듀얼리티(Duality) | **가장 조화로운 관계**로 일관되게 꼽힘 | 한쪽의 강한 기능이 다른 쪽이 필요로 하는 약한 기능을 정확히 보완 |
| 액티베이션(Activation) | 듀얼리티와 비슷하나 더 자극적·덜 안정적 | 같은 쿼드라 |
| 미러(Mirror) | 같은 기능, 다른 순서 | 지적으로 자극적, 서로 다른 관점 교정 |
| 아이덴티티(Identity) | 같은 유형끼리 | 즉각적 이해, 다만 맹점도 공유 |
| 세미듀얼리티(Semi-Duality) | 듀얼리티의 약화 버전 | |
| 킨드레드(Kindred) | 받아들이는 기능은 같고 만들어내는 기능은 반대 | 편안하지만 성장 제한적 |
| 비즈니스(Business) | 실용적 협업에는 좋으나 깊은 친밀감엔 약함 | |
| 미라지(Mirage) | 표면적으론 편하나 서로를 이상화·오해하기 쉬움 | 반대 쿼드라 |
| 슈퍼에고(Super-Ego) | 초반엔 흥미롭지만 가까워질수록 좌절 누적 | |
| 콰지아이덴티티(Quasi-Identity) | 표면적 유사성 뒤에 다른 목표 | |
| 컨트래리(Contrary/Contrast) | 모든 축이 거울처럼 반대 | 자극적이지만 이해하기 어려움 |
| 컨플릭트(Conflict) | **가장 어렵고 소모적인 관계**로 일관되게 꼽힘 | 강한 기능이 상대의 가장 약한 지점을 자극 |
| 수퍼비전/수퍼바이지(Supervision/Supervisee) | 방향성 있음 — 한쪽이 일방적으로 상대 맹점을 계속 건드림 | |
| 베네핏/베네팩터(Benefit/Benefactor) | 방향성 있음 — 비대칭적 도움 관계 | |

관계는 두 유형의 기능 스택(아래 §1.3)을 위치별로 대조해 **기계적으로 결정**된다 — 즉
"(유형A, 유형B) → 관계 하나"의 순수 함수라, 지금의 해시 함수를 "고정된 16종 관계
룩업 테이블"로 바꿔치기하기에 구조적으로 잘 맞는다.

⚠️ 주의: 영어권 소시오닉스 사이트마다 관계 이름 번역이 다르고("Business" vs
"Look-alike", "Contrary" vs "Extinguishment" 등), 16종 전체를 도출 규칙까지 한 번에
정리한 단일 출처를 찾지 못했다 — 실제 구현 전 [Wikisocion](https://wikisocion.github.io/),
[Socionics Insight](https://www.socionicsinsight.com/relations/),
[the16types.info](https://www.the16types.info/) 등 2~3곳을 교차 검증해 최종 16종 이름과
판정 규칙을 확정해야 한다.

### 1.2 대중적인 MBTI "베스트/워스트 궁합" 속설

Truity 등 대중 MBTI 콘텐츠는 대체로 두 가지 패턴을 반복해서 주장한다: **(a) 같은 기능을
공유하면 소통이 쉽다**, **(b) 기능 스택이 정확히 거울처럼 반대(dominant↔inferior가
서로 맞물림)인 "골든 페어"가 이상적**(예: INFP–ENFJ, INFJ–ENTP, INTJ–ENFP,
ISTJ–ESFP, ISFJ–ESTP). 다만 공식 16Personalities 사이트조차 "가장 로맨틱한 단일
유형 조합은 없다"며 특정 페어를 콕 집어 "베스트"라 부르는 걸 **의도적으로 피한다**
([16Personalities](https://www.16personalities.com/articles/16-personality-types-in-romance)).
일부 사이트가 인용하는 "SJ-SJ 79%, NF-NF 73%…" 같은 만족도 수치는 출처가 수십 년 전
비peer-review 대중서(Tieger & Barron-Tieger)로 거슬러 올라가고 독립적으로 검증
불가능하다 — **이런 숫자는 이 사이트에 절대 인용하지 않는다**(허위 정밀성 부여 위험).

### 1.3 인지 기능(Cognitive Functions)과 기능 스택

8개 기능: 지각(P) 축의 Se/Si(감각)·Ne/Ni(직관), 판단(J) 축의 Te/Ti(사고)·Fe/Fi(감정) —
각각 외향(e)/내향(i) 방향을 가진다. 16개 유형은 이 중 4개를 우세(dominant) →
보조(auxiliary) → 3차(tertiary) → 열등(inferior) 순서로 배정받는다(예: INFJ =
Ni-Fe-Ti-Se, ENFP = Ne-Fi-Te-Si).

**구현 전 반드시 정해야 할 것**: 3차·열등 기능의 파생 규칙에 두 가지 널리 쓰이는 모델이
서로 다르게 답한다 — 마이어스(Myers)의 고전 4기능 모델과 비브(Beebe)의 8기능(그림자
포함) 모델. 이 문서는 **고전 4기능 모델**(더 단순하고, 대중 MBTI 콘텐츠 대부분이 이
기준)을 기본값으로 제안한다.

### 1.4 과학적 타당성 — 정직하게 짚어야 할 한계

- **MBTI 자체의 심리측정학적 신뢰도**는 학계에서 오랫동안 비판받아 왔다. 1991년 미국
  국립과학원(NAS) 검토는 "진로상담에 MBTI를 쓸 만큼 충분하고 잘 설계된 연구가 없다"고
  결론지었고, 재검사 시 5주 내 다른 유형이 나오는 비율이 39~76%에 달한다는 보고도
  있다. Myers-Briggs사 자체 사이트는 반대 입장을 내지만, 이해당사자의 주장이라는 점을
  감안해야 한다.
- **MBTI 궁합에 대한 실제 동료심사(peer-reviewed) 연구는 극히 드물다.** 찾아낸 거의
  유일한 직접 관련 연구는 한국 임상 부부 62쌍을 대상으로 한
  [『한국간호학회지』 2010년 논문](https://jkan.or.kr/DOIx.php?id=10.4040/jkan.2010.40.3.336)
  ([PubMed](https://pubmed.ncbi.nlm.nih.gov/20634625/))인데, **"부부간 MBTI 유형
  유사성이 결혼 만족도·긍정 정서·갈등 조절에 유의미한 차이를 만들지 않았다"**는 결과였다
  — 즉 가장 직접적인 실증 연구가 "MBTI 궁합"이라는 개념 자체를 뒷받침하지 않는다.
- 성격-관계만족도 연구에서 실제로 통계적 근거가 쌓인 쪽은 MBTI가 아니라 **빅파이브
  (Big Five)**다. 대규모 3개국 부부 표본(호주·영국·독일, 총 2만 명 이상) 연구
  ([Dyrenforth et al., 2010, *J. Personality and Social Psychology*](https://doi.org/10.1037/a0020385))
  는 "자기 자신의 성격 특성"이 관계 만족도에 미치는 영향이 "배우자와 얼마나 비슷한가"
  보다 훨씬 크고, **유사성(matching) 효과는 통계적으로 안정적으로 유의하지 않았다**고
  보고한다. 일부 후속 연구는 오히려 지나친 유사성이 장기적으로 더 나쁜 결과와
  연관된다고도 보고한다.
- **결론**: "MBTI 궁합 점수"에 과학적으로 검증된 공식은 없다. 이 문서가 제안하는 건
  "과학적 예측"이 아니라 "소시오닉스라는 명시적 유형학 이론에 근거해 일관되게 설명
  가능한 규칙 기반 점수"다 — 페이지 문구도 이 구분을 명확히 해야 한다(§4).

### 1.5 상표·저작권

"MBTI", "Myers-Briggs", MBTI 로고 등은
[Myers & Briggs Foundation의 등록상표](https://www.themyersbriggs.com/en-US/Support/Trademarks)다.
4글자 유형 코드(INFJ 등) 자체와 인지 기능 개념은 16Personalities 같은 제3자도 널리
쓰고 있어 일반적으로 문제없는 것으로 보이나, "MBTI®"를 자체 브랜드처럼 쓰거나
Myers-Briggs사의 궁합 설명 문구를 그대로 베끼는 건 피해야 한다. **소시오닉스 용어
(관계 이름, Model A, 쿼드라 등)는 상표 등록된 바 없는, 1970~80년대부터 공개적으로
발표되어 온 이론**이라 법적 리스크가 훨씬 낮다 — 자체 알고리즘의 이론적 토대로 삼기에
더 안전하다.

---

## 2. 제안하는 설계 방향

### 2.1 데이터 구조

```ts
// src/lib/calculators/mbti-compatibility.ts (신규, 기존 compatibility-score.ts와 분리)

type Letter = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
type MbtiType = string; // "INFJ" 등 16개 중 하나로 런타임 검증

// 고전 4기능 모델로 16개 유형 전부의 스택을 정적 테이블로 미리 계산해 둔다
// (매번 규칙으로 유도하지 않고 검증된 표를 직접 박아 넣는 편이 버그 위험이 낮음).
const FUNCTION_STACK: Record<MbtiType, [string, string, string, string]> = {
  INFJ: ["Ni", "Fe", "Ti", "Se"],
  ENFP: ["Ne", "Fi", "Te", "Si"],
  // ...16개 전부
};

export type SocionicsRelation =
  | "identity" | "duality" | "activity" | "mirror" | "semiDuality" | "kindred"
  | "business" | "mirage" | "superEgo" | "quasiIdentity" | "contrary" | "conflict"
  | "supervisor" | "supervisee" | "benefactor" | "beneficiary";

// (유형A, 유형B) → 관계. 대칭 관계는 순서 무관, supervisor/supervisee와
// benefactor/beneficiary는 방향성이 있어 순서가 의미를 가짐(A가 B의 supervisor면
// B는 A의 supervisee).
export function determineRelation(a: MbtiType, b: MbtiType): SocionicsRelation { ... }

// 관계마다 점수 "밴드"(중심값 ± 폭) + 설명(소시오닉스 이론 기반, 원문 그대로
// 베끼지 않고 재작성). 카테고리는 결정론적이라 "왜 이 점수대인지" 설명 가능하되,
// 밴드 안에서는 기존 해시를 보조 지표로 살짝 섞어 페어마다 미세하게 다른 숫자가
// 나오게 한다(§3-1 권장안: 전체 범위 35~95점, 밴드 폭은 ±4).
const RELATION_SCORE_CENTER: Record<SocionicsRelation, number> = {
  duality: 92, activity: 84, mirror: 78, identity: 72, semiDuality: 66,
  kindred: 60, business: 56, mirage: 52, benefactor: 52, beneficiary: 48,
  quasiIdentity: 46, contrary: 44, supervisor: 42, supervisee: 40,
  superEgo: 39, conflict: 38,
};
const BAND_WIDTH = 4;

export function calculateMbtiCompatibility(a: MbtiType, b: MbtiType) {
  const relation = determineRelation(a, b);
  const jitter = (simpleHash(`${a}|${b}`) % (BAND_WIDTH * 2 + 1)) - BAND_WIDTH; // -4~+4
  const score = RELATION_SCORE_CENTER[relation] + jitter;
  return { relation, score, stackA: FUNCTION_STACK[a], stackB: FUNCTION_STACK[b] };
}
```

- **이름 궁합과 완전히 분리**: `compatibility-score.ts`(해시 기반)는 그대로 두고 건드리지
  않는다. `name-compatibility` 페이지는 계속 그걸 쓰고, `mbti-compatibility` 페이지만
  새 `mbti-compatibility.ts`로 갈아탄다.
- **점수 밴드는 §3-1의 권장안을 반영한 예시**다 — 전체 범위를 35~95점으로 좁히고
  (극단적으로 낮은 점수가 주는 불필요한 부정적 인상 방지), 관계 카테고리(중심값)는
  고정하되 그 안에서 기존 해시로 ±4점 미세 변주를 줘 페어마다 살짝 다른 숫자가
  나오게 했다. 최종 중심값 배치는 §3-3(관계 이름 재검증) 조사 결과에 따라 조정될 수
  있다.
- 기존 `getCompatibilityComment(score)`(점수 구간별 고정 문구)는 재사용하지 않고,
  **관계 이름별로 문구를 직접 짓는** 편이 이론적 일관성이 있다(예: "conflict" 관계는
  항상 "서로 다른 방식이라 부딪히기 쉬워요" 같은 관계-특화 문구).

### 2.2 콘텐츠(KO/EN)

136쌍(16×16 대칭 제외 중복 제거) 전부에 문구를 손으로 쓰는 대신, **16개 관계 유형별로
1개씩** 설명 문구를 작성해 재사용한다(언어팩 컨벤션 그대로 `content/tools/{ko,en}/fun/
mbti-compatibility.json`에 `relations.<relationKey>.{name, description}` 구조로).
개별 페어에는 "공유 기능: Ni, Fe" 같이 §2.1의 `stackA`/`stackB`를 비교해 동적으로 만든
한 줄을 덧붙여, 관계 문구만으로는 밋밋할 수 있는 부분을 보완한다.

### 2.3 UI에 반영할 것(제안)

- 결과 카드에 점수 + 관계 이름(한국어 번역) + "왜 이 관계인지"에 대한 1문장 정도의 설명을
  추가 노출 — 지금처럼 "숫자만 툭 던지는" 것보다 신뢰도가 올라간다.
- 안내 문구(callout)를 **"과학적 근거 없음" → "소시오닉스라는 성격유형학 이론에서
  정의하는 유형 간 관계를 바탕으로 하지만, 실제 관계 만족도를 예측하는 과학적으로 검증된
  도구는 아닙니다"** 정도로 갱신 — §1.4의 한계를 숨기지 않으면서도, 순수 해시보다는
  "근거가 있다"는 걸 정직하게 전달.
- `ResultShareCard`의 `lines`에 관계 이름을 추가하면 공유 카드 자체도 더 흥미로워짐
  (예: "듀얼리티 관계 · 92점").

---

## 3. 구현 전 확인이 필요한 사항

> ✅ **2026-09-25 사용자 확정**: 아래 6가지 전부 제안된 "의견"대로 진행하기로 확정.
> 이 문서를 기준으로 구현에 착수한다. 구현 완료 후 이 문서 하단에 실제 반영 결과를
> 추가 기록한다.

1. **점수 밴드**: 위 §2.1의 16개 관계별 점수(95~10)는 제안 예시다. 이대로 갈지, 밴드
   폭을 좁혀 극단적인 점수(10점/95점)를 피할지, 아니면 관계 카테고리 내에서 추가로
   약간의 변주(예: 기존 해시를 보조 지표로 살짝 더해 완전히 똑같은 관계라도 82~88점처럼
   미세하게 다르게)를 줄지 결정 필요.

   **의견**: 범위를 **35~95점으로 좁히길 권장**한다. "재미용 콘텐츠"에서 10점처럼
   지나치게 낮은 점수는 실제로 그 MBTI 궁합인 두 사람에게 불필요하게 부정적으로
   읽힐 수 있다(§1.4에서 이미 "과학적으로 검증된 게 아니다"라고 밝혔는데, 그런 도구가
   누군가에게 "너희 둘은 10점"이라고 단정적으로 말하는 건 균형이 안 맞음). 그리고
   관계 카테고리 안에서 **기존 해시값을 보조 변주로 살짝 섞는 것도 권장** —
   완전히 같은 카테고리(예: Conflict끼리)라도 페어마다 33~41점처럼 조금씩 다르게
   나오면, 지금의 "매번 다른 숫자가 나오는 재미"를 잃지 않으면서 카테고리라는 뼈대는
   유지할 수 있다.
2. **기능 스택 모델**: 고전 4기능(Myers) 모델을 기본값으로 제안했는데, 비브(Beebe)
   8기능 모델까지 반영할지(더 정교하지만 이론 자체가 더 논쟁적이고 구현 범위도 커짐).

   **의견**: **고전 4기능 모델로 가는 걸 권장**한다. 8기능 모델은 3차·열등 기능
   파생 규칙부터 출처마다 답이 갈리는 등(§1.3) 이론 자체가 덜 정리돼 있어, "이론적
   근거"를 명확히 하려는 이번 작업의 목적과 오히려 어긋난다. 대중적으로 가장 널리
   쓰이는 4기능 모델이 검증하기도 쉽고 유지보수 부담도 적다.
3. **관계 이름 최종 확정**: §1.1에서 언급했듯 영어 사이트마다 이름이 조금씩 다르다.
   구현 전 소시오닉스 2~3개 출처를 교차 검증해 16개 관계의 최종 이름(한국어 번역 포함)과
   판정 규칙을 확정하는 조사가 한 번 더 필요하다(이 문서는 설계 방향과 1차 조사까지만
   다룸).

   **의견**: 이건 사용자가 결정할 성격의 질문이 아니라 제가 구현 단계에서 직접
   처리할 조사 작업이다 — 착수 승인만 주시면 Wikisocion·Socionics Insight·
   the16types.info 등을 교차 검증해 16개 관계 이름·판정 규칙을 확정하고, 구현
   커밋 메시지에 최종 사용한 출처를 남기겠다.
4. **UI 노출 수준**: §2.3처럼 관계 이름·설명까지 노출할지, 아니면 사용자에게는 그냥
   점수+문구만 보여주고 관계 분류는 내부 로직으로만 쓸지.

   **의견**: **노출하는 쪽을 강하게 권장**한다. 관계 이름·설명을 안 보여주면
   사용자 입장에서는 "그냥 또 다른 방식으로 계산된 임의의 숫자"와 구분이 안 돼서,
   이번에 "이론적 근거를 만들자"는 원래 목적 자체가 화면에는 전혀 드러나지 않는다.
   "듀얼리티 관계 · 92점"처럼 관계 이름이 보여야 신뢰도도 올라가고, `ResultShareCard`로
   공유했을 때도 "그냥 92점"보다 훨씬 흥미로운 콘텐츠가 된다.
5. **면책 문구 톤**: §2.3에서 제안한 문구 톤(이론적 근거는 있지만 과학적 검증은 아님)이
   적절한지, 더 강하게(또는 더 가볍게) 갈지.

   **의견**: §2.3에 제안한 톤을 그대로 쓰는 걸 권장한다. 이미 `mbti-test` 페이지가
   "정식 MBTI 검사가 아니다"라고 밝히는 것과 같은 수위의 정직함이라 사이트 전체
   톤과 일관되고, §1.4의 조사 결과(과학적으로 검증된 공식이 없다는 사실)를 숨기지
   않으면서도 "그냥 아무 근거 없는 해시"보다는 나아졌다는 걸 정확히 전달한다. 더
   약하게 가면(근거를 과장하면) 사실과 어긋나고, 더 강하게 가면(전부 무의미하다고
   하면) 이번 작업 자체가 무색해진다 — 지금 제안한 수위가 균형점이라고 본다.
6. **기존 페이지 마이그레이션**: 지금 배포된 `mbti-compatibility`는 이미 해시 기반
   점수를 쓰고 있다 — 알고리즘을 바꾸면 같은 두 MBTI를 넣었을 때 나오는 점수가 예고 없이
   달라진다. 문제 없다고 보는지 확인(서버 저장 데이터가 없어 "마이그레이션" 자체는
   불필요하지만, 사용자가 이전에 공유해둔 결과 카드 이미지와 지금 점수가 달라질 수 있음).

   **의견**: 문제없이 진행해도 된다고 본다. 이 페이지는 2026-09-25에 막 분리
   신설됐고 서버에 저장된 데이터가 없는 순수 클라이언트 계산이라, 지금 시점에
   알고리즘을 바꾸는 비용이 가장 낮다(나중에 트래픽이 쌓인 뒤 바꾸면 "예전엔 92점
   나왔는데 왜 지금은 다르지"라는 혼란이 더 커짐). 다만 배포 커밋 메시지에 "점수
   산정 방식이 바뀌어 기존과 다른 값이 나올 수 있다"는 점은 명시해 두겠다.

---

## 참고 자료

- [Wikipedia: Socionics](https://en.wikipedia.org/wiki/Socionics)
- [Socionics Insight — 16 Intertype Relations](https://www.socionicsinsight.com/relations/)
- [sociotype.com — Intertype Relationships](https://sociotype.com/socionics/intertype_relationships)
- [the16types.info — Classification of Intertype Relations](https://www.the16types.info/vbulletin/content.php/165-Classification-of-Intertype-Relations-According-to-their-Roles-and-Energetics)
- [Truity — Are Certain Personality Types More Compatible Than Others?](https://www.truity.com/blog/are-certain-personality-types-more-compatible-others)
- [16Personalities — 16 Personality Types in Romance](https://www.16personalities.com/articles/16-personality-types-in-romance)
- [Wikipedia: Jungian cognitive functions](https://en.wikipedia.org/wiki/Jungian_cognitive_functions)
- [Myers & Briggs Foundation — Validity/Reliability 주장](https://www.myersbriggs.org/research-and-library/validity-reliability/)
- [한국간호학회지 2010, MBTI 유형과 결혼만족도](https://jkan.or.kr/DOIx.php?id=10.4040/jkan.2010.40.3.336) ([PubMed](https://pubmed.ncbi.nlm.nih.gov/20634625/))
- Dyrenforth, Kashy, Donnellan & Lucas (2010), *J. Personality and Social Psychology* 99(4):690-702, [DOI 10.1037/a0020385](https://doi.org/10.1037/a0020385)
- Orth (2013), *Personality and Social Psychology Bulletin*, [SAGE](https://journals.sagepub.com/doi/10.1177/0146167213492429)
- [The Myers-Briggs Company — Trademarks](https://www.themyersbriggs.com/en-US/Support/Trademarks)
