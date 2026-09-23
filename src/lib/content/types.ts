import type { ReactNode } from "react";

// 도구 설명 본문(법령 인용·공식 설명 등)을 위한 경량 리치텍스트 AST.
// 43개 도구의 실제 본문을 전수 조사한 결과 h2/p/list/callout(amber·blue 2톤)과
// 굵게/이탤릭/내부링크만으로 전부 표현 가능했다 — 범용 템플릿 언어(조건문·반복문)는
// 만들지 않는다. 소수(5개) 도구의 동적 요율값 삽입은 `dynamic` run/block으로
// 페이지 컴포넌트가 직접 React 노드를 주입하게 한다.

export type Run =
  | string // 평문(축약형)
  | { text: string; bold?: boolean; italic?: boolean; code?: boolean; sup?: boolean }
  | { text: string; href: string; external?: boolean } // href는 locale에 맞게 이미 완성된
  // 값. external이 true면 새 탭(target="_blank" rel="noopener noreferrer")으로 여는 일반
  // <a>(예: 한국은행 홈페이지), 아니면 next/link의 <Link>(내부 라우트).
  | { dynamic: string; bold?: boolean; italic?: boolean }; // 문장 중간에 동적 값 하나를 끼워
  // 넣는 탈출구. bold/italic은 "<strong>{N}시간 미만</strong>"처럼 동적 값과 그 앞뒤
  // 고정 문구가 하나의 굵게 표시 범위를 이룰 때, 그 고정 문구까지 포함한 완성된 문자열을
  // vars로 넘기고 여기서 굵게 처리한다(문구를 dynamic 앞뒤로 쪼개 각각 bold 처리해도
  // 시각적으로는 동일하지만, 굳이 두 run으로 나눌 이유가 없어 한 run에서 처리).

export type Block =
  | { type: "h2"; text: string }
  | { type: "p"; runs: Run[] }
  | { type: "list"; ordered?: boolean; items: Run[][] }
  | { type: "callout"; tone: "amber" | "blue"; runs: Run[] }
  | { type: "dynamic"; id: string }; // 블록 전체가 동적(반복 리스트 등)일 때.

export type ProseDoc = { blocks: Block[] };

export type DynamicMap = Record<string, ReactNode>;

// JSON import를 통해 들어온 값은 TypeScript가 "type" 필드를 리터럴 유니언이 아닌
// string으로 구조적 추론하므로 Block[]에 바로 대입할 수 없다. 이 한 곳에서만
// 캐스팅해 각 page.tsx가 반복해서 캐스팅하지 않도록 한다 — 스키마가 실제로
// 어긋나면(오타 등) renderBlocks의 switch가 알 수 없는 type을 만나 아무것도
// 렌더링하지 않는 정도로 그치므로, 빌드 타임에 못 잡는 리스크는 낮다.
export function asBlocks(json: unknown): Block[] {
  return (json as ProseDoc).blocks;
}
