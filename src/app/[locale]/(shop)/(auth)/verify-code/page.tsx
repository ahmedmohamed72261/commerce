"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { AuthCard } from "@/components/auth/auth-card";
import { useAuthStore } from "@/store/auth";
import { addToast } from "@/store/notifications";
import { useTranslations } from "next-intl";

export default function VerifyCodePage() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") || "";
  const auth = useAuthStore();
  const t = useTranslations("Auth");
  const [digits, setDigits] = useState<string[]>(Array.from({ length: 6 }).map(() => ""));
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function onChangeDigit(idx: number, val: string) {
    const v = val.replace(/\D/g, "").slice(0, 1);
    const next = [...digits];
    next[idx] = v;
    setDigits(next);
  }

  function onKeyDown(idx: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      e.preventDefault();
      const next = [...digits];
      next[idx] = "";
      setDigits(next);
      const prev = document.getElementById(`pin-${idx - 1}`) as HTMLInputElement | null;
      if (prev) prev.focus();
    }
    if (e.key >= "0" && e.key <= "9") {
      const next = [...digits];
      next[idx] = e.key;
      setDigits(next);
      const nextEl = document.getElementById(`pin-${idx + 1}`) as HTMLInputElement | null;
      if (nextEl) nextEl.focus();
      e.preventDefault();
    }
    if (e.key === "ArrowLeft") {
      const prev = document.getElementById(`pin-${idx - 1}`) as HTMLInputElement | null;
      if (prev) prev.focus();
    }
    if (e.key === "ArrowRight") {
      const nextEl = document.getElementById(`pin-${idx + 1}`) as HTMLInputElement | null;
      if (nextEl) nextEl.focus();
    }
  }

  function onPaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!text) return;
    e.preventDefault();
    const next = Array.from({ length: 6 }).map((_, i) => text[i] || "");
    setDigits(next);
    const lastIdx = Math.min(text.length, 5);
    const lastEl = document.getElementById(`pin-${lastIdx}`) as HTMLInputElement | null;
    if (lastEl) lastEl.focus();
  }

  async function onVerify(e: React.FormEvent) {
    e.preventDefault();
    const code = digits.join("");
    if (code.length !== 6) {
      setMessage("Enter the 6-digit code");
      addToast({ variant: "error", message: "Enter the 6-digit code" });
      return;
    }
    if (password !== confirm) {
      setMessage("Passwords do not match");
      addToast({ variant: "error", message: "Passwords do not match" });
      return;
    }
    setLoading(true);
    const res = await auth.resetPassword({ newPassword: password, code });
    setLoading(false);
    if (res.success) {
      addToast({ variant: "success", message: res.message || "Password updated" });
      router.push("../login");
    } else {
      setMessage(res.message || "Reset failed");
      addToast({ variant: "error", message: res.message || "Reset failed" });
    }
  }

  return (
    <>
      <Breadcrumb items={[{ label: t("backTo"), href: "/" }, { label: t("verifyTitle") }]} />
      <AuthCard
        title={t("verifyTitle")}
        description={t("verifyDesc")}
      >
        <form className="space-y-6" onSubmit={onVerify}>
          <div className="grid grid-cols-6 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <input
                key={i}
                id={`pin-${i}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digits[i]}
                onChange={(e) => onChangeDigit(i, e.target.value)}
                onKeyDown={(e) => onKeyDown(i, e)}
                onPaste={onPaste}
                className="h-12 rounded-xl border border-[var(--border)] bg-white/60 dark:bg-white/5 text-center text-lg font-bold outline-none backdrop-blur ring-1 ring-black/5 hover:ring-red-600/30 focus:ring-2 focus:ring-red-600/40 transition-all"
              />
            ))}
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-foreground">{t("password")}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 rounded-md border border-[var(--border)] bg-white/60 dark:bg-white/5 px-3 text-sm outline-none backdrop-blur focus:ring-2 focus:ring-red-600/20"
              placeholder="••••••••"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-foreground">{t("confirm")}</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="h-11 rounded-md border border-[var(--border)] bg-white/60 dark:bg-white/5 px-3 text-sm outline-none backdrop-blur focus:ring-2 focus:ring-red-600/20"
              placeholder="••••••••"
            />
          </div>
          <button
            className="w-full h-11 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? t("saving") : t("savePassword")}
          </button>
          {message && (
            <div className="text-center text-sm text-red-600">{message}</div>
          )}
          <p className="text-center text-sm text-muted-foreground">
            {t("backTo")}{" "}
            <Link href="../login" className="text-red-600">
              {t("login")}
            </Link>
          </p>
        </form>
      </AuthCard>
    </>
  );
}
