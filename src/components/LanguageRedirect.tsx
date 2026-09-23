"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// 정적 내보내기(output: export)라 서버에서 Accept-Language를 볼 수 없으므로,
// 브라우저 언어에 따른 기본 언어 전환은 클라이언트에서 처리한다. 홈(/ , /en)에
// 처음 들어왔을 때 한 번만 확인하고, 그 결과를 sessionStorage에 남겨 같은 탭에서는
// (사용자가 언어를 직접 바꿨든 안 바꿨든) 다시 리다이렉트하지 않는다. 브라우저를
// 새로 열면(새 세션) 다시 확인한다 — 영구 저장(localStorage)이 아니라 세션 단위로
// 만 기억한다.
const STORAGE_KEY = "langRedirectChecked";

export default function LanguageRedirect({ isEnglish }: { isEnglish: boolean }) {
  const router = useRouter();

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      return;
    }

    const prefersKorean = navigator.language?.toLowerCase().startsWith("ko");
    if (isEnglish && prefersKorean) {
      router.replace("/");
    } else if (!isEnglish && !prefersKorean) {
      router.replace("/en");
    }
  }, [isEnglish, router]);

  return null;
}
