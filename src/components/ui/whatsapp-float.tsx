"use client";

import { Phone } from "lucide-react";

export function WhatsAppFloat() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <a
        href="https://wa.me/+201155624668" // Replace with actual number
        target="_blank"
        rel="noopener noreferrer"
        className="
          group relative flex items-center gap-3 px-2 py-2 pr-6
          rounded-full 
          bg-slate-900/40 
          backdrop-blur-2xl 
          border border-white/10
          shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_8px_40px_-10px_rgba(0,0,0,0.5)]
          transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)
          hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(220,38,38,0.4)]
        "
        style={{
           // Inline style for the specific spring easing if Tailwind config isn't set
           transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        {/* 1. The Glowing Icon Circle */}
        <div className="
          relative flex items-center justify-center w-12 h-12 rounded-full 
          bg-gradient-to-b from-red-500 to-red-700 
          shadow-lg shadow-red-500/30
          group-hover:scale-110 transition-transform duration-500
        ">
            {/* Subtle inner ripple ring */}
            <div className="absolute inset-0 rounded-full border border-white/20 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
            
            <Phone className="w-5 h-5 text-white fill-current" />
        </div>

        {/* 2. The Text Content */}
        <div className="flex flex-col items-start justify-center">
          <span className="text-[10px] uppercase tracking-wider text-red-400 font-bold leading-none opacity-80 mb-0.5">
            Support
          </span>
          <span className="text-sm font-semibold text-white leading-none tracking-wide">
            Call Us
          </span>
        </div>

        {/* 3. Creative "Shine" Effect Overlay */}
        {/* A subtle light beam that sweeps across on hover */}
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
        </div>
      </a>
    </div>
  );
}
