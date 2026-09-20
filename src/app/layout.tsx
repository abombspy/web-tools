import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import { GA_MEASUREMENT_ID, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 오픈그래프/트위터 카드는 루트 레이아웃에서 사이트 공통값 한 번만 설정한다.
// Next.js 메타데이터 병합 규칙상 하위 page.tsx가 각자 openGraph를 따로
// 선언하면 이 객체 전체가 페이지별로 통째로 교체되므로(부분 병합 아님),
// 43개 도구 페이지마다 개별 이미지·설명까지 만드는 건 지금 범위 밖으로
// 두고(§6.4류 스코프 축소), 우선 "공유하면 사이트명·설명이라도 제대로
// 뜨게" 하는 걸 목표로 함 — 개별 페이지는 title만 자기 것을 쓰고 나머지
// 공유 정보는 전부 이 사이트 공통값을 물려받는다.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ko_KR",
    type: "website",
    // public/og-image.png(스크립트: scripts/generate-og-image.mjs로 생성)를 직접
    // 참조. Next.js의 opengraph-image.tsx 특수 파일 규칙 대신 이 방식을 쓴 이유는
    // 정적 내보내기(output: export) 시 그 규칙이 확장자 없는 파일을 만들어서
    // 정적 호스트가 Content-Type을 잘못(application/octet-stream) 추론할 위험이
    // 있기 때문 — 일반 public 에셋(.png 확장자)이라 그 문제가 없음.
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* 애드센스 사이트 소유권 확인용 스크립트(게시자 ID: pub-8721045776671488) */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8721045776671488"
          crossOrigin="anonymous"
        />
        {/* 구글 리치 스니펫용 JSON-LD(WebSite) — 사이트 전체에 한 번만 필요한 정보라 루트에 배치 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: SITE_NAME,
              description: SITE_DESCRIPTION,
              url: SITE_URL,
              inLanguage: "ko",
            }),
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        {/* GA4(측정 ID: G-KYE3JE4EB2) — afterInteractive라 hydration 이후 실행,
            정적 내보내기(output: export)와도 호환됨 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <Header />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
