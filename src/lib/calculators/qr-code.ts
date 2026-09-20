// `qrcode` 라이브러리(ISO/IEC 18004 QR 코드 표준 구현) 얇은 래퍼. plan.md §4.7 "QR코드 생성기".
import QRCode from "qrcode";

export async function generateQrCodeDataUrl(text: string, size: number = 300): Promise<string> {
  if (text.trim() === "") {
    throw new Error("QR코드로 만들 텍스트를 입력해 주세요.");
  }
  return QRCode.toDataURL(text, {
    width: size,
    margin: 2,
    errorCorrectionLevel: "M",
  });
}
