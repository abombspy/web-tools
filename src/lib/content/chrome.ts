import chromeEn from "@content/ui/chrome.en.json";
import chromeKo from "@content/ui/chrome.ko.json";
import type { Locale } from "./catalog";

export function getChrome(locale: Locale) {
  return locale === "en" ? chromeEn : chromeKo;
}
