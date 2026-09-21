"use client";

import { useEffect, useState } from "react";
import { generateQrCodeDataUrl } from "@/lib/calculators/qr-code";

export default function Calculator() {
  const [text, setText] = useState("https://");
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isEmpty = text.trim() === "";

  useEffect(() => {
    if (isEmpty) return;
    let cancelled = false;

    generateQrCodeDataUrl(text)
      .then((url) => {
        if (!cancelled) {
          setDataUrl(url);
          setError(null);
        }
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "QR코드를 생성할 수 없습니다.");
          setDataUrl(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [text, isEmpty]);

  return (
    <div className="mt-8 rounded-2xl border-2 border-orange-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <label className="flex flex-col gap-1 text-sm">
        URL 또는 텍스트
        <input
          type="text"
          className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </label>

      {!isEmpty && error && <p className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</p>}

      {!isEmpty && dataUrl && (
        <div className="mt-6 flex flex-col items-center gap-4 border-t-2 border-orange-100 pt-6 dark:border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element -- data URL은 next/image 최적화 대상이 아님 */}
          <img src={dataUrl} alt="생성된 QR코드" width={300} height={300} />
          <a
            href={dataUrl}
            download="qrcode.png"
            className="rounded-full bg-orange-400 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-orange-500"
          >
            PNG 다운로드
          </a>
        </div>
      )}
    </div>
  );
}
