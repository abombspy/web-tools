import { describe, expect, it } from "vitest";
import { csvToJson, jsonToCsv, parseCsv, parseCsvRows, stringifyCsv } from "./json-csv-convert";

describe("parseCsvRows", () => {
  it("단순 CSV를 행렬로 파싱한다", () => {
    expect(parseCsvRows("a,b,c\n1,2,3")).toEqual([
      ["a", "b", "c"],
      ["1", "2", "3"],
    ]);
  });

  it("따옴표로 감싼 필드 안의 쉼표는 구분자로 취급하지 않는다", () => {
    expect(parseCsvRows('name,addr\n"Kim","Seoul, Korea"')).toEqual([
      ["name", "addr"],
      ["Kim", "Seoul, Korea"],
    ]);
  });

  it("이스케이프된 큰따옴표(\"\")를 하나의 큰따옴표로 복원한다", () => {
    expect(parseCsvRows('a\n"he said ""hi"""')).toEqual([["a"], ['he said "hi"']]);
  });

  it("따옴표 안의 줄바꿈은 필드 안의 개행으로 취급한다", () => {
    expect(parseCsvRows('a\n"line1\nline2"')).toEqual([["a"], ["line1\nline2"]]);
  });

  it("마지막 줄에 개행이 없어도 마지막 행을 놓치지 않는다(경계값)", () => {
    expect(parseCsvRows("a,b\n1,2")).toEqual([
      ["a", "b"],
      ["1", "2"],
    ]);
  });
});

describe("parseCsv / stringifyCsv 왕복", () => {
  it("객체 배열 -> CSV -> 객체 배열이 원래 값으로 복원된다", () => {
    const original = [
      { name: "Kim, Min", note: 'He said "hi"' },
      { name: "Lee", note: "line1\nline2" },
    ];
    const csv = stringifyCsv(original);
    const parsed = parseCsv(csv);
    expect(parsed).toEqual(original);
  });
});

describe("jsonToCsv / csvToJson", () => {
  it("JSON 배열을 CSV로 변환한다", () => {
    const csv = jsonToCsv('[{"a":1,"b":"x"},{"a":2,"b":"y"}]');
    expect(csv).toBe("a,b\n1,x\n2,y");
  });

  it("객체 하나만 있어도 1행짜리 CSV로 변환한다", () => {
    const csv = jsonToCsv('{"a":1,"b":"x"}');
    expect(csv).toBe("a,b\n1,x");
  });

  it("CSV를 JSON 문자열로 변환한다", () => {
    const json = csvToJson("a,b\n1,x\n2,y");
    expect(JSON.parse(json)).toEqual([
      { a: "1", b: "x" },
      { a: "2", b: "y" },
    ]);
  });
});
