"use client";

import { useLocale } from "next-intl";

export function useIsRTL(): boolean {
  const locale = useLocale();
  return locale === "ar";
}

export function getDirFromLocale(locale: string): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function useDir(): "rtl" | "ltr" {
  return useIsRTL() ? "rtl" : "ltr";
}

