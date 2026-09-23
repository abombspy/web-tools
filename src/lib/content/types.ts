import type { ReactNode } from "react";

// 도구 설명 본문(법령 인용·공식 설명 등)을 위한 경량 리치텍스트 AST.
// 43개 도구의 실제 본문을 전수 조사한 결과 h2/p/list/callout(amber·blue 2톤)과
// 굵게/이탤릭/내부링크만으로 전부 표현 가능했다 — 범용 템플릿 언어(조건문·반복문)는
// 만들지 않는다. 소수(5개) 도구의 동적 요율값 삽입은 `dynamic` run/block으로
// 페이지 컴포넌트가 직접 React 노드를 주입하게 한다.

export type Run =
  | string // 평문(축약형)
  | { text: string; bold?: boolean; italic?: boolean }
  | { text: string; href: string } // 내부 링크. href는 locale에 맞게 이미 완성된 값.
  | { dynamic: string }; // 문장 중간에 동적 값 하나를 끼워 넣는 탈출구.

export type Block =
  | { type: "h2"; text: string }
  | { type: "p"; runs: Run[] }
  | { type: "list"; ordered?: boolean; items: Run[][] }
  | { type: "callout"; tone: "amber" | "blue"; runs: Run[] }
  | { type: "dynamic"; id: string }; // 블록 전체가 동적(반복 리스트 등)일 때.

export type ProseDoc = { blocks: Block[] };

export type DynamicMap = Record<string, ReactNode>;
