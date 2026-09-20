import { describe, expect, it } from "vitest";
import { generateQrCodeDataUrl } from "./qr-code";

describe("generateQrCodeDataUrl", () => {
  it("텍스트로 PNG data URL을 생성한다", async () => {
    const dataUrl = await generateQrCodeDataUrl("https://example.com");
    expect(dataUrl.startsWith("data:image/png;base64,")).toBe(true);
  });

  it("빈 텍스트는 에러를 던진다(경계값)", async () => {
    await expect(generateQrCodeDataUrl("")).rejects.toThrow();
    await expect(generateQrCodeDataUrl("   ")).rejects.toThrow();
  });

  it("긴 텍스트도 생성된다(QR 용량 한도 내)", async () => {
    const dataUrl = await generateQrCodeDataUrl("a".repeat(500));
    expect(dataUrl.startsWith("data:image/png;base64,")).toBe(true);
  });
});
