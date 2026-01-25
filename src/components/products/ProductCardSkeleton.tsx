"use client";

import React from "react";

export const ProductCardSkeleton: React.FC<{ viewMode?: "grid" | "list" }> = ({
  viewMode = "grid",
}) => {
  return (
    <div
      className={`
        group bg-white dark:bg-card border border-slate-200 dark:border-border rounded-xl sm:rounded-3xl overflow-hidden
        transition-all duration-500
        ${viewMode === "list" ? "flex flex-col sm:flex-row h-auto" : "flex flex-col"}
      `}
    >
      <div
        className={`
          relative bg-slate-50 dark:bg-muted overflow-hidden
          ${viewMode === "list" ? "w-full sm:w-56 h-40 sm:h-auto flex-shrink-0" : "aspect-[1.4/1]"}
        `}
      >
        <div className="absolute inset-3 rounded-2xl bg-gradient-to-r from-slate-100/70 via-slate-200/50 to-slate-100/70 dark:from-slate-700/70 dark:via-slate-800/50 dark:to-slate-700/70 bg-[length:200%_100%] animate-linkedin-shimmer" />
      </div>

      <div className="p-3 pt-4 flex flex-col flex-1 gap-3">
        <div className="h-4 w-3/4 rounded-full bg-gradient-to-r from-slate-100/70 via-slate-200/50 to-slate-100/70 dark:from-slate-700/70 dark:via-slate-800/50 dark:to-slate-700/70 bg-[length:200%_100%] animate-linkedin-shimmer" />
        <div className="h-3 w-1/2 rounded-full bg-gradient-to-r from-slate-100/70 via-slate-200/50 to-slate-100/70 dark:from-slate-700/70 dark:via-slate-800/50 dark:to-slate-700/70 bg-[length:200%_100%] animate-linkedin-shimmer" />
        <div className="flex items-center justify-between gap-2">
          <div className="h-6 w-24 rounded-full bg-gradient-to-r from-slate-100/70 via-slate-200/50 to-slate-100/70 dark:from-slate-700/70 dark:via-slate-800/50 dark:to-slate-700/70 bg-[length:200%_100%] animate-linkedin-shimmer" />
          <div className="h-4 w-16 rounded-full bg-gradient-to-r from-slate-100/70 via-slate-200/50 to-slate-100/70 dark:from-slate-700/70 dark:via-slate-800/50 dark:to-slate-700/70 bg-[length:200%_100%] animate-linkedin-shimmer" />
        </div>
        <div className="mt-auto flex gap-2">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-slate-100/70 via-slate-200/50 to-slate-100/70 dark:from-slate-700/70 dark:via-slate-800/50 dark:to-slate-700/70 bg-[length:200%_100%] animate-linkedin-shimmer" />
          <div className="h-10 flex-1 rounded-xl bg-gradient-to-r dark:from-slate-900/30 dark:via-slate-800/40 dark:to-slate-900/30 from-slate-100/70 via-slate-200/50 to-slate-100/70 bg-[length:200%_100%] animate-linkedin-shimmer" />
        </div>
      </div>
    </div>
  );
};
