"use client";

import React from "react";

export const BrandSliderCardSkeleton: React.FC = () => {
  return (
    <div className="relative h-[180px] md:h-[220px] w-full rounded-3xl bg-slate-100 dark:bg-muted overflow-hidden">
      <div className="absolute inset-0">
        <div className="h-full w-full bg-gradient-to-br from-slate-200/70 via-slate-300/50 to-slate-200/70 dark:from-slate-700/70 dark:via-slate-800/50 dark:to-slate-700/70 bg-[length:200%_100%] animate-linkedin-shimmer" />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 space-y-2">
          <div className="h-4 bg-gradient-to-r from-slate-200/70 via-slate-300/50 to-slate-200/70 dark:from-slate-700/70 dark:via-slate-800/50 dark:to-slate-700/70 rounded w-3/4 bg-[length:200%_100%] animate-linkedin-shimmer" />
          <div className="h-6 bg-gradient-to-r from-slate-200/70 via-slate-300/50 to-slate-200/70 dark:from-slate-700/70 dark:via-slate-800/50 dark:to-slate-700/70 rounded w-1/2 bg-[length:200%_100%] animate-linkedin-shimmer" />
        </div>
        <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 bg-gradient-to-r from-slate-200/70 via-slate-300/50 to-slate-200/70 dark:from-slate-700/70 dark:via-slate-800/50 dark:to-slate-700/70 rounded-full w-8 h-8 bg-[length:200%_100%] animate-linkedin-shimmer" />
      </div>
    </div>
  );
};
