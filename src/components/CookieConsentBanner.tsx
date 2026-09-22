"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "cookie-consent-ack";

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");

  useEffect(() => {
    // 마이크로태스크로 감싸 effect 본문에서 동기적으로 setState하지 않도록 한다
    // (react-hooks/set-state-in-effect). localStorage는 서버에 없는 값이라 첫 렌더는
    // 항상 "배너 없음"으로 서버·클라이언트가 일치해야 하이드레이션 경고가 안 난다.
    Promise.resolve().then(() => {
      try {
        if (localStorage.getItem(STORAGE_KEY) !== "1") {
          setVisible(true);
        }
      } catch {
        // 프라이빗 브라우징 등으로 localStorage를 못 쓰면 배너를 계속 보여주는 쪽이 안전하다.
        setVisible(true);
      }
    });
  }, []);

  function acknowledge() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // 저장에 실패해도 이번 방문에서는 닫아준다.
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-white/95 p-4 backdrop-blur dark:border-white/10 dark:bg-zinc-900/95">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {isEnglish ? (
            <>
              This site uses cookies for ad serving and usage analytics. See the{" "}
              <Link href="/en/privacy-policy" className="underline">
                Privacy Policy
              </Link>{" "}
              for details.
            </>
          ) : (
            <>
              이 사이트는 광고 게재와 이용 현황 분석을 위해 쿠키를 사용합니다. 자세한 내용은{" "}
              <Link href="/privacy-policy" className="underline">
                개인정보처리방침
              </Link>
              을 확인해 주세요.
            </>
          )}
        </p>
        <button
          type="button"
          onClick={acknowledge}
          className="shrink-0 rounded border border-black/20 px-4 py-2 text-sm font-medium hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
        >
          {isEnglish ? "Got it" : "확인"}
        </button>
      </div>
    </div>
  );
}
