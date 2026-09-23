"use client";

import { useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { getChrome } from "@/lib/content/chrome";

const noopSubscribe = () => () => {};

// 도구 상세 페이지 전용 공유 버튼. API 키가 필요한 카카오 공식 SDK 대신, 모바일
// 브라우저의 Web Share API(navigator.share)를 쓴다 — 지원 브라우저에서는 OS 공유
// 시트가 뜨고 카카오톡이 설치돼 있으면 거기서 바로 고를 수 있다. 지원하지 않는
// 환경(대부분의 데스크톱 브라우저)에서는 "링크 복사"와 X·페이스북 공유 링크(둘 다
// API 키 불필요)로 대체한다.
//
// canShare/shareUrl은 useSyncExternalStore로 읽는다 — navigator.share 지원 여부와
// 현재 URL은 컴포넌트 생애주기 동안 바뀌지 않는 "외부 값"이라 구독은 no-op이고,
// 서버 스냅샷(getServerSnapshot)은 SSR과 동일하게 false/""를 반환해 하이드레이션
// 불일치 없이 클라이언트에서만 실제 값으로 교체되게 한다(useEffect+setState 방식은
// 굳이 effect를 쓸 필요가 없는 이 케이스에 lint가 캐스케이딩 렌더 경고를 낸다).
export default function ShareButtons() {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");
  const chrome = getChrome(isEnglish ? "en" : "ko");
  const canShare = useSyncExternalStore(
    noopSubscribe,
    () => typeof navigator !== "undefined" && "share" in navigator,
    () => false,
  );
  const shareUrl = useSyncExternalStore(
    noopSubscribe,
    () => window.location.href,
    () => "",
  );
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 클립보드 접근이 막힌 환경(권한 거부 등) — 조용히 무시.
    }
  }

  async function handleShare() {
    try {
      await navigator.share({ title: document.title, url: window.location.href });
    } catch {
      // 사용자가 공유 시트를 취소한 경우 등 — 조용히 무시.
    }
  }

  const buttonClass =
    "inline-flex items-center gap-1.5 rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-600 hover:border-orange-300 hover:text-orange-500 dark:border-white/10 dark:text-zinc-400";

  return (
    <div className="mt-6 flex flex-wrap items-center gap-2">
      <button type="button" onClick={handleCopy} className={buttonClass}>
        🔗 {copied ? chrome.share.copied : chrome.share.copyLink}
      </button>
      {canShare ? (
        <button type="button" onClick={handleShare} className={buttonClass}>
          📤 {chrome.share.shareButton}
        </button>
      ) : (
        <>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass}
          >
            𝕏 {chrome.share.shareX}
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass}
          >
            📘 {chrome.share.shareFacebook}
          </a>
        </>
      )}
    </div>
  );
}
