import { describe, expect, it } from "vitest";
import { calculateTimeDifference, getUtcOffsetMinutes } from "./time-difference";

describe("getUtcOffsetMinutes", () => {
  it("서울은 연중 UTC+9(540분)로 서머타임이 없다", () => {
    const winter = getUtcOffsetMinutes("Asia/Seoul", new Date("2026-01-15T00:00:00Z"));
    const summer = getUtcOffsetMinutes("Asia/Seoul", new Date("2026-07-15T00:00:00Z"));
    expect(winter).toBe(540);
    expect(summer).toBe(540);
  });

  it("뉴욕은 여름(서머타임)과 겨울의 UTC 오프셋이 다르다", () => {
    const winter = getUtcOffsetMinutes("America/New_York", new Date("2026-01-15T00:00:00Z"));
    const summer = getUtcOffsetMinutes("America/New_York", new Date("2026-07-15T00:00:00Z"));
    expect(winter).toBe(-300); // EST, UTC-5
    expect(summer).toBe(-240); // EDT, UTC-4
  });
});

describe("calculateTimeDifference", () => {
  it("겨울철 서울-뉴욕 시차는 14시간이다", () => {
    const result = calculateTimeDifference("Asia/Seoul", "America/New_York", new Date("2026-01-15T00:00:00Z"));
    expect(result.hoursDiff).toBe(-14);
  });

  it("여름철 서울-뉴욕 시차는 서머타임 때문에 13시간으로 줄어든다", () => {
    const result = calculateTimeDifference("Asia/Seoul", "America/New_York", new Date("2026-07-15T00:00:00Z"));
    expect(result.hoursDiff).toBe(-13);
  });

  it("서울과 도쿄는 둘 다 UTC+9라 시차가 0이다(둘 다 서머타임 없음)", () => {
    const result = calculateTimeDifference("Asia/Seoul", "Asia/Tokyo", new Date("2026-07-15T00:00:00Z"));
    expect(result.hoursDiff).toBe(0);
  });
});
