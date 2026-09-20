// Math.random() 대신 crypto.getRandomValues()를 써서 공정성을 높인 추첨/셔플.
// plan.md §4.8 "랜덤 추첨기·사다리타기·룰렛".

export function getRandomIndex(length: number): number {
  if (length <= 0) {
    throw new Error("목록이 비어 있습니다.");
  }
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % length;
}

export function pickRandom<T>(items: T[]): T {
  if (items.length === 0) {
    throw new Error("목록이 비어 있습니다.");
  }
  return items[getRandomIndex(items.length)];
}

/** Fisher-Yates 셔플. 원본 배열은 바꾸지 않고 새 배열을 반환한다. */
export function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = getRandomIndex(i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** 참가자 목록을 결과 목록에 무작위로 1:1 매칭한다(사다리타기 결과와 동등한 무작위 배정). */
export function randomMatch<T, U>(participants: T[], outcomes: U[]): [T, U][] {
  if (participants.length !== outcomes.length) {
    throw new Error("참가자 수와 결과 수가 같아야 합니다.");
  }
  const shuffledOutcomes = shuffle(outcomes);
  return participants.map((p, i) => [p, shuffledOutcomes[i]]);
}
