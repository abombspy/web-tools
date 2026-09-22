"use client";

import { useRef, useState } from "react";
import { calculateResizeDimensions } from "@/lib/calculators/image-resize";

type Format = "image/jpeg" | "image/png" | "image/webp";

const FORMAT_LABELS: Record<Format, string> = {
  "image/jpeg": "JPEG",
  "image/png": "PNG",
  "image/webp": "WebP",
};

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
        `File is too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Since this runs in your browser, only files up to ${MAX_FILE_SIZE_MB}MB are supported.`,
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
      if (!canvas) throw new Error("Couldn't prepare the canvas.");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("This browser doesn't support image processing.");
      ctx.drawImage(bitmap, 0, 0, width, height);

      const blob: Blob | null = await new Promise((resolve) =>
        canvas.toBlob(resolve, format, Number(quality)),
      );
      if (!blob) throw new Error("Couldn't generate the image.");

      setResultUrl(URL.createObjectURL(blob));
      setResultSize(blob.size);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't process this image.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="mt-8 rounded-2xl border-2 border-teal-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <label className="flex flex-col gap-1 text-sm">
        Choose an image (max {MAX_FILE_SIZE_MB}MB)
        <input type="file" accept="image/*" onChange={handleFileChange} className="text-sm" />
      </label>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-sm">
          Max width (px)
          <input
            type="number"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-teal-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={maxWidth}
            onChange={(e) => setMaxWidth(e.target.value)}
            min={1}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Max height (px)
          <input
            type="number"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-teal-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={maxHeight}
            onChange={(e) => setMaxHeight(e.target.value)}
            min={1}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Output format
          <select
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-teal-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
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
          Quality (0–1)
          <input
            type="number"
            step="0.1"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-teal-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
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
        className="mt-4 rounded-full bg-teal-400 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-teal-500 disabled:opacity-50"
      >
        {processing ? "Processing..." : "Convert"}
      </button>

      <canvas ref={canvasRef} className="hidden" />

      {error && <p className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</p>}

      {resultUrl && resultSize !== null && originalFile && (
        <div className="mt-6 space-y-3 border-t-2 border-teal-100 pt-6 dark:border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element -- temporary blob URL from a user upload */}
          <img src={resultUrl} alt="Converted image preview" className="max-w-full rounded" />
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {(originalFile.size / 1024).toFixed(1)}KB → {(resultSize / 1024).toFixed(1)}KB (
            {Math.round((1 - resultSize / originalFile.size) * 100)}% smaller)
          </p>
          <a
            href={resultUrl}
            download={`converted.${format.split("/")[1]}`}
            className="inline-block rounded-full bg-teal-400 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-teal-500"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
}
