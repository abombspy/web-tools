// pdf-lib(브라우저·Node 양쪽에서 동작하는 PDF 조작 라이브러리) 얇은 래퍼.
// plan.md §4.7 "PDF 병합·분할".
import { PDFDocument } from "pdf-lib";

export async function mergePdfs(files: Uint8Array[]): Promise<Uint8Array> {
  if (files.length < 2) {
    throw new Error("병합하려면 PDF 파일이 2개 이상 필요합니다.");
  }

  const merged = await PDFDocument.create();
  for (const fileBytes of files) {
    const doc = await PDFDocument.load(fileBytes);
    const pages = await merged.copyPages(doc, doc.getPageIndices());
    pages.forEach((page) => merged.addPage(page));
  }

  return merged.save();
}

export async function getPdfPageCount(fileBytes: Uint8Array): Promise<number> {
  const doc = await PDFDocument.load(fileBytes);
  return doc.getPageCount();
}

/** startPage/endPage는 1부터 시작하는(사람이 읽는) 페이지 번호이며, 둘 다 포함한다. */
export async function splitPdfPageRange(
  fileBytes: Uint8Array,
  startPage: number,
  endPage: number,
): Promise<Uint8Array> {
  const doc = await PDFDocument.load(fileBytes);
  const totalPages = doc.getPageCount();

  if (startPage < 1 || endPage > totalPages || startPage > endPage) {
    throw new Error(`올바른 페이지 범위를 입력해 주세요(1~${totalPages}).`);
  }

  const indices = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage - 1 + i);
  const newDoc = await PDFDocument.create();
  const pages = await newDoc.copyPages(doc, indices);
  pages.forEach((page) => newDoc.addPage(page));

  return newDoc.save();
}
