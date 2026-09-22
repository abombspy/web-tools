"use client";

import { useState } from "react";
import { calculateAgeZodiac } from "@/lib/calculators/age-zodiac";

// calculateAgeZodiac()는 결과 문자열(띠·별자리)을 한국어로 반환하므로, 표시 단계에서만
// 영문으로 옮긴다(계산 로직 자체는 그대로 재사용).
const KOREAN_ZODIAC_EN: Record<string, string> = {
  쥐: "Rat", 소: "Ox", 호랑이: "Tiger", 토끼: "Rabbit", 용: "Dragon", 뱀: "Snake",
  말: "Horse", 양: "Goat", 원숭이: "Monkey", 닭: "Rooster", 개: "Dog", 돼지: "Pig",
};

const WESTERN_ZODIAC_EN: Record<string, string> = {
  물병자리: "Aquarius", 물고기자리: "Pisces", 양자리: "Aries", 황소자리: "Taurus",
  쌍둥이자리: "Gemini", 게자리: "Cancer", 사자자리: "Leo", 처녀자리: "Virgo",
  천칭자리: "Libra", 전갈자리: "Scorpio", 사수자리: "Sagittarius", 염소자리: "Capricorn",
};

export default function Calculator() {
  const [birthDate, setBirthDate] = useState("");
  const [asOfDate, setAsOfDate] = useState("");

  const birth = birthDate ? new Date(birthDate) : null;
  const asOf = asOfDate ? new Date(asOfDate) : null;

  const blockingErrors: string[] = [];
  if (!birth || Number.isNaN(birth.getTime())) {
    blockingErrors.push("Please enter a birth date.");
  }
  if (!asOf || Number.isNaN(asOf.getTime())) {
    blockingErrors.push("Please enter a reference date (today).");
  }
  if (birth && asOf && !Number.isNaN(birth.getTime()) && !Number.isNaN(asOf.getTime()) && asOf.getTime() < birth.getTime()) {
    blockingErrors.push("The reference date is earlier than the birth date.");
  }

  const result = blockingErrors.length === 0 ? calculateAgeZodiac(birthDate, asOfDate) : null;

  return (
    <div className="mt-8 rounded-2xl border-2 border-amber-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          Birth date
          <input
            type="date"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-amber-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Reference date (today)
          <input
            type="date"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-amber-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={asOfDate}
            onChange={(e) => setAsOfDate(e.target.value)}
          />
        </label>
      </div>

      {blockingErrors.length > 0 && (
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-red-600 dark:text-red-400">
          {blockingErrors.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}

      {result && (
        <div className="mt-6 grid grid-cols-3 gap-4 border-t-2 border-amber-100 pt-6 dark:border-white/10">
          <div>
            <p className="text-sm text-zinc-500">Korean age</p>
            <p className="text-2xl font-bold">{result.internationalAge}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">Zodiac animal</p>
            <p className="text-2xl font-bold">{KOREAN_ZODIAC_EN[result.koreanZodiac] ?? result.koreanZodiac}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">Star sign</p>
            <p className="text-2xl font-bold">{WESTERN_ZODIAC_EN[result.westernZodiac] ?? result.westernZodiac}</p>
          </div>
        </div>
      )}
    </div>
  );
}
