// RFC 4180 기준 CSV 파싱/직렬화(따옴표로 감싼 필드 안의 쉼표·줄바꿈·이스케이프된 따옴표
// 처리 포함). plan.md §4.7 "JSON·CSV 변환기".

export function parseCsvRows(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  let i = 0;

  while (i < text.length) {
    const char = text[i];

    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i += 1;
        continue;
      }
      field += char;
      i += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = true;
      i += 1;
      continue;
    }
    if (char === ",") {
      row.push(field);
      field = "";
      i += 1;
      continue;
    }
    if (char === "\r") {
      i += 1;
      continue;
    }
    if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
      i += 1;
      continue;
    }
    field += char;
    i += 1;
  }

  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

export function parseCsv(csvText: string): Record<string, string>[] {
  const rows = parseCsvRows(csvText);
  if (rows.length === 0) return [];

  const [header, ...dataRows] = rows;
  return dataRows.map((row) => {
    const obj: Record<string, string> = {};
    header.forEach((key, i) => {
      obj[key] = row[i] ?? "";
    });
    return obj;
  });
}

function escapeCsvField(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function stringifyCsv(rows: Record<string, string>[]): string {
  if (rows.length === 0) return "";

  const headers = Object.keys(rows[0]);
  const lines = [headers.map(escapeCsvField).join(",")];

  for (const row of rows) {
    lines.push(headers.map((h) => escapeCsvField(row[h] ?? "")).join(","));
  }

  return lines.join("\n");
}

export function jsonToCsv(jsonText: string): string {
  const data = JSON.parse(jsonText);
  const rows: Record<string, unknown>[] = Array.isArray(data) ? data : [data];

  const normalized = rows.map((row) => {
    const obj: Record<string, string> = {};
    for (const [key, value] of Object.entries(row)) {
      obj[key] = typeof value === "object" && value !== null ? JSON.stringify(value) : String(value);
    }
    return obj;
  });

  return stringifyCsv(normalized);
}

export function csvToJson(csvText: string): string {
  return JSON.stringify(parseCsv(csvText), null, 2);
}
