"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { AuthCard } from "@/components/auth/auth-card";
import { useAuthStore } from "@/store/auth";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const auth = useAuthStore();
  const t = useTranslations("Auth");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const res = await auth.forgotPassword({ email });
    setLoading(false);
    if (res.success) {
      router.push("./verify-code?email=" + encodeURIComponent(email));
    } else {
      setMessage(res.message || "Request failed");
    }
  }

  return (
    <>
      <Breadcrumb items={[{ label: t("backTo"), href: "/" }, { label: t("forgotTitle") }]} />
      <AuthCard
        title={t("forgotTitle")}
        description={t("forgotDesc")}
      >
        <form className="space-y-6" onSubmit={onSubmit}>
          <Input
            type="email"
            label={t("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
            placeholder="you@example.com"
          />
          
          <button
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#C40000] to-red-900 text-white font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-red-900/20 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? t("sending") : t("sendCode")}
          </button>
          {message && (
            <div className="text-center text-sm text-red-600">{message}</div>
          )}
          <p className="text-center text-sm text-muted-foreground">
            {t("alreadyHaveAccount")}{" "}
            <Link href="../login" className="text-red-600">
              {t("login")}
            </Link>
          </p>
        </form>
      </AuthCard>
    </>
  );
}
