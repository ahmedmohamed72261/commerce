"use client";
import React, { useState } from 'react';
import { AlignLeft, ExternalLink, Bell, Search, ChevronDown, Globe, Sun, Moon, LogOut, User } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from "next-themes";
import { useAuthStore } from "@/store/auth";

import { getProfile } from '@/services/user.service';
import { useQuery } from '@tanstack/react-query';

export function AdminHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations('AdminHeader');
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const { logout } = useAuthStore();

  const { data: userProfileRes } = useQuery({
    queryKey: ['user-profile'],
    queryFn: getProfile
  });
  const profile = (userProfileRes as any)?.data?.data ?? (userProfileRes as any)?.data ?? userProfileRes;

  const switchLocale = (target: "en" | "ar") => {
    if (!pathname) return;
    const segments = pathname.split("/");
    segments[1] = target;
    const nextPath = segments.join("/");
    router.replace(nextPath);
    setLangDropdownOpen(false);
  };

  return (
    <header className="h-16 bg-white/95 dark:bg-card/95 backdrop-blur-sm border-b border-gray-100 dark:border-border flex items-center justify-between px-3 sm:px-6 sticky top-0 z-20">
      
      {/* Left Section: Toggle and Store Link */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="text-gray-400 dark:text-muted-foreground hover:text-red-600 dark:hover:text-primary p-2 rounded-lg transition-colors md:hidden"
        >
          <AlignLeft size={20} />
        </button>
        
        <a href="/" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-2 text-sm text-gray-500 dark:text-muted-foreground hover:text-red-600 dark:hover:text-primary transition-colors group">
          <ExternalLink size={14} className="text-gray-400 dark:text-muted-foreground group-hover:text-red-500 dark:group-hover:text-primary transition-colors" />
          <span className="font-semibold">{t('viewStore')}</span>
        </a>
      </div>

      {/* Right Section: Search, Notifications, and Profile */}
      <div className="min-w-0 flex items-center gap-2 sm:gap-4 flex-wrap justify-end">
        
        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="relative text-gray-400 dark:text-muted-foreground hover:text-red-600 dark:hover:text-primary p-2 rounded-full transition-colors hidden md:inline-flex"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Language Switcher */}
        <div className="relative hidden sm:block">
          <button 
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            className="relative text-gray-400 dark:text-muted-foreground hover:text-red-600 dark:hover:text-primary p-2 rounded-full transition-colors"
          >
            <Globe size={18} />
          </button>
          <AnimatePresence>
            {langDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full right-0 mt-2 w-40 sm:w-36 bg-white dark:bg-card border border-gray-100 dark:border-border rounded-lg shadow-lg z-30"
              >
                <button 
                  onClick={() => switchLocale('en')}
                  className={`block w-full ${locale === 'ar' ? 'text-right' : 'text-left'} px-4 py-2 text-sm ${locale === 'en' ? 'font-bold text-red-600 dark:text-primary' : 'text-gray-700 dark:text-foreground'} hover:bg-gray-50 dark:hover:bg-muted`}
                >
                  {t('english')}
                </button>
                <button 
                  onClick={() => switchLocale('ar')}
                  className={`block w-full ${locale === 'ar' ? 'text-right' : 'text-left'} px-4 py-2 text-sm ${locale === 'ar' ? 'font-bold text-red-600 dark:text-primary' : 'text-gray-700 dark:text-foreground'} hover:bg-gray-50 dark:hover:bg-muted`}
                >
                  {t('arabic')}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Notifications */}
        <button className="relative text-gray-400 dark:text-muted-foreground hover:text-red-600 dark:hover:text-primary p-2 rounded-full transition-colors hidden md:inline-flex">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-card"></span>
        </button>

        <div className="h-7 w-px bg-gray-200 dark:bg-border hidden sm:block"></div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button 
             onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
             className="flex items-center gap-2 sm:gap-3 cursor-pointer group outline-none"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-red-600 dark:from-primary dark:to-red-700 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-red-500/20 dark:shadow-primary/20 group-hover:scale-105 transition-transform">
              {profile?.firstName?.charAt(0) || 'A'}
            </div>
            
            <div className="hidden md:block text-left max-w-[200px]">
              <div className="text-sm font-bold text-gray-800 dark:text-foreground leading-none truncate">{profile?.firstName} {profile?.lastName}</div>
              <div className="text-xs text-gray-500 dark:text-muted-foreground mt-1 truncate">{profile?.email}</div>
            </div>
            
            <ChevronDown size={16} className="text-gray-400 dark:text-muted-foreground ml-1 transition-transform group-hover:rotate-180 hidden sm:inline-block" />
          </button>

          <AnimatePresence>
            {profileDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="fixed sm:absolute top-16 sm:top-full right-2 sm:right-0 mt-2 w-[calc(100vw-1rem)] sm:w-56 bg-white dark:bg-card border border-gray-100 dark:border-border rounded-xl shadow-xl z-30 overflow-hidden"
              >
                <div className="p-4 border-b border-gray-100 dark:border-border bg-gray-50/50 dark:bg-muted/30">
                  <p className="text-sm font-bold text-gray-800 dark:text-foreground">{profile?.firstName} {profile?.lastName}</p>
                  <p className="text-xs text-gray-500 dark:text-muted-foreground truncate">{profile?.email}</p>
                </div>
                <div className="p-2">
                  <button 
                    onClick={() => {
                        setProfileDropdownOpen(false);
                        router.push(`/${locale}/profile`);
                    }}
                    className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 dark:text-foreground hover:bg-gray-50 dark:hover:bg-muted rounded-lg transition-colors"
                  >
                    <User size={16} className="text-gray-400 dark:text-muted-foreground" />
                    {t('profile') || "Profile"}
                  </button>
                  <button 
                    onClick={() => {
                      logout();
                      setProfileDropdownOpen(false);
                      router.push(`/${locale}/login`);
                    }}
                    className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                  >
                    <LogOut size={16} />
                    {t('logout') || "Logout"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
