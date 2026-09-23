import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import type { Block, DynamicMap, Run } from "./types";

// 콜아웃 색상은 JSON이 아니라 여기 고정 상수로 둔다 — Tailwind는 클래스명을
// 빌드 시점에 정적으로 스캔하므로, 완성된 클래스 문자열이 소스(.ts/.tsx)에
// 그대로 있어야 CSS가 생성된다(JSON 안에 두면 스캔 대상에서 빠짐).
const TONE_CLASS: Record<"amber" | "blue", string> = {
  amber: "rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40",
  blue: "rounded-md bg-blue-50 p-4 text-sm not-prose dark:bg-blue-950/40",
};

function renderRun(run: Run, key: number, dynamic: DynamicMap): ReactNode {
  if (typeof run === "string") return run;
  if ("href" in run) {
    return (
      <Link key={key} href={run.href}>
        {run.text}
      </Link>
    );
  }
  let node: ReactNode = "dynamic" in run ? dynamic[run.dynamic] : run.text;
  if ("code" in run && run.code) node = <code>{node}</code>;
  if (run.italic) node = <span className="italic">{node}</span>;
  if (run.bold) node = <strong>{node}</strong>;
  return <Fragment key={key}>{node}</Fragment>;
}

function renderRuns(runs: Run[], dynamic: DynamicMap): ReactNode {
  return runs.map((run, i) => (
    <Fragment key={i}>{renderRun(run, i, dynamic)}</Fragment>
  ));
}

/** ProseDoc.blocks를 기존 하드코딩 JSX와 동일한 태그·클래스 구조로 렌더링한다. */
export function renderBlocks(blocks: Block[], dynamic: DynamicMap = {}): ReactNode {
  return blocks.map((block, i) => {
    switch (block.type) {
      case "h2":
        return <h2 key={i}>{block.text}</h2>;
      case "p":
        return <p key={i}>{renderRuns(block.runs, dynamic)}</p>;
      case "list": {
        const Tag = block.ordered ? "ol" : "ul";
        return (
          <Tag key={i}>
            {block.items.map((item, j) => (
              <li key={j}>{renderRuns(item, dynamic)}</li>
            ))}
          </Tag>
        );
      }
      case "callout":
        return (
          <p key={i} className={TONE_CLASS[block.tone]}>
            {renderRuns(block.runs, dynamic)}
          </p>
        );
      case "dynamic":
        return <Fragment key={i}>{dynamic[block.id]}</Fragment>;
    }
  });
}
