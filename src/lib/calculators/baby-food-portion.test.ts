import { describe, expect, it } from "vitest";
import { findBabyFoodStage } from "./baby-food-portion";

describe("findBabyFoodStage", () => {
  it("6개월은 초기, 7개월은 중기로 갈린다(경계값)", () => {
    expect(findBabyFoodStage(6).name).toBe("초기 이유식");
    expect(findBabyFoodStage(7).name).toBe("중기 이유식");
  });

  it("8개월은 중기, 9개월은 후기로 갈린다(경계값)", () => {
    expect(findBabyFoodStage(8).name).toBe("중기 이유식");
    expect(findBabyFoodStage(9).name).toBe("후기 이유식");
  });

  it("11개월은 후기, 12개월은 완료기로 갈린다(경계값)", () => {
    expect(findBabyFoodStage(11).name).toBe("후기 이유식");
    expect(findBabyFoodStage(12).name).toBe("완료기 이유식");
  });

  it("범위보다 어리면 첫 단계로, 범위보다 크면 마지막 단계로 처리한다", () => {
    expect(findBabyFoodStage(2).name).toBe("초기 이유식");
    expect(findBabyFoodStage(20).name).toBe("완료기 이유식");
  });
});
