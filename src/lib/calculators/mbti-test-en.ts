// 영문판 MBTI 테스트 데이터. 한국어판(mbti-test.ts)과 계산 로직(calculateMbtiType,
// getMbtiTypeInfo)은 동일하게 재사용하고, 문항·유형 설명 콘텐츠만 별도 영문 데이터로 둔다.
import type { Letter, Axis, MbtiTypeInfo } from "./mbti-test";

export type { Letter, Axis, MbtiTypeInfo };

export type MbtiQuestion = {
  id: string;
  axis: Axis;
  optionA: { text: string; letter: Letter };
  optionB: { text: string; letter: Letter };
};

export const MBTI_QUESTIONS_EN: MbtiQuestion[] = [
  { id: "ei1", axis: "EI", optionA: { text: "Being around people recharges me", letter: "E" }, optionB: { text: "I need alone time to recharge", letter: "I" } },
  { id: "ei2", axis: "EI", optionA: { text: "I tend to talk to strangers first", letter: "E" }, optionB: { text: "I feel a bit awkward around strangers", letter: "I" } },
  { id: "ei3", axis: "EI", optionA: { text: "I think out loud as I talk", letter: "E" }, optionB: { text: "I sort out my thoughts before speaking", letter: "I" } },
  { id: "ei4", axis: "EI", optionA: { text: "In a group, I usually do most of the talking", letter: "E" }, optionB: { text: "In a group, I usually just listen", letter: "I" } },
  { id: "ei5", axis: "EI", optionA: { text: "On weekends I want to be out with people", letter: "E" }, optionB: { text: "On weekends I want to rest quietly at home", letter: "I" } },
  { id: "ei6", axis: "EI", optionA: { text: "Meeting new people is fun", letter: "E" }, optionB: { text: "Meeting new people is a bit tiring", letter: "I" } },
  { id: "ei7", axis: "EI", optionA: { text: "A phone call feels easier", letter: "E" }, optionB: { text: "A text message feels easier", letter: "I" } },
  { id: "sn1", axis: "SN", optionA: { text: "I focus on the concrete facts in front of me", letter: "S" }, optionB: { text: "I think about hidden possibilities and meaning first", letter: "N" } },
  { id: "sn2", axis: "SN", optionA: { text: "I prefer concrete, practical explanations", letter: "S" }, optionB: { text: "I prefer metaphorical, big-picture explanations", letter: "N" } },
  { id: "sn3", axis: "SN", optionA: { text: "I value experience and real examples", letter: "S" }, optionB: { text: "I value intuition and inspiration", letter: "N" } },
  { id: "sn4", axis: "SN", optionA: { text: "I pay close attention to details", letter: "S" }, optionB: { text: "I look at the big picture first", letter: "N" } },
  { id: "sn5", axis: "SN", optionA: { text: "I tend to make realistic, practical plans", letter: "S" }, optionB: { text: "I enjoy imagining future possibilities", letter: "N" } },
  { id: "sn6", axis: "SN", optionA: { text: "I'm comfortable doing things the established way", letter: "S" }, optionB: { text: "I want to try new approaches", letter: "N" } },
  { id: "sn7", axis: "SN", optionA: { text: "I take things at face value", letter: "S" }, optionB: { text: "I look for underlying patterns and connections", letter: "N" } },
  { id: "tf1", axis: "TF", optionA: { text: "I prioritize logic and facts when deciding", letter: "T" }, optionB: { text: "I prioritize people's feelings when deciding", letter: "F" } },
  { id: "tf2", axis: "TF", optionA: { text: "When criticized, I focus on the content first", letter: "T" }, optionB: { text: "When criticized, my feelings are affected first", letter: "F" } },
  { id: "tf3", axis: "TF", optionA: { text: "I think fairness matters more than kindness", letter: "T" }, optionB: { text: "I think kindness matters more than fairness", letter: "F" } },
  { id: "tf4", axis: "TF", optionA: { text: "In conflict, I try to analyze the cause", letter: "T" }, optionB: { text: "In conflict, I try to soothe the feelings involved", letter: "F" } },
  { id: "tf5", axis: "TF", optionA: { text: "I think honest feedback is ultimately better", letter: "T" }, optionB: { text: "I consider the listener's feelings first when speaking", letter: "F" } },
  { id: "tf6", axis: "TF", optionA: { text: "I value efficiency", letter: "T" }, optionB: { text: "I value relationships and harmony", letter: "F" } },
  { id: "tf7", axis: "TF", optionA: { text: "I try not to be swayed by emotion", letter: "T" }, optionB: { text: "Empathizing with others' emotions comes naturally", letter: "F" } },
  { id: "jp1", axis: "JP", optionA: { text: "I prefer making a plan and sticking to it", letter: "J" }, optionB: { text: "I prefer adapting flexibly as things come up", letter: "P" } },
  { id: "jp2", axis: "JP", optionA: { text: "I tend to finish things ahead of the deadline", letter: "J" }, optionB: { text: "I tend to cram right before the deadline", letter: "P" } },
  { id: "jp3", axis: "JP", optionA: { text: "I feel at ease when things are organized", letter: "J" }, optionB: { text: "I'm fine with a bit of mess", letter: "P" } },
  { id: "jp4", axis: "JP", optionA: { text: "I tend to make decisions quickly", letter: "J" }, optionB: { text: "I tend to put off decisions as long as possible", letter: "P" } },
  { id: "jp5", axis: "JP", optionA: { text: "I'm comfortable with a fixed schedule", letter: "J" }, optionB: { text: "Spontaneity is more fun for me", letter: "P" } },
  { id: "jp6", axis: "JP", optionA: { text: "I make checklists and cross things off one by one", letter: "J" }, optionB: { text: "I tend to just go with whatever comes to mind", letter: "P" } },
  { id: "jp7", axis: "JP", optionA: { text: "Once I set a goal, I push through to the end", letter: "J" }, optionB: { text: "My interests tend to shift often", letter: "P" } },
];

