// 로또 6/45 번호 생성기. plan.md 스타일 원칙 그대로: "과거 당첨번호로 다음 회차를
// 예측"하는 건 근거 없는 유사과학이다(각 회차는 완전히 독립된 사건이라 과거 출현
// 빈도가 다음 회차 확률에 전혀 영향을 주지 않음). 그래서 이 계산기의 "근거"는 예측이
// 아니라 생성 자체가 진짜로 공정하고 편향 없는 난수인지에 둔다:
//
// - `Math.random()` 대신 Web Crypto API의 `crypto.getRandomValues()`(암호학적으로
//   안전한 난수)를 쓴다.
// - 단순히 `% 45`로 나머지를 취하면 32비트 정수 범위(2^32)가 45로 고르게 나눠떨어지지
//   않아 낮은 번호 쪽에 아주 미세한 편향이 생긴다 — 이를 없애기 위해 45의 배수가 아닌
//   나머지 구간에 걸리면 다시 뽑는 "거부 샘플링(rejection sampling)"을 쓴다.
// - 6개를 중복 없이 뽑기 위해 "남은 후보 풀에서 매번 균등하게 하나씩 제거"하는
//   방식(부분 Fisher–Yates)을 쓴다 — 이러면 풀 크기가 줄어들 때마다 다시 편향 없는
//   범위로 거부 샘플링하므로 전체 6개 조합이 균등 분포를 유지한다.

const MIN_NUMBER = 1;
const MAX_NUMBER = 45;
const NUMBERS_PER_GAME = 6;

function secureRandomInt(maxExclusive: number): number {
  const range = 0x100000000; // 2^32, Uint32 값의 가짓수
  const limit = range - (range % maxExclusive); // range 이하에서 maxExclusive의 배수인 가장 큰 경계
  const buf = new Uint32Array(1);
  let value: number;
  do {
    crypto.getRandomValues(buf);
    value = buf[0];
  } while (value >= limit); // 편향 구간(경계 이상)에 걸리면 다시 뽑음
  return value % maxExclusive;
}

function generateOneGame(): number[] {
  const pool: number[] = [];
  for (let n = MIN_NUMBER; n <= MAX_NUMBER; n += 1) pool.push(n);

  const picked: number[] = [];
  for (let i = 0; i < NUMBERS_PER_GAME; i += 1) {
    const idx = secureRandomInt(pool.length);
    picked.push(pool[idx]);
    pool.splice(idx, 1);
  }
  return picked.sort((a, b) => a - b);
}

export function generateLottoGames(gameCount: number): number[][] {
  if (!Number.isInteger(gameCount) || gameCount < 1 || gameCount > 5) {
    throw new Error("게임 수는 1~5 사이의 정수여야 합니다.");
  }
  return Array.from({ length: gameCount }, generateOneGame);
}
