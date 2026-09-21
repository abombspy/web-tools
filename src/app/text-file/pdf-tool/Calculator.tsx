"use client";

import { useState } from "react";
import { getPdfPageCount, mergePdfs, splitPdfPageRange } from "@/lib/calculators/pdf-tool";

type Mode = "merge" | "split";

// 브라우저 메인 스레드에서 pdf-lib로 직접 처리하다 보니(Web Worker 미사용, plan.md §6.12),
// 지나치게 큰 파일·합계는 탭이 멈춘 것처럼 보일 수 있어 선택 단계에서 미리 막는다.
const MAX_FILE_SIZE_MB = 30;
const MAX_TOTAL_SIZE_MB = 60;

function formatMb(bytes: number): string {
  return (bytes / 1024 / 1024).toFixed(1);
}

async function fileToBytes(file: File): Promise<Uint8Array> {
  return new Uint8Array(await file.arrayBuffer());
}

function downloadBytes(bytes: Uint8Array, filename: string) {
  const blob = new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function Calculator() {
  const [mode, setMode] = useState<Mode>("merge");
  const [mergeFiles, setMergeFiles] = useState<File[]>([]);
  const [splitFile, setSplitFile] = useState<File | null>(null);
  const [splitTotalPages, setSplitTotalPages] = useState<number | null>(null);
  const [startPage, setStartPage] = useState("1");
  const [endPage, setEndPage] = useState("1");
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  function handleMergeFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    setError(null);

    const oversized = files.find((f) => f.size > MAX_FILE_SIZE_MB * 1024 * 1024);
    if (oversized) {
      setError(`"${oversized.name}"이(가) 너무 큽니다(${formatMb(oversized.size)}MB, 최대 ${MAX_FILE_SIZE_MB}MB).`);
      setMergeFiles([]);
      e.target.value = "";
      return;
    }

    const totalSize = files.reduce((sum, f) => sum + f.size, 0);
    if (totalSize > MAX_TOTAL_SIZE_MB * 1024 * 1024) {
      setError(`선택한 파일 합계가 너무 큽니다(${formatMb(totalSize)}MB, 최대 ${MAX_TOTAL_SIZE_MB}MB).`);
      setMergeFiles([]);
      e.target.value = "";
      return;
    }

    setMergeFiles(files);
  }

  async function handleSplitFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setError(null);
    setSplitFile(null);
    setSplitTotalPages(null);

    if (!file) return;

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`파일이 너무 큽니다(${formatMb(file.size)}MB, 최대 ${MAX_FILE_SIZE_MB}MB).`);
      e.target.value = "";
      return;
    }

    setSplitFile(file);
    try {
      const pages = await getPdfPageCount(await fileToBytes(file));
      setSplitTotalPages(pages);
      setEndPage(String(pages));
    } catch {
      setError("PDF 파일을 읽을 수 없습니다.");
      setSplitTotalPages(null);
    }
  }

  async function handleMerge() {
    setError(null);
    setProcessing(true);
    try {
      const byteArrays = await Promise.all(mergeFiles.map(fileToBytes));
      const merged = await mergePdfs(byteArrays);
      downloadBytes(merged, "merged.pdf");
    } catch (e) {
      setError(e instanceof Error ? e.message : "병합에 실패했습니다.");
    } finally {
      setProcessing(false);
    }
  }

  async function handleSplit() {
    if (!splitFile) return;
    setError(null);
    setProcessing(true);
    try {
      const bytes = await fileToBytes(splitFile);
      const result = await splitPdfPageRange(bytes, Number(startPage), Number(endPage));
      downloadBytes(result, `split_${startPage}-${endPage}.pdf`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "분할에 실패했습니다.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="mt-8 rounded-2xl border-2 border-teal-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <label className="mb-4 flex flex-col gap-1 text-sm">
        작업 종류
        <select
          className="w-40 rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-teal-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
          value={mode}
          onChange={(e) => setMode(e.target.value as Mode)}
        >
          <option value="merge">병합</option>
          <option value="split">분할(페이지 범위 추출)</option>
        </select>
      </label>

      {mode === "merge" ? (
        <div>
          <label className="flex flex-col gap-1 text-sm">
            PDF 파일 선택 (2개 이상, 선택한 순서대로 합쳐집니다. 파일당 최대 {MAX_FILE_SIZE_MB}MB,
            합계 최대 {MAX_TOTAL_SIZE_MB}MB)
            <input
              type="file"
              accept="application/pdf"
              multiple
              onChange={handleMergeFilesChange}
              className="text-sm"
            />
          </label>
          {mergeFiles.length > 0 && (
            <ul className="mt-2 list-disc pl-5 text-sm text-zinc-600 dark:text-zinc-400">
              {mergeFiles.map((f, i) => (
                <li key={i}>{f.name}</li>
              ))}
            </ul>
          )}
          <button
            type="button"
            onClick={handleMerge}
            disabled={mergeFiles.length < 2 || processing}
            className="mt-4 rounded-full bg-teal-400 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-teal-500 disabled:opacity-50"
          >
            {processing ? "처리 중..." : "병합하고 다운로드"}
          </button>
        </div>
      ) : (
        <div>
          <label className="flex flex-col gap-1 text-sm">
            PDF 파일 선택 (최대 {MAX_FILE_SIZE_MB}MB)
            <input
              type="file"
              accept="application/pdf"
              onChange={handleSplitFileChange}
              className="text-sm"
            />
          </label>
          {splitTotalPages !== null && (
            <>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                총 {splitTotalPages}페이지
              </p>
              <div className="mt-2 flex items-center gap-3">
                <label className="flex flex-col gap-1 text-sm">
                  시작 페이지
                  <input
                    type="number"
                    className="w-24 rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-teal-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
                    value={startPage}
                    onChange={(e) => setStartPage(e.target.value)}
                    min={1}
                    max={splitTotalPages}
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm">
                  끝 페이지
                  <input
                    type="number"
                    className="w-24 rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-teal-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
                    value={endPage}
                    onChange={(e) => setEndPage(e.target.value)}
                    min={1}
                    max={splitTotalPages}
                  />
                </label>
              </div>
              <button
                type="button"
                onClick={handleSplit}
                disabled={processing}
                className="mt-4 rounded-full bg-teal-400 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-teal-500 disabled:opacity-50"
              >
                {processing ? "처리 중..." : "추출하고 다운로드"}
              </button>
            </>
          )}
        </div>
      )}

      {error && <p className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
