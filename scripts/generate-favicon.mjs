// src/app/favicon.ico를 생성하는 1회성 빌드 스크립트(generate-og-image.mjs와 동일 패턴).
// 기존 favicon.ico는 create-next-app 스캐폴드가 남긴 기본 아이콘(검은 원 + 세모)이라
// 사이트 브랜딩(헤더 로고의 🧮 + 오렌지색)과 무관했다 — 이 스크립트로 교체한다.
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { ImageResponse } from "next/og.js";

const execFileAsync = promisify(execFile);

const response = new ImageResponse(
  {
    type: "div",
    props: {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f97316", // Tailwind orange-500, 헤더 로고 색상과 동일
        borderRadius: 56,
        fontSize: 220,
      },
      children: "🧮",
    },
  },
  { width: 256, height: 256 },
);

const pngBuffer = Buffer.from(await response.arrayBuffer());

// 중간 PNG는 sips 변환용으로만 필요하고 최종 산출물이 아니므로, public/이 아니라
// OS 임시 디렉터리에 만들었다가 변환 후 바로 정리한다.
const workDir = await mkdtemp(join(tmpdir(), "favicon-"));
const pngPath = join(workDir, "favicon-source.png");
await writeFile(pngPath, pngBuffer);

const icoPath = new URL("../src/app/favicon.ico", import.meta.url);
await execFileAsync("sips", ["-s", "format", "ico", pngPath, "--out", icoPath.pathname]);
await rm(workDir, { recursive: true, force: true });

console.log(`src/app/favicon.ico 생성 완료 (${pngBuffer.length} bytes PNG → ico 변환)`);
