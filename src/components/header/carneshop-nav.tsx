"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, List, X, ChevronDown, Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { OffcanvasSidebar } from "./offcanvas-sidebar";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { http } from "@/config/http";

export function CarneshopNav({ locale }: { locale: string }) {
  const t = useTranslations("Nav");
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
    <div className="bg-white shadow-sm relative z-30">
      <div className="container mx-auto px-4 py-4 sm:px-8 md:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <Link href={`/${locale}`} className="flex-shrink-0 z-40">
           {/* Replace with your logo or text */}
           <div className="relative h-12 w-24 sm:h-16 sm:w-32 md:h-20 md:w-40 p-1 rounded">
               <img src="/images/logo-light.png" alt="Carne Shop" className="h-full w-full object-cover" />
             </div>
        </Link>

        {/* Main Menu */}
        <nav className="hidden lg:flex flex-1 justify-center">
          <ul className="flex items-center gap-6 text-sm font-bold text-neutral-800 uppercase tracking-wide">
            <li className="group relative">
              <Link href={`/${locale}`} className="py-4 hover:text-red-600 transition flex items-center gap-1">
                {t("home")} <span className="text-red-600 text-xs">+</span>
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/about`} className="py-4 hover:text-red-600 transition">{t("about")}</Link>
            </li>
            <li className="group relative">
              <Link href={`/${locale}/pages`} className="py-4 hover:text-red-600 transition flex items-center gap-1">
                {t("pages")} <span className="text-red-600 text-xs">+</span>
              </Link>
            </li>
            <li className="group relative">
              <Link href={`/${locale}/elements`} className="py-4 hover:text-red-600 transition flex items-center gap-1">
                {t("elements")} <span className="text-red-600 text-xs">+</span>
              </Link>
            </li>
            <li className="group relative">
              <Link href={`/${locale}/news`} className="py-4 hover:text-red-600 transition flex items-center gap-1">
                {t("news")} <span className="text-red-600 text-xs">+</span>
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/contact`} className="py-4 hover:text-red-600 transition">{t("contact")}</Link>
            </li>
          </ul>
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          
          {/* Theme Toggle (Optional, kept from original) */}
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="text-muted-foreground hover:text-red-600 transition"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Search Toggle */}
          <div className="relative hidden sm:block">
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-muted-foreground hover:text-red-600 transition"
            >
              {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>
            {/* Simple Search Dropdown */}
            {searchOpen && (
              <div className="absolute right-0 top-full mt-4 w-64 bg-white shadow-xl border border-neutral-100 p-4 rounded-md z-50">
                <input 
                  type="text" 
                  placeholder={t("search")} 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-600"
                />
              </div>
            )}
          </div>

          {/* User */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-white border border-neutral-200 text-neutral-700 hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition"
              >
                <User className="w-5 h-5" />
                <span className="text-xs font-bold">{user.firstName}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-40 bg-white border shadow-md rounded-md p-2 z-50">
                  <Link href={`/${locale}/account`} className="block px-3 py-2 text-sm hover:bg-neutral-100 rounded">Account</Link>
                  <button
                    onClick={() => { logout(); setUserMenuOpen(false); router.push(`/${locale}`); }}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-neutral-100 rounded text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href={`/${locale}/login`} className="text-neutral-600 hover:text-red-600 transition">
              <User className="w-5 h-5" />
            </Link>
          )
          }

          {/* Cart */}
          <Link href={`/${locale}/cart`} className="relative text-neutral-600 hover:text-red-600 transition">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center">0</span>
          </Link>

          {/* Sidebar Toggle */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 hover:bg-red-600 hover:border-red-600 hover:text-white transition group"
          >
            <List className="w-5 h-5 text-neutral-600 group-hover:text-white transition" />
          </button>

          {/* Language Switcher (kept from MainHeader) */}
          <div className="relative hidden sm:block">
            <button
              className="flex items-center gap-1 text-sm font-bold uppercase hover:text-red-600 transition"
              onClick={() => setLangOpen(!langOpen)}
            >
              {currentLocale}
              <ChevronDown className="w-3 h-3" />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-24 bg-white border shadow-md rounded py-1 z-50">
                 <button onClick={() => switchLocale('en')} className="block w-full text-left px-3 py-1 hover:bg-gray-100 hover:text-red-700 font-extrabold text-sm">EN</button>
                 <button onClick={() => switchLocale('ar')} className="block w-full text-left px-3 py-1 hover:bg-gray-100 hover:text-red-700 font-extrabold text-sm">AR</button>
              </div>
            )}
          </div>

        </div>
      </div>
      
      <OffcanvasSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </div>
  );
}
