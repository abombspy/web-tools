// 시차 계산기에서 쓰는 도시→IANA 타임존 매핑. IANA 식별자는 안정적인 표준이라
// 연도별로 갱신할 필요가 없다(실제 오프셋·서머타임 여부는 Intl API가 판단).
export type City = { label: string; timeZone: string };

export const CITIES: City[] = [
  { label: "서울", timeZone: "Asia/Seoul" },
  { label: "도쿄", timeZone: "Asia/Tokyo" },
  { label: "베이징", timeZone: "Asia/Shanghai" },
  { label: "타이베이", timeZone: "Asia/Taipei" },
  { label: "방콕", timeZone: "Asia/Bangkok" },
  { label: "싱가포르", timeZone: "Asia/Singapore" },
  { label: "자카르타", timeZone: "Asia/Jakarta" },
  { label: "델리", timeZone: "Asia/Kolkata" },
  { label: "두바이", timeZone: "Asia/Dubai" },
  { label: "이스탄불", timeZone: "Europe/Istanbul" },
  { label: "모스크바", timeZone: "Europe/Moscow" },
  { label: "런던", timeZone: "Europe/London" },
  { label: "파리", timeZone: "Europe/Paris" },
  { label: "베를린", timeZone: "Europe/Berlin" },
  { label: "뉴욕", timeZone: "America/New_York" },
  { label: "시카고", timeZone: "America/Chicago" },
  { label: "덴버", timeZone: "America/Denver" },
  { label: "로스앤젤레스", timeZone: "America/Los_Angeles" },
  { label: "밴쿠버", timeZone: "America/Vancouver" },
  { label: "상파울루", timeZone: "America/Sao_Paulo" },
  { label: "시드니", timeZone: "Australia/Sydney" },
  { label: "오클랜드", timeZone: "Pacific/Auckland" },
  { label: "하와이(호놀룰루)", timeZone: "Pacific/Honolulu" },
];
