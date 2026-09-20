import { PDFDocument } from "pdf-lib";
import { describe, expect, it } from "vitest";
import { getPdfPageCount, mergePdfs, splitPdfPageRange } from "./pdf-tool";

async function makeTestPdf(pageCount: number): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  for (let i = 0; i < pageCount; i += 1) {
    doc.addPage([200, 200]);
  }
  return doc.save();
}

describe("getPdfPageCount", () => {
  it("PDF의 실제 페이지 수를 반환한다", async () => {
    const pdf = await makeTestPdf(4);
    expect(await getPdfPageCount(pdf)).toBe(4);
  });
});

describe("mergePdfs", () => {
  it("여러 PDF의 페이지 수를 합친 결과를 만든다", async () => {
    const pdfA = await makeTestPdf(3);
    const pdfB = await makeTestPdf(2);
    const merged = await mergePdfs([pdfA, pdfB]);
    expect(await getPdfPageCount(merged)).toBe(5);
  });

  it("파일이 1개 이하면 에러를 던진다(경계값)", async () => {
    const pdfA = await makeTestPdf(3);
    await expect(mergePdfs([pdfA])).rejects.toThrow();
  });
});

describe("splitPdfPageRange", () => {
  it("지정한 범위(1부터 시작, 양끝 포함)만큼 페이지를 추출한다", async () => {
    const pdf = await makeTestPdf(10);
    const split = await splitPdfPageRange(pdf, 3, 5);
    expect(await getPdfPageCount(split)).toBe(3); // 3,4,5페이지
  });

  it("1페이지만 추출할 수 있다(경계값)", async () => {
    const pdf = await makeTestPdf(10);
    const split = await splitPdfPageRange(pdf, 1, 1);
    expect(await getPdfPageCount(split)).toBe(1);
  });

  it("범위가 전체 페이지 수를 넘으면 에러를 던진다(경계값)", async () => {
    const pdf = await makeTestPdf(5);
    await expect(splitPdfPageRange(pdf, 1, 6)).rejects.toThrow();
  });

  it("시작 페이지가 끝 페이지보다 크면 에러를 던진다", async () => {
    const pdf = await makeTestPdf(5);
    await expect(splitPdfPageRange(pdf, 4, 2)).rejects.toThrow();
  });
});
