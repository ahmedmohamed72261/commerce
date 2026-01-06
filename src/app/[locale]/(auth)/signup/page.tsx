"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { AuthCard } from "@/components/auth/auth-card";
import { useAuthStore } from "@/store/auth";
import { Input } from "@/components/ui/input";
import { User, Mail, Smartphone, Lock } from "lucide-react";
import { useTranslations } from "next-intl";

export default function SignupPage() {
  const router = useRouter();
  const auth = useAuthStore();
  const t = useTranslations("Auth");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    if (password !== confirm) {
      setMessage("Passwords do not match");
      return;
    }
    setLoading(true);
    const res = await auth.register({ firstName, lastName, phone, email, password });
    setLoading(false);
    if (res.success && res.data?.token) {
      router.push("/");
    } else {
      setMessage(res.message || "Registration failed");
    }
  }

  return (
    <>
      <Breadcrumb items={[{ label: t("backTo"), href: "/" }, { label: t("signUp") }]} />
      <AuthCard
        title={t("signupTitle")}
        description={t("signupDesc")}
      >
        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label={t("firstName")}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              icon={User}
              placeholder="Ex. John"
            />
            <Input
              label={t("lastName")}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              icon={User}
              placeholder="Ex. Doe"
            />
          </div>
          
          <Input
            type="email"
            label={t("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
            placeholder="you@example.com"
          />
          
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
          
          <Input
            type="password"
            label={t("confirmPassword")}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            icon={Lock}
            placeholder="••••••••"
          />

          <button
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#C40000] to-red-900 text-white font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-red-900/20 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? t("creatingAccount") : t("signUp")}
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
