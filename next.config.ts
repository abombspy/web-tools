import type { NextConfig } from "next";
import path from "path";

// 커스텀 도메인이 연결되기 전, GitHub Pages 기본 주소(abombspy.github.io/web-tools)로
// 임시 확인할 때만 서브패스가 필요하다. 워크플로(.github/workflows/deploy.yml)에서
// GITHUB_PAGES_BASE_PATH=/web-tools 를 넣어 빌드하면 이 값이 적용되고, 로컬
// 개발(npm run dev/build)과 커스텀 도메인 연결 후에는 비워둬서 루트로 서비스한다.
const basePath = process.env.GITHUB_PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  // GitHub Pages는 정적 파일만 서빙하므로(Node 서버 없음), 빌드 시 전체를
  // 정적 HTML로 내보낸다. API 라우트·동적 세그먼트·미들웨어가 없어 호환됨.
  output: "export",
  // 확장자 없는 URL(/about)이 about/index.html로 매핑되도록 강제 — 정적
  // 호스트(GitHub Pages 포함)에서 가장 호환성이 높은 방식.
  trailingSlash: true,
  basePath,
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
