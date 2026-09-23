import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { renderBlocks } from "./renderBlocks";
import type { Block } from "./types";

function html(blocks: Block[], dynamic?: Record<string, React.ReactNode>) {
  return renderToStaticMarkup(<>{renderBlocks(blocks, dynamic)}</>);
}

describe("renderBlocks", () => {
  it("renders h2", () => {
    expect(html([{ type: "h2", text: "제목" }])).toBe("<h2>제목</h2>");
  });

  it("renders a paragraph with plain and bold runs", () => {
    const out = html([
      { type: "p", runs: ["앞 ", { text: "굵게", bold: true }, " 뒤"] },
    ]);
    expect(out).toBe("<p>앞 <strong>굵게</strong> 뒤</p>");
  });

  it("renders italic runs", () => {
    const out = html([{ type: "p", runs: [{ text: "기울임", italic: true }] }]);
    expect(out).toBe('<p><span class="italic">기울임</span></p>');
  });

  it("renders code runs", () => {
    const out = html([{ type: "p", runs: [{ text: "Math.random()", code: true }] }]);
    expect(out).toBe("<p><code>Math.random()</code></p>");
  });

  it("renders an internal link run", () => {
    const out = html([{ type: "p", runs: [{ text: "링크", href: "/about" }] }]);
    expect(out).toContain('href="/about"');
    expect(out).toContain(">링크<");
  });

  it("renders unordered and ordered lists", () => {
    const ul = html([{ type: "list", items: [["첫째"], ["둘째"]] }]);
    expect(ul).toBe("<ul><li>첫째</li><li>둘째</li></ul>");

    const ol = html([{ type: "list", ordered: true, items: [["하나"]] }]);
    expect(ol).toBe("<ol><li>하나</li></ol>");
  });

  it("renders both callout tones with the correct fixed classes", () => {
    const amber = html([{ type: "callout", tone: "amber", runs: ["주의"] }]);
    expect(amber).toContain("bg-amber-50");
    expect(amber).toContain("dark:bg-amber-950/40");

    const blue = html([{ type: "callout", tone: "blue", runs: ["안내"] }]);
    expect(blue).toContain("bg-blue-50");
    expect(blue).toContain("dark:bg-blue-950/40");
  });

  it("resolves a dynamic run inside a sentence", () => {
    const out = html(
      [{ type: "p", runs: ["상한액: ", { dynamic: "cap" }] }],
      { cap: <strong>66,000원</strong> },
    );
    expect(out).toBe("<p>상한액: <strong>66,000원</strong></p>");
  });

  it("resolves a whole dynamic block", () => {
    const out = html([{ type: "dynamic", id: "tierList" }], {
      tierList: (
        <ul>
          <li>1개월차</li>
        </ul>
      ),
    });
    expect(out).toBe("<ul><li>1개월차</li></ul>");
  });

  it("leaves an unresolved dynamic reference empty rather than throwing", () => {
    expect(() => html([{ type: "dynamic", id: "missing" }])).not.toThrow();
  });
});
