"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { AuthCard } from "@/components/auth/auth-card";
import { useAuthStore } from "@/store/auth";
import { Input } from "@/components/ui/input";
import { Smartphone, Lock } from "lucide-react";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const router = useRouter();
  const auth = useAuthStore();
  const t = useTranslations("Auth");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const res = await auth.login({ phone, password });
    setLoading(false);
    if (res.success && res.data?.token) {
      router.push("/");
    } else {
      setMessage(res.message || "Login failed");
    }
  }

  return (
    <>
      <Breadcrumb items={[{ label: t("backTo"), href: "/" }, { label: t("login") }]} />
      <AuthCard
        title={t("loginTitle")}
        description={t("loginDesc")}
      >
        <form className="space-y-6" onSubmit={onSubmit}>
          <Input
            type="tel"
            label={t("phone")}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            icon={Smartphone}
            placeholder="+201234567890"
          />
          
          <Input
            type="password"
            label={t("password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={Lock}
            placeholder="••••••••"
          />

          <div className="flex items-center justify-between">
            <Link href="./forgot-password" className="text-sm text-red-600 hover:text-red-500 transition-colors font-medium">
              {t("forgot")}
            </Link>
          </div>
          
          <button
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#C40000] to-red-900 text-white font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-red-900/20 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? t("signingIn") : t("signIn")}
          </button>
          
          {message && (
            <div className="text-center text-sm font-bold text-red-500 animate-pulse">{message}</div>
          )}
          
          <p className="text-center text-sm text-muted-foreground">
            {t("dontHaveAccount")}{" "}
            <Link href="./signup" className="text-red-600 font-bold hover:underline">
              {t("signUp")}
            </Link>
          </p>
        </form>
      </AuthCard>
    </>
  );
}
