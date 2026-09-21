"use client";

import { useRef, useState } from "react";
import { calculateResizeDimensions } from "@/lib/calculators/image-resize";

type Format = "image/jpeg" | "image/png" | "image/webp";

const FORMAT_LABELS: Record<Format, string> = {
  "image/jpeg": "JPEG",
  "image/png": "PNG",
  "image/webp": "WebP",
};

// 브라우저 메인 스레드에서 Canvas로 직접 처리하다 보니(Web Worker 미사용, plan.md §6.12),
// 지나치게 큰 파일은 탭이 멈춘 것처럼 보이거나 메모리 부족을 일으킬 수 있어 선택 단계에서
// 미리 막는다.
const MAX_FILE_SIZE_MB = 25;

export default function Calculator() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [maxWidth, setMaxWidth] = useState("1280");
  const [maxHeight, setMaxHeight] = useState("1280");
  const [format, setFormat] = useState<Format>("image/jpeg");
  const [quality, setQuality] = useState("0.8");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setResultUrl(null);
    setResultSize(null);
    setError(null);

    if (file && file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setOriginalFile(null);
      setError(
        `파일이 너무 큽니다(${(file.size / 1024 / 1024).toFixed(1)}MB). 브라우저에서 직접 처리하므로 ${MAX_FILE_SIZE_MB}MB 이하 파일만 지원합니다.`,
      );
      e.target.value = "";
      return;
    }

    setOriginalFile(file);
  }

  async function processImage() {
    if (!originalFile) return;
    setError(null);
    setProcessing(true);

    try {
      const bitmap = await createImageBitmap(originalFile);
      const { width, height } = calculateResizeDimensions(
        { width: bitmap.width, height: bitmap.height },
        Number(maxWidth) || bitmap.width,
        Number(maxHeight) || bitmap.height,
      );

      const canvas = canvasRef.current;
      if (!canvas) throw new Error("캔버스를 준비하지 못했습니다.");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("이 브라우저에서는 이미지 처리를 지원하지 않습니다.");
      ctx.drawImage(bitmap, 0, 0, width, height);

      const blob: Blob | null = await new Promise((resolve) =>
        canvas.toBlob(resolve, format, Number(quality)),
      );
      if (!blob) throw new Error("이미지를 생성하지 못했습니다.");

      setResultUrl(URL.createObjectURL(blob));
      setResultSize(blob.size);
    } catch (e) {
      setError(e instanceof Error ? e.message : "이미지를 처리하지 못했습니다.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="mt-8 rounded-2xl border-2 border-orange-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <label className="flex flex-col gap-1 text-sm">
        이미지 파일 선택 (최대 {MAX_FILE_SIZE_MB}MB)
        <input type="file" accept="image/*" onChange={handleFileChange} className="text-sm" />
      </label>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-sm">
          최대 가로(px)
          <input
            type="number"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={maxWidth}
            onChange={(e) => setMaxWidth(e.target.value)}
            min={1}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          최대 세로(px)
          <input
            type="number"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={maxHeight}
            onChange={(e) => setMaxHeight(e.target.value)}
            min={1}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          출력 포맷
          <select
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={format}
            onChange={(e) => setFormat(e.target.value as Format)}
          >
            {Object.entries(FORMAT_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          압축 품질(0~1)
          <input
            type="number"
            step="0.1"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            min={0.1}
            max={1}
            disabled={format === "image/png"}
          />
        </label>
      </div>

      <button
        type="button"
        onClick={processImage}
        disabled={!originalFile || processing}
        className="mt-4 rounded-full bg-orange-400 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-orange-500 disabled:opacity-50"
      >
        {processing ? "처리 중..." : "변환 실행"}
      </button>

      <canvas ref={canvasRef} className="hidden" />

      {error && <p className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</p>}

      {resultUrl && resultSize !== null && originalFile && (
        <div className="mt-6 space-y-3 border-t-2 border-orange-100 pt-6 dark:border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element -- 사용자가 업로드한 임시 blob URL */}
          <img src={resultUrl} alt="변환된 이미지 미리보기" className="max-w-full rounded" />
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            원본 {(originalFile.size / 1024).toFixed(1)}KB → 변환 후{" "}
            {(resultSize / 1024).toFixed(1)}KB (
            {Math.round((1 - resultSize / originalFile.size) * 100)}% 절감)
          </p>
          <a
            href={resultUrl}
            download={`converted.${format.split("/")[1]}`}
            className="inline-block rounded-full bg-orange-400 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-orange-500"
          >
            다운로드
          </a>
        </div>
      )}
    </div>
  );
}
