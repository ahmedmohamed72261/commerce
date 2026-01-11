"use client";
import React from 'react';
import { AlignLeft, ExternalLink, Bell, Search, ChevronDown } from 'lucide-react';

export function AdminHeader() {
  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-20 backdrop-blur-md bg-white/95">
      
      {/* Left Section: Navigation & Quick Link */}
      <div className="flex items-center gap-6">
        <button className="text-slate-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-all">
          <AlignLeft size={20} />
        </button>
        
        <div className="hidden md:flex items-center gap-2 text-sm text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 hover:border-red-200 hover:text-red-600 transition-all cursor-pointer group">
          <ExternalLink size={14} className="text-slate-400 group-hover:text-red-500 transition-colors" />
          <span className="font-semibold tracking-tight">View Storefront</span>
        </div>
      </div>

      {/* Right Section: Search & Profile */}
      <div className="flex items-center gap-4">
        
        {/* Modern Search Bar */}
        <div className="hidden md:block relative">
          <input 
            type="text" 
            placeholder="Search products, orders..." 
            className="pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-100 focus:bg-white focus:border-red-300 focus:ring-4 focus:ring-red-500/5 rounded-xl transition-all w-72 outline-none font-medium text-slate-700"
          />
          <Search size={15} className="absolute left-3.5 top-2.5 text-slate-400 group-focus-within:text-red-500" />
        </div>

        <div className="h-8 w-[1px] bg-slate-100 mx-2"></div>

        {/* Notifications */}
        <button className="relative text-slate-400 hover:text-red-600 hover:bg-red-50 p-2.5 rounded-xl transition-all">
          <Bell size={18} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-600 rounded-full border-2 border-white"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1.5 rounded-xl transition-all border border-transparent hover:border-slate-100 group">
          <div className="w-9 h-9 rounded-lg bg-red-600 text-white flex items-center justify-center font-black text-sm shadow-lg shadow-red-200 group-hover:scale-105 transition-transform">
            A
          </div>
          
          <div className="hidden md:block text-left">
            <div className="text-[11px] font-black text-slate-900 uppercase tracking-wider leading-none">Admin User</div>
            <div className="text-[10px] text-slate-400 font-medium mt-1">Super Admin</div>
          </div>
          
          <ChevronDown size={14} className="text-slate-300 group-hover:text-red-500 transition-colors" />
        </div>
      </div>
    </header>
  );
}