"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { useProductsStore } from "@/store/products";
import { useBrandsStore } from "@/store/brands";
import { useCategoriesStore } from "@/store/categories";

const PUBLIC_PATHS = ["/", "/login", "/signup", "/forgot-password", "/reset-password", "/verify-code"];

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { token, user } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const { loading: productsLoading, preferredLoading } = useProductsStore();
  const { loading: brandsLoading } = useBrandsStore();
  const { loading: categoriesLoading } = useCategoriesStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Remove locale prefix for checking paths (e.g. /en/login -> /login)
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "") || "/";
    
    // Check if current path requires auth
    const isPublic = PUBLIC_PATHS.some(p => pathWithoutLocale === p);

    // Avoid redirect loop while token exists in storage but store isn't hydrated yet
    const hasClientToken = typeof window !== "undefined" && !!localStorage.getItem("auth_token");

    if (!isPublic && !token && !hasClientToken) {
      // Redirect to login if trying to access protected route without token
      // We keep the locale in the redirect
      const locale = pathname.split("/")[1] || "en";
      router.push(`/${locale}/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [mounted, token, pathname, router]);

  // Global homepage loading gate until key data is ready
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "") || "/";
  const isHome = pathWithoutLocale === "/";
  const isLoading = productsLoading || preferredLoading || brandsLoading || categoriesLoading;

  return (
    <>
      {isHome && isLoading && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-white/80 dark:bg-black/60 backdrop-blur-sm">
          <div className="w-16 h-16 rounded-full border-4 border-red-600 border-t-transparent animate-spin" />
        </div>
      )}
      {children}
    </>
  );
}
