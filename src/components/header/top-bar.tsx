"use client";

import { MapPin } from "lucide-react";
import { useLocale } from "next-intl";

export function TopBar() {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  return (
    <div className="relative h-[40px] md:h-[50px] overflow-hidden">
      {/* Container restricted to content width to allow red background shape */}
      <div className="container mx-auto h-full flex items-center justify-between px-4 sm:px-8 md:px-12 relative z-10">
        
        {/* Logo spacer */}
        <div className="flex-1" />

        {/* Info Content - inside the red shape */}
        <div className={`flex items-center h-full text-white text-xs sm:text-sm font-medium gap-6 ${isRtl ? 'pr-12' : 'pl-12'}`}>
           <div className="flex items-center gap-2">
             <MapPin className="w-4 h-4" />
             <span>219 Bedford Street Birmingham, AL 35211</span>
           </div>
           <div className="hidden lg:flex items-center gap-6">
             <span>info@example.com</span>
             <span>+234 554 657 345</span>
           </div>
        </div>
      </div>

      {/* Red Background with angled cut */}
      <div 
        className={`absolute top-0 h-full bg-red-600 w-[65%] md:w-[65%] lg:w-[75%] ${isRtl ? 'left-0' : 'right-0'}`}
        style={{ 
          clipPath: isRtl 
            ? "polygon(0 0, calc(100% - 40px) 0, 100% 100%, 0% 100%)" 
            : "polygon(40px 0, 100% 0, 100% 100%, 0% 100%)" 
        }}
      />
    </div>
  );
}
