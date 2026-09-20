// public/og-image.png을 생성하는 1회성 빌드 스크립트.
// Next.js의 opengraph-image.tsx 특수 파일 규칙은 정적 내보내기(output: export)
// 시 확장자 없는 파일(out/opengraph-image)을 만들어서, 정적 호스트가 Content-Type을
// 잘못(application/octet-stream) 추론할 위험이 있다. 대신 일반 정적 에셋으로
// public/에 미리 만들어두고 metadata에서 명시적으로 참조한다.
import { writeFile } from "node:fs/promises";
import { ImageResponse } from "next/og.js";

const SITE_NAME = "생활계산소";
const SITE_DESCRIPTION =
  "세금·급여·생활 계산을 위한 무료 계산기 모음. 계산 원리와 법적 근거를 함께 설명합니다.";

const response = new ImageResponse(
  {
    type: "div",
    props: {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)",
        padding: 80,
      },
      children: [
        {
          type: "div",
          props: {
            style: { fontSize: 96, fontWeight: 700, color: "#ffffff", display: "flex" },
            children: SITE_NAME,
          },
        },
        {
          type: "div",
          props: {
            style: {
              marginTop: 32,
              fontSize: 36,
              color: "#dbeafe",
              textAlign: "center",
              display: "flex",
              maxWidth: 900,
            },
            children: SITE_DESCRIPTION,
          },
        },
      ],
    },
  },
  { width: 1200, height: 630 },
);

const buffer = Buffer.from(await response.arrayBuffer());
await writeFile(new URL("../public/og-image.png", import.meta.url), buffer);
console.log(`public/og-image.png 생성 완료 (${buffer.length} bytes)`);
