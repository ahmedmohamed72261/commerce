"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth";

const PUBLIC_PATHS = [
  "/login", 
  "/signup", 
  "/forgot-password", 
  "/reset-password", 
  "/verify-code",
  "/"
];

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { token, user } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Remove locale prefix for checking paths (e.g. /en/login -> /login)
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "") || "/";
    
    // Check if current path requires auth
    const isPublic = PUBLIC_PATHS.some(p => 
      pathWithoutLocale === p || 
      pathWithoutLocale.startsWith("/shop") || // Allow shop browsing
      pathWithoutLocale.startsWith("/product") || // Allow product viewing
      pathWithoutLocale.startsWith("/categories") // Allow categories
    );

    if (!isPublic && !token) {
      // Redirect to login if trying to access protected route without token
      // We keep the locale in the redirect
      const locale = pathname.split("/")[1] || "en";
      router.push(`/${locale}/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [mounted, token, pathname, router]);

  // Optional: You could show a loading spinner while checking auth
  return <>{children}</>;
}
