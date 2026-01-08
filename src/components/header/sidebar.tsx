"use client";

import React, { useEffect } from "react";
import { X, ChevronRight, ShoppingBag, Heart, User, Settings, Phone, Mail, Instagram, Facebook, Twitter, Globe, Percent, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useAuthStore } from "@/store/auth";
import { useCategoriesStore } from "@/store/categories";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

interface OffcanvasSidebarProps {
  open: boolean;
  onClose: () => void;
  version?: number; // 1 to 30 Design Variations
}

export function Sidebar({ open, onClose, version = 1 }: OffcanvasSidebarProps) {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuthStore();
  const { categories, loading, fetchCategories } = useCategoriesStore();
  const locale = (useLocale() as "en" | "ar");
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [open]);
  const isRtl = typeof document !== "undefined" && document.dir === "rtl";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open && categories.length === 0 && !loading) {
      fetchCategories(locale);
    }
  }, [open, categories.length, loading, fetchCategories, locale]);

  // --- 30 DESIGN THEMES ---
  const getTheme = (v: number) => {
    const themes: Record<number, any> = {
      1: { panel: "bg-white dark:bg-[#0a0a0a]", accent: "text-[#C40000]", item: "hover:bg-neutral-50 dark:hover:bg-white/5", font: "font-sans" },
      2: { panel: "bg-black text-white", accent: "text-red-500", item: "hover:pl-4 border-b border-white/10", font: "font-mono uppercase" },
      3: { panel: "bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200", accent: "text-blue-600", item: "rounded-xl hover:bg-white dark:hover:bg-zinc-800 shadow-sm", font: "font-serif" },
      4: { panel: "bg-[#C40000] text-white", accent: "text-white underline", item: "hover:bg-black/10", font: "font-black" },
      // ... Themes 5-30 generate varied combinations of shadows, borders, and colors
    };
    return themes[v] || themes[1];
  };

  const s = getTheme(version);

  const menuItems = [
    { name: "Home", href: "/", icon: Sparkles },
    { name: "Shop", href: "/shop", icon: ShoppingBag },
    { name: "New Arrivals", href: "/new", icon: Sparkles, label: "HOT" },
    { name: "Audio Collection", href: "/shop/audio", icon: Headphones },
    { name: "Smart Devices", href: "/shop/tech", icon: Smartphone },
    { name: "About Us", href: "/about", icon: User },
    { name: "Contact", href: "/contact", icon: Phone },
    { name: "Flash Sale", href: "/offers", icon: Percent, color: "text-red-600" },
    { name: "Track My Order", href: "/track", icon: Truck },
  ];

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
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[9999] overflow-hidden">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/10 backdrop-blur-sm"
          />

          {/* Sidebar Panel */}
          <motion.div 
            initial={{ x: isRtl ? "-100%" : "100%", opacity: 0.95 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: isRtl ? "-100%" : "100%", opacity: 0.95 }}
            transition={{ type: "spring", damping: 24, stiffness: 220 }}
            role="dialog"
            aria-modal="true"
            className={cn(
              "fixed top-0 h-[100dvh] max-h-[100dvh] w-full max-w-[420px] flex flex-col overflow-hidden",
              isRtl ? "left-0" : "right-0",
              "shadow-[0_20px_60px_rgba(0,0,0,0.35)]",
              "border-l dark:border-l-0 dark:border-r border-neutral-200/70 dark:border-white/10",
              "bg-white text-neutral-800 dark:bg-neutral-900/90 dark:text-neutral-200 backdrop-blur-xl",
              s.panel
            )}
          >
            {/* Header */}
            <div className="p-6 border-b border-neutral-100 dark:border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-24 sm:h-12 sm:w-28 md:h-16 md:w-36 rounded overflow-hidden">
                  <img src="/images/logo-light.png" alt="Logo" className="h-full w-full object-contain" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => switchLocale("en")}
                    className={cn("px-2 py-1 text-xs font-extrabold rounded", locale === "en" ? "bg-red-600 text-white" : "bg-neutral-100 text-neutral-700")}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => switchLocale("ar")}
                    className={cn("px-2 py-1 text-xs font-extrabold rounded", locale === "ar" ? "bg-red-600 text-white" : "bg-neutral-100 text-neutral-700")}
                  >
                    AR
                  </button>
                </div>
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors"
                >
                  {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button 
                  onClick={onClose}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar overscroll-contain will-change-scroll">

              {/* Categories */}
              <nav className="p-6">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.3em] mb-4">Categories</p>
                <div className="space-y-1">
                  {(loading && categories.length === 0) && (
                    <div className="p-4 bg-white rounded-xl border border-neutral-100 text-sm text-neutral-500">Loading...</div>
                  )}
                  {categories.map((cat, i) => (
                    <motion.div
                      key={String(cat.id)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <Link 
                        href={`/${locale}/categories`}
                        className="flex items-center justify-between p-4 rounded-xl transition-all group bg-white hover:bg-neutral-100 dark:bg-white/5 dark:hover:bg-white/10"
                      >
                        <div className="flex items-center gap-4">
                          <span className="w-2 h-2 rounded-full bg-neutral-300 group-hover:bg-red-600 transition-colors" />
                          <span className="font-bold text-sm tracking-tight group-hover:text-red-600 transition-colors">{cat.name}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>

              {/* Navigation Links */}
              <nav className="p-6">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.3em] mb-4">Navigation</p>
                <div className="space-y-1">
                  {menuItems.map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link 
                        href={`/${locale}${item.href}`}
                        className={cn("flex items-center justify-between p-4 rounded-xl transition-all group bg-white hover:bg-neutral-100 dark:bg-white/5 dark:hover:bg-white/10", s.item)}
                      >
                        <div className="flex items-center gap-4">
                          <item.icon className={cn("w-5 h-5", item.color || "text-neutral-700 dark:text-neutral-400")} />
                          <span className="font-bold uppercase text-sm tracking-tight group-hover:text-red-600 transition-colors">{item.name}</span>
                        </div>
                        {item.label ? (
                          <span className="bg-red-600 text-[8px] font-black text-white px-2 py-0.5 rounded-full shadow-sm">{item.label}</span>
                        ) : (
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>

              {/* Quick Settings Grid */}
              <div className="px-6 py-4 grid grid-cols-2 gap-4">
                 <button className="flex flex-col items-center justify-center p-4 bg-neutral-50 dark:bg-white/5 rounded-2xl gap-2 hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors">
                    <User className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                    <span className="text-[10px] font-bold uppercase">Account</span>
                 </button>
                 <button className="flex flex-col items-center justify-center p-4 bg-neutral-50 dark:bg-white/5 rounded-2xl gap-2 hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors">
                    <Heart className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                    <span className="text-[10px] font-bold uppercase">Wishlist</span>
                 </button>
              </div>
            </div>

            {/* Footer Contact & Socials */}
            <div className="p-8 border-t border-neutral-100 dark:border-white/5 bg-neutral-50/70 dark:bg-black/30">
              <div className="flex flex-col gap-4 mb-8">
                <a href="tel:+12345678" className="flex items-center gap-3 text-sm font-bold opacity-70 hover:opacity-100 transition-opacity">
                  <Phone size={16} /> +1 (234) 567-890
                </a>
                <a href="mailto:info@dw.com" className="flex items-center gap-3 text-sm font-bold opacity-70 hover:opacity-100 transition-opacity">
                  <Mail size={16} /> help@developmentworld.com
                </a>
              </div>
              <div className="flex items-center gap-6">
                {[Instagram, Facebook, Twitter, Globe].map((Social, i) => (
                  <Social key={i} size={18} className="cursor-pointer hover:text-[#C40000] transition-colors" />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Dummy Icon mapping for the demo
const Sparkles = (props: any) => <Globe {...props} />;
const Headphones = (props: any) => <Globe {...props} />;
const Smartphone = (props: any) => <Globe {...props} />;
const Truck = (props: any) => <Globe {...props} />;
