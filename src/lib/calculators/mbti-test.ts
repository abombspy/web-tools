// plan.md §4.8 확장: 실제 문항 기반 MBTI 성격 유형 테스트.
//
// 중요한 전제: 이건 정식 MBTI(마이어스-브릭스 유형 지표, 상표 등록된 유료 검사)가 아니라
// 그 개념을 참고해 만든 "참고용 성격 유형 테스트"다. 심리검사로서의 타당성이 검증되지
// 않았으며, 결과는 재미로만 봐야 한다는 점을 UI에 명시한다.
//
// 각 축(E/I, S/N, T/F, J/P)마다 7문항씩 총 28문항. 문항 수가 홀수라 동점(타이)이 나올 수
// 없어 별도의 동점 처리 로직이 필요 없다.
export type Letter = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
export type Axis = "EI" | "SN" | "TF" | "JP";

export type MbtiQuestion = {
  id: string;
  axis: Axis;
  optionA: { text: string; letter: Letter };
  optionB: { text: string; letter: Letter };
};

export const MBTI_QUESTIONS: MbtiQuestion[] = [
  // E vs I
  { id: "ei1", axis: "EI", optionA: { text: "여러 사람과 함께 있으면 에너지가 충전된다", letter: "E" }, optionB: { text: "혼자만의 시간이 있어야 에너지가 충전된다", letter: "I" } },
  { id: "ei2", axis: "EI", optionA: { text: "낯선 사람에게 먼저 말을 거는 편이다", letter: "E" }, optionB: { text: "낯선 사람과 있으면 조금 어색하다", letter: "I" } },
  { id: "ei3", axis: "EI", optionA: { text: "생각은 말하면서 정리하는 편이다", letter: "E" }, optionB: { text: "생각은 혼자 정리한 뒤 말하는 편이다", letter: "I" } },
  { id: "ei4", axis: "EI", optionA: { text: "모임에서 주로 말을 많이 하는 편이다", letter: "E" }, optionB: { text: "모임에서 주로 듣는 편이다", letter: "I" } },
  { id: "ei5", axis: "EI", optionA: { text: "주말엔 밖에서 사람들과 어울리고 싶다", letter: "E" }, optionB: { text: "주말엔 집에서 조용히 쉬고 싶다", letter: "I" } },
  { id: "ei6", axis: "EI", optionA: { text: "새로운 사람을 만나는 게 즐겁다", letter: "E" }, optionB: { text: "새로운 사람을 만나는 게 다소 피곤하다", letter: "I" } },
  { id: "ei7", axis: "EI", optionA: { text: "전화 통화가 더 편하다", letter: "E" }, optionB: { text: "문자·메시지가 더 편하다", letter: "I" } },
  // S vs N
  { id: "sn1", axis: "SN", optionA: { text: "눈앞의 구체적인 사실에 집중한다", letter: "S" }, optionB: { text: "숨은 가능성과 의미를 먼저 생각한다", letter: "N" } },
  { id: "sn2", axis: "SN", optionA: { text: "구체적이고 실용적인 설명을 선호한다", letter: "S" }, optionB: { text: "비유나 은유적인 설명을 선호한다", letter: "N" } },
  { id: "sn3", axis: "SN", optionA: { text: "경험과 실제 사례를 중요하게 여긴다", letter: "S" }, optionB: { text: "직관과 영감을 중요하게 여긴다", letter: "N" } },
  { id: "sn4", axis: "SN", optionA: { text: "세부사항을 꼼꼼히 챙긴다", letter: "S" }, optionB: { text: "큰 그림을 먼저 본다", letter: "N" } },
  { id: "sn5", axis: "SN", optionA: { text: "현실적인 계획을 세우는 편이다", letter: "S" }, optionB: { text: "미래의 가능성을 상상하는 걸 좋아한다", letter: "N" } },
  { id: "sn6", axis: "SN", optionA: { text: "정해진 방식대로 하는 게 편하다", letter: "S" }, optionB: { text: "새로운 방식을 시도해보고 싶다", letter: "N" } },
  { id: "sn7", axis: "SN", optionA: { text: "있는 그대로를 본다", letter: "S" }, optionB: { text: "이면의 패턴이나 연관성을 찾으려 한다", letter: "N" } },
  // T vs F
  { id: "tf1", axis: "TF", optionA: { text: "결정할 때 논리와 사실을 우선한다", letter: "T" }, optionB: { text: "결정할 때 사람들의 감정을 우선한다", letter: "F" } },
  { id: "tf2", axis: "TF", optionA: { text: "비판을 받아도 내용에 먼저 집중한다", letter: "T" }, optionB: { text: "비판을 받으면 마음이 먼저 쓰인다", letter: "F" } },
  { id: "tf3", axis: "TF", optionA: { text: "공정함이 배려보다 중요하다고 생각한다", letter: "T" }, optionB: { text: "배려가 공정함보다 중요하다고 생각한다", letter: "F" } },
  { id: "tf4", axis: "TF", optionA: { text: "갈등 상황에서 원인을 분석하려 한다", letter: "T" }, optionB: { text: "갈등 상황에서 감정을 다독이려 한다", letter: "F" } },
  { id: "tf5", axis: "TF", optionA: { text: "솔직한 지적이 결국 더 낫다고 생각한다", letter: "T" }, optionB: { text: "듣는 사람 기분을 먼저 고려해 말한다", letter: "F" } },
  { id: "tf6", axis: "TF", optionA: { text: "효율성을 중요하게 여긴다", letter: "T" }, optionB: { text: "관계와 조화를 중요하게 여긴다", letter: "F" } },
  { id: "tf7", axis: "TF", optionA: { text: "감정에 휘둘리지 않으려 하는 편이다", letter: "T" }, optionB: { text: "타인의 감정에 공감하는 게 자연스럽다", letter: "F" } },
  // J vs P
  { id: "jp1", axis: "JP", optionA: { text: "계획을 세우고 그대로 실행하는 걸 선호한다", letter: "J" }, optionB: { text: "상황에 맞춰 유연하게 대응하는 걸 선호한다", letter: "P" } },
  { id: "jp2", axis: "JP", optionA: { text: "마감보다 미리 끝내는 편이다", letter: "J" }, optionB: { text: "마감 직전에 몰아서 하는 편이다", letter: "P" } },
  { id: "jp3", axis: "JP", optionA: { text: "정리정돈이 되어 있어야 마음이 편하다", letter: "J" }, optionB: { text: "어느 정도 어질러져 있어도 괜찮다", letter: "P" } },
  { id: "jp4", axis: "JP", optionA: { text: "결정을 빨리 내리는 편이다", letter: "J" }, optionB: { text: "결정을 최대한 미루는 편이다", letter: "P" } },
  { id: "jp5", axis: "JP", optionA: { text: "일정이 정해져 있는 게 편하다", letter: "J" }, optionB: { text: "즉흥적인 게 더 즐겁다", letter: "P" } },
  { id: "jp6", axis: "JP", optionA: { text: "체크리스트를 만들어 하나씩 지워나간다", letter: "J" }, optionB: { text: "그때그때 떠오르는 대로 하는 편이다", letter: "P" } },
  { id: "jp7", axis: "JP", optionA: { text: "목표를 세우면 끝까지 밀어붙인다", letter: "J" }, optionB: { text: "관심사가 자주 바뀌는 편이다", letter: "P" } },
];

