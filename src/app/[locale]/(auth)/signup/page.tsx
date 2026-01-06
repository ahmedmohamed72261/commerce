"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { AuthCard } from "@/components/auth/auth-card";
import { useAuthStore } from "@/store/auth";

export default function SignupPage() {
  const router = useRouter();
  const auth = useAuthStore();
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
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Register" }]} />
      <AuthCard
        title="Create your account"
        description="Just a few details to get started."
      >
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium text-foreground">First name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="h-11 rounded-md border border-white/20 bg-white/50 dark:bg-white/5 px-3 text-sm outline-none backdrop-blur focus:ring-2 focus:ring-red-600/20"
                placeholder="Ex. John"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-foreground">Last name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="h-11 rounded-md border border-white/20 bg-white/50 dark:bg-white/5 px-3 text-sm outline-none backdrop-blur focus:ring-2 focus:ring-red-600/20"
                placeholder="Ex. Doe"
              />
            </div>
          </div>
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
          <div className="grid gap-2">
            <label className="text-sm font-medium text-foreground">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-11 rounded-md border border-white/20 bg-white/50 dark:bg-white/5 px-3 text-sm outline-none backdrop-blur focus:ring-2 focus:ring-red-600/20"
              placeholder="+201234567890"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-foreground">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 rounded-md border border-white/20 bg-white/50 dark:bg-white/5 px-3 text-sm outline-none backdrop-blur focus:ring-2 focus:ring-red-600/20"
              placeholder="••••••••"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-foreground">Confirm Password</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="h-11 rounded-md border border-white/20 bg-white/50 dark:bg-white/5 px-3 text-sm outline-none backdrop-blur focus:ring-2 focus:ring-red-600/20"
              placeholder="••••••••"
            />
          </div>
          <button
            className="w-full h-11 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
          {message && (
            <div className="text-center text-sm text-red-600">{message}</div>
          )}
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="../login" className="text-red-600">
              Login
            </Link>
          </p>
        </form>
      </AuthCard>
    </>
  );
}
