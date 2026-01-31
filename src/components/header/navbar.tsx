"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, List, X, ChevronDown, Moon, Sun, Heart, FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Sidebar } from "./sidebar";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { http } from "@/services/http";
import { useCart } from "@/store/cart";
import { useQuoteCart } from "@/store/quote-cart";
import { useWishlist } from "@/store/wishlist";
import { SearchBox } from "./search-box";

export function Navbar({ locale }: { locale: string }) {
  const t = useTranslations("Nav");
  const tProfile = useTranslations("Common");
  const tQuote = useTranslations("Quotations");
  const tAuth = useTranslations("Auth");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // For language switcher
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [langOpen, setLangOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { totalItems: cartTotalItems, getCart } = useCart();
  const { totalItems: quoteTotalItems } = useQuoteCart();
  const { totalItems: wishlistTotalItems } = useWishlist();

  // Ensure user data persists across refreshes
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    if (token && !user) {
      http.get("/auth/me").then((res) => {
        const data = res.data as { success: boolean; data?: { user: any } };
        if (data?.success && data?.data?.user) {
          useAuthStore.setState({ user: data.data.user });
        }
      }).catch(() => {
        // ignore
      });
    }
  }, [user]);

  useEffect(() => {
    getCart(locale as "en" | "ar");
  }, [getCart, locale]);

  const switchLocale = (target: "en" | "ar") => {
    if (!pathname) return;
    const segments = pathname.split("/");
    if (segments.length === 1) {
      router.replace(`/${target}`);
      return;
    }
    segments[1] = target;
    const nextPath = segments.join("/") || `/${target}`;
    router.replace(nextPath);
    setLangOpen(false);
  };

  return (
    <div className="bg-white dark:bg-card shadow-sm dark:shadow-border/20 relative z-30">
      <div className="max-w-[1600px] mx-auto px-4 py-4 sm:px-8 md:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <Link href={`/${locale}`} className="flex-shrink-0 z-40">
           {/* Replace with your logo or text */}
           <div className="relative h-12 w-24 sm:h-16 sm:w-24 md:h-16 md:w-30 p-1 rounded">
               <img src="/images/logo-light.png" alt="Carne Shop" className="h-full w-full object-cover" />
             </div>
        </Link>

        {/* Main Menu */}
        <nav className="hidden lg:flex flex-1 justify-center">
          <ul className="flex items-center gap-6 text-sm sm:text-lg font-bold text-neutral-800 dark:text-foreground uppercase tracking-wide">
            <li className="group relative">
              <Link href={`/${locale}`} className="py-4 hover:text-red-600 dark:hover:text-primary transition flex items-center gap-1">
                {t("home")} 
                {/* <span className="text-red-600 dark:text-primary text-xs">+</span> */}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/products`} className="py-4 hover:text-red-600 dark:hover:text-primary transition">{t("products")}</Link>
            </li>
            <li>
              <Link href={`/${locale}/categories`} className="py-4 hover:text-red-600 dark:hover:text-primary transition">{t("categories")}</Link>
            </li>
            <li>
              <Link href={`/${locale}/contact`} className="py-4 hover:text-red-600 dark:hover:text-primary transition">{t("contact")}</Link>
            </li>
          </ul>
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Search Component */}
          <button
            onClick={() => setSearchOpen((v) => !v)}
            className="md:hidden text-neutral-600 dark:text-muted-foreground hover:text-red-600 dark:hover:text-primary transition"
            aria-label="Toggle search"
          >
            <Search className="w-5 h-5" />
          </button>
          <div className="hidden md:block w-64 lg:w-80">
            <SearchBox />
          </div>

          {/* User */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-white dark:bg-muted border border-neutral-200 dark:border-border text-neutral-700 dark:text-foreground hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 dark:hover:border-primary/30 hover:text-red-700 dark:hover:text-primary transition"
              >
                <User className="w-5 h-5" />
                <span className="text-xs font-bold">{user.firstName}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 rtl:left-0 rtl:right-auto top-full mt-2 w-40 bg-white dark:bg-card border dark:border-border shadow-md rounded-md p-2 z-50">
                  {(user as any)?.role === 'admin' || (user as any)?.isAdmin ? (
                    <Link
                      href={`/${locale}/admin`}
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-3 py-2 rtl: text-right text-sm hover:bg-neutral-100 dark:hover:bg-muted rounded font-semibold"
                    >
                      {tProfile("Dashboard")}
                    </Link>
                  ) : 
                    (
                    <>
                    <Link
                      href={`/${locale}/profile`}
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-3 py-2 rtl:text-right text-sm hover:bg-neutral-100 dark:hover:bg-muted rounded"
                    >
                      {tProfile("profile")}
                    </Link>
                    <Link
                      href={`/${locale}/quotations/my-quotations`}
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-3 py-2 rtl:text-right text-sm hover:bg-neutral-100 dark:hover:bg-muted rounded"
                    >
                      {tQuote("myQuotations")}
                    </Link>
                    </>
                  )
                  }
                  
                  <button
                    onClick={() => { logout(); setUserMenuOpen(false); router.push(`/${locale}/login`); }}
                    className="block text-left rtl:text-right px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-muted rounded text-red-600 dark:text-primary"
                  >
                    {tProfile("logout")}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Mobile: show dropdown on click */}
              <div className="relative md:hidden">
                <button
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200 dark:border-border text-neutral-700 dark:text-foreground hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 dark:hover:border-primary/30 hover:text-red-700 dark:hover:text-primary transition"
                  aria-label="Open user menu"
                >
                  <User className="w-5 h-5" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 rtl:left-0 rtl:right-auto top-full mt-2 w-40 bg-white dark:bg-card border dark:border-border shadow-md rounded-md p-2 z-50">
                    <Link
                      href={`/${locale}/login`}
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-3 py-2 rtl:text-right text-sm hover:bg-neutral-100 dark:hover:bg-muted rounded"
                    >
                      {tAuth("login")}
                    </Link>
                    <Link
                      href={`/${locale}/signup`}
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-3 py-2 rtl:text-right text-sm hover:bg-neutral-100 dark:hover:bg-muted rounded"
                    >
                      {tAuth("signUp")}
                    </Link>
                  </div>
                )}
              </div>
              {/* Desktop: direct link to login */}
              <Link href={`/${locale}/login`} className="hidden md:inline-flex text-neutral-600 dark:text-muted-foreground hover:text-red-600 dark:hover:text-primary transition">
                <User className="w-5 h-5" />
              </Link>
            </>
          )
          }
          {/* Theme Toggle (Optional, kept from original) */}
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="hidden sm:block text-muted-foreground hover:text-red-600 dark:hover:text-primary transition"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Quote Cart */}
          <Link href={`/${locale}/quotations/cart`} className="relative text-neutral-600 dark:text-muted-foreground hover:text-red-600 dark:hover:text-primary transition hidden sm:inline-flex">
            <FileText className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center">
              {quoteTotalItems()}
            </span>
          </Link>

          {/* Wishlist */}
          <Link href={`/${locale}/wishlist`} className="relative text-neutral-600 dark:text-muted-foreground hover:text-red-600 dark:hover:text-primary transition hidden sm:inline-flex">
            <Heart className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center">
              {wishlistTotalItems()}
            </span>
          </Link>

          {/* Cart */}
          <Link href={`/${locale}/cart`} className="relative text-neutral-600 dark:text-muted-foreground hover:text-red-600 dark:hover:text-primary transition">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-red-600 dark:bg-primary text-white text-[10px] flex items-center justify-center">
              {cartTotalItems()}
            </span>
          </Link>

          {/* Sidebar Toggle */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 dark:border-border hover:bg-red-600 dark:hover:bg-primary hover:border-red-600 dark:hover:border-primary hover:text-white transition group"
          >
            <List className="w-5 h-5 text-neutral-600 dark:text-muted-foreground group-hover:text-white transition" />
          </button>

          {/* Language Switcher (kept from MainHeader) */}
          <div className="relative hidden sm:block">
            <button
              className="flex items-center gap-1 text-sm font-bold uppercase hover:text-red-600 dark:hover:text-primary transition"
              onClick={() => setLangOpen(!langOpen)}
            >
              {currentLocale}
              <ChevronDown className="w-3 h-3" />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-24 bg-white dark:bg-card border dark:border-border shadow-md rounded py-1 z-50">
                 <button onClick={() => switchLocale('en')} className="block w-full text-left px-3 py-1 hover:bg-gray-100 dark:hover:bg-muted hover:text-red-700 dark:hover:text-primary font-extrabold text-sm">EN</button>
                 <button onClick={() => switchLocale('ar')} className="block w-full text-left px-3 py-1 hover:bg-gray-100 dark:hover:bg-muted hover:text-red-700 dark:hover:text-primary font-extrabold text-sm">AR</button>
              </div>
            )}
          </div>

        </div>
      </div>
      
      {searchOpen && (
        <div className="md:hidden border-t border-neutral-200 dark:border-border">
          <div className="container mx-auto px-4 py-3">
            <SearchBox autoFocus />
          </div>
        </div>
      )}
      
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </div>
  );
}