export type MbtiTypeInfo = {
  nickname: string;
  summary: string;
  strengths: string[];
  weaknesses: string[];
};

export const MBTI_TYPE_INFO: Record<string, MbtiTypeInfo> = {
  ISTJ: { nickname: "청렴결백한 논리주의자", summary: "책임감 있고 신중하며 원칙과 절차를 중요하게 여깁니다. 맡은 일은 끝까지 해내는 신뢰할 수 있는 사람입니다.", strengths: ["신뢰성", "꼼꼼함", "책임감"], weaknesses: ["변화에 대한 거부감", "융통성 부족으로 비칠 수 있음"] },
  ISFJ: { nickname: "용감한 수호자", summary: "헌신적이고 따뜻하며 주변 사람을 세심하게 챙깁니다. 안정과 전통을 소중히 여기는 편입니다.", strengths: ["배려심", "성실함", "협조성"], weaknesses: ["자기주장을 미루는 경향", "거절을 어려워함"] },
  INFJ: { nickname: "선의의 옹호자", summary: "통찰력이 있고 이상주의적이며 깊은 신념을 지니고 있습니다. 타인의 성장을 돕고 싶어합니다.", strengths: ["통찰력", "공감능력", "신념"], weaknesses: ["완벽주의", "지나친 이상주의"] },
  INTJ: { nickname: "용의주도한 전략가", summary: "독창적이고 분석적이며 장기적인 비전을 세우는 걸 좋아합니다. 효율성과 완성도를 추구합니다.", strengths: ["전략적 사고", "독립성", "높은 기준"], weaknesses: ["타인의 감정을 간과하기 쉬움", "고집이 셀 수 있음"] },
  ISTP: { nickname: "만능 재주꾼", summary: "실용적이고 대담하며 문제 해결 능력이 뛰어납니다. 자유롭고 독립적인 성향을 지녔습니다.", strengths: ["문제 해결력", "침착함", "실용성"], weaknesses: ["장기 계획에 약함", "감정 표현이 서툴 수 있음"] },
  ISFP: { nickname: "호기심 많은 예술가", summary: "온화하고 감각적이며 자신만의 가치관을 소중히 여깁니다. 유연하고 개방적인 태도를 지녔습니다.", strengths: ["예술적 감각", "유연성", "따뜻함"], weaknesses: ["갈등을 피하려는 경향", "계획성 부족"] },
  INFP: { nickname: "열정적인 중재자", summary: "이상주의적이고 공감 능력이 뛰어나며 진정성을 추구합니다. 창의적이고 사려 깊은 편입니다.", strengths: ["공감능력", "창의성", "진정성"], weaknesses: ["비판에 민감함", "현실적인 부분을 놓치기 쉬움"] },
  INTP: { nickname: "논리적인 사색가", summary: "지적 호기심이 강하고 분석적이며 독창적인 아이디어를 즐깁니다.", strengths: ["논리적 분석", "창의적 사고", "객관성"], weaknesses: ["감정 표현이 서툴 수 있음", "일 마무리를 미루는 경향"] },
  ESTP: { nickname: "모험을 즐기는 사업가", summary: "에너지가 넘치고 현실적이며 즉흥적인 행동력을 지녔습니다.", strengths: ["실행력", "적응력", "대담함"], weaknesses: ["장기 계획에 약함", "성급한 결정을 내릴 수 있음"] },
  ESFP: { nickname: "자유로운 영혼의 연예인", summary: "사교적이고 낙천적이며 순간을 즐길 줄 압니다. 주변 사람들에게 즐거움을 줍니다.", strengths: ["사교성", "긍정적 에너지", "순발력"], weaknesses: ["계획성 부족", "장기적 집중이 어려울 수 있음"] },
  ENFP: { nickname: "재기발랄한 활동가", summary: "열정적이고 창의적이며 사람과의 연결을 중요하게 여깁니다. 새로운 가능성을 탐구하는 걸 좋아합니다.", strengths: ["열정", "창의성", "공감능력"], weaknesses: ["마무리가 약할 수 있음", "쉽게 산만해짐"] },
  ENTP: { nickname: "뜨거운 논쟁을 즐기는 변론가", summary: "재치있고 도전적이며 새로운 아이디어를 즐깁니다. 지적인 대화를 좋아합니다.", strengths: ["순발력", "창의적 발상", "논쟁력"], weaknesses: ["루틴한 일을 지루해함", "논쟁적으로 비칠 수 있음"] },
  ESTJ: { nickname: "엄격한 관리자", summary: "체계적이고 리더십이 강하며 효율적으로 조직을 관리하는 능력을 지녔습니다.", strengths: ["조직력", "리더십", "책임감"], weaknesses: ["융통성 부족으로 비칠 수 있음", "타인의 감정을 간과하기 쉬움"] },
  ESFJ: { nickname: "사교적인 외교관", summary: "친화력이 좋고 협력을 중요하게 여기며 주변 사람들을 잘 챙깁니다.", strengths: ["협조성", "배려심", "책임감"], weaknesses: ["타인의 평가에 민감함", "갈등을 피하려는 경향"] },
  ENFJ: { nickname: "정의로운 사회운동가", summary: "카리스마 있고 이타적이며 타인의 잠재력을 이끌어내는 데 능합니다.", strengths: ["리더십", "공감능력", "설득력"], weaknesses: ["자기 자신을 돌보는 데 소홀할 수 있음", "타인의 인정에 의존적일 수 있음"] },
  ENTJ: { nickname: "대담한 통솔자", summary: "결단력 있고 전략적이며 목표 지향적인 리더십을 지녔습니다.", strengths: ["결단력", "전략적 사고", "추진력"], weaknesses: ["독단적으로 비칠 수 있음", "타인의 감정을 간과하기 쉬움"] },
};

export function calculateMbtiType(answers: Letter[]): string {
  const counts: Record<Letter, number> = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  for (const letter of answers) {
    counts[letter] += 1;
  }

  const type =
    (counts.E >= counts.I ? "E" : "I") +
    (counts.S >= counts.N ? "S" : "N") +
    (counts.T >= counts.F ? "T" : "F") +
    (counts.J >= counts.P ? "J" : "P");

  return type;
}

export function getMbtiTypeInfo(type: string): MbtiTypeInfo | null {
  return MBTI_TYPE_INFO[type] ?? null;
}
