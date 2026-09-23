import path from "path";
import { defineConfig } from "vitest/config";

const rootDir = import.meta.dirname;

// tsconfig.json의 paths(@/*, @config/*, @content/*)를 Vitest(Vite 기반)에도 동일하게
// 매핑한다. Next.js 빌드는 tsconfig paths를 자동으로 읽지만 Vitest는 별도 설정이
// 필요하다 — 지금까지 테스트가 전부 상대경로만 써서 이 격차가 드러나지 않았다.
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "./src"),
      "@config": path.resolve(rootDir, "./config"),
      "@content": path.resolve(rootDir, "./content"),
    },
  },
});
