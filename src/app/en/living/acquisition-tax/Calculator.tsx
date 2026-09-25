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
    blockingErrors.push("Please enter a purchase price greater than 0.");
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
          Purchase price (₩)
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
          Buyer type
          <select
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-sky-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={isCorporation ? "corp" : "individual"}
            onChange={(e) => setIsCorporation(e.target.value === "corp")}
          >
            <option value="individual">Individual</option>
            <option value="corp">Corporation</option>
          </select>
        </label>

        {!isCorporation && (
          <label className="flex flex-col gap-1 text-sm">
            Homes owned, including this one
            <select
              className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-sky-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
              value={houseCountTier}
              onChange={(e) => setHouseCountTier(Number(e.target.value) as HouseCountTier)}
            >
              <option value={1}>1 (first home)</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4 or more</option>
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
            This is in a regulated (조정대상) area — please verify via MOLIT/Wetax first
          </label>
        )}

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={isOver85m2} onChange={(e) => setIsOver85m2(e.target.checked)} />
          Unit is over 85㎡
        </label>

        {!isCorporation && houseCountTier === 1 && (
          <>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={isFirstTimeBuyer}
                onChange={(e) => setIsFirstTimeBuyer(e.target.checked)}
              />
              Eligible for first-time homebuyer relief
            </label>
            {isFirstTimeBuyer && (
              <label className="flex items-center gap-2 text-sm sm:col-span-2">
                <input
                  type="checkbox"
                  checked={isSmallLowPriceHome}
                  onChange={(e) => setIsSmallLowPriceHome(e.target.checked)}
                />
                60㎡ or under, and ₩600M (metro) / ₩300M (non-metro) or under — eligible for the ₩3M cap
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
              Applied rate {(result.rate * 100).toFixed(2)}%{result.isSurcharged && " (surcharge)"}
            </p>
            <p className="text-3xl font-bold">₩{result.total.toLocaleString()}</p>
          </div>
          <ul className="space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Acquisition tax (before relief): ₩{result.acquisitionTaxBeforeRelief.toLocaleString()}</li>
            {result.firstTimeBuyerReliefAmount > 0 && (
              <li>First-time buyer relief: -₩{result.firstTimeBuyerReliefAmount.toLocaleString()}</li>
            )}
            <li>Acquisition tax: ₩{result.acquisitionTax.toLocaleString()}</li>
            {result.isSurcharged ? (
              <li className="text-amber-600 dark:text-amber-400">
                Local education tax isn&rsquo;t included for the surcharge bracket — check the exact amount on Wetax.
              </li>
            ) : (
              <li>Local education tax: ₩{result.localEducationTax.toLocaleString()}</li>
            )}
            <li>Rural special tax: ₩{result.ruralSpecialTax.toLocaleString()}</li>
          </ul>
          <div className="flex justify-center pt-2">
            <ResultShareCard
              toolName="Acquisition Tax Calculator"
              headline={`₩${result.total.toLocaleString()}`}
              lines={[`Price ₩${priceNum.toLocaleString()} · Rate ${(result.rate * 100).toFixed(2)}%`]}
              accentColor="#0ea5e9"
            />
          </div>
        </div>
      )}
    </div>
  );
}
