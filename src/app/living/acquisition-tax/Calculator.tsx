"use client";

import { useState } from "react";
import ResultShareCard from "@/components/ResultShareCard";
import {
  calculateAcquisitionTax,
  type AcquisitionTaxRates,
  type HouseCountTier,
} from "@/lib/calculators/acquisition-tax";

export default function Calculator({ rates }: { rates: AcquisitionTaxRates }) {
  const [price, setPrice] = useState("500000000");
  const [houseCountTier, setHouseCountTier] = useState<HouseCountTier>(1);
  const [isCorporation, setIsCorporation] = useState(false);
  const [isRegulatedArea, setIsRegulatedArea] = useState(false);
  const [isOver85m2, setIsOver85m2] = useState(false);
  const [isFirstTimeBuyer, setIsFirstTimeBuyer] = useState(false);
  const [isSmallLowPriceHome, setIsSmallLowPriceHome] = useState(false);

  const priceNum = Number(price);

  const blockingErrors: string[] = [];
  if (!Number.isFinite(priceNum) || priceNum <= 0) {
    blockingErrors.push("취득가액은 0보다 큰 숫자로 입력해 주세요.");
  }

  const result =
    blockingErrors.length === 0
      ? calculateAcquisitionTax(
          {
            price: priceNum,
            houseCountTier,
            isCorporation,
            isRegulatedArea,
            isOver85m2,
            isFirstTimeBuyer,
            isSmallLowPriceHome,
          },
          rates,
        )
      : null;

  return (
    <div className="mt-8 rounded-2xl border-2 border-sky-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          취득가액 (원)
          <input
            type="number"
            inputMode="numeric"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-sky-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          법인 여부
          <select
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-sky-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={isCorporation ? "corp" : "individual"}
            onChange={(e) => setIsCorporation(e.target.value === "corp")}
          >
            <option value="individual">개인</option>
            <option value="corp">법인</option>
          </select>
        </label>

        {!isCorporation && (
          <label className="flex flex-col gap-1 text-sm">
            이 주택을 포함한 보유 주택 수
            <select
              className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-sky-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
              value={houseCountTier}
              onChange={(e) => setHouseCountTier(Number(e.target.value) as HouseCountTier)}
            >
              <option value={1}>1채(첫 주택)</option>
              <option value={2}>2채</option>
              <option value={3}>3채</option>
              <option value={4}>4채 이상</option>
            </select>
          </label>
        )}

        {!isCorporation && houseCountTier >= 2 && (
          <label className="flex items-center gap-2 text-sm sm:col-span-2">
            <input
              type="checkbox"
              checked={isRegulatedArea}
              onChange={(e) => setIsRegulatedArea(e.target.checked)}
            />
            조정대상지역입니다 (국토교통부·위택스에서 미리 확인해 주세요)
          </label>
        )}

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={isOver85m2} onChange={(e) => setIsOver85m2(e.target.checked)} />
          전용면적 85㎡ 초과
        </label>

        {!isCorporation && houseCountTier === 1 && (
          <>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={isFirstTimeBuyer}
                onChange={(e) => setIsFirstTimeBuyer(e.target.checked)}
              />
              생애최초 주택 구입 감면 대상
            </label>
            {isFirstTimeBuyer && (
              <label className="flex items-center gap-2 text-sm sm:col-span-2">
                <input
                  type="checkbox"
                  checked={isSmallLowPriceHome}
                  onChange={(e) => setIsSmallLowPriceHome(e.target.checked)}
                />
                전용 60㎡ 이하이면서 수도권 6억원·비수도권 3억원 이하입니다 (300만원 한도 대상)
              </label>
            )}
          </>
        )}
      </div>

      {blockingErrors.length > 0 && (
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-red-600 dark:text-red-400">
          {blockingErrors.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}

      {result && (
        <div className="mt-6 space-y-3 border-t-2 border-sky-100 pt-6 dark:border-white/10">
          <div>
            <p className="text-sm text-zinc-500">
              적용 세율 {(result.rate * 100).toFixed(2)}%{result.isSurcharged && " (중과)"}
            </p>
            <p className="text-3xl font-bold">{result.total.toLocaleString()}원</p>
          </div>
          <ul className="space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>취득세(감면 전): {result.acquisitionTaxBeforeRelief.toLocaleString()}원</li>
            {result.firstTimeBuyerReliefAmount > 0 && (
              <li>생애최초 감면: -{result.firstTimeBuyerReliefAmount.toLocaleString()}원</li>
            )}
            <li>취득세: {result.acquisitionTax.toLocaleString()}원</li>
            {result.isSurcharged ? (
              <li className="text-amber-600 dark:text-amber-400">
                지방교육세는 중과 구간이라 이 계산기에서 제공하지 않습니다 — 위택스에서 확인해 주세요.
              </li>
            ) : (
              <li>지방교육세: {result.localEducationTax.toLocaleString()}원</li>
            )}
            <li>농어촌특별세: {result.ruralSpecialTax.toLocaleString()}원</li>
          </ul>
          <div className="flex justify-center pt-2">
            <ResultShareCard
              toolName="취득세 계산기"
              headline={`${result.total.toLocaleString()}원`}
              lines={[`취득가액 ${priceNum.toLocaleString()}원 · 세율 ${(result.rate * 100).toFixed(2)}%`]}
              accentColor="#0ea5e9"
            />
          </div>
        </div>
      )}
    </div>
  );
}