export const MBTI_TYPE_INFO_EN: Record<string, MbtiTypeInfo> = {
  ISTJ: { nickname: "The Inspector", summary: "Responsible and careful, you value principles and procedure. You're the reliable one who sees a task through to the end.", strengths: ["Reliability", "Thoroughness", "Responsibility"], weaknesses: ["Resistant to change", "Can seem inflexible"] },
  ISFJ: { nickname: "The Protector", summary: "Devoted and warm, you look after the people around you with care. You value stability and tradition.", strengths: ["Caring", "Diligent", "Cooperative"], weaknesses: ["Tends to put own needs last", "Finds it hard to say no"] },
  INFJ: { nickname: "The Advocate", summary: "Insightful and idealistic, you hold deep convictions. You want to help others grow.", strengths: ["Insightful", "Empathetic", "Principled"], weaknesses: ["Perfectionism", "Can be overly idealistic"] },
  INTJ: { nickname: "The Strategist", summary: "Original and analytical, you enjoy building long-term visions. You pursue efficiency and mastery.", strengths: ["Strategic thinking", "Independent", "High standards"], weaknesses: ["May overlook others' feelings", "Can be stubborn"] },
  ISTP: { nickname: "The Craftsperson", summary: "Practical and bold, you're a strong problem-solver. You value freedom and independence.", strengths: ["Problem-solving", "Composure", "Practicality"], weaknesses: ["Weak at long-term planning", "May struggle to express feelings"] },
  ISFP: { nickname: "The Artist", summary: "Gentle and sensitive, you hold your own values close. You have a flexible, open-minded attitude.", strengths: ["Artistic sense", "Flexibility", "Warmth"], weaknesses: ["Tends to avoid conflict", "Can lack planning"] },
  INFP: { nickname: "The Idealist", summary: "Idealistic and deeply empathetic, you pursue authenticity. You're creative and thoughtful.", strengths: ["Empathy", "Creativity", "Authenticity"], weaknesses: ["Sensitive to criticism", "May miss practical details"] },
  INTP: { nickname: "The Thinker", summary: "Intellectually curious and analytical, you enjoy exploring original ideas.", strengths: ["Logical analysis", "Creative thinking", "Objectivity"], weaknesses: ["May struggle to express feelings", "Tends to delay finishing tasks"] },
  ESTP: { nickname: "The Doer", summary: "Energetic and practical, you act decisively and spontaneously.", strengths: ["Execution", "Adaptability", "Boldness"], weaknesses: ["Weak at long-term planning", "May decide too hastily"] },
  ESFP: { nickname: "The Performer", summary: "Sociable and optimistic, you know how to enjoy the moment — and bring joy to those around you.", strengths: ["Sociability", "Positive energy", "Quick reflexes"], weaknesses: ["Can lack planning", "May struggle with long focus"] },
  ENFP: { nickname: "The Campaigner", summary: "Passionate and creative, you value connecting with people and exploring new possibilities.", strengths: ["Enthusiasm", "Creativity", "Empathy"], weaknesses: ["May struggle to finish things", "Easily distracted"] },
  ENTP: { nickname: "The Debater", summary: "Witty and challenging, you enjoy new ideas and intellectual conversation.", strengths: ["Quick thinking", "Creative ideas", "Argumentation"], weaknesses: ["Gets bored with routine", "Can come across as argumentative"] },
  ESTJ: { nickname: "The Executive", summary: "Organized with strong leadership, you manage things efficiently.", strengths: ["Organization", "Leadership", "Responsibility"], weaknesses: ["Can seem inflexible", "May overlook others' feelings"] },
  ESFJ: { nickname: "The Consul", summary: "Warm and cooperative, you value teamwork and take good care of the people around you.", strengths: ["Cooperative", "Caring", "Responsible"], weaknesses: ["Sensitive to others' opinions", "Tends to avoid conflict"] },
  ENFJ: { nickname: "The Mentor", summary: "Charismatic and altruistic, you're skilled at bringing out others' potential.", strengths: ["Leadership", "Empathy", "Persuasive"], weaknesses: ["May neglect self-care", "Can rely on others' approval"] },
  ENTJ: { nickname: "The Commander", summary: "Decisive and strategic, you lead with a strong drive toward your goals.", strengths: ["Decisiveness", "Strategic thinking", "Drive"], weaknesses: ["Can come across as domineering", "May overlook others' feelings"] },
};
