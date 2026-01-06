"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { AuthCard } from "@/components/auth/auth-card";
import { useAuthStore } from "@/store/auth";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const auth = useAuthStore();
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
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Forgot Password" }]} />
      <AuthCard
        title="Reset your password"
        description="Enter your email to receive a verification code."
      >
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 rounded-md border border-white/20 bg-white/50 dark:bg-white/5 px-3 text-sm outline-none backdrop-blur focus:ring-2 focus:ring-red-600/20"
              placeholder="you@example.com"
            />
          </div>
          <button
            className="w-full h-11 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Code"}
          </button>
          {message && (
            <div className="text-center text-sm text-red-600">{message}</div>
          )}
          <p className="text-center text-sm text-muted-foreground">
            Remember the password?{" "}
            <Link href="../login" className="text-red-600">
              Login
            </Link>
          </p>
        </form>
      </AuthCard>
    </>
  );
}
