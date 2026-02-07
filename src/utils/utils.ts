import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, locale: "en" | "ar") {
  const unitEn = "KD";
  const unitAr = "د.ك";
  const value = Number.isFinite(amount) ? amount : 0;
  const formatted = value.toFixed(3);
  return locale === "ar" ? `${formatted} ${unitAr}` : `${unitEn} ${formatted}`;
}
