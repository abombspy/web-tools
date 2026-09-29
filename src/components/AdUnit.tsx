"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

// 애드센스 반응형 디스플레이 광고 단위(2026-09-29 광고 게재 승인, 슬롯 ID 9401957613로 생성).
// plan.md §2.3 설계대로 설명 영역과 계산기 사이 한 곳에만 배치 — 콘텐츠 대비 과도한 광고
// 배치 금지 정책을 지키기 위해 페이지당 여러 곳에 넣지 않는다.
export default function AdUnit() {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // 광고 차단기 등으로 스크립트가 없을 때 조용히 무시.
    }
  }, []);

  return (
    <div className="my-6">
      <p className="mb-1 text-center text-[11px] uppercase tracking-wide text-zinc-400 dark:text-zinc-600">
        광고
      </p>
      <ins
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client="ca-pub-8721045776671488"
        data-ad-slot="9401957613"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
