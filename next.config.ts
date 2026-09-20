import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // GitLab Pages는 정적 파일만 서빙하므로(Node 서버 없음), 빌드 시 전체를
  // 정적 HTML로 내보낸다. API 라우트·동적 세그먼트·미들웨어가 없어 호환됨.
  output: "export",
  // 확장자 없는 URL(/about)이 about/index.html로 매핑되도록 강제 — 정적
  // 호스트(GitLab Pages 포함)에서 가장 호환성이 높은 방식.
  trailingSlash: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
