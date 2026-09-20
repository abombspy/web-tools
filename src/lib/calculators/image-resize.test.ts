import { describe, expect, it } from "vitest";
import { calculateResizeDimensions } from "./image-resize";

describe("calculateResizeDimensions", () => {
  it("가로가 더 많이 넘치면 가로 기준으로 비율을 맞춘다", () => {
    const result = calculateResizeDimensions({ width: 800, height: 600 }, 400, 400);
    expect(result).toEqual({ width: 400, height: 300 });
  });

  it("원본이 이미 한도 안에 있으면 그대로 둔다(확대하지 않음)", () => {
    const result = calculateResizeDimensions({ width: 200, height: 150 }, 400, 400);
    expect(result).toEqual({ width: 200, height: 150 });
  });

  it("정확히 한도와 같으면 그대로 둔다(경계값)", () => {
    const result = calculateResizeDimensions({ width: 400, height: 400 }, 400, 400);
    expect(result).toEqual({ width: 400, height: 400 });
  });

  it("가로로 매우 긴 이미지는 세로가 아주 작아질 수 있다", () => {
    const result = calculateResizeDimensions({ width: 2000, height: 100 }, 500, 500);
    expect(result).toEqual({ width: 500, height: 25 });
  });
});
