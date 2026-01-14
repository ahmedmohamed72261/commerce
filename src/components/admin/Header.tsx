"use client";
import React, { useState } from 'react';
import { AlignLeft, ExternalLink, Bell, Search, ChevronDown, Globe } from 'lucide-react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

import { getProfile } from '@/services/user.service';
import { useQuery } from '@tanstack/react-query';

export function AdminHeader() {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const { data: userProfile } = useQuery({
    queryKey: ['user-profile'],
    queryFn: getProfile
  });

  const switchLocale = (target: "en" | "ar") => {
    if (!pathname) return;
    const segments = pathname.split("/");
    segments[1] = target;
    const nextPath = segments.join("/");
    router.replace(nextPath);
    setLangDropdownOpen(false);
  };

  return (
    <header className="h-16 bg-white/95 backdrop-blur-sm border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-20">
      
      {/* Left Section: Toggle and Store Link */}
      <div className="flex items-center gap-4">
        <button className="text-gray-400 hover:text-red-600 p-2 rounded-lg transition-colors md:hidden">
          <AlignLeft size={20} />
        </button>
        
        <a href="/" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition-colors group">
          <ExternalLink size={14} className="text-gray-400 group-hover:text-red-500 transition-colors" />
          <span className="font-semibold">View Store</span>
        </a>
      </div>

      {/* Right Section: Search, Notifications, and Profile */}
      <div className="flex items-center gap-5">
        
        {/* Search Bar */}
        <div className="hidden md:block relative">
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-9 pr-4 py-1.5 text-sm bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-2 focus:ring-gray-100 rounded-full transition-all w-64 outline-none"
          />
          <Search size={16} className="absolute left-3 top-2 text-gray-400" />
        </div>

        {/* Language Switcher */}
        <div className="relative">
          <button 
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            className="relative text-gray-400 hover:text-red-600 p-2 rounded-full transition-colors"
          >
            <Globe size={18} />
          </button>
          <AnimatePresence>
            {langDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full right-0 mt-2 w-36 bg-white border border-gray-100 rounded-lg shadow-lg z-30"
              >
                <button 
                  onClick={() => switchLocale('en')}
                  className={`block w-full text-left px-4 py-2 text-sm ${locale === 'en' ? 'font-bold text-red-600' : 'text-gray-700'} hover:bg-gray-50`}
                >
                  English
                </button>
                <button 
                  onClick={() => switchLocale('ar')}
                  className={`block w-full text-left px-4 py-2 text-sm ${locale === 'ar' ? 'font-bold text-red-600' : 'text-gray-700'} hover:bg-gray-50`}
                >
                  العربية
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Notifications */}
        <button className="relative text-gray-400 hover:text-red-600 p-2 rounded-full transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-7 w-px bg-gray-200 hidden sm:block"></div>

        {/* User Profile Dropdown */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-red-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-red-500/20 group-hover:scale-105 transition-transform">
            A
          </div>
          
          <div className="hidden sm:block text-left">
            <div className="text-sm font-bold text-gray-800 leading-none">{userProfile?.data.firstName} {userProfile?.data.lastName}</div>
            <div className="text-xs text-gray-500 mt-1">{userProfile?.data.email}</div>
          </div>
          
          <ChevronDown size={16} className="text-gray-400 ml-1 transition-transform group-hover:rotate-180" />
        </div>
      </div>
    </header>
  );
}
