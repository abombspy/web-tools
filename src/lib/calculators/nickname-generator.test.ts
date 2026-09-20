import { describe, expect, it } from "vitest";
import { ADJECTIVES, generateNickname, NOUNS } from "./nickname-generator";

describe("generateNickname", () => {
  it("항상 형용사와 명사 목록에 있는 단어를 조합한 '형용사 명사' 형태로 만든다", () => {
    for (let i = 0; i < 50; i += 1) {
      const nickname = generateNickname();
      const [adjective, noun] = nickname.split(" ");
      expect(ADJECTIVES).toContain(adjective);
      expect(NOUNS).toContain(noun);
    }
  });
});
