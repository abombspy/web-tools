"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { getChrome } from "@/lib/content/chrome";
import { SITE_NAME, SITE_NAME_EN } from "@/lib/site-config";

// 계산 결과를 담은 카드 이미지를 브라우저에서 직접 그려(next/og는 서버/빌드 시점
// 전용이라 여기선 못 씀) 다운로드하거나(지원 브라우저는 Web Share의 파일 공유로)
// 공유하는 컴포넌트. GitHub Pages는 서버가 없어 "카카오톡 링크 미리보기가 결과값마다
// 자동으로 바뀌는" 진짜 동적 OG 이미지는 만들 수 없다(크롤러가 요청하는 순간 서버가
// 계산해서 그려줘야 하는데 그 서버가 없음) — 대신 사용자가 버튼을 눌러 이미지를
// 직접 만들어 저장/공유하는 방식으로 같은 목적을 달성한다.
//
// 파일럿 범위(2026-09-25): MBTI 테스트, 이름·MBTI 궁합, 만 나이·띠·별자리, 주휴수당,
// BMI·칼로리 5개 도구에만 우선 적용 — 85개 도구 전체로 확장하기 전에 패턴을 검증한다.

type ResultShareCardProps = {
  toolName: string;
  headline: string;
  lines?: string[];
  accentColor?: string; // hex, 예: "#8b5cf6"(violet-500) — 도구가 속한 카테고리 테마 색상
};

const CARD_WIDTH = 1200;
const CARD_HEIGHT = 630;

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

function darken({ r, g, b }: { r: number; g: number; b: number }, amount: number) {
  return {
    r: Math.max(0, r - amount),
    g: Math.max(0, g - amount),
    b: Math.max(0, b - amount),
  };
}

function drawRoundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (current && ctx.measureText(test).width > maxWidth) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines.length > 0 ? lines : [text];
}

function renderCard({
  toolName,
  headline,
  lines = [],
  accentColor = "#f97316",
  siteName,
}: ResultShareCardProps & { siteName: string }): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) return Promise.reject(new Error("2D canvas context unavailable"));

  const accent = hexToRgb(accentColor);
  const accentDark = darken(accent, 40);

  const bgGradient = ctx.createLinearGradient(0, 0, CARD_WIDTH, CARD_HEIGHT);
  bgGradient.addColorStop(0, `rgb(${accent.r}, ${accent.g}, ${accent.b})`);
  bgGradient.addColorStop(1, `rgb(${accentDark.r}, ${accentDark.g}, ${accentDark.b})`);
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  const pad = 48;
  const contentX = pad + 48;
  ctx.fillStyle = "#ffffff";
  drawRoundedRect(ctx, pad, pad, CARD_WIDTH - pad * 2, CARD_HEIGHT - pad * 2, 32);
  ctx.fill();

  ctx.textBaseline = "top";
  ctx.fillStyle = "#71717a";
  ctx.font = "600 28px sans-serif";
  ctx.fillText(`🧮 ${siteName}`, contentX, pad + 40);

  ctx.fillStyle = "#52525b";
  ctx.font = "500 32px sans-serif";
  ctx.fillText(toolName, contentX, pad + 92);

  ctx.fillStyle = `rgb(${accent.r}, ${accent.g}, ${accent.b})`;
  ctx.font = "800 92px sans-serif";
  const maxTextWidth = CARD_WIDTH - pad * 2 - 96;
  const headlineLines = wrapText(ctx, headline, maxTextWidth);
  const headlineLineHeight = 104;
  let y = CARD_HEIGHT / 2 - ((headlineLines.length - 1) * headlineLineHeight) / 2;
  ctx.textBaseline = "middle";
  for (const line of headlineLines) {
    ctx.fillText(line, contentX, y);
    y += headlineLineHeight;
  }

  ctx.fillStyle = "#3f3f46";
  ctx.font = "400 30px sans-serif";
  ctx.textBaseline = "alphabetic";
  y = CARD_HEIGHT / 2 + (headlineLines.length * headlineLineHeight) / 2 + 20;
  for (const line of lines) {
    ctx.fillText(line, contentX, y);
    y += 42;
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("canvas.toBlob failed"))), "image/png");
  });
}

export default function ResultShareCard({ toolName, headline, lines, accentColor }: ResultShareCardProps) {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");
  const chrome = getChrome(isEnglish ? "en" : "ko");
  const [busy, setBusy] = useState(false);

  async function handleClick() {
    setBusy(true);
    try {
      const blob = await renderCard({
        toolName,
        headline,
        lines,
        accentColor,
        siteName: isEnglish ? SITE_NAME_EN : SITE_NAME,
      });
      const file = new File([blob], "result-card.png", { type: "image/png" });

      if (typeof navigator !== "undefined" && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: toolName, text: headline });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "result-card.png";
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch {
      // 사용자가 공유 시트를 취소했거나 캔버스 렌더링이 실패한 경우 — 조용히 무시.
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={busy}
      className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-600 hover:border-orange-300 hover:text-orange-500 disabled:opacity-50 dark:border-white/10 dark:text-zinc-400"
    >
      🖼️ {chrome.share.resultCard}
    </button>
  );
}
