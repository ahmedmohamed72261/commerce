"use client";

import Link from "next/link";
import { MapPin, ChevronDown, Search, Phone, Heart, RefreshCcw, ShoppingCart, User, Moon, Sun } from "lucide-react";
import { IconWithBadge } from "./parts/icon-with-badge";
import { SearchBox } from "./search-box";
import { useTheme } from "next-themes";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/store/auth";
import { cn } from "@/utils/utils";

export function MainHeader({ locale }: { locale: string }) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();

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
    setOpen(false);
  };

  return (
    <div className="bg-[--color-background] px-4 py-4  sm:px-8 md:px-12">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4">
        <Link href={`/${locale}`} className="flex-shrink-0">
          <img src="/images/logo-light.jpeg" alt="Digital Horizon Logo" className="h-12 w-auto object-contain" />
        </Link>
        <SearchBox />
        <div className="flex items-center gap-4 sm:gap-5">
          <Link href="#" className="text-2xl text-primary hover:text-primary/80"><Phone /></Link>
          <IconWithBadge icon={<Heart />} badgeCount={0} />
          <IconWithBadge icon={<RefreshCcw />} badgeCount={0} />
          <IconWithBadge icon={<ShoppingCart />} badgeCount={0} />
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
                <div
                  className={cn(
                    "absolute top-full mt-2 w-40 bg-white border shadow-md rounded-md p-2 z-50",
                    currentLocale === "ar" ? "left-0" : "right-0"
                  )}
                >
                  <Link
                    href={`/${String(currentLocale)}/profile`}
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-3 py-2 text-sm hover:bg-neutral-100 rounded"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => { logout(); setUserMenuOpen(false); router.push(`/${String(currentLocale)}/login`); }}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-neutral-100 rounded text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href={`/${String(currentLocale)}/login`} className="text-neutral-600 hover:text-red-600 transition">
              <User className="w-5 h-5" />
            </Link>
          )}
          <button
            aria-label="Toggle theme"
            className="h-10 w-10 rounded-md border border-[--color-border] bg-[--color-background] text-[--color-foreground] flex items-center justify-center hover:bg-[--color-muted] transition"
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <div className="relative">
            <button
              className="h-10 px-3 rounded-md border border-[--color-border] bg-[--color-background] text-[--color-foreground] flex items-center gap-2 hover:bg-[--color-muted] transition"
              aria-haspopup="listbox"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              <span className="font-semibold uppercase">{currentLocale}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            {open && (
              <div
                className="absolute right-0 top-full mt-2 z-3000 w-32 rounded-md border border-[--color-border] bg-[--color-background] shadow-lg"
                role="listbox"
              >
                <button
                  className="w-full text-left px-3 py-2 hover:bg-[--color-muted]"
                  onClick={() => switchLocale("en")}
                  role="option"
                  aria-selected={currentLocale === "en"}
                >
                  English
                </button>
                <button
                  className="w-full text-left px-3 py-2 hover:bg-[--color-muted]"
                  onClick={() => switchLocale("ar")}
                  role="option"
                  aria-selected={currentLocale === "ar"}
                >
                  العربية
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
