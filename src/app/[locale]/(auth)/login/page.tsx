"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { AuthCard } from "@/components/auth/auth-card";
import { useAuthStore } from "@/store/auth";

export default function LoginPage() {
  const router = useRouter();
  const auth = useAuthStore();
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
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Login" }]} />
      <AuthCard
        title="Welcome back"
        description="Sign in to continue your shopping experience."
      >
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="grid gap-4">
            <label className="text-sm font-medium text-foreground">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-11 rounded-md border border-white/20 bg-white/50 dark:bg-white/5 px-3 text-sm outline-none backdrop-blur focus:ring-2 focus:ring-red-600/20"
              placeholder="+201234567890"
            />
          </div>
          <div className="grid gap-4">
            <label className="text-sm font-medium text-foreground">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 rounded-md border border-white/20 bg-white/50 dark:bg-white/5 px-3 text-sm outline-none backdrop-blur focus:ring-2 focus:ring-red-600/20"
              placeholder="••••••••"
            />
          </div>
          <div className="flex items-center justify-between">
            <Link href="./forgot-password" className="text-sm text-red-600">
              Forgot password?
            </Link>
          </div>
          <button
            className="w-full h-11 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
          {message && (
            <div className="text-center text-sm text-red-600">{message}</div>
          )}
          <p className="text-center text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <Link href="./signup" className="text-red-600">
              Sign Up
            </Link>
          </p>
        </form>
      </AuthCard>
    </>
  );
}
